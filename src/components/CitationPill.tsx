import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useSidekick } from "@/contexts/SidekickContext";

export type CitationType = "internal" | "external" | "inferred" | "none";

interface SourceInfo {
  name: string;
  subtitle: string;
  updated?: string;
  accessStatus: string;
  accessColor: string;
  hasButton: boolean;
}

/* ─── Internal data table rows ─── */
interface DataRow {
  region: string;
  q3: string;
  q3Prev: string;
  yoy: string;
}

const defaultInternalData: DataRow[] = [
  { region: "Asia Pacific", q3: "€31M", q3Prev: "€47M", yoy: "↓34%" },
  { region: "Europe", q3: "€38M", q3Prev: "€41M", yoy: "↓8%" },
  { region: "North America", q3: "€28M", q3Prev: "€29M", yoy: "↓5%" },
];

/* ─── Inferred reasoning steps ─── */
interface ReasoningStep {
  text: string;
  pillLabel: string;
  pillType: CitationType;
}

const defaultReasoningSteps: ReasoningStep[] = [
  { text: "Sessions dropped 18% in Jul", pillLabel: "Traffic Analytics", pillType: "external" },
  { text: "Competitor A campaign launched Jul 12", pillLabel: "Market & External", pillType: "external" },
  { text: "Bounce rate rose from 41% to 58% same period", pillLabel: "Traffic Analytics", pillType: "external" },
];

/* ─── External quote ─── */
interface ExternalQuote {
  text: string;
}

const defaultExternalQuote: ExternalQuote = {
  text: "Global personal luxury goods market contracted 3.1% in Q3, with Asia Pacific showing the steepest regional decline.",
};

const sourceInfoMap: Record<CitationType, (label: string) => SourceInfo> = {
  internal: (label) => ({
    name: label || "Internal Sales DB",
    subtitle: "Regional Revenue · Q3 2024",
    updated: "Last updated: 14 Oct 2024, 09:41 GMT",
    accessStatus: "✓ You have access",
    accessColor: "text-green-600",
    hasButton: true,
  }),
  external: (label) => ({
    name: label || "External Report",
    subtitle: "Global luxury market sizing · Q3 2024",
    updated: "Published: Sep 2024",
    accessStatus: "↗ External document",
    accessColor: "text-slate-500",
    hasButton: true,
  }),
  inferred: () => ({
    name: "AI Inference",
    subtitle: "No direct source",
    accessStatus: "No direct source. This is the agent's interpretation.",
    accessColor: "text-amber-700",
    hasButton: false,
  }),
  none: () => ({
    name: "CRM Retention Data",
    subtitle: "Not accessible",
    accessStatus: "Outside your current permission level or not held in connected sources.",
    accessColor: "text-red-600",
    hasButton: false,
  }),
};

const pillStyles: Record<CitationType, string> = {
  internal: "bg-blue-50 text-blue-700 border-blue-200",
  external: "bg-slate-100 text-slate-600 border-slate-200",
  inferred: "bg-amber-50 text-amber-700 border-amber-200",
  none: "bg-red-50 text-red-600 border-red-200",
};

const pillIcons: Record<CitationType, string> = {
  internal: "↗",
  external: "↗",
  inferred: "~",
  none: "⚠",
};

export interface CitationPillProps {
  type: CitationType;
  label: string;
  sourceOverrides?: Partial<SourceInfo>;
  internalData?: DataRow[];
  externalQuote?: ExternalQuote;
  reasoningSteps?: ReasoningStep[];
  onDispute?: () => void;
}

export function CitationPill({
  type,
  label,
  sourceOverrides,
  internalData,
  externalQuote,
  reasoningSteps,
  onDispute,
}: CitationPillProps) {
  const info = { ...sourceInfoMap[type](label), ...sourceOverrides };
  const [popOpen, setPopOpen] = useState(false);

  return (
    <Popover open={popOpen} onOpenChange={setPopOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[10px] font-medium cursor-pointer hover:opacity-75 transition-opacity align-middle ml-1 whitespace-nowrap",
            pillStyles[type]
          )}
        >
          <span>{pillIcons[type]}</span>
          <span>{label}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[280px] rounded-xl border border-slate-200 bg-white shadow-lg p-4 z-[100]"
        side="top"
        align="start"
        sideOffset={6}
        collisionPadding={12}
      >
        {type === "internal" && <InternalPopover info={info} data={internalData || defaultInternalData} />}
        {type === "external" && <ExternalPopover info={info} quote={externalQuote || defaultExternalQuote} />}
        {type === "inferred" && (
          <InferredPopover
            info={info}
            steps={reasoningSteps || defaultReasoningSteps}
            onDispute={() => {
              setPopOpen(false);
              onDispute?.();
            }}
          />
        )}
        {type === "none" && <NoDataPopover info={info} onClose={() => setPopOpen(false)} />}
      </PopoverContent>
    </Popover>
  );
}

