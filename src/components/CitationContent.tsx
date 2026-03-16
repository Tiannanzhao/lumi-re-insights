import { useState } from "react";
import { CitationPill } from "./CitationPill";
import { cn } from "@/lib/utils";

interface DisputeState {
  [key: string]: "idle" | "input" | "reviewing";
}

export function CitationContent() {
  const [disputes, setDisputes] = useState<DisputeState>({});
  const [disputeText, setDisputeText] = useState<Record<string, string>>({});

  const handleDispute = (id: string) => {
    setDisputes((prev) => ({ ...prev, [id]: "input" }));
  };

  const handleSubmitDispute = (id: string) => {
    setDisputes((prev) => ({ ...prev, [id]: "reviewing" }));
    setDisputeText((prev) => ({ ...prev, [id]: "" }));
  };

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
            internalData={[
              { region: "Leather Goods", q3: "€18M", q3Prev: "€23M", yoy: "↓23%" },
              { region: "Ready-to-Wear", q3: "€22M", q3Prev: "€24M", yoy: "↓8%" },
              { region: "Accessories", q3: "€14M", q3Prev: "€15M", yoy: "↓5%" },
            ]}
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
            externalQuote={{
              text: "Asia Pacific web sessions fell 18% month-over-month in July 2024, with bounce rates climbing to 58% — highest in the region since Q1 2023.",
            }}
          />
        </p>
      </div>

      {/* ASSUMPTION */}
      <div className="border-l-[3px] border-amber-400 bg-amber-50/60 rounded-r-lg p-3 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-700 mb-2">Assumption</p>

        <AssumptionBlock
          id="assumption-1"
          text="The timing of Competitor A's campaign (Jul 12 – Aug 3) likely diverted high-intent traffic during peak consideration."
          disputes={disputes}
          disputeText={disputeText}
          setDisputeText={setDisputeText}
          onDispute={handleDispute}
          onSubmitDispute={handleSubmitDispute}
        />

        <AssumptionBlock
          id="assumption-2"
          text="Stockout of Mini Crossbody from Jul 14 may have suppressed conversion for the leather goods category."
          disputes={disputes}
          disputeText={disputeText}
          setDisputeText={setDisputeText}
          onDispute={handleDispute}
          onSubmitDispute={handleSubmitDispute}
        />
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

/* ─── Assumption block with dispute flow ─── */
function AssumptionBlock({
  id,
  text,
  disputes,
  disputeText,
  setDisputeText,
  onDispute,
  onSubmitDispute,
}: {
  id: string;
  text: string;
  disputes: DisputeState;
  disputeText: Record<string, string>;
  setDisputeText: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onDispute: (id: string) => void;
  onSubmitDispute: (id: string) => void;
}) {
  const state = disputes[id] || "idle";

  return (
    <div>
      <p className="text-sm text-foreground leading-relaxed">
        {text}
        <CitationPill type="inferred" label="Inferred" onDispute={() => onDispute(id)} />
      </p>

      {state === "idle" && (
        <div className="flex justify-end gap-2 mt-1.5">
          <button className="text-xs border border-slate-300 text-slate-600 rounded px-2 py-0.5 hover:bg-slate-100 transition-colors">
            ✓ Confirm
          </button>
          <button
            onClick={() => onDispute(id)}
            className="text-xs border border-slate-300 text-slate-600 rounded px-2 py-0.5 hover:bg-slate-100 transition-colors"
          >
            ✗ Dispute
          </button>
        </div>
      )}

      {state === "input" && (
        <div className="mt-2 space-y-2">
          <input
            type="text"
            placeholder="What's incorrect about this?"
            value={disputeText[id] || ""}
            onChange={(e) => setDisputeText((prev) => ({ ...prev, [id]: e.target.value }))}
            className="w-full border border-slate-300 rounded-lg text-sm p-2 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="flex justify-end">
            <button
              onClick={() => onSubmitDispute(id)}
              className="bg-slate-900 text-white text-xs rounded px-3 py-1 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {state === "reviewing" && (
        <div className={cn("mt-2 text-xs text-amber-700 italic animate-pulse")}>
          ↻ Reviewing based on your input…
        </div>
      )}
    </div>
  );
}
