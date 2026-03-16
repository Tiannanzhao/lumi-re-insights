import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidekick } from "@/contexts/SidekickContext";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  reference?: string; // card label attached to this message
}

// Context-aware mock responses based on selected card
const contextResponses: Record<string, Record<string, string>> = {
  "Total Revenue": {
    default: `### Total Revenue 深度分析

**当前值**: $1.8M（环比下降 14.3%）

**下降原因**：
1. **Footwear 品类断货** — Suede Ankle Boot（LUM-FW-007）断货导致该品类收入减少约 $48K
2. **中东市场萎缩** — 该区域收入占比 11%，但跌幅达 -15.1%，预估损失约 $35K
3. **Paid Social ROI 下降** — 转化率从上期 3.1% 降至 2.2%，获客成本上升
4. **季节性因素** — Q3 为奢侈品传统淡季，客单价从 $286 降至 $262

**建议措施**：
- 紧急补货 Suede Ankle Boot 和 Cashmere Overcoat
- 暂停低效 Paid Social 投放，预算转向 Email（CVR 4.1%）
- 加大 Fragrance 品类推广（唯一增长品类）`,
    原因: `Revenue 下降 14.3% 的核心原因：

1. **供应链问题**（影响约 30%）：2 款核心产品断货
2. **区域市场疲软**（影响约 25%）：中东 -15.1%，欧洲 -12.3%
3. **渠道效率下降**（影响约 25%）：Paid Social CVR 降至 2.2%
4. **季节性波动**（影响约 20%）：Q3 奢侈品淡季效应`,
  },
  Orders: {
    default: `### 订单量分析

**当前值**: 6,210 单（环比下降 11.7%）

**关键发现**：
- 7月 2,300 单 → 8月 2,080 单 → 9月 1,830 单，逐月递减
- 断货产品影响约 420 单（Suede Ankle Boot + Cashmere Overcoat）
- Paid Social 渠道贡献的订单数下降最快
- Email 渠道订单占比提升，但总量不足以弥补

**建议**：优先恢复库存，同时优化 Paid Social 受众定向`,
  },
  "Avg. Order Value": {
    default: `### 客单价分析

**当前值**: $262（环比下降 8.1%）

**下降原因**：
- 高客单价产品断货（Suede Ankle Boot $350, Cashmere Overcoat $503）
- Accessories 占比提升（单价较低），拉低整体 AOV
- 促销活动增多，折扣力度加大

**建议**：推出高单价产品组合套装，提升连带购买率`,
  },
  "Conversion Rate": {
    default: `### 转化率分析

**当前值**: 2.68%（环比下降 0.56%）

**下降原因**：
- Paid Social 流量质量下降（CVR 仅 2.2%）
- 关键产品页面显示"缺货"影响转化意愿
- 着陆页跳出率上升 12%

**按渠道分析**：
| 渠道 | CVR |
|------|-----|
| Email | 4.1% ✅ |
| Direct | 3.4% |
| Organic | 3.1% |
| Paid Social | 2.2% ⚠️ |
| Referral | 1.6% ⚠️ |

**建议**：优化 Paid Social 着陆页，增加 Email 营销频次`,
  },
  "Revenue Trend": {
    default: `### Revenue Trend 图表分析

**趋势概览**：Q3 收入呈持续下降趋势
- 7月: $680K → 8月: $620K（-8.8%）→ 9月: $510K（-17.7%）

**9月加速下滑原因**：
1. 两款核心产品同时断货
2. 中东市场大促活动被竞争对手截流
3. Paid Social 广告疲劳，CTR 和 CVR 双降

**预测**：若不采取措施，Q4 10月预计收入约 $450-480K`,
  },
  "Category Breakdown": {
    default: `### 品类结构分析

| 品类 | 收入 | 占比 | 趋势 |
|------|------|------|------|
| Handbags | $576K | 32% | 稳定 |
| Ready-to-Wear | $450K | 25% | 小幅下降 |
| Footwear | $360K | 20% | ⚠️ 受断货影响大 |
| Accessories | $252K | 14% | 稳定 |
| Fragrance | $162K | 9% | ✅ 逆势增长 |

**建议**：
- Footwear 紧急补货，预计恢复后可贡献额外 $50K/月
- Fragrance 加大投入，目标 Q4 占比提升至 12%`,
  },
  "Top Products": {
    default: `### 产品表现分析

**表现最佳**：
- Classique Leather Tote: $86.2K（稳定供应）
- Monogram Belt: $58.1K（高销量 581 件）

**需要关注** ⚠️：
- **Suede Ankle Boot**：已断货，上期贡献 $48.7K
- **Cashmere Overcoat**：已断货，上期贡献 $31.2K
- Silk Midi Dress：低库存预警

**断货损失预估**：约 $80K/期，占总收入 4.4%`,
  },
  "Regional Performance": {
    default: `### 区域表现分析

| 区域 | 收入 | 占比 | 增长 |
|------|------|------|------|
| North America | $685K | 38% | -9.6% |
| Europe | $558K | 31% | -12.3% |
| Asia Pacific | $360K | 20% | -5.8% ✅ |
| Middle East | $197K | 11% | -15.1% ⚠️ |

**中东市场深度分析**：
- 竞争对手加大了 Q3 折扣力度
- 当地节日营销未及时跟进
- 物流时效问题影响复购率

**亚太相对稳健**：日韩市场 Fragrance 需求增长显著`,
  },
  "Channel Performance": {
    default: `### 渠道效率分析

**最高效渠道**：
- **Email**：CVR 4.1%，34K sessions 贡献 $210K，ROI 最高
- **Direct**：CVR 3.4%，92K sessions 贡献 $720K

**需优化渠道**：
- **Paid Social**：CVR 仅 2.2%，51K sessions 却只贡献 $285K
  - 广告素材更新频率不足
  - 受众定向过于宽泛
  - 建议 A/B 测试新创意，缩小受众范围

- **Referral**：CVR 1.6%，需评估合作伙伴质量`,
  },
  "AI Summary": {
    default: `这段 AI Summary 是基于 Q3 全量数据自动生成的。主要涵盖了以下维度：

1. **收入下降**：环比 -14.3%，主要受供应链和渠道效率影响
2. **品类风险**：Footwear 断货是最大单一因素
3. **区域差异**：中东跌幅最大，亚太相对稳定
4. **渠道建议**：Paid Social 需要策略调整
5. **增长机会**：Fragrance 品类逆势增长

如需更详细的某个方面分析，可以选择对应的 Dashboard 卡片后再提问。`,
  },
};

