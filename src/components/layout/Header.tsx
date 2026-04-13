"use client";

import { Search, Bell, Plus, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <header className="h-[72px] bg-card/60 dark:bg-card/40 backdrop-blur-[120px] rounded-2xl flex items-center justify-between px-8 shrink-0 shadow-sm border-none">
      {/* Left: Title + subtitle (Donezo-style) */}
      <div>
        <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
        <p className="text-[13px] text-muted-foreground">Plan, prioritize, and manage your studio bookings.</p>
      </div>

      {/* Right: Actions (Sparklink-style) */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search bookings..."
            className="h-10 w-56 pl-9 pr-10 bg-muted/50 border border-border/50 rounded-xl text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground bg-card border border-border/50 px-1.5 py-0.5 rounded font-mono">⌘F</kbd>
        </div>

        {/* Add Booking — Sparklink "+New Product" style */}
        <Button className="h-10 px-4 flex items-center gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-[14px] font-semibold shadow-sm transition-colors border-none">
          <Plus className="h-4 w-4" />
          Add Booking
        </Button>

        {/* Export (Sparklink-style "Export as") */}
        <Button variant="outline" className="h-10 px-4 flex items-center gap-2 rounded-xl text-[14px] font-medium border-border/50 bg-card/10 text-foreground hover:bg-card/20 backdrop-blur-md transition-colors">
          <Download className="h-4 w-4" />
          Export
        </Button>

        {/* Mail (Donezo-style) */}
        <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-border/50 bg-card/10 hover:bg-card/20 backdrop-blur-md transition-colors">
          <Mail className="h-[18px] w-[18px] text-foreground" strokeWidth={1.7} />
        </button>

        {/* Notification Bell */}
        <button className="h-10 w-10 relative flex items-center justify-center rounded-xl border border-border/50 bg-card/10 hover:bg-card/20 backdrop-blur-md transition-colors mr-1">
          <Bell className="h-[18px] w-[18px] text-foreground" strokeWidth={1.7} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card pulse-glow" />
        </button>

        {/* Theme Toggle replaces User Avatar */}
        <div className="flex items-center pl-3 border-l border-border/50">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
