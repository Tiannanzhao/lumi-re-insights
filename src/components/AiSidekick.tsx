import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidekick } from "@/contexts/SidekickContext";
import ReactMarkdown from "react-markdown";
import { CitationContent } from "./CitationContent";
import { SourcesSummary } from "./SourcesSummary";
import { SuggestedNextCheck } from "./SuggestedNextCheck";

interface Message {
  role: "user" | "assistant";
  content: string;
  reference?: string;
  citationType?: "citation" | "normal";
}

const contextResponses: Record<string, Record<string, string>> = {
  "Total Revenue": {
    default: `### Total Revenue Deep Dive

**Current**: $1.8M (down 14.3% QoQ)

**Reasons for decline**:
1. **Footwear stockout** — Suede Ankle Boot (LUM-FW-007) out of stock, costing ~$48K in lost revenue
2. **Middle East contraction** — Region accounts for 11% of revenue but dropped -15.1%, est. loss ~$35K
3. **Paid Social ROI decline** — CVR fell from 3.1% to 2.2%, driving up acquisition costs
4. **Seasonal factors** — Q3 is traditionally slow for luxury, AOV dropped from $286 to $262

**Recommendations**:
- Urgently restock Suede Ankle Boot and Cashmere Overcoat
- Pause underperforming Paid Social campaigns, shift budget to Email (CVR 4.1%)
- Increase Fragrance category promotion (only growing category)`,
    reason: `Revenue declined 14.3% due to:

1. **Supply chain issues** (~30% impact): 2 core products out of stock
2. **Regional weakness** (~25% impact): Middle East -15.1%, Europe -12.3%
3. **Channel inefficiency** (~25% impact): Paid Social CVR dropped to 2.2%
4. **Seasonal effects** (~20% impact): Q3 luxury slowdown`,
  },
  Orders: {
    default: `### Order Volume Analysis

**Current**: 6,210 orders (down 11.7% QoQ)

**Key findings**:
- Jul 2,300 → Aug 2,080 → Sep 1,830, declining month-over-month
- Stockouts affected ~420 orders (Suede Ankle Boot + Cashmere Overcoat)
- Paid Social channel saw the steepest order decline
- Email channel share grew, but volume insufficient to offset losses

**Recommendation**: Prioritize restocking while optimizing Paid Social audience targeting`,
  },
  "Avg. Order Value": {
    default: `### Average Order Value Analysis

**Current**: $262 (down 8.1% QoQ)

**Reasons for decline**:
- High-AOV products out of stock (Suede Ankle Boot $350, Cashmere Overcoat $503)
- Accessories share increased (lower price point), dragging down overall AOV
- More frequent promotions with deeper discounts

**Recommendation**: Launch high-value product bundles to boost cross-sell rate`,
  },
  "Conversion Rate": {
    default: `### Conversion Rate Analysis

**Current**: 2.68% (down 0.56pp QoQ)

**Reasons for decline**:
- Paid Social traffic quality dropped (CVR only 2.2%)
- Key product pages showing "Out of Stock" hurting purchase intent
- Landing page bounce rate up 12%

**By channel**:
| Channel | CVR |
|---------|-----|
| Email | 4.1% ✅ |
| Direct | 3.4% |
| Organic | 3.1% |
| Paid Social | 2.2% ⚠️ |
| Referral | 1.6% ⚠️ |

**Recommendation**: Optimize Paid Social landing pages, increase Email marketing frequency`,
  },
  "Revenue Trend": {
    default: `### Revenue Trend Analysis

**Overview**: Q3 revenue in continuous decline
- Jul: $680K → Aug: $620K (-8.8%) → Sep: $510K (-17.7%)

**Why September accelerated**:
1. Two core products went out of stock simultaneously
2. Middle East promotional campaigns outpaced by competitors
3. Paid Social ad fatigue — both CTR and CVR declining

**Forecast**: Without intervention, October revenue estimated at $450-480K`,
  },
  "Category Breakdown": {
    default: `### Category Structure Analysis

| Category | Revenue | Share | Trend |
|----------|---------|-------|-------|
| Handbags | $576K | 32% | Stable |
| Ready-to-Wear | $450K | 25% | Slight decline |
| Footwear | $360K | 20% | ⚠️ Heavily impacted by stockouts |
| Accessories | $252K | 14% | Stable |
| Fragrance | $162K | 9% | ✅ Growing against trend |

**Recommendations**:
- Urgently restock Footwear — estimated +$50K/month once restored
- Increase Fragrance investment, target Q4 share of 12%`,
  },
  "Top Products": {
    default: `### Product Performance Analysis

**Top performers**:
- Classique Leather Tote: $86.2K (stable supply)
- Monogram Belt: $58.1K (high volume, 581 units)

**Needs attention** ⚠️:
- **Suede Ankle Boot**: Out of stock, contributed $48.7K last period
- **Cashmere Overcoat**: Out of stock, contributed $31.2K last period
- Silk Midi Dress: Low inventory warning

**Estimated stockout loss**: ~$80K/period, representing 4.4% of total revenue`,
  },
  "Regional Performance": {
    default: `### Regional Performance Analysis

| Region | Revenue | Share | Growth |
|--------|---------|-------|--------|
| North America | $685K | 38% | -9.6% |
| Europe | $558K | 31% | -12.3% |
| Asia Pacific | $360K | 20% | -5.8% ✅ |
| Middle East | $197K | 11% | -15.1% ⚠️ |

**Middle East deep dive**:
- Competitors increased Q3 discount intensity
- Local holiday marketing not executed in time
- Logistics delays impacting repeat purchase rate

**Asia Pacific relatively stable**: Japan & Korea Fragrance demand growing significantly`,
  },
  "Channel Performance": {
    default: `### Channel Efficiency Analysis

**Most efficient channels**:
- **Email**: CVR 4.1%, 34K sessions contributing $210K, highest ROI
- **Direct**: CVR 3.4%, 92K sessions contributing $720K

**Channels needing optimization**:
- **Paid Social**: CVR only 2.2%, 51K sessions but only $285K revenue
  - Ad creative refresh frequency insufficient
  - Audience targeting too broad
  - Recommend A/B testing new creatives, narrowing audience

- **Referral**: CVR 1.6%, need to evaluate partner quality`,
  },
  "AI Summary": {
    default: `This AI Summary was auto-generated based on full Q3 data. It covers the following dimensions:

1. **Revenue decline**: -14.3% QoQ, mainly driven by supply chain and channel efficiency
2. **Category risk**: Footwear stockout is the single biggest factor
3. **Regional variance**: Middle East saw the steepest drop, Asia Pacific relatively stable
4. **Channel insight**: Paid Social needs strategy adjustment
5. **Growth opportunity**: Fragrance category growing against the trend

To get a deeper analysis on any specific area, select the corresponding Dashboard card and ask a question.`,
  },
};