function getContextMockResponse(cardLabel: string | null, input: string): string {
  if (cardLabel && contextResponses[cardLabel]) {
    const cardResponses = contextResponses[cardLabel];
    // Check for keyword match
    for (const [key, response] of Object.entries(cardResponses)) {
      if (key !== "default" && input.toLowerCase().includes(key.toLowerCase())) {
        return response;
      }
    }
    return cardResponses.default || getMockResponse(input);
  }
  return getMockResponse(input);
}

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("收入") || lower.includes("revenue")) {
    return "Q3 总收入为 **$1.8M**，环比下降 14.3%。主要受 Footwear 品类和中东市场拖累。建议关注 Fragrance 品类的增长潜力。";
  }
  if (lower.includes("产品") || lower.includes("product")) {
    return "Top 产品中，**Suede Ankle Boot** 已断货，严重影响 Footwear 品类表现。**Signature Tote** 和 **Cashmere Blend Scarf** 表现稳定，建议加大补货力度。";
  }
  if (lower.includes("渠道") || lower.includes("channel")) {
    return "**Paid Social** 转化率仅 2.2%，是所有渠道最低的。**Organic Search** 和 **Email** 渠道表现最佳，建议重新分配营销预算。";
  }
  if (lower.includes("区域") || lower.includes("region")) {
    return "**中东市场**跌幅最深（-15.1%），**北美**市场相对稳定。建议调研中东市场下滑原因，可能与竞争加剧和季节性因素有关。";
  }
  return `根据当前 Dashboard 数据，以下是关键发现：

1. **收入趋势**：Q3 收入环比下降 14.3%，从 $2.1M 降至 $1.8M
2. **品类表现**：Footwear 品类受影响最大，Suede Ankle Boot 已断货
3. **区域分析**：中东市场跌幅最深（-15.1%），需重点关注
4. **渠道效率**：Paid Social 转化率降至 2.2%，ROI 需要重新评估

建议关注 Fragrance 品类的逆势增长（7% → 9%），可考虑加大投入。`;
}

interface AiSidekickProps {
  open: boolean;
  onClose: () => void;
}

