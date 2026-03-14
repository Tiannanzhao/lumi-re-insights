import { categoryData } from "@/lib/mockData";

export function CategoryBreakdown() {
  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground mb-1">Category Breakdown</h3>
      <p className="text-xs text-muted-foreground mb-6">Revenue share by category</p>
      <div className="space-y-4">
        {categoryData.map((cat) => (
          <div key={cat.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-foreground">{cat.name}</span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-medium text-foreground">{cat.revenue}</span>
                <span className="text-xs text-muted-foreground w-8 text-right">{cat.value}%</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-surface-2">
              <div
                className="h-1.5 rounded-full bg-primary transition-all"
                style={{ width: `${cat.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
