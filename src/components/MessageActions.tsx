import { useState } from "react";
import { ThumbsUp, ThumbsDown, Copy, Pin, MessageSquareText, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ExportReviewDialog } from "./ExportReviewDialog";

type FeedbackState = "none" | "up" | "down";

interface MessageActionsProps {
  content: string;
  messageIndex: number;
}

export function MessageActions({ content, messageIndex }: MessageActionsProps) {
  const [feedback, setFeedback] = useState<FeedbackState>("none");
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [pinned, setPinned] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [exportDialog, setExportDialog] = useState<{ open: boolean; action: "copy" | "pin" }>({ open: false, action: "copy" });

  const handleCopy = () => {
    setExportDialog({ open: true, action: "copy" });
  };

  const handlePin = () => {
    if (pinned) {
      setPinned(false);
      toast({ title: "Unpinned", description: "Removed from saved analyses." });
      return;
    }
    setExportDialog({ open: true, action: "pin" });
  };

  const handleExportConfirm = async (editedContent: string) => {
    if (exportDialog.action === "copy") {
      await navigator.clipboard.writeText(editedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setPinned(true);
    }
  };

  const handleFeedback = (type: "up" | "down") => {
    if (feedback === type) {
      setFeedback("none");
      setShowFeedbackInput(false);
      return;
    }
    setFeedback(type);
    if (type === "down") {
      setShowFeedbackInput(true);
    } else {
      setShowFeedbackInput(false);
      setFeedbackSubmitted(false);
    }
  };

  const submitFeedback = () => {
    setFeedbackSubmitted(true);
    setShowFeedbackInput(false);
    toast({ title: "Feedback sent", description: "Thanks — this helps improve future answers." });
  };

  return (
    <div className="mt-1.5 space-y-2">
      {/* Action bar */}
      <div className="flex items-center gap-0.5">
        {/* Feedback buttons */}
        <button
          onClick={() => handleFeedback("up")}
          className={cn(
            "p-1 rounded-md transition-colors",
            feedback === "up"
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          title="Helpful"
        >
          <ThumbsUp className="h-3 w-3" />
        </button>
        <button
          onClick={() => handleFeedback("down")}
          className={cn(
            "p-1 rounded-md transition-colors",
            feedback === "down"
              ? "text-destructive bg-destructive/10"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          title="Not helpful"
        >
          <ThumbsDown className="h-3 w-3" />
        </button>

        <div className="w-px h-3 bg-border mx-1" />

        {/* Copy */}
        <button
          onClick={handleCopy}
          className={cn(
            "p-1 rounded-md transition-colors",
            copied
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          title="Copy"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </button>

        {/* Pin / Save */}
        <button
          onClick={handlePin}
          className={cn(
            "p-1 rounded-md transition-colors",
            pinned
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          title={pinned ? "Unpin" : "Pin this analysis"}
        >
          <Pin className={cn("h-3 w-3", pinned && "fill-primary")} />
        </button>

        {/* Text feedback toggle */}
        <button
          onClick={() => setShowFeedbackInput(!showFeedbackInput)}
          className={cn(
            "p-1 rounded-md transition-colors",
            showFeedbackInput
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          title="Add comment"
        >
          <MessageSquareText className="h-3 w-3" />
        </button>
      </div>

      {/* Optional text feedback */}
      {showFeedbackInput && !feedbackSubmitted && (
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2 py-1.5">
          <input
            autoFocus
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitFeedback()}
            placeholder={feedback === "down" ? "What was wrong?" : "Any comments?"}
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={submitFeedback}
            className="p-1 rounded hover:bg-muted text-primary"
          >
            <Check className="h-3 w-3" />
          </button>
          <button
            onClick={() => { setShowFeedbackInput(false); setFeedbackText(""); }}
            className="p-1 rounded hover:bg-muted text-muted-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {feedbackSubmitted && (
        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
          <Check className="h-2.5 w-2.5 text-primary" />
          Feedback recorded — thanks!
        </p>
      )}
      <ExportReviewDialog
        open={exportDialog.open}
        onOpenChange={(open) => setExportDialog((prev) => ({ ...prev, open }))}
        content={content}
        action={exportDialog.action}
        onConfirm={handleExportConfirm}
      />
    </div>
  );
}
