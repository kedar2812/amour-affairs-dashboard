"use client";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";
import { TrendingUp } from "lucide-react";

/*
 * Sparklink "Traffic Breakdown" donut chart adapted for lead sources.
 * Interactive hover on legend highlights the segment.
 */
const data = [
  { name: "Instagram", value: 38, color: "#C8956C" },
  { name: "WhatsApp", value: 26, color: "#1A1A2E" },
  { name: "Google", value: 14, color: "#10B981" },
  { name: "Referral", value: 12, color: "#8B5CF6" },
  { name: "Website", value: 10, color: "#F59E0B" },
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-card rounded-lg px-3 py-2 shadow-lg border border-border/50 text-[14px]">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full" style={{ background: item.payload.color }} />
        <span className="font-medium text-foreground">{item.payload.name}</span>
        <span className="font-bold text-foreground">{item.value}%</span>
      </div>
    </div>
  );
}

export function TrafficBreakdown() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.24 }}
      className="h-full"
    >
      <div className="dash-card h-full flex flex-col">
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold text-foreground">Lead Sources</h3>
            <span className="text-[12px] text-muted-foreground bg-muted px-2 py-1 rounded-md font-medium">This Month</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-foreground">842</span>
            <span className="inline-flex items-center gap-0.5 text-[12px] font-semibold text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">
              <TrendingUp className="h-3 w-3" /> +12.5%
            </span>
            <span className="text-[12px] text-muted-foreground">from last month</span>
          </div>
        </div>

        <div className="flex-1 flex items-center px-2">
          {/* Donut chart */}
          <div className="w-1/2 min-h-[170px]">
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={62}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={3}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.3}
                      onMouseEnter={() => setHoveredIndex(index)}
                      style={{ transition: "opacity 0.2s ease", cursor: "pointer" }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend — Sparklink-style vertical */}
          <div className="w-1/2 pr-4 space-y-3">
            {data.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between cursor-pointer transition-opacity duration-200 ${
                  hoveredIndex === null || hoveredIndex === i ? "opacity-100" : "opacity-30"
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-[13px] font-medium text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-[13px] font-bold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
