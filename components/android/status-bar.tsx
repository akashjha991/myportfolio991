"use client";

import { useEffect, useState } from "react";

interface StatusBarProps {
  theme: "dark" | "light";
  onSwipeDown?: () => void;
}

function useClock() {
  const [time, setTime] = useState("00:00");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      setTime(`${String(ist.getHours()).padStart(2, "0")}:${String(ist.getMinutes()).padStart(2, "0")}`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function BatteryIcon() {
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-label="Battery 85%">
      <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="currentColor" strokeOpacity="0.7"/>
      <rect x="2" y="2" width="15" height="8" rx="1.5" fill="currentColor" />
      <path d="M22 4v4c1-0.5 1-3.5 0-4z" fill="currentColor" fillOpacity="0.5"/>
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-label="WiFi connected">
      <path d="M8 9.5a1 1 0 100 2 1 1 0 000-2z" fill="currentColor"/>
      <path d="M5.17 7.33a4 4 0 015.66 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M2.93 5.09a7 7 0 0110.14 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.5"/>
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-label="Signal: 4 bars">
      {[0,1,2,3].map((i) => (
        <rect key={i} x={i*3.5} y={12 - (i+1)*3} width="2.5" height={(i+1)*3} rx="0.8"
          fill="currentColor" fillOpacity={i < 4 ? 1 : 0.3}/>
      ))}
    </svg>
  );
}

export function StatusBar({ theme, onSwipeDown }: StatusBarProps) {
  const time = useClock();
  const textColor = theme === "dark" ? "text-white/90" : "text-black/80";
  const iconColor = theme === "dark" ? "text-white/80" : "text-black/70";

  return (
    <div
      className={`flex items-center justify-between px-4 h-7 flex-shrink-0 relative z-20 select-none cursor-pointer ${textColor}`}
      style={{ background: "transparent" }}
      onClick={onSwipeDown}
      aria-label="Status bar — tap to open notification shade"
      role="banner"
    >
      {/* Left: Clock */}
      <span className="text-[13px] font-medium tabular-nums">{time}</span>

      {/* Right: System icons */}
      <div className={`flex items-center gap-1.5 ${iconColor}`}>
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}
