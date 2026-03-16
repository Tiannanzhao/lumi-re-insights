import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueData } from "@/lib/mockData";

export function RevenueChart() {
  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Revenue Trend</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Last 12 months</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Revenue</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4584FF" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#4584FF" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#DCDCDC" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#9D9D9F" }}
            axisLine={{ stroke: "#DCDCDC" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9D9D9F" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v / 1000}K`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "0.75rem",
              border: "1px solid #DCDCDC",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
              fontSize: "12px",
            }}
            formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, "Revenue"]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#1E40AF"
            strokeWidth={2}
            fill="url(#blueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
