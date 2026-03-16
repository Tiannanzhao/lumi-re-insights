import { Sparkles } from "lucide-react";

export function AiSummary() {
  return (
    <div className="relative">
      {/* Gradient shadow */}
      <div
        className="absolute -inset-1 rounded-2xl blur-lg opacity-40"
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
          Q3 整体表现显著低于 Q2，收入环比下降 14.3% 至 $1.8M，订单量和转化率同步走低。
          <span className="font-medium text-foreground"> Footwear 品类</span>受影响最大（Suede Ankle Boot 已断货），
          <span className="font-medium text-foreground">中东市场</span>跌幅最深（-15.1%）。
          Paid Social 渠道转化率降至 2.2%，建议重新评估投放策略。
          唯一亮点是 <span className="font-medium text-foreground">Fragrance 品类</span>占比从 7% 提升至 9%，显示出逆势增长潜力。
        </p>
      </div>
      </div>
    </div>
  );
}
