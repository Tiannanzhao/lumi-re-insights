import { ArrowLeft, TrendingDown, FileText, AlertTriangle, HelpCircle, CheckCircle2 } from "lucide-react";
import { useSidekick } from "@/contexts/SidekickContext";
import type { ReportData } from "@/lib/mockReportData";

const findingIcon = {
  evidence: <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))] shrink-0 mt-0.5" />,
  assumption: <AlertTriangle className="h-4 w-4 text-[hsl(var(--warning))] shrink-0 mt-0.5" />,
  unknown: <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />,
};

const findingLabel = {
  evidence: "Evidence",
  assumption: "Assumption",
  unknown: "Unknown",
};

export function ReportOverlay() {
  const { activeReport, clearActiveReport } = useSidekick();
  if (!activeReport) return null;
  const r = activeReport as ReportData;

  const maxImpact = Math.max(...r.regionImpacts.map((ri) => Math.abs(ri.impact)));

  return (
    <div className="h-full overflow-auto bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={clearActiveReport}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 shrink-0">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">{r.title}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Generated {r.generatedAt} by AI Sidekick</p>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground mb-2">Executive Summary</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{r.executiveSummary}</p>
      </div>

      {/* KPI Comparison */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Q2 vs Q3 Comparison</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {r.kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-border bg-card p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">{kpi.label}</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-lg font-semibold text-foreground">{kpi.q3}</span>
                <span className="text-xs text-muted-foreground line-through">{kpi.q2}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-[hsl(var(--error))]" />
                <span className="text-xs font-medium text-[hsl(var(--error))]">{kpi.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Impact */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">Regional Impact (Revenue Decline)</h2>
        <div className="space-y-3">
          {r.regionImpacts.map((ri) => (
            <div key={ri.region} className="flex items-center gap-3">
              <span className="text-sm text-foreground w-28 shrink-0">{ri.region}</span>
              <div className="flex-1 h-7 bg-muted rounded-md overflow-hidden relative">
                <div
                  className="h-full rounded-md bg-[hsl(var(--error))]/20"
                  style={{ width: `${(Math.abs(ri.impact) / maxImpact) * 100}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 rounded-md bg-[hsl(var(--error))]/60"
                  style={{ width: `${(Math.abs(ri.impact) / maxImpact) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono font-medium text-[hsl(var(--error))] w-16 text-right">{ri.percentage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Changes Table */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3">Category Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-xs font-medium text-muted-foreground">Category</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground">Q2</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-muted-foreground">Q3</th>
                <th className="text-right py-2 pl-4 text-xs font-medium text-muted-foreground">Change</th>
              </tr>
            </thead>
            <tbody>
              {r.categoryChanges.map((c) => (
                <tr key={c.category} className="border-b border-border/50 last:border-0">
                  <td className="py-2.5 pr-4 text-foreground">{c.category}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-muted-foreground">{c.q2Revenue}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-foreground">{c.q3Revenue}</td>
                  <td className="py-2.5 pl-4 text-right font-mono font-medium text-[hsl(var(--error))]">{c.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Findings */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground mb-3">Key Findings</h2>
        <div className="space-y-3">
          {r.keyFindings.map((f, i) => (
            <div key={i} className="flex items-start gap-2.5">
              {findingIcon[f.type]}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{findingLabel[f.type]}</span>
                <p className="text-sm text-foreground mt-0.5">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources */}
      <div className="text-xs text-muted-foreground border-t border-border pt-4 pb-2">
        <span className="font-medium">Data Sources:</span>{" "}
        {r.dataSources.join(" · ")}
      </div>
    </div>
  );
}
