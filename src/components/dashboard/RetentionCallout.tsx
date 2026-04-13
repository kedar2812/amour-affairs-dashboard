"use client";
import { motion } from "framer-motion";
import { Lightbulb, ArrowUpRight, TrendingUp, AlertCircle, Info } from "lucide-react";

/*
 * Zentra-style Insight callout card.
 * Dark gradient background with a prominent statistic and dynamically calculated points.
 */
export function RetentionCallout() {
  // Capture logic and math from Dashboard Mock Data
  
  // 1. Lead Sources (Data from TrafficBreakdown: Instagram=38, WhatsApp=26)
  const leadSourceA = { name: "Instagram", pct: 38 };
  const leadSourceB = { name: "WhatsApp", pct: 26 };
  const combinedLeadPct = leadSourceA.pct + leadSourceB.pct;

  // 2. Funnel Drop-off (Data from FunnelChart: Consultations=180, Proposals=120)
  const consultationCount = 180;
  const proposalCount = 120;
  const dropOffRate = Math.round((1 - proposalCount / consultationCount) * 100);

  // 3. Package Rev Share (Data from PackagePerformance: Wedding Premium = 45%)
  const topPackage = { name: "Wedding Premium", share: 45 };

  // 4. Overall Conversion (Data from FunnelChart: Inquiries=245, Bookings=85)
  const totalInquiries = 245;
  const bookedShoots = 85;
  const overallConversion = Math.round((bookedShoots / totalInquiries) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.28 }}
      className="h-full"
    >
      <motion.div 
        className="h-full rounded-2xl relative overflow-hidden text-white group"
        whileHover="hover"
      >
        {/* Layer 1: Base dark luxury deep navy/indigo solid */}
        <div className="absolute inset-0 bg-[#0F0F1A]" />
        
        {/* Layer 2: Animated shifting gradient (mid layer) */}
        <motion.div
          className="absolute inset-0 opacity-70"
          style={{
            background: "linear-gradient(135deg, #1A1A2E 0%, #222240 50%, #151528 100%)",
            backgroundSize: "200% 200%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />

        {/* Layer 3: Faint noise texture for realism */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Layer 4: Soft moving spotlight (light sweep/shimmer) */}
        <motion.div
          variants={{
            initial: { opacity: 0.08 },
            hover: { opacity: 0.15 }
          }}
          initial="initial"
          className="absolute inset-0 pointer-events-none"
        >
          <motion.div
            animate={{ 
              x: ["-100%", "100%"],
              y: ["-20%", "40%"] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10, 
              ease: "easeInOut",
              repeatType: "reverse"
            }}
            className="absolute top-0 -left-1/4 w-[150%] h-[150%]"
            style={{
              background: "radial-gradient(ellipse at center, rgba(167, 139, 250, 0.4) 0%, transparent 50%)",
            }}
          />
        </motion.div>

        {/* Layer 5: Subtle corner ambient corner accents */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }} 
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-64 h-64 bg-[#C8956C] rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.10, 0.18, 0.10] }} 
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-500 rounded-full blur-[80px] -ml-16 -mb-16 pointer-events-none mix-blend-screen" 
        />

        {/* Content Container (Untouched) */}
        <div className="relative z-10 p-6 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#C8956C] mb-4">
              <Lightbulb className="h-3.5 w-3.5" />
              Insights
            </div>
            
            {/* Primary Hero Insight */}
            <h2 className="text-[45px] font-black tracking-tight leading-none mb-2">75%</h2>
            <p className="font-medium text-[16px] leading-snug text-white/85">
              Repeat client rate increased by <span className="text-[#C8956C] font-bold">12%</span> compared to last quarter.
            </p>

            {/* Secondary Hero Insight */}
            <div className="mt-5">
              <h2 className="text-[45px] font-black tracking-tight leading-none mb-2">{overallConversion}%</h2>
              <p className="font-medium text-[16px] leading-snug text-white/85">
                Overall funnel conversion rate, yielding <span className="text-[#C8956C] font-bold">{bookedShoots}</span> confirmed shoots.
              </p>
            </div>
          </div>

          {/* Secondary Calculated Insights List */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-3.5">
            {/* Point 1: Leads */}
            <div className="flex items-start gap-2.5 group">
              <div className="mt-0.5 p-1 rounded-md bg-blue-500/20 text-blue-400">
                <Info className="h-3.5 w-3.5" />
              </div>
              <p className="text-[13px] text-white/60 leading-snug">
                <strong className="text-white/95">{combinedLeadPct}% of pipeline</strong> comes from {leadSourceA.name} & {leadSourceB.name}. High ROI on ad spend.
              </p>
            </div>
            
            {/* Point 2: Funnel Drop */}
            <div className="flex items-start gap-2.5 group">
              <div className="mt-0.5 p-1 rounded-md bg-red-500/20 text-red-400">
                <AlertCircle className="h-3.5 w-3.5" />
              </div>
              <p className="text-[13px] text-white/60 leading-snug">
                <strong className="text-white/95">{dropOffRate}% prospect drop-off</strong> at proposal stage. Consider reviewing bundle pricing.
              </p>
            </div>
            
            {/* Point 3: Package share */}
            <div className="flex items-start gap-2.5 group">
              <div className="mt-0.5 p-1 rounded-md bg-[#C8956C]/20 text-[#C8956C]">
                <TrendingUp className="h-3.5 w-3.5" />
              </div>
              <p className="text-[13px] text-white/60 leading-snug">
                <strong className="text-white/95">{topPackage.share}% revenue reliance</strong> on {topPackage.name}. Cross-sell opportunities exist.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
