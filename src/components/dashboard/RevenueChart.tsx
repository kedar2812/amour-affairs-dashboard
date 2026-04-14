"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";

/*
 * Sparklink-style Revenue Forecast:
 * - Large revenue header with trend badge
 * - Day/Week/Month toggle
 * - Clean bar chart with two fills
 * - Average line reference
 */
import { Timeframe, groupRevenueByPeriod } from "@/lib/analyticsUtils";
import { bookings } from "@/data/mockData";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="bg-card rounded-lg px-3.5 py-2.5 shadow-lg border border-border/50 text-[14px]">
      <p className="font-bold text-foreground mb-1">{label} 2025</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-sm" style={{ background: entry.color }} />
          <span className="text-muted-foreground capitalize">{entry.dataKey}:</span>
          <span className="font-semibold text-foreground">₹{entry.value.toFixed(1)}L</span>
        </div>
      ))}
    </div>
  );
}

export function RevenueChart({ timeframe }: { timeframe: Timeframe }) {
  const chartData = groupRevenueByPeriod(bookings, timeframe);
  const totalRevenue = chartData.reduce((sum, d) => sum + d.realised, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 }}
      className="h-full"
    >
      <div className="dash-card h-full flex flex-col">
        {/* Header — Sparklink Revenue Forecast style */}
        <div className="flex items-start justify-between p-6 pb-3">
          <div>
            <h3 className="text-[18px] font-bold text-foreground">Revenue Forecast</h3>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-3xl font-bold text-foreground tracking-tight">
                ₹{totalRevenue >= 1 ? `${totalRevenue.toFixed(1)}L` : `${(totalRevenue * 100000).toLocaleString()}`}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[12px] font-semibold text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <TrendingUp className="h-3 w-3" /> 12%
              </span>
            </div>
            <p className="text-[12px] text-muted-foreground mt-1">Showing data for {timeframe.toLowerCase()}</p>
          </div>
          <div className="px-3 py-1 rounded-full bg-muted text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {timeframe}
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 px-4 pb-3 min-h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barGap={3} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9CA3AF", fontWeight: 500 }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9CA3AF", fontWeight: 500 }}
                tickFormatter={(val) => `${val}L`}
                dx={-4}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.8, radius: 4 }} />
              <Bar dataKey="realised" name="Realised" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="projected" name="Projected" fill="var(--muted-foreground)" fillOpacity={0.25} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend strip */}
        <div className="border-t border-border/50 px-6 py-3 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
            <span className="text-[12px] text-muted-foreground font-medium">Realised</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/30" />
            <span className="text-[12px] text-muted-foreground font-medium">Projected</span>
          </div>
          <div className="ml-auto text-[12px] text-muted-foreground">
            Total: <span className="font-semibold text-foreground">₹{(totalRevenue).toFixed(1)}L</span> in {timeframe.toLowerCase()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
