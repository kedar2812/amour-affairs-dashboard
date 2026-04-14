"use client";

import React, { useState } from "react";
import { KPICards } from "@/components/dashboard/KPICards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { UpcomingShoots } from "@/components/dashboard/UpcomingShoots";
import { PackagePerformance } from "@/components/dashboard/PackagePerformance";
import { TeamStatus } from "@/components/dashboard/TeamStatus";
import { TrafficBreakdown } from "@/components/dashboard/TrafficBreakdown";
import { RetentionCallout } from "@/components/dashboard/RetentionCallout";
import { PendingActions } from "@/components/dashboard/PendingActions";
import { Timeframe } from "@/lib/analyticsUtils";

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<Timeframe>("This Month");

  return (
    <div className="flex flex-col gap-6 max-w-[1540px] mx-auto w-full">
      {/* Header with Selector */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Studio Overview</h1>
          <p className="text-[14px] text-muted-foreground mt-1">Real-time performance metrics and insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary uppercase tracking-wider">
            Virtual Today: May 15, 2025
          </div>
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as Timeframe)}
            className="h-10 px-4 bg-card border border-border/50 rounded-xl text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-medium cursor-pointer"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* Row 1: KPI Strip */}
      <KPICards timeframe={timeframe} />
      
      {/* Row 2: Revenue Chart + Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 min-h-[420px]">
          <RevenueChart timeframe={timeframe} />
        </div>
        <div className="lg:col-span-2 min-h-[420px]">
          <FunnelChart timeframe={timeframe} />
        </div>
      </div>
      
      {/* Row 3: Upcoming Shoots + Traffic + Retention Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="min-h-[380px]">
          <UpcomingShoots />
        </div>
        <div className="min-h-[380px]">
          <TrafficBreakdown />
        </div>
        <div className="min-h-[380px]">
          <RetentionCallout />
        </div>
      </div>

      {/* Row 4: Package Performance + Team + Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-4">
        <div className="min-h-[340px]">
          <PackagePerformance />
        </div>
        <div className="min-h-[340px]">
          <TeamStatus />
        </div>
        <div className="min-h-[340px]">
          <PendingActions />
        </div>
      </div>
    </div>
  );
}
