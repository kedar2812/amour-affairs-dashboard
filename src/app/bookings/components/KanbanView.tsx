import React, { useState } from 'react';
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import { 
  SortableContext, 
  arrayMove, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { Booking } from '@/data/mockData';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

const COLUMNS = ["Pending", "Confirmed", "Completed", "Cancelled"] as const;

interface KanbanViewProps {
  bookings: Booking[];
  onBookingClick: (b: Booking) => void;
}

export function KanbanView({ bookings: initialBookings, onBookingClick }: KanbanViewProps) {
  const [items, setItems] = useState(initialBookings);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Is the item being dropped over a column?
    const isOverAColumn = COLUMNS.includes(overId);
    
    if (isOverAColumn) {
      setItems((prev) => {
        const activeIndex = prev.findIndex(b => b.id === activeId);
        if (activeIndex === -1) return prev;
        
        const newItems = [...prev];
        newItems[activeIndex] = { ...newItems[activeIndex], status: overId as Booking['status'] };
        return newItems;
      });
      return;
    }

    // Is it dropping over another item?
    const activeIndex = items.findIndex(b => b.id === activeId);
    const overIndex = items.findIndex(b => b.id === overId);

    if (activeIndex !== -1 && overIndex !== -1 && items[activeIndex].status !== items[overIndex].status) {
      setItems((prev) => {
        const newItems = [...prev];
        newItems[activeIndex] = { ...newItems[activeIndex], status: newItems[overIndex].status };
        return arrayMove(newItems, activeIndex, overIndex);
      });
    }
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeIndex = items.findIndex(b => b.id === active.id);
    const overIndex = items.findIndex(b => b.id === over.id);

    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      setItems((prev) => arrayMove(prev, activeIndex, overIndex));
    }
  };

  const activeItem = items.find(b => b.id === activeId);

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-4 h-full min-h-[600px] p-6">
        {COLUMNS.map(columnId => (
          <KanbanColumn key={columnId} id={columnId} title={columnId}>
            <SortableContext 
              items={items.filter(b => b.status === columnId).map(b => b.id)} 
              strategy={verticalListSortingStrategy}
            >
              {items.filter(b => b.status === columnId).map(b => (
                <KanbanCard key={b.id} booking={b} onClick={() => onBookingClick(b)} />
              ))}
            </SortableContext>
          </KanbanColumn>
        ))}
      </div>
      <DragOverlay>
        {activeItem ? <KanbanCard booking={activeItem} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
