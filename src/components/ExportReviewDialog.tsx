import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Copy, Pin, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ExportReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
  action: "copy" | "pin" | "share";
  onConfirm: (editedContent: string) => void;
}

export function ExportReviewDialog({
  open,
  onOpenChange,
  content,
  action,
  onConfirm,
}: ExportReviewDialogProps) {
  const [editedContent, setEditedContent] = useState(content);
  const [acknowledged, setAcknowledged] = useState(false);

  // Reset state when dialog opens
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setEditedContent(content);
      setAcknowledged(false);
    }
    onOpenChange(newOpen);
  };

  const handleConfirm = () => {
    onConfirm(editedContent);
    onOpenChange(false);
    toast({
      title: action === "copy" ? "Copied to clipboard" : "Pinned",
      description:
        action === "copy"
          ? "Reviewed content copied."
          : "Reviewed analysis saved.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[520px] gap-0 p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-sm">
                Review before {action === "copy" ? "copying" : "pinning"}
              </DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                Check for sensitive data. Edit or redact anything before
                exporting.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Editable content */}
        <div className="px-5 pb-3">
          <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/50">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                Content preview — editable
              </span>
              <span className="text-[10px] text-muted-foreground">
                {editedContent.length} chars
              </span>
            </div>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full bg-transparent text-xs text-foreground leading-relaxed p-3 focus:outline-none resize-none min-h-[160px] max-h-[320px] font-mono"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Acknowledgement */}
        <div className="px-5 pb-4">
          <label className="flex items-start gap-2 cursor-pointer group">
            <button
              type="button"
              role="checkbox"
              aria-checked={acknowledged}
              onClick={() => setAcknowledged(!acknowledged)}
              className={cn(
                "mt-0.5 h-4 w-4 rounded border shrink-0 flex items-center justify-center transition-colors",
                acknowledged
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-border bg-background group-hover:border-primary/50"
              )}
            >
              {acknowledged && (
                <svg
                  className="h-2.5 w-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
            <span className="text-[11px] text-muted-foreground leading-snug">
              I've reviewed this content and confirm it's safe to{" "}
              {action === "copy" ? "copy to clipboard" : "save as a pin"}.
            </span>
          </label>
        </div>

        {/* Sensitive data warning */}
        <div className="mx-5 mb-4 flex items-start gap-2 rounded-lg bg-amber-500/5 border border-amber-500/15 px-3 py-2">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-700 leading-snug">
            Exported content may contain business-sensitive information. Ensure
            it complies with your organisation's data sharing policies.
          </p>
        </div>

        {/* Footer */}
        <DialogFooter className="px-5 pb-5 pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={!acknowledged}
            onClick={handleConfirm}
            className="text-xs gap-1.5"
          >
            {action === "copy" ? (
              <>
                <Copy className="h-3 w-3" /> Copy
              </>
            ) : (
              <>
                <Pin className="h-3 w-3" /> Pin
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
