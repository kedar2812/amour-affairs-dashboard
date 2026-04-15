"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ArrowUpRight, TrendingUp, AlertCircle, Info, ChevronDown, CheckCircle2, TrendingDown, Target, Zap } from "lucide-react";
import { trafficBreakdownData, funnelDataConfig, packagePerformanceData, revenueKPIs, TimeRange } from "@/data/mockChartData";

/*
 * Insight Rule Engine Engine
 * Analyzes the math in the Data layer and surfaces contextually sensible statements
 */
type InsightType = "info" | "warning" | "success" | "trend-up" | "trend-down" | "action";
interface GeneratedInsight {
  id: string;
  type: InsightType;
  priority: number;
  boldText: string;
  regularText: string;
}

function processInsights(scope: TimeRange): GeneratedInsight[] {
  const traffic = trafficBreakdownData[scope];
  const funnel = funnelDataConfig[scope];
  const pkgs = packagePerformanceData[scope];
  
  const insights: GeneratedInsight[] = [];
  
  // 1. Traffic Logic
  const totalTraffic = traffic.reduce((sum, src) => sum + src.value, 0);
  const sortedTraffic = [...traffic].sort((a, b) => b.value - a.value);
  const topSource = sortedTraffic[0];
  const topSourcePct = Math.round((topSource.value / totalTraffic) * 100);
  const secondSource = sortedTraffic[1];
  
  if (topSourcePct > 40) {
    insights.push({ id: "traffic_heavy", type: "warning", priority: 80, boldText: `${topSourcePct}% of pipeline`, regularText: `comes solely from ${topSource.name}. Diversify ad spend to reduce platform risk.` });
  } else {
    insights.push({ id: "traffic_healthy", type: "success", priority: 60, boldText: `Highly diverse pipeline`, regularText: `with no single source exceeding ${topSourcePct}%. Excellent structural resilience.` });
  }
  
  if (sortedTraffic.find(s => s.name === "Google")?.value! > (totalTraffic * 0.15)) {
    insights.push({ id: "seo_working", type: "trend-up", priority: 65, boldText: `Organic SEO strength`, regularText: `generating over 15% of leads. Continue posting blog content.` });
  }

  if (sortedTraffic.find(s => s.name === "Referral")?.value! < (totalTraffic * 0.08)) {
     insights.push({ id: "low_referral", type: "action", priority: 75, boldText: `Word of mouth is underperforming.`, regularText: `Introduce a post-shoot referral discount to boost organic growth.` });
  } else {
     insights.push({ id: "high_referral", type: "success", priority: 70, boldText: `Strong referral engine`, regularText: `bringing in high-quality, pre-warmed prospects.` });
  }

  // 2. Funnel Logic
  const stageCounts = funnel.map(f => f.count);
  let maxDropoffPct = 0;
  let bottleneckStart = "";
  let bottleneckEnd = "";
  
  for (let i = 0; i < funnel.length - 1; i++) {
    const drop = (funnel[i].count - funnel[i+1].count) / funnel[i].count;
    if (drop > maxDropoffPct) {
      maxDropoffPct = drop;
      bottleneckStart = funnel[i].stage;
      bottleneckEnd = funnel[i+1].stage;
    }
  }
  
  const maxDropVal = Math.round(maxDropoffPct * 100);
  if (maxDropVal > 30) {
    insights.push({ id: "major_drop", type: "warning", priority: 95, boldText: `${maxDropVal}% prospect drop-off`, regularText: `between ${bottleneckStart} and ${bottleneckEnd}. Immediate workflow review required here.` });
    if (bottleneckStart === "Consultation" || bottleneckStart === "Proposal") {
      insights.push({ id: "pricing_friction", type: "warning", priority: 85, boldText: `Pricing friction detected`, regularText: `at the ${bottleneckStart} stage. Consider creating a mid-tier 'hybrid' package.` });
    }
  } else {
    insights.push({ id: "solid_funnel", type: "success", priority: 60, boldText: `Seamless funnel flow`, regularText: `with no major bottlenecks. Maximum stage drop-off is only ${maxDropVal}%.` });
  }

  const initialInquiries = funnel[0].count;
  const finalBookings = funnel.find(f => f.stage === "Booked")?.count || funnel[funnel.length-1].count;
  const conversionRate = Math.round((finalBookings / initialInquiries) * 100);
  
  if (conversionRate < 10) {
     insights.push({ id: "low_conv", type: "warning", priority: 90, boldText: `Low overall conversion (${conversionRate}%)`, regularText: `indicates low lead quality. Refine ad targeting parameters immediately.` });
  } else if (conversionRate > 25) {
     insights.push({ id: "high_conv", type: "trend-up", priority: 85, boldText: `Exceptional close rate (${conversionRate}%)`, regularText: `shows strong sales-market fit. Safe to scale up paid marketing spend.` });
  }

  if (bottleneckStart === "Inquiry") {
     insights.push({ id: "response_time", type: "action", priority: 88, boldText: `Top-of-funnel leaks detected.`, regularText: `Prospects are abandoning right after Inquiry. Automate the initial text/email response.`});
  }

  // 3. Package Logic
  const sortedPkgs = [...pkgs].sort((a, b) => b.revShare - a.revShare);
  const topPkg = sortedPkgs[0];
  const bottomPkg = sortedPkgs[sortedPkgs.length - 1];
  
  if (topPkg.revShare > 45) {
    insights.push({ id: "pkg_reliance", type: "info", priority: 82, boldText: `${topPkg.revShare}% revenue reliance`, regularText: `on ${topPkg.title}. Cross-sell smaller add-ons to distribute income.` });
  } else {
    insights.push({ id: "pkg_healthy", type: "success", priority: 55, boldText: `Agnostic revenue streams.`, regularText: `Income is evenly distributed across your service offerings.` });
  }

  const trendingUpPkgs = pkgs.filter(p => p.trend === "up").length;
  if (trendingUpPkgs === pkgs.length) {
    insights.push({ id: "all_up", type: "trend-up", priority: 72, boldText: `Holistic growth.`, regularText: `Every single service tier is showing upward momentum this ${scope}.` });
  } else if (bottomPkg.trend === "down") {
    insights.push({ id: "pkg_down", type: "action", priority: 78, boldText: `${bottomPkg.title} is declining.`, regularText: `Consider retiring this service or running a limited-time promotional discount.` });
  }

  // Generate some generic strategic fillers if data triggers were low
  if (scope === "Week") {
    insights.push({ id: "week_1", type: "info", priority: 40, boldText: "Weekly momentum building.", regularText: "Ensure your edit-queue doesn't fall behind as weekend shoots approach." });
    insights.push({ id: "week_2", type: "action", priority: 45, boldText: "Mid-week lull.", regularText: "Schedule Instagram reels or automated follow-ups natively in the middle of the week." });
  } else if (scope === "Year" || scope === "Max") {
    insights.push({ id: "year_1", type: "trend-up", priority: 50, boldText: "Long-term scalability.", regularText: "The historical volume suggests you have the capacity to hire an associate photographer." });
    insights.push({ id: "year_2", type: "info", priority: 48, boldText: "Predictable seasonality.", regularText: "Q3 shows persistent historical strength. Front-load your marketing budget for Q2." });
    insights.push({ id: "year_3", type: "success", priority: 65, boldText: "Client Lifetime Value (LTV)", regularText: "is mathematically strong across multi-year spans." });
  }
  
  // Custom Repeat Client rate calculation simulation based on scope
  const repeatClientRatePct = scope === "Max" ? 42 : scope === "Year" ? 35 : scope === "Month" ? 22 : 12;
  const repeatGrowth = scope === "Max" ? 15 : scope === "Year" ? 8 : scope === "Month" ? 3 : 1;
  
  if (repeatClientRatePct > 30) {
    insights.push({ id: "loyal_clients", type: "success", priority: 85, boldText: `Amazing retention (${repeatClientRatePct}%)`, regularText: `indicates highly satisfied clients booking maternity/anniversary shoots post-wedding.` });
  } else {
    insights.push({ id: "low_retention", type: "action", priority: 78, boldText: `Low repeat booking rate (${repeatClientRatePct}%)`, regularText: `Send out automated 1-year anniversary discount emails.` });
  }

  // Sort by priority (Highest first, shuffle slightly for variety on same tiers)
  return insights.sort((a, b) => b.priority - a.priority + (Math.random() * 5 - 2.5)).slice(0, 3);
}

