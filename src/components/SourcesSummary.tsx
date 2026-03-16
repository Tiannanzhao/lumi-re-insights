import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface SourceLine {
  icon: string;
  label: string;
  dotColor: string;
  clickable: boolean;
  sublabel?: string;
  popover?: { name: string; subtitle: string; updated: string; access: string; accessColor: string };
}

const sources: SourceLine[] = [
  {
    icon: "✓",
    label: "Internal Sales DB",
    dotColor: "bg-blue-500",
    clickable: true,
    popover: {
      name: "Internal Sales DB",
      subtitle: "Regional Revenue · Q3 2024",
      updated: "Last updated: 14 Oct 2024, 09:41 GMT",
      access: "✓ You have access",
      accessColor: "text-green-600",
    },
  },
  {
    icon: "✓",
    label: "Q3 Category Performance Report",
    dotColor: "bg-blue-500",
    clickable: true,
    popover: {
      name: "Q3 Category Performance Report",
      subtitle: "Category-level revenue breakdown · Q3 2024",
      updated: "Last updated: 10 Oct 2024, 14:22 GMT",
      access: "✓ You have access",
      accessColor: "text-green-600",
    },
  },
  {
    icon: "✓",
    label: "Market Intelligence Brief — Bain Q3",
    dotColor: "bg-slate-400",
    clickable: true,
    popover: {
      name: "Bain & Company Q3 Luxury Report",
      subtitle: "Global luxury market sizing · Q3 2024",
      updated: "Published: Sep 2024",
      access: "↗ External document",
      accessColor: "text-slate-500",
    },
  },
  {
    icon: "~",
    label: "2 inferences made without direct source",
    dotColor: "bg-amber-500",
    clickable: false,
  },
  {
    icon: "✗",
    label: "CRM retention data — not accessed",
    dotColor: "bg-red-500",
    clickable: false,
    sublabel: "Outside your permission level",
  },
];

export function SourcesSummary() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-slate-200 pt-4">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full group cursor-pointer">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Sources used in this analysis
          </span>
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
              open && "rotate-90"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-2">
          {sources.map((s, i) =>
            s.clickable && s.popover ? (
              <Popover key={i}>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 text-left w-full hover:bg-muted/50 rounded px-1 py-0.5 transition-colors cursor-pointer">
                    <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", s.dotColor)} />
                    <span className="text-xs text-foreground">
                      {s.icon} {s.label}
                    </span>
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
                    <p className="text-sm font-semibold text-slate-900">{s.popover.name}</p>
                    <p className="text-xs text-muted-foreground">{s.popover.subtitle}</p>
                    <p className="text-xs text-muted-foreground font-mono">{s.popover.updated}</p>
                    <div className="border-t border-slate-200 my-2" />
                    <p className={cn("text-xs", s.popover.accessColor)}>{s.popover.access}</p>
                    <button className="text-xs text-blue-700 underline cursor-pointer hover:opacity-75 mt-1">
                      Open source ↗
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div key={i} className="px-1 py-0.5">
                <div className="flex items-center gap-2">
                  <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", s.dotColor)} />
                  <span
                    className={cn(
                      "text-xs",
                      s.dotColor === "bg-amber-500" ? "text-amber-700" : "text-red-600"
                    )}
                  >
                    {s.icon} {s.label}
                  </span>
                </div>
                {s.sublabel && (
                  <p className="text-xs text-red-600 italic ml-4 mt-0.5">{s.sublabel}</p>
                )}
              </div>
            )
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
