"use client";

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer, BarChart, Bar, Line, ComposedChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  PieChart, Pie, Cell
} from 'recharts';

const REVENUE_DATA = [
  { month: 'Jan', actual: 420000, forecast: 400000 },
  { month: 'Feb', actual: 510000, forecast: 460000 },
  { month: 'Mar', actual: 480000, forecast: 500000 },
  { month: 'Apr', actual: 620000, forecast: 550000 },
  { month: 'May', actual: 840000, forecast: 700000 }, // Current month
  { month: 'Jun', actual: null, forecast: 650000 },
  { month: 'Jul', actual: null, forecast: 720000 },
];

const COMP_YEAR_DATA = [
  { month: 'Jan', thisYear: 420000, lastYear: 380000 },
  { month: 'Feb', thisYear: 510000, lastYear: 400000 },
  { month: 'Mar', thisYear: 480000, lastYear: 450000 },
  { month: 'Apr', thisYear: 620000, lastYear: 510000 },
  { month: 'May', thisYear: 840000, lastYear: 680000 },
];

const BOOKING_TYPES = [
  { name: 'Wedding', value: 52, color: 'var(--primary)' },
  { name: 'Pre-Wedding', value: 18, color: '#ec4899' },
  { name: 'Corporate', value: 15, color: '#3b82f6' },
  { name: 'Portrait', value: 10, color: '#a855f7' },
  { name: 'Maternity', value: 5, color: '#10b981' },
];

const LEAD_SOURCES = [
  { name: 'Instagram', value: 38 },
  { name: 'WhatsApp', value: 26 },
  { name: 'Google', value: 14 },
  { name: 'Referral', value: 12 },
  { name: 'Website', value: 10 },
];

const FUNNEL_DATA = [
  { stage: 'Inquiry', count: 245 },
  { stage: 'Consultation', count: 180 },
  { stage: 'Proposal', count: 120 },
  { stage: 'Booked', count: 85 },
];

const formatINR = (tickItem: number) => {
  if (tickItem >= 100000) return `₹${tickItem / 100000}L`;
  return `₹${tickItem / 1000}K`;
};

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("This Year");

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
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 px-4 bg-card border border-border/50 rounded-xl text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
          >
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
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
          { label: "Total Revenue", val: "₹42.6L", up: true },
          { label: "Total Bookings", val: "142", up: true },
          { label: "Avg Booking Val", val: "₹30K", up: true },
          { label: "Conversion Rate", val: "34.5%", up: false },
          { label: "Repeat Client", val: "75%", up: true },
          { label: "Avg Rating", val: "4.8", up: true },
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
            <p className="text-[13px] text-muted-foreground">Actual vs Forecasted Revenue.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <ComposedChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={formatINR} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                <Tooltip 
                  cursor={{ fill: 'var(--border)', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar dataKey="actual" name="Actual Revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={32} />
                <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#8b93a5" strokeWidth={3} strokeDasharray="5 5" activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Type Pie */}
        <div className="dash-card p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Booking Types</h2>
            <p className="text-[13px] text-muted-foreground">Breakdown of services.</p>
          </div>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={BOOKING_TYPES} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {BOOKING_TYPES.map((entry, index) => (
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
              <span className="text-2xl font-bold text-foreground">142</span>
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
            <p className="text-[13px] text-muted-foreground">Inquiry to Booking drop-off.</p>
          </div>
          <div className="h-[220px] w-full">
             <ResponsiveContainer>
              <BarChart data={FUNNEL_DATA} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: 'var(--foreground)', fontWeight: 600 }} />
                <XAxis type="number" hide />
                <Tooltip 
                  cursor={{ fill: 'var(--border)', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="var(--primary)" barSize={24} radius={[0, 4, 4, 0]}>
                  {FUNNEL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(40, 45%, ${60 - index * 10}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="dash-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Lead Sources</h2>
            <p className="text-[13px] text-muted-foreground">Where clients find us.</p>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer>
              <BarChart data={LEAD_SOURCES} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                <XAxis type="number" hide />
                <Tooltip 
                  cursor={{ fill: 'var(--border)', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#3b82f6" barSize={16} radius={[0, 4, 4, 0]} label={{ position: 'right', fill: 'var(--foreground)', fontSize: 13, fontWeight: 'bold', formatter: (val: any) => `${val}%` }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* YoY Comp */}
        <div className="dash-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Monthly Comparison</h2>
            <p className="text-[13px] text-muted-foreground">This Year vs Last Year.</p>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer>
              <BarChart data={COMP_YEAR_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
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