function getContextMockResponse(cardLabel: string | null, input: string): string {
  if (cardLabel && contextResponses[cardLabel]) {
    const cardResponses = contextResponses[cardLabel];
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
  if (lower.includes("revenue")) {
    return "Q3 total revenue was **$1.8M**, down 14.3% QoQ. Primarily dragged down by the Footwear category and Middle East market. Consider focusing on the Fragrance category's growth potential.";
  }
  if (lower.includes("product")) {
    return "Among top products, **Suede Ankle Boot** is out of stock, severely impacting Footwear performance. **Signature Tote** and **Cashmere Blend Scarf** remain stable — recommend increasing restock priority.";
  }
  if (lower.includes("channel")) {
    return "**Paid Social** CVR is only 2.2%, the lowest across all channels. **Organic Search** and **Email** are the best performers — recommend reallocating marketing budget.";
  }
  if (lower.includes("region")) {
    return "**Middle East** saw the steepest decline (-15.1%), while **North America** remained relatively stable. Recommend investigating Middle East decline — likely tied to increased competition and seasonal factors.";
  }
  return `Based on current Dashboard data, here are the key findings:

1. **Revenue trend**: Q3 revenue declined 14.3% QoQ, from $2.1M to $1.8M
2. **Category performance**: Footwear most impacted, Suede Ankle Boot out of stock
3. **Regional analysis**: Middle East saw the steepest drop (-15.1%), needs attention
4. **Channel efficiency**: Paid Social CVR dropped to 2.2%, ROI needs reassessment

Consider the Fragrance category's counter-trend growth (7% → 9%) as an investment opportunity.`;
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
          <div className="text-center px-6 pt-4 pb-2">
            <div className="relative mb-4 inline-block">
              <div className="absolute -inset-1 rounded-2xl blur-md opacity-30" style={{ background: "linear-gradient(135deg, #DBE7FF, #FCF45B, #C7BFFF)" }} />
              <div className="relative flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#FCF45B] via-[#4F46E5] to-[#7C6DF7]">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Ask anything about your Dashboard</h3>
            <p className="text-xs text-muted-foreground mb-4">I can help analyze revenue trends, product performance, channel efficiency, and more</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div className="max-w-[85%]">
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

        {/* Citation demo content — static mock */}
        <CitationContent />
        <SuggestedNextCheck />
        <SourcesSummary />

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

        {/* Select mode banner */}
        {selectMode && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary animate-pulse">
            <MousePointer2 className="h-3.5 w-3.5" />
            <span className="font-medium">Click any card on the Dashboard</span>
            <button
              onClick={() => setSelectMode(false)}
              className="ml-auto text-primary/70 hover:text-primary"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="rounded-xl border border-border bg-background focus-within:ring-1 focus-within:ring-primary transition-all">
          {/* Selected card chip inside input */}
          {selectedCard && (
            <div className="flex items-center px-3 pt-2.5">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-medium text-primary">
                <MousePointer2 className="h-3 w-3" />
                <span>{selectedCard.label}</span>
                <button
                  onClick={clearSelection}
                  className="ml-0.5 hover:bg-primary/20 rounded p-0.5 transition-colors"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </div>
            </div>
          )}

          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={selectedCard ? `Ask about ${selectedCard.label}...` : "Ask a question..."}
            rows={1}
            className="w-full resize-none bg-transparent px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none min-h-[40px] max-h-[120px]"
            style={{ height: "40px" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "40px";
              target.style.height = Math.min(target.scrollHeight, 120) + "px";
            }}
          />

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between px-2 pb-2">
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
                "flex items-center gap-1.5 h-7 px-2.5 rounded-lg transition-all text-[11px] font-medium",
                selectMode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <MousePointer2 className="h-3.5 w-3.5" />
              <span>Select Card</span>
            </button>

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