const iconMap = {
  "info": <Info className="h-3.5 w-3.5" />,
  "warning": <AlertCircle className="h-3.5 w-3.5" />,
  "success": <CheckCircle2 className="h-3.5 w-3.5" />,
  "trend-up": <TrendingUp className="h-3.5 w-3.5" />,
  "trend-down": <TrendingDown className="h-3.5 w-3.5" />,
  "action": <Zap className="h-3.5 w-3.5" />
};

const colorMap = {
  "info": "bg-blue-500/20 text-blue-400",
  "warning": "bg-red-500/20 text-red-500",
  "success": "bg-emerald-500/20 text-emerald-400",
  "trend-up": "bg-[#C8956C]/20 text-[#C8956C]",
  "trend-down": "bg-orange-500/20 text-orange-400",
  "action": "bg-violet-500/20 text-violet-400"
};

export function RetentionCallout() {
  const [activeToggle, setActiveToggle] = useState<TimeRange>("Month");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Math extractions for the large hero numbers
  const funnel = funnelDataConfig[activeToggle];
  const initialInquiries = funnel[0].count;
  const bookedShoots = funnel.find(f => f.stage === "Booked")?.count || funnel[funnel.length-1].count;
  const overallConversion = Math.round((bookedShoots / initialInquiries) * 100);

  const repeatClientRatePct = activeToggle === "Max" ? 42 : activeToggle === "Year" ? 35 : activeToggle === "Month" ? 22 : 12;
  const repeatGrowth = activeToggle === "Max" ? 15 : activeToggle === "Year" ? 8 : activeToggle === "Month" ? 3 : 1;

  // Process the intelligent rule engine
  const generatedInsights = useMemo(() => processInsights(activeToggle), [activeToggle]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.28 }}
      className="h-full"
    >
      <motion.div 
        className="h-[430px] rounded-2xl relative overflow-visible text-white group"
        whileHover="hover"
      >
        {/* Abstract Backgrounds */}
        <div className="absolute inset-0 bg-[#0F0F1A] rounded-2xl overflow-hidden shadow-xl" />
        
        <motion.div
          className="absolute inset-0 opacity-70 rounded-2xl overflow-hidden pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #1A1A2E 0%, #222240 50%, #151528 100%)",
            backgroundSize: "200% 200%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />

        <div 
          className="absolute inset-0 opacity-[0.04] rounded-2xl overflow-hidden mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

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

        {/* Content Container */}
        <div className="relative z-10 p-6 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#C8956C]">
                <Lightbulb className="h-3.5 w-3.5" />
                Insights Engine
              </div>
              
              {/* Specialized Dark Mode Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 text-[12px] text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-1 rounded-md font-medium transition-colors backdrop-blur-sm shadow-sm"
                >
                  {activeToggle}
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </button>
                {isDropdownOpen && (
                   <div className="absolute top-full mt-1.5 right-0 w-28 bg-[#151528] border border-white/10 shadow-2xl rounded-lg py-1 z-50 overflow-hidden">
                      {(["Week", "Month", "Year", "Max"] as TimeRange[]).map((t) => (
                        <button
                          key={t}
                          onClick={() => { setActiveToggle(t); setIsDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-[12px] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {t}
                        </button>
                      ))}
                   </div>
                )}
              </div>
            </div>
            
            <AnimatePresence mode="wait">
               <motion.div
                 key={`header-${activeToggle}`}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 10 }}
                 transition={{ duration: 0.3 }}
               >
                {/* Primary Hero Insight */}
                <h2 className="text-[42px] font-black tracking-tight leading-none mb-1 mt-1">{repeatClientRatePct}%</h2>
                <p className="font-medium text-[15px] leading-snug text-white/85">
                  Repeat client index increased by <span className="text-[#C8956C] font-bold">{repeatGrowth}%</span> vs last {activeToggle.toLowerCase()}.
                </p>

                {/* Secondary Hero Insight */}
                <div className="mt-4">
                  <h2 className="text-[42px] font-black tracking-tight leading-none mb-1">{overallConversion}%</h2>
                  <p className="font-medium text-[15px] leading-snug text-white/85">
                    Overall funnel conversion rate, yielding <span className="text-[#C8956C] font-bold">{bookedShoots}</span> secured shoots.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dynamic AI Calculated Insights List */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-3 relative min-h-[140px]">
             <AnimatePresence mode="popLayout">
                {generatedInsights.map((insight, idx) => (
                  <motion.div 
                    key={insight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-start gap-2.5 group"
                  >
                    <div className={`mt-0.5 p-1 rounded-md shrink-0 ${colorMap[insight.type]}`}>
                      {iconMap[insight.type]}
                    </div>
                    <p className="text-[13px] text-white/70 leading-[1.35]">
                      <strong className="text-white/95">{insight.boldText}</strong> {insight.regularText}
                    </p>
                  </motion.div>
                ))}
             </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
