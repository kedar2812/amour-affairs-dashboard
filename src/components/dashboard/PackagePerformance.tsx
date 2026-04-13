"use client";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";

/*
 * Sparklink "Best Selling Product" table adapted for photography packages.
 * Clean list with progress bars.
 */
const packages = [
  { title: "Wedding Premium", price: "₹1.5L", bookings: 42, revShare: 45, trend: "up", color: "#C8956C" },
  { title: "Pre-Wedding Deluxe", price: "₹65K", bookings: 38, revShare: 20, trend: "up", color: "#8B5CF6" },
  { title: "Corporate Standard", price: "₹35K", bookings: 24, revShare: 15, trend: "down", color: "#3B82F6" },
  { title: "Wedding Basic", price: "₹95K", bookings: 18, revShare: 12, trend: "up", color: "#F59E0B" },
  { title: "Portrait Session", price: "₹15K", bookings: 15, revShare: 8, trend: "up", color: "#10B981" },
];

export function PackagePerformance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.28 }}
      className="h-full"
    >
      <div className="dash-card h-full flex flex-col">
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h3 className="text-[18px] font-bold text-foreground">Package Performance</h3>
            <p className="text-[13px] text-muted-foreground mt-0.5">Top packages by bookings</p>
          </div>
          <button className="h-8 w-8 rounded-lg hover:bg-muted/50 flex items-center justify-center text-muted-foreground transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 px-6 pb-5 space-y-4">
          {packages.map((pkg, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-[12px] font-bold text-white shrink-0"
                style={{ background: pkg.color }}
              >
                {pkg.title.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-[13px] font-semibold text-foreground truncate">{pkg.title}</h5>
                  <span className="text-[13px] font-bold text-foreground ml-2">{pkg.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pkg.revShare}%` }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                      className="h-full rounded-full"
                      style={{ background: pkg.color }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground font-medium w-7 text-right">{pkg.revShare}%</span>
                  <span className="text-[11px] text-muted-foreground">{pkg.bookings}</span>
                  {pkg.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
