import { Sparkles } from "lucide-react";

export function AiSummary() {
  return (
    <div className="relative">
      {/* Gradient shadow */}
      <div
        className="absolute -inset-0.5 rounded-2xl blur-md opacity-35"
        style={{ background: "linear-gradient(135deg, #DBE7FF, #FCF45B, #C7BFFF)" }}
      />
      <div className="relative rounded-xl border border-[#7C6DF7] bg-card">

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-gradient-to-br from-[#FCF45B] via-[#4F46E5] to-[#7C6DF7] shadow-md shadow-[#4F46E5]/25">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-[#4F46E5] to-[#7C6DF7] bg-clip-text text-transparent">
            AI Summary
          </span>
          <span className="ml-auto inline-flex items-center rounded-full bg-[#4F46E5]/8 border border-[#4F46E5]/15 px-2.5 py-0.5 text-[10px] font-medium text-[#4F46E5]">
            Auto-generated
          </span>
        </div>

        {/* Summary content */}
        <p className="text-sm leading-relaxed text-foreground/85">
          Q3 performance fell significantly below Q2, with revenue declining 14.3% QoQ to $1.8M as order volume and conversion rates dropped in tandem.
          <span className="font-medium text-foreground"> Footwear</span> was hit hardest (Suede Ankle Boot out of stock),
          while the <span className="font-medium text-foreground">Middle East</span> saw the steepest regional decline (-15.1%).
          Paid Social CVR dropped to 2.2% — consider reassessing ad spend strategy.
          The sole bright spot is <span className="font-medium text-foreground">Fragrance</span>, with share rising from 7% to 9%, showing counter-trend growth potential.
        </p>
      </div>
      </div>
    </div>
  );
}
