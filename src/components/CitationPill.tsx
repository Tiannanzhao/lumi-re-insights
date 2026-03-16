import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type CitationType = "internal" | "external" | "inferred" | "none";

interface SourceInfo {
  name: string;
  subtitle: string;
  updated?: string;
  accessStatus: string;
  accessColor: string;
  hasButton: boolean;
}

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
    subtitle: "Based on pattern across available data",
    accessStatus: "No direct source. This is the agent's interpretation.",
    accessColor: "text-amber-700",
    hasButton: false,
  }),
  none: () => ({
    name: "Data not available",
    subtitle: "CRM retention data was not accessible for this analysis",
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

interface CitationPillProps {
  type: CitationType;
  label: string;
  sourceOverrides?: Partial<SourceInfo>;
}

export function CitationPill({ type, label, sourceOverrides }: CitationPillProps) {
  const info = { ...sourceInfoMap[type](label), ...sourceOverrides };

  return (
    <Popover>
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
        className="w-[260px] rounded-xl border border-slate-200 bg-white shadow-md p-4 z-[100]"
        side="top"
        align="start"
        sideOffset={6}
        collisionPadding={12}
      >
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">{info.name}</p>
          <p className="text-xs text-muted-foreground">{info.subtitle}</p>
          {info.updated && (
            <p className="text-xs text-muted-foreground font-mono">{info.updated}</p>
          )}
          <div className="border-t border-slate-200 my-2" />
          <p className={cn("text-xs", info.accessColor)}>{info.accessStatus}</p>
          {info.hasButton && (
            <button className="text-xs text-blue-700 underline cursor-pointer hover:opacity-75 mt-1">
              Open source ↗
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
