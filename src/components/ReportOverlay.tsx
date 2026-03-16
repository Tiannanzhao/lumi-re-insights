import { ArrowLeft, TrendingDown, TrendingUp, FileText, AlertTriangle, HelpCircle, CheckCircle2 } from "lucide-react";
import { useSidekick } from "@/contexts/SidekickContext";
import type { ReportData } from "@/lib/mockReportData";

const findingIcon = {
  evidence: <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />,
  assumption: <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />,
  unknown: <HelpCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />,
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
    <div className="h-full overflow-auto p-6 space-y-6">
      {/* Header — matches dashboard page header style */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={clearActiveReport}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </button>
          <h2 className="text-lg font-semibold text-foreground">{r.title}</h2>
          <p className="text-sm text-muted-foreground">
            Generated {r.generatedAt} by AI Sidekick
          </p>
        </div>
      </div>

      {/* Executive Summary — same card style as KpiCard / AiSummary */}
      <div className="rounded-xl border border-border p-6 bg-primary-foreground">
        <p className="label-caps mb-2">Executive Summary</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{r.executiveSummary}</p>
      </div>

      {/* KPI Comparison — 4-col grid matching KpiCard layout */}
      <div>
        <p className="label-caps mb-3">Q2 vs Q3 Comparison</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {r.kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-border p-6 bg-primary-foreground">
              <p className="label-caps mb-2">{kpi.label}</p>
              <p className="font-mono text-2xl font-semibold text-foreground">{kpi.q3}</p>
              <div className="mt-2 flex items-center gap-1.5">
                <TrendingDown className="h-3.5 w-3.5 text-error" />
                <span className="text-xs font-medium text-error">{kpi.change}</span>
                <span className="text-xs text-muted-foreground">from {kpi.q2}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Impact — horizontal bar chart in card */}
      <div className="rounded-xl border border-border p-6 bg-primary-foreground">
        <p className="label-caps mb-4">Regional Impact</p>
        <div className="space-y-3">
          {r.regionImpacts.map((ri) => (
            <div key={ri.region} className="flex items-center gap-3">
              <span className="text-sm text-foreground w-28 shrink-0">{ri.region}</span>
              <div className="flex-1 h-6 bg-muted rounded overflow-hidden">
                <div
                  className="h-full rounded bg-error/40"
                  style={{ width: `${(Math.abs(ri.impact) / maxImpact) * 100}%` }}
                />
              </div>
              <span className="font-mono text-xs font-medium text-error w-14 text-right">{ri.percentage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Changes — table in card, matching TopProductsTable / ChannelsTable style */}
      <div className="rounded-xl border border-border p-6 bg-primary-foreground">
        <p className="label-caps mb-4">Category Performance</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 label-caps font-medium">Category</th>
                <th className="text-right py-2 px-4 label-caps font-medium">Q2 Revenue</th>
                <th className="text-right py-2 px-4 label-caps font-medium">Q3 Revenue</th>
                <th className="text-right py-2 pl-4 label-caps font-medium">Change</th>
              </tr>
            </thead>
            <tbody>
              {r.categoryChanges.map((c) => (
                <tr key={c.category} className="border-b border-border/50 last:border-0">
                  <td className="py-3 pr-4 text-foreground">{c.category}</td>
                  <td className="py-3 px-4 text-right font-mono text-muted-foreground">{c.q2Revenue}</td>
                  <td className="py-3 px-4 text-right font-mono text-foreground">{c.q3Revenue}</td>
                  <td className="py-3 pl-4 text-right">
                    <span className="font-mono text-xs font-medium text-error">{c.change}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Findings */}
      <div className="rounded-xl border border-border p-6 bg-primary-foreground">
        <p className="label-caps mb-4">Key Findings</p>
        <div className="space-y-3">
          {r.keyFindings.map((f, i) => (
            <div key={i} className="flex items-start gap-2.5">
              {findingIcon[f.type]}
              <div>
                <span className="label-caps">{findingLabel[f.type]}</span>
                <p className="text-sm text-foreground mt-0.5 leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources footer */}
      <div className="text-xs text-muted-foreground border-t border-border pt-4 pb-2">
        <span className="font-medium text-foreground">Data Sources:</span>{" "}
        {r.dataSources.join(" · ")}
      </div>
    </div>
  );
}
