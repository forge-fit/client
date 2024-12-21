import React from "react";

interface CircularTimerProps {
  value: number;
  maxValue: number;
}

export function CircularTimer({ value, maxValue }: CircularTimerProps) {
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 45; // radius is 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-32 h-32">
        <circle
          cx="64"
          cy="64"
          r="45"
          className="stroke-white/20"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="64"
          cy="64"
          r="45"
          className="stroke-white"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>
      <span className="absolute text-4xl font-bold text-white">{value}</span>
    </div>
  );
}