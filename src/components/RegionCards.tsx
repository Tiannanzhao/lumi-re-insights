import { regionData } from "@/lib/mockData";
import { TrendingUp } from "lucide-react";

export function RegionCards() {
  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground mb-1">Regional Performance</h3>
      <p className="text-xs text-muted-foreground mb-5">Revenue by region</p>
      <div className="space-y-3">
        {regionData.map((r) => (
          <div
            key={r.region}
            className="flex items-center justify-between rounded-lg border border-border p-4 hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{r.region}</p>
              <p className="font-mono text-lg font-semibold text-foreground mt-0.5">{r.revenue}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-xs font-medium text-success">{r.growth}</span>
              </div>
              <div className="mt-2 h-1.5 w-20 rounded-full bg-surface-2">
                <div
                  className="h-1.5 rounded-full bg-primary"
                  style={{ width: `${r.share}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{r.share}% share</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
