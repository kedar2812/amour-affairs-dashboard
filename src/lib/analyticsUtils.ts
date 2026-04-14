// src/lib/analyticsUtils.ts
import { Booking, Lead, Transaction } from "@/data/mockData";
import { isWithinInterval, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, parseISO, isSameDay, isSameWeek, isSameMonth, isSameYear, subDays, subMonths, subWeeks, subYears } from "date-fns";

export type Timeframe = "Today" | "This Week" | "This Month" | "This Year" | "All Time";

export function filterDataByTimeframe<T extends { date?: string; eventDate?: string }>(data: T[], timeframe: Timeframe, referenceDate: Date = new Date("2025-05-15")) {
  if (timeframe === "All Time") return data;

  let start: Date, end: Date;

  switch (timeframe) {
    case "Today":
      start = startOfDay(referenceDate);
      end = endOfDay(referenceDate);
      break;
    case "This Week":
      start = startOfWeek(referenceDate, { weekStartsOn: 1 });
      end = endOfWeek(referenceDate, { weekStartsOn: 1 });
      break;
    case "This Month":
      start = startOfMonth(referenceDate);
      end = endOfMonth(referenceDate);
      break;
    case "This Quarter":
      const q = Math.floor(referenceDate.getMonth() / 3);
      start = new Date(referenceDate.getFullYear(), q * 3, 1);
      end = endOfMonth(new Date(referenceDate.getFullYear(), q * 3 + 2, 1));
      break;
    case "This Year":
      start = startOfYear(referenceDate);
      end = endOfYear(referenceDate);
      break;
    default:
      return data;
  }

  return data.filter(item => {
    const dateStr = item.date || item.eventDate;
    if (!dateStr) return false;
    const itemDate = parseISO(dateStr);
    return isWithinInterval(itemDate, { start, end });
  });
}

export function getComparisonTimeframe(timeframe: Timeframe, referenceDate: Date = new Date("2025-05-15")) {
  switch (timeframe) {
    case "Today": return subDays(referenceDate, 1);
    case "This Week": return subWeeks(referenceDate, 1);
    case "This Month": return subMonths(referenceDate, 1);
    case "This Year": return subYears(referenceDate, 1);
    default: return referenceDate;
  }
}

export function calculateRevenue(bookings: Booking[]) {
  return bookings
    .filter(b => b.status === "Completed" || b.status === "Confirmed")
    .reduce((sum, b) => sum + b.amount, 0);
}

export function calculateLeadConversion(leads: Lead[]) {
  const total = leads.length;
  if (total === 0) return 0;
  const won = leads.filter(l => l.stage === "Won").length;
  return (won / total) * 100;
}

export function groupRevenueByPeriod(bookings: Booking[], timeframe: Timeframe, referenceDate: Date = new Date("2025-05-15")) {
  // Simple grouping logic for the chart
  if (timeframe === "This Year" || timeframe === "All Time") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((m, i) => {
      const monthBookings = bookings.filter(b => {
        const d = parseISO(b.date);
        return d.getMonth() === i && d.getFullYear() === referenceDate.getFullYear();
      });
      return { name: m, realised: calculateRevenue(monthBookings) / 100000, projected: 0.5 };
    });
  }

  if (timeframe === "This Month") {
    // Group by week of month (1-4/5)
    return [1, 2, 3, 4].map(w => {
      const weekBookings = bookings.filter(b => {
        const d = parseISO(b.date);
        const week = Math.ceil(d.getDate() / 7);
        return week === w;
      });
      return { name: `Week ${w}`, realised: calculateRevenue(weekBookings) / 10000, projected: 2 };
    });
  }

  // Default: Daily for This Week / Today
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map(d => ({ name: d, realised: Math.random() * 5, projected: 1 }));
}

export function calculateFunnelData(leads: Lead[], bookings: Booking[]) {
  const stages = [
    { stage: "Inquiry Received", count: leads.length, color: "#C8956C" },
    { stage: "Consultation Done", count: leads.filter(l => l.stage !== "New Inquiry").length, color: "#D4A574" },
    { stage: "Proposal Sent", count: leads.filter(l => l.stage === "Proposal Sent" || l.stage === "Won").length, color: "#B07D55" },
    { stage: "Booking Confirmed", count: bookings.length, color: "#9B6A47" },
    { stage: "Shoot Completed", count: bookings.filter(b => b.status === "Completed").length, color: "#7C5538" },
    { stage: "Album Delivered", count: bookings.filter(b => b.timeline.delivered !== null).length, color: "#5D402A" },
  ];
  return stages;
}

export function calculateBookingTypes(bookings: Booking[]) {
  const types: Record<string, number> = {};
  bookings.forEach(b => {
    types[b.eventType] = (types[b.eventType] || 0) + 1;
  });
  
  const colors: Record<string, string> = {
    "Wedding": "var(--primary)",
    "Pre-Wedding": "#ec4899",
    "Corporate": "#3b82f6",
    "Portrait": "#a855f7",
    "Maternity": "#10b981",
  };

  return Object.entries(types).map(([name, value]) => ({
    name,
    value,
    color: colors[name] || "#8b93a5"
  }));
}

export function calculateYoYData(bookings: Booking[], referenceDate: Date = new Date("2025-05-15")) {
  const currentYear = referenceDate.getFullYear();
  const lastYear = currentYear - 1;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return months.map((m, i) => {
    const thisYearVal = bookings.filter(b => {
      const d = parseISO(b.date);
      return d.getMonth() === i && d.getFullYear() === currentYear;
    }).reduce((sum, b) => sum + b.amount, 0) / 100000;

    const lastYearVal = bookings.filter(b => {
      const d = parseISO(b.date);
      return d.getMonth() === i && d.getFullYear() === lastYear;
    }).reduce((sum, b) => sum + b.amount, 0) / 100000;

    return { month: m, thisYear: thisYearVal, lastYear: lastYearVal };
  });
}
