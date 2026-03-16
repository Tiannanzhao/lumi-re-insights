import { Sparkles } from "lucide-react";

export function AiSummary() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-transparent bg-card">
      {/* Google AI-style gradient border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4285F4] via-[#A855F7] to-[#F472B6] opacity-20" />
      <div className="absolute inset-[1px] rounded-[11px] bg-card" />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center h-6 w-6 rounded-md bg-gradient-to-br from-[#4285F4] via-[#A855F7] to-[#F472B6]">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-[#4285F4] via-[#7C3AED] to-[#DB2777] bg-clip-text text-transparent">
            AI Summary
          </span>
          <span className="ml-auto inline-flex items-center rounded-full bg-gradient-to-r from-[#4285F4]/10 to-[#A855F7]/10 px-2 py-0.5 text-[10px] font-medium text-[#7C3AED]">
            Auto-generated
          </span>
        </div>

        {/* Summary content */}
        <p className="text-sm leading-relaxed text-foreground/90">
          Q3 整体表现显著低于 Q2，收入环比下降 14.3% 至 $1.8M，订单量和转化率同步走低。
          <span className="font-medium text-foreground"> Footwear 品类</span>受影响最大（Suede Ankle Boot 已断货），
          <span className="font-medium text-foreground">中东市场</span>跌幅最深（-15.1%）。
          Paid Social 渠道转化率降至 2.2%，建议重新评估投放策略。
          唯一亮点是 <span className="font-medium text-foreground">Fragrance 品类</span>占比从 7% 提升至 9%，显示出逆势增长潜力。
        </p>
      </div>
    </div>
  );
}
