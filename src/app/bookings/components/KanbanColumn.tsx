import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface KanbanColumnProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function KanbanColumn({ id, title, children }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef} 
      className={`flex flex-col w-[320px] min-w-[320px] bg-muted/20 rounded-xl p-3 border ${isOver ? 'border-primary/50 bg-muted/40' : 'border-border/20'} transition-colors`}
    >
      <div className="flex items-center justify-between px-2 mb-3">
        <h3 className="font-bold text-[14px] text-foreground tracking-wide">{title}</h3>
        <span className="text-[12px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {React.Children.count(children)}
        </span>
      </div>
      <div className="flex flex-col gap-3 min-h-[150px]">
        {children}
      </div>
    </div>
  );
}
