"use client";

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer, BarChart, Bar, Line, ComposedChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  PieChart, Pie, Cell
} from 'recharts';

import { bookings, leads, clients } from '@/data/mockData';
import { 
  Timeframe, 
  filterDataByTimeframe, 
  calculateRevenue, 
  groupRevenueByPeriod,
  calculateBookingTypes,
  calculateFunnelData,
  calculateYoYData
} from '@/lib/analyticsUtils';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<Timeframe>("This Year");

  // Filtered Data based on Selection
  const currentBookings = filterDataByTimeframe(bookings, dateRange);
  const currentLeads = filterDataByTimeframe(leads, dateRange);

  // Derived Metrics
  const revenueData = groupRevenueByPeriod(bookings, dateRange);
  const bookingTypes = calculateBookingTypes(currentBookings);
  const funnelData = calculateFunnelData(currentLeads, currentBookings);
  const yoyData = calculateYoYData(bookings);
  
  const totalRevenueVal = calculateRevenue(currentBookings);
  const conversionRate = currentLeads.length > 0 ? (currentBookings.length / currentLeads.length * 100).toFixed(1) : "0.0";

  const formatINR = (tickItem: number) => {
    if (tickItem >= 1) return `₹${tickItem.toFixed(1)}L`;
    return `₹${(tickItem * 100).toFixed(0)}K`;
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1540px] mx-auto w-full h-full pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-[14px] text-muted-foreground mt-1">Insights to grow your studio.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as Timeframe)}
            className="h-10 px-4 bg-card border border-border/50 rounded-xl text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-medium cursor-pointer"
          >
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
          <Button variant="outline" className="h-10 px-4 rounded-xl border-border/50 bg-card/10">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: "Total Revenue", val: totalRevenueVal >= 100000 ? `₹${(totalRevenueVal/100000).toFixed(1)}L` : `₹${(totalRevenueVal/1000).toFixed(0)}K`, up: true },
          { label: "Total Bookings", val: currentBookings.length.toString(), up: true },
          { label: "Avg Booking Val", val: currentBookings.length > 0 ? `₹${(totalRevenueVal / currentBookings.length / 1000).toFixed(0)}K` : "₹0", up: true },
          { label: "Conversion Rate", val: `${conversionRate}%`, up: true },
          { label: "Active Leads", val: currentLeads.length.toString(), up: true },
          { label: "Avg Rating", val: "4.9", up: true },
        ].map(kpi => (
          <div key={kpi.label} className="dash-card p-4 flex flex-col justify-center items-center text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block w-full">{kpi.label}</span>
            <span className="text-xl font-bold text-foreground">{kpi.val}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Revenue Comp Chart - takes 2 cols */}
        <div className="dash-card p-6 xl:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Revenue Trends</h2>
            <p className="text-[13px] text-muted-foreground">Actual vs Fixed Projected Revenue (0.5L).</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <ComposedChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={formatINR} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                <Tooltip 
                  cursor={{ fill: 'var(--border)', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--foreground)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar dataKey="realised" name="Actual Revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={32} />
                <Line type="monotone" dataKey="projected" name="Projected" stroke="#8b93a5" strokeWidth={3} strokeDasharray="5 5" activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Type Pie */}
        <div className="dash-card p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Booking Types</h2>
            <p className="text-[13px] text-muted-foreground">Breakdown of services in {dateRange.toLowerCase()}.</p>
          </div>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={bookingTypes} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {bookingTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--foreground)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-foreground">{currentBookings.length}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Bookings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Conversion Funnel */}
        <div className="dash-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Conversion Funnel</h2>
            <p className="text-[13px] text-muted-foreground">Inquiry to Booking drop-off in {dateRange.toLowerCase()}.</p>
          </div>
          <div className="h-[220px] w-full">
             <ResponsiveContainer>
              <BarChart data={funnelData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: 'var(--foreground)', fontWeight: 600 }} />
                <XAxis type="number" hide />
                <Tooltip 
                  cursor={{ fill: 'var(--border)', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="var(--primary)" barSize={24} radius={[0, 4, 4, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Placeholder for Lead Sources or similar */}
        <div className="dash-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Growth Potential</h2>
            <p className="text-[13px] text-muted-foreground">Studio scalability indicator.</p>
          </div>
          <div className="flex flex-col items-center justify-center h-[200px] text-center">
            <div className="h-24 w-24 rounded-full border-8 border-primary/20 border-t-primary flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-foreground">84%</span>
            </div>
            <p className="text-sm text-muted-foreground px-4">Studio is operating at near-peak efficiency for the current period.</p>
          </div>
        </div>

        {/* YoY Comp */}
        <div className="dash-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Monthly Comparison</h2>
            <p className="text-[13px] text-muted-foreground">This Year (2025) vs Last Year (2024).</p>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer>
              <BarChart data={yoyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} dy={5} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={formatINR} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                <Tooltip 
                  cursor={{ fill: 'var(--border)', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="lastYear" name="Last Year" fill="var(--muted-foreground)" opacity={0.5} radius={[2, 2, 0, 0]} barSize={8} />
                <Bar dataKey="thisYear" name="This Year" fill="var(--primary)" radius={[2, 2, 0, 0]} barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
