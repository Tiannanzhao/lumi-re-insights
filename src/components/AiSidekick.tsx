import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, MousePointer2, ArrowLeft, FileText } from "lucide-react";
import { ChatHistory, ChatHistoryFullPanel } from "./ChatHistory";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidekick } from "@/contexts/SidekickContext";
import { q3RevenueReport } from "@/lib/mockReportData";
import { detectDrilldown } from "@/lib/sidekickDrilldowns";
import ReactMarkdown from "react-markdown";
import { CitationContent } from "./CitationContent";
import { SourcesSummary } from "./SourcesSummary";
import { MessageActions } from "./MessageActions";
import { SuggestedNextCheck } from "./SuggestedNextCheck";
import { ProcessingStages } from "./ProcessingStages";
import {
  overviewCardResponses,
  pageResponses,
  getGenericResponse,
  pageSuggestedQuestions,
} from "@/lib/sidekickResponses";

interface Message {
  role: "user" | "assistant";
  content: string;
  reference?: string;
  citationType?: "citation" | "normal";
  hasReport?: boolean;
}

function getContextMockResponse(cardLabel: string | null, input: string, pathname: string): string {
  // If a card is selected, use card-specific responses
  if (cardLabel && overviewCardResponses[cardLabel]) {
    const cardResponses = overviewCardResponses[cardLabel];
    for (const [key, response] of Object.entries(cardResponses)) {
      if (key !== "default" && input.toLowerCase().includes(key.toLowerCase())) {
        return response;
      }
    }
    return cardResponses.default || getGenericResponse(input);
  }

  // If on a sub-page, use page-specific responses
  const pageHandler = pageResponses[pathname];
  if (pageHandler) {
    return pageHandler(input);
  }

  return getGenericResponse(input);
}

interface AiSidekickProps {
  open: boolean;
  onClose: () => void;
}

export function AiSidekick({ open, onClose }: AiSidekickProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { selectMode, setSelectMode, selectedCard, clearSelection, showBackToAnalysis, setShowBackToAnalysis, setDashboardFilter, setActiveReport } = useSidekick();
  const topRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentQuestions = pageSuggestedQuestions[location.pathname] || pageSuggestedQuestions["/"];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const isCitationTrigger = (text: string) => {
    const lower = text.toLowerCase();
    return lower.includes("revenue") && (lower.includes("dip") || lower.includes("decline") || lower.includes("drop") || lower.includes("q3") || lower.includes("down"));
  };

  const isReportTrigger = (text: string) => {
    const lower = text.toLowerCase();
    return (lower.includes("report") || lower.includes("报表") || lower.includes("报告")) && (lower.includes("revenue") || lower.includes("q3") || lower.includes("decline") || lower.includes("下降"));
  };

  const sendMessage = (overrideText?: string) => {
    const text = (overrideText || input).trim();
    if (!text || isTyping) return;

    const ref = selectedCard?.label || null;
    const userMsg: Message = { role: "user", content: text, reference: ref || undefined };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Check for drill-down navigation triggers
    const drilldown = detectDrilldown(text);

    if (drilldown) {
      // Navigate and apply filter
      setTimeout(() => {
        setDashboardFilter(drilldown.filter);
        navigate(drilldown.navigateTo);
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: drilldown.response,
          citationType: "citation" as const,
        }]);
        setIsTyping(false);
      }, 3800 + Math.random() * 400);
      return;
    }

    const shouldCite = isCitationTrigger(text) || !!ref;
    const shouldReport = isReportTrigger(text);

    setTimeout(() => {
      const response = shouldReport
        ? "I've prepared a **Q3 Revenue Decline Analysis Report** covering KPI comparisons, regional impact breakdown, category performance, and key findings with evidence tagging.\n\nClick below to view the full report on the main screen."
        : getContextMockResponse(ref, text, location.pathname);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: response,
        citationType: shouldCite ? "citation" : "normal",
        hasReport: shouldReport,
      }]);
      setIsTyping(false);
    }, 3800 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!open) return null;

  if (showFullHistory) {
    return (
      <div className="h-full w-[420px] max-w-[90vw] bg-card border-l border-border shadow-lg flex flex-col shrink-0">
        <ChatHistoryFullPanel onBack={() => setShowFullHistory(false)} />
      </div>
    );
  }

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
        <div className="flex items-center gap-1">
          <ChatHistory onExpandFullPanel={() => setShowFullHistory(true)} />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div ref={topRef} />

        {/* Back to analysis breadcrumb */}
        {showBackToAnalysis && messages.length > 0 && (
          <button
            onClick={() => {
              topRef.current?.scrollIntoView({ behavior: "smooth" });
              setShowBackToAnalysis(false);
            }}
            className="flex items-center gap-1 text-xs text-blue-700 cursor-pointer mb-4 pb-4 border-b border-slate-200 hover:opacity-75 transition-opacity"
          >
            <ArrowLeft className="h-3 w-3" />
            ← Back to Q3 analysis
          </button>
        )}

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="relative mb-4">
              <div className="absolute -inset-1 rounded-2xl blur-md opacity-30" style={{ background: "linear-gradient(135deg, #DBE7FF, #FCF45B, #C7BFFF)" }} />
              <div className="relative flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#FCF45B] via-[#4F46E5] to-[#7C6DF7]">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Ask anything about your data</h3>
            <p className="text-xs text-muted-foreground mb-4">I'll show what I can find, flag what I'm unsure about, and suggest where to look next.</p>

            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border mb-6 max-w-[280px]">
              <MousePointer2 className="h-3.5 w-3.5 text-primary shrink-0" />
              <p className="text-[11px] text-muted-foreground text-left">
                Click <span className="font-medium text-foreground">Select Card</span> below to reference any component in your question
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 w-full max-w-[280px]">
              {currentQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left px-3 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-muted/50 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i}>
            <div className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
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
                {msg.role === "assistant" && (
                  <MessageActions content={msg.content} messageIndex={i} />
                )}
              </div>
            </div>

            {/* Show report button */}
            {msg.role === "assistant" && msg.hasReport && (
              <div className="mt-3">
                <button
                  onClick={() => setActiveReport(q3RevenueReport)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/20 bg-primary/5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  📊 View Report
                </button>
              </div>
            )}

            {/* Show citation sections after a citation-type assistant message */}
            {msg.role === "assistant" && msg.citationType === "citation" && !msg.hasReport && (
              <div className="mt-4 space-y-4">
                <CitationContent />
                <SuggestedNextCheck />
                <SourcesSummary />
              </div>
            )}
          </div>
        ))}

        {isTyping && <ProcessingStages />}
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
