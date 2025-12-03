"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { InvestmentProduct } from "@/lib/data";

interface ReturnChartProps {
  product: InvestmentProduct;
  height?: number;
}

export function ReturnChart({ product, height = 200 }: ReturnChartProps) {
  const data = product.historicalData;

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${product.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            axisLine={{ className: "stroke-border" }}
            tickLine={{ className: "stroke-border" }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            axisLine={{ className: "stroke-border" }}
            tickLine={{ className: "stroke-border" }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
            formatter={(value: number) => [`${value.toFixed(2)}%`, "수익률"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fill={`url(#gradient-${product.id})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface CompareChartProps {
  products: InvestmentProduct[];
  height?: number;
}

const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function CompareChart({ products, height = 300 }: CompareChartProps) {
  // Merge data from all products
  const mergedData = products[0]?.historicalData.map((item, index) => {
    const dataPoint: Record<string, string | number> = { month: item.month };
    products.forEach((product, pIndex) => {
      dataPoint[product.name] = product.historicalData[index]?.value || 0;
    });
    return dataPoint;
  }) || [];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mergedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
            formatter={(value: number) => [`${value.toFixed(2)}%`, ""]}
          />
          {products.map((product, index) => (
            <Line
              key={product.id}
              type="monotone"
              dataKey={product.name}
              stroke={chartColors[index % chartColors.length]}
              strokeWidth={2}
              dot={{ fill: chartColors[index % chartColors.length], r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