export function AiSidekick({ open, onClose }: AiSidekickProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { selectMode, setSelectMode, selectedCard, clearSelection } = useSidekick();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = (overrideText?: string) => {
    const text = (overrideText || input).trim();
    if (!text || isTyping) return;

    const ref = selectedCard?.label || null;
    const userMsg: Message = { role: "user", content: text, reference: ref || undefined };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getContextMockResponse(ref, text);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!open) return null;

  return (
    <div className="h-full w-[420px] max-w-[90vw] bg-card border-l border-border shadow-lg flex flex-col shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-gradient-to-br from-[#FCF45B] via-[#4F46E5] to-[#7C6DF7] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-[#4F46E5] to-[#7C6DF7] bg-clip-text text-transparent">
            AI Sidekick
          </span>
          <span className="inline-flex items-center rounded-full bg-[#4F46E5]/8 border border-[#4F46E5]/15 px-2 py-0.5 text-[10px] font-medium text-[#4F46E5]">
            Beta
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="relative mb-4">
              <div className="absolute -inset-1 rounded-2xl blur-md opacity-30" style={{ background: "linear-gradient(135deg, #DBE7FF, #FCF45B, #C7BFFF)" }} />
              <div className="relative flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#FCF45B] via-[#4F46E5] to-[#7C6DF7]">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">询问关于 Dashboard 的任何问题</h3>
            <p className="text-xs text-muted-foreground mb-4">我可以帮你分析收入趋势、产品表现、渠道效率等</p>

            {/* Visual select hint */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border mb-6 max-w-[280px]">
              <MousePointer2 className="h-3.5 w-3.5 text-primary shrink-0" />
              <p className="text-[11px] text-muted-foreground text-left">
                点击下方 <span className="font-medium text-foreground">选择卡片</span> 按钮，可引用 Dashboard 上的任意组件来提问
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 w-full max-w-[280px]">
              {[
                "Q3 收入表现如何？",
                "哪些产品需要关注？",
                "渠道效率怎么样？",
                "各区域表现如何？",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    const userMsg: Message = { role: "user", content: q };
                    setMessages((prev) => [...prev, userMsg]);
                    setIsTyping(true);
                    setTimeout(() => {
                      setMessages((prev) => [
                        ...prev,
                        { role: "assistant", content: getMockResponse(q) },
                      ]);
                      setIsTyping(false);
                    }, 800 + Math.random() * 600);
                  }}
                  className="text-left px-3 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-muted/50 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div className="max-w-[85%]">
              {/* Show reference chip on user messages */}
              {msg.role === "user" && msg.reference && (
                <div className="flex justify-end mb-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary">
                    <MousePointer2 className="h-2.5 w-2.5" />
                    {msg.reference}
                  </span>
                </div>
              )}
              <div
                className={cn(
                  "rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                )}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ol]:my-1 [&_ul]:my-1 [&_li]:my-0.5 [&_table]:my-2 [&_th]:px-2 [&_th]:py-1 [&_td]:px-2 [&_td]:py-1 [&_table]:text-xs text-foreground">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-border space-y-3">
        {/* Selected card reference chip */}
        {selectedCard && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
              <MousePointer2 className="h-3 w-3" />
              <span>引用: {selectedCard.label}</span>
              <button
                onClick={clearSelection}
                className="ml-1 hover:bg-primary/20 rounded p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* Select mode banner */}
        {selectMode && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary animate-pulse">
            <MousePointer2 className="h-3.5 w-3.5" />
            <span className="font-medium">请在左侧 Dashboard 中点击任意卡片</span>
            <button
              onClick={() => setSelectMode(false)}
              className="ml-auto text-primary/70 hover:text-primary"
            >
              取消
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          {/* Visual select toggle */}
          <button
            onClick={() => {
              if (selectMode) {
                setSelectMode(false);
              } else {
                clearSelection();
                setSelectMode(true);
              }
            }}
            className={cn(
              "flex items-center gap-1.5 h-10 px-3 rounded-lg border transition-all shrink-0 text-xs font-medium",
              selectMode
                ? "bg-primary text-primary-foreground border-primary"
                : selectedCard
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-primary/30"
            )}
          >
            <MousePointer2 className="h-3.5 w-3.5" />
            <span>选择卡片</span>
          </button>

          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={selectedCard ? `关于 ${selectedCard.label} 的问题...` : "输入你的问题..."}
            rows={1}
            className="flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[40px] max-h-[120px]"
            style={{ height: "40px" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "40px";
              target.style.height = Math.min(target.scrollHeight, 120) + "px";
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