/* ═══════════════════════════════════════════
   INTERNAL SOURCE POPOVER
   ═══════════════════════════════════════════ */
function InternalPopover({ info, data }: { info: SourceInfo; data: DataRow[] }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-900">{info.name}</p>
      <p className="text-xs text-muted-foreground">{info.subtitle}</p>
      {info.updated && <p className="text-xs text-muted-foreground font-mono">{info.updated}</p>}
      <p className={cn("text-xs", info.accessColor)}>{info.accessStatus}</p>
      <div className="border-t border-slate-200 my-2" />

      {/* Data table */}
      {data.map((row, i) => (
        <div key={i}>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">{row.region}</p>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-slate-900 font-medium">{row.q3}</span>
            <span className="text-muted-foreground">{row.q3Prev}</span>
            <span className="text-red-600 font-medium">{row.yoy}</span>
          </div>
          {i < data.length - 1 && <div className="h-2" />}
        </div>
      ))}

      <div className="border-t border-slate-200 my-2" />
      <button className="text-xs text-blue-700 underline cursor-pointer hover:opacity-75">
        Open in Overview tab ↗
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   EXTERNAL SOURCE POPOVER
   ═══════════════════════════════════════════ */
function ExternalPopover({ info, quote }: { info: SourceInfo; quote: ExternalQuote }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-900">{info.name}</p>
      <p className="text-xs text-muted-foreground">{info.subtitle}</p>
      {info.updated && <p className="text-xs text-muted-foreground font-mono">{info.updated}</p>}
      <p className={cn("text-xs", info.accessColor)}>{info.accessStatus}</p>
      <div className="border-t border-slate-200 my-2" />

      {/* Quote block */}
      <div className="border-l-2 border-slate-200 pl-2">
        <p className="text-xs text-slate-600 italic leading-relaxed">"{quote.text}"</p>
      </div>

      <div className="border-t border-slate-200 my-2" />
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-700 underline cursor-pointer hover:opacity-75"
        onClick={(e) => e.preventDefault()}
      >
        Open source ↗
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════
   INFERRED POPOVER
   ═══════════════════════════════════════════ */
function InferredPopover({
  info,
  steps,
  onDispute,
}: {
  info: SourceInfo;
  steps: ReasoningStep[];
  onDispute: () => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-amber-700">{info.name}</p>
      <p className="text-xs text-muted-foreground">{info.subtitle}</p>
      <div className="border-t border-slate-200 my-2" />

      <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Based on:</p>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="text-xs text-slate-700 leading-relaxed">
            <span>{i + 1}. {step.text}</span>
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-[9px] font-medium cursor-pointer hover:opacity-75 transition-opacity align-middle ml-1 whitespace-nowrap",
                pillStyles[step.pillType]
              )}
            >
              <span>{pillIcons[step.pillType]}</span>
              <span>{step.pillLabel}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 my-2" />
      <p className="text-xs text-amber-700 italic">"Three signals align, but no single source confirms this."</p>

      <div className="border-t border-slate-200 my-2" />
      <button
        onClick={onDispute}
        className="text-xs text-slate-600 border border-slate-300 rounded px-2 py-1 hover:bg-slate-100 transition-colors cursor-pointer"
      >
        ✗ Dispute this assumption
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NO DATA POPOVER
   ═══════════════════════════════════════════ */
function NoDataPopover({ info, onClose }: { info: SourceInfo; onClose: () => void }) {
  const handleRequestAccess = () => {
    onClose();
    toast({
      description: "Access request sent for CRM Retention Data",
    });
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-red-700">{info.name}</p>
      <p className="text-xs text-muted-foreground">{info.subtitle}</p>
      <div className="border-t border-slate-200 my-2" />

      <p className="text-xs text-slate-600 leading-relaxed">
        This dataset exists but is outside your current permission level.
      </p>
      <p className="text-xs text-slate-600 leading-relaxed">
        Without it, VIP retention analysis remains incomplete. This affects the UNKNOWN section conclusions.
      </p>

      <div className="border-t border-slate-200 my-2" />
      <button
        onClick={handleRequestAccess}
        className="w-full text-center bg-slate-900 text-white text-xs rounded px-3 py-1.5 hover:bg-slate-800 transition-colors cursor-pointer"
      >
        Request access →
      </button>
    </div>
  );
}
