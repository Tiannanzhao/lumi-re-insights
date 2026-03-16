import { CitationPill } from "./CitationPill";

export function CitationContent() {
  return (
    <div className="space-y-4">
      {/* EVIDENCE */}
      <div className="border-l-[3px] border-blue-400 bg-blue-50/60 rounded-r-lg p-3 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-700 mb-2">Evidence</p>

        <p className="text-sm text-foreground leading-relaxed">
          Asia Pacific revenue declined €16M quarter-on-quarter, falling from €47M to €31M.
          <CitationPill type="internal" label="Sales DB" />
        </p>

        <p className="text-sm text-foreground leading-relaxed">
          Leather goods as a category fell 23% globally in Q3, the steepest drop across all product lines.
          <CitationPill
            type="internal"
            label="Category Report Q3"
            sourceOverrides={{
              name: "Q3 Category Performance Report",
              subtitle: "Category-level revenue breakdown · Q3 2024",
              updated: "Last updated: 10 Oct 2024, 14:22 GMT",
            }}
          />
        </p>

        <p className="text-sm text-foreground leading-relaxed">
          Site sessions in Asia Pacific dropped 18% in July, with bounce rate rising from 41% to 58%.
          <CitationPill
            type="external"
            label="Traffic Analytics"
            sourceOverrides={{
              name: "Traffic Analytics Platform",
              subtitle: "Session & engagement metrics · Jul 2024",
              updated: "Last updated: 1 Aug 2024",
            }}
          />
        </p>
      </div>

      {/* ASSUMPTION */}
      <div className="border-l-[3px] border-amber-400 bg-amber-50/60 rounded-r-lg p-3 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-700 mb-2">Assumption</p>

        <div>
          <p className="text-sm text-foreground leading-relaxed">
            The timing of Competitor A's campaign (Jul 12 – Aug 3) likely diverted high-intent traffic during peak consideration.
            <CitationPill type="inferred" label="Inferred" />
          </p>
          <div className="flex justify-end gap-2 mt-1.5">
            <button className="text-xs border border-slate-300 text-slate-600 rounded px-2 py-0.5 hover:bg-slate-100 transition-colors">
              ✓ Confirm
            </button>
            <button className="text-xs border border-slate-300 text-slate-600 rounded px-2 py-0.5 hover:bg-slate-100 transition-colors">
              ✗ Dispute
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm text-foreground leading-relaxed">
            Stockout of Mini Crossbody from Jul 14 may have suppressed conversion for the leather goods category.
            <CitationPill type="inferred" label="Inferred" />
          </p>
          <div className="flex justify-end gap-2 mt-1.5">
            <button className="text-xs border border-slate-300 text-slate-600 rounded px-2 py-0.5 hover:bg-slate-100 transition-colors">
              ✓ Confirm
            </button>
            <button className="text-xs border border-slate-300 text-slate-600 rounded px-2 py-0.5 hover:bg-slate-100 transition-colors">
              ✗ Dispute
            </button>
          </div>
        </div>
      </div>

      {/* UNKNOWN */}
      <div className="border-l-[3px] border-slate-400 bg-slate-50/60 rounded-r-lg p-3 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 mb-2">Unknown</p>

        <p className="text-sm text-foreground leading-relaxed">
          VIP customer retention rate for Q3 is not available in connected sources.
          <CitationPill
            type="none"
            label="No data"
            sourceOverrides={{
              subtitle: "CRM retention data was not accessible for this analysis",
            }}
          />
        </p>

        <p className="text-sm text-foreground leading-relaxed">
          It is unclear whether the Q3 dip reflects a structural shift or a one-off event. Seasonal benchmark comparison is recommended.
          <CitationPill
            type="none"
            label="No data"
            sourceOverrides={{
              subtitle: "Seasonal benchmark data not connected to current analysis scope",
            }}
          />
        </p>
      </div>
    </div>
  );
}
