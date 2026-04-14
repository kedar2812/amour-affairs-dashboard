"use client";
import { motion } from "framer-motion";
import { Timeframe, calculateFunnelData, filterDataByTimeframe } from "@/lib/analyticsUtils";
import { bookings, leads } from "@/data/mockData";

/*
 * Zentra-style waterfall/funnel:
 * Clean horizontal bars with step numbers, drop-off indicators.
 */

export function FunnelChart({ timeframe }: { timeframe: Timeframe }) {
  const filteredBookings = filterDataByTimeframe(bookings, timeframe);
  const filteredLeads = filterDataByTimeframe(leads, timeframe);
  const funnelData = calculateFunnelData(filteredLeads, filteredBookings);

  const maxCount = funnelData[0].count || 1;
  const totalConversion = funnelData[0].count > 0 
    ? ((funnelData[funnelData.length - 1].count / funnelData[0].count) * 100).toFixed(1)
    : "0.0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.16 }}
      className="h-full"
    >
      <div className="dash-card h-full flex flex-col">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold text-foreground">Conversion Funnel</h3>
            <span className="text-[12px] font-semibold text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
              {totalConversion}% overall
            </span>
          </div>
          <p className="text-[13px] text-muted-foreground mt-1">Inquiry → Delivery pipeline</p>
        </div>

        <div className="flex-1 px-6 pb-6 flex flex-col justify-center gap-3">
          {funnelData.map((step, index) => {
            const widthPct = (step.count / maxCount) * 100;
            const prevCount = index > 0 ? funnelData[index - 1].count : null;
            const dropOff = prevCount ? ((1 - step.count / prevCount) * 100).toFixed(0) : null;

            return (
              <div key={step.stage}>
                {/* Drop-off between stages */}
                {dropOff && (
                  <div className="flex items-center text-[11px] text-muted-foreground pl-8 pb-1 gap-1">
                    <span>↓</span>
                    <span className="text-destructive font-medium">-{dropOff}%</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  {/* Step number */}
                  <div
                    className="w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 bg-muted text-muted-foreground"
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-medium text-foreground truncate">{step.stage}</span>
                      <span className="text-[13px] font-bold text-foreground">{step.count}</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPct}%` }}
                        transition={{ duration: 0.7, delay: 0.2 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="h-full rounded-full"
                        style={{ background: step.color }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
