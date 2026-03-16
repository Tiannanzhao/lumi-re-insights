import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search, BookOpen, Quote, PenLine, Check } from "lucide-react";

interface Stage {
  label: string;
  icon: React.ReactNode;
  duration: number; // ms to stay on this stage
}

const stages: Stage[] = [
  { label: "Analysing query", icon: <Search className="h-3 w-3" />, duration: 900 },
  { label: "Retrieving sources", icon: <BookOpen className="h-3 w-3" />, duration: 1200 },
  { label: "Verifying citations", icon: <Quote className="h-3 w-3" />, duration: 800 },
  { label: "Drafting response", icon: <PenLine className="h-3 w-3" />, duration: 600 },
];

export function ProcessingStages() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (currentStage >= stages.length) return;

    const timer = setTimeout(() => {
      setCurrentStage((prev) => prev + 1);
    }, stages[currentStage].duration);

    return () => clearTimeout(timer);
  }, [currentStage]);

  return (
    <div className="flex justify-start">
      <div className="bg-muted rounded-xl rounded-bl-sm px-4 py-3 min-w-[200px]">
        <div className="space-y-1.5">
          {stages.map((stage, i) => {
            const isActive = i === currentStage;
            const isDone = i < currentStage;
            const isPending = i > currentStage;

            return (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-2 text-xs transition-all duration-300",
                  isActive && "text-primary font-medium",
                  isDone && "text-muted-foreground",
                  isPending && "text-muted-foreground/40"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center h-4 w-4 rounded-full transition-all duration-300 shrink-0",
                  isActive && "text-primary",
                  isDone && "text-emerald-600",
                  isPending && "text-muted-foreground/30"
                )}>
                  {isDone ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <span className={cn(isActive && "animate-pulse")}>{stage.icon}</span>
                  )}
                </div>
                <span>{stage.label}</span>
                {isActive && (
                  <span className="ml-auto flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
