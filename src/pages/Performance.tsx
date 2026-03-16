import { DashboardLayout } from "@/components/DashboardLayout";
import { KpiCard } from "@/components/KpiCard";
import { SelectableCard } from "@/components/SelectableCard";
import { performanceKpi, monthlyTargets, performanceByCategory, weeklyTrend } from "@/lib/mockDataPages";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const Performance = () => {
  const kpiRefs = [
    { id: "perf-revenue-target", label: "Revenue Target", type: "kpi" as const },
    { id: "perf-order-target", label: "Order Target", type: "kpi" as const },
    { id: "perf-nps", label: "NPS Score", type: "kpi" as const },
    { id: "perf-yoy", label: "YoY Growth", type: "kpi" as const },
  ];

  const trendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-3 w-3 text-success" />;
    if (trend === "down") return <TrendingDown className="h-3 w-3 text-error" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Performance</h2>
          <p className="text-sm text-muted-foreground">Target attainment and trend analysis</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceKpi.map((kpi, i) => (
            <SelectableCard key={kpi.label} cardRef={kpiRefs[i]}>
              <KpiCard {...kpi} />
            </SelectableCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SelectableCard cardRef={{ id: "target-vs-actual", label: "Target vs Actual", type: "chart" }} className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Target vs Actual</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue performance</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground">Actual</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Target</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthlyTargets} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 86%)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(240 1% 62%)" }} axisLine={{ stroke: "hsl(0 0% 86%)" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(240 1% 62%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(0 0% 86%)", fontSize: "12px" }} formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`]} />
                  <Bar dataKey="target" fill="hsl(0 0% 86%)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="actual" fill="hsl(220 100% 64%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SelectableCard>

          <SelectableCard cardRef={{ id: "performance-score", label: "Performance Score", type: "chart" }}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground">Performance Score</h3>
              <p className="text-xs text-muted-foreground mt-0.5 mb-6">Weekly composite index</p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 86%)" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(240 1% 62%)" }} axisLine={{ stroke: "hsl(0 0% 86%)" }} tickLine={false} interval={2} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(240 1% 62%)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(0 0% 86%)", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="score" stroke="hsl(0 72% 51%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SelectableCard>
        </div>

        <SelectableCard cardRef={{ id: "category-attainment", label: "Category Attainment", type: "table" }}>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-1">Category Attainment</h3>
            <p className="text-xs text-muted-foreground mb-6">Target achievement by product category</p>
            <div className="space-y-3">
              {performanceByCategory.map((cat) => (
                <div key={cat.category} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">{cat.category}</p>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-muted-foreground">{cat.actual} / {cat.target}</span>
                        <div className="flex items-center gap-1">
                          {trendIcon(cat.trend)}
                          <span className={`font-mono text-sm font-semibold ${cat.attainment >= 100 ? "text-success" : cat.attainment >= 85 ? "text-foreground" : "text-error"}`}>
                            {cat.attainment}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface-2">
                      <div
                        className={`h-1.5 rounded-full transition-all ${cat.attainment >= 100 ? "bg-success" : cat.attainment >= 85 ? "bg-primary" : "bg-error"}`}
                        style={{ width: `${Math.min(cat.attainment, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SelectableCard>
      </div>
    </DashboardLayout>
  );
};

export default Performance;
