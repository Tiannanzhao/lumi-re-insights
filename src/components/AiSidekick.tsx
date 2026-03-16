import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const mockResponses: Record<string, string> = {
  default: `根据当前 Dashboard 数据，以下是关键发现：

1. **收入趋势**：Q3 收入环比下降 14.3%，从 $2.1M 降至 $1.8M
2. **品类表现**：Footwear 品类受影响最大，Suede Ankle Boot 已断货
3. **区域分析**：中东市场跌幅最深（-15.1%），需重点关注
4. **渠道效率**：Paid Social 转化率降至 2.2%，ROI 需要重新评估

建议关注 Fragrance 品类的逆势增长（7% → 9%），可考虑加大投入。`,
};

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
  return mockResponses.default;
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = getMockResponse(text);
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
              <p className="text-xs text-muted-foreground mb-6">我可以帮你分析收入趋势、产品表现、渠道效率等</p>
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
                      setInput(q);
                      setTimeout(() => {
                        setInput("");
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
                      }, 50);
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
              <div
                className={cn(
                  "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                )}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ol]:my-1 [&_ul]:my-1 [&_li]:my-0.5 text-foreground">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
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

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入你的问题..."
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
              onClick={sendMessage}
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
