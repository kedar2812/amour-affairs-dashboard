"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Booking } from '@/data/mockData';
import { parseISO, format as formatDate } from 'date-fns';

interface YearViewProps {
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
}

export function YearView({ bookings, onBookingClick }: YearViewProps) {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = 2025; // Matching mock data centerpiece

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
      {months.map((month, index) => {
        const monthBookings = bookings.filter(b => {
          const d = parseISO(b.date);
          return d.getMonth() === index && d.getFullYear() === currentYear;
        });

        return (
          <motion.div
            key={month}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            className="dash-card p-5 flex flex-col h-[280px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground text-lg">{month}</h3>
              <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[11px] font-bold">
                {monthBookings.length} Bookings
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {monthBookings.map(b => (
                <div 
                  key={b.id}
                  onClick={() => onBookingClick(b)}
                  className="p-2.5 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer border border-border/50 group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[12px] font-bold text-foreground truncate max-w-[120px]">{b.clientName}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{b.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">
                      {formatDate(parseISO(b.date), 'do MMM')}
                    </span>
                    <span className="text-[11px] font-bold text-primary">₹{(b.amount / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              ))}
              {monthBookings.length === 0 && (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-border/30 rounded-xl">
                  <span className="text-[12px] text-muted-foreground italic">No events</span>
                </div>
              )}
            </div>

            <div className="pt-3 mt-auto border-t border-border/50 flex justify-between items-center text-[11px]">
              <span className="text-muted-foreground">Est. Revenue</span>
              <span className="font-bold text-foreground">
                ₹{(monthBookings.reduce((sum, b) => sum + b.amount, 0) / 1000).toFixed(0)}K
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
