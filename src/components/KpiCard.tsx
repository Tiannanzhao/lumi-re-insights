import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export function KpiCard({ label, value, change, trend }: KpiCardProps) {
  return (
    <div className="rounded-xl border border-border p-6 bg-primary-foreground shadow-none">
      <p className="label-caps mb-2">{label}</p>
      <p className="font-mono text-2xl font-semibold text-foreground">{value}</p>
      <div className="mt-2 flex items-center gap-1.5">
        {trend === "up" ?
        <TrendingUp className="h-3.5 w-3.5 text-success" /> :

        <TrendingDown className="h-3.5 w-3.5 text-error" />
        }
        <span
          className={`text-xs font-medium ${
          trend === "up" ? "text-success" : "text-error"}`
          }>
          
          {change}
        </span>
        <span className="text-xs text-muted-foreground">vs last period</span>
      </div>
    </div>);

}