"use client";

import { riskColors } from "@/lib/data";

interface RiskGaugeProps {
  level: 1 | 2 | 3 | 4 | 5;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function RiskGauge({ level, size = "md", showLabel = true }: RiskGaugeProps) {
  const sizes = {
    sm: { width: 120, height: 60, strokeWidth: 8 },
    md: { width: 180, height: 90, strokeWidth: 12 },
    lg: { width: 240, height: 120, strokeWidth: 16 },
  };

  const { width, height, strokeWidth } = sizes[size];
  const radius = height - strokeWidth;
  const circumference = Math.PI * radius;
  const progress = (level / 5) * circumference;

  const riskStyle = riskColors[level];

  const getGradientColors = (level: number) => {
    const colors = [
      ["#10b981", "#34d399"], // 1 - emerald
      ["#14b8a6", "#5eead4"], // 2 - teal
      ["#f59e0b", "#fbbf24"], // 3 - amber
      ["#f97316", "#fb923c"], // 4 - orange
      ["#ef4444", "#f87171"], // 5 - rose
    ];
    return colors[level - 1];
  };

  const [colorStart, colorEnd] = getGradientColors(level);

  return (
    <div className="flex flex-col items-center">
      <svg width={width} height={height + 20} className="overflow-visible">
        <defs>
          <linearGradient id={`riskGradient-${level}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>
        
        {/* Background arc */}
        <path
          d={`M ${strokeWidth / 2} ${height} A ${radius} ${radius} 0 0 1 ${width - strokeWidth / 2} ${height}`}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Progress arc */}
        <path
          d={`M ${strokeWidth / 2} ${height} A ${radius} ${radius} 0 0 1 ${width - strokeWidth / 2} ${height}`}
          fill="none"
          stroke={`url(#riskGradient-${level})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          className="transition-all duration-700 ease-out"
        />
        
        {/* Level indicators */}
        {[1, 2, 3, 4, 5].map((l) => {
          const angle = Math.PI - (Math.PI * (l - 0.5)) / 5;
          const x = width / 2 + (radius + strokeWidth + 8) * Math.cos(angle);
          const y = height - (radius + strokeWidth + 8) * Math.sin(angle);
          return (
            <text
              key={l}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`text-xs ${l === level ? "font-bold fill-foreground" : "fill-muted-foreground"}`}
            >
              {l}
            </text>
          );
        })}
        
        {/* Center text */}
        <text
          x={width / 2}
          y={height - 5}
          textAnchor="middle"
          className="text-2xl font-bold fill-foreground"
        >
          {level}등급
        </text>
      </svg>
      
      {showLabel && (
        <span className={`mt-2 text-sm font-medium ${riskStyle.text}`}>
          {riskStyle.label}
        </span>
      )}
    </div>
  );
}

interface RiskBarProps {
  level: 1 | 2 | 3 | 4 | 5;
  showLabels?: boolean;
}

export function RiskBar({ level, showLabels = true }: RiskBarProps) {
  const riskStyle = riskColors[level];
  
  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((l) => (
          <div
            key={l}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              l <= level
                ? l <= 2
                  ? "bg-emerald-500"
                  : l === 3
                  ? "bg-amber-500"
                  : "bg-rose-500"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
      {showLabels && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>매우 낮음</span>
          <span className={`font-medium ${riskStyle.text}`}>{riskStyle.label}</span>
          <span>매우 높음</span>
        </div>
      )}
    </div>
  );
}

