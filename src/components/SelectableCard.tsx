import type { ReactNode } from "react";
import { useSidekick, type CardReference } from "@/contexts/SidekickContext";
import { cn } from "@/lib/utils";

interface SelectableCardProps {
  children: ReactNode;
  cardRef: CardReference;
  className?: string;
}

export function SelectableCard({ children, cardRef, className }: SelectableCardProps) {
  const { selectMode, selectCard, selectedCard, highlightedCardId } = useSidekick();
  const isSelected = selectedCard?.id === cardRef.id;
  const isHighlighted = highlightedCardId === cardRef.id;

  return (
    <div
      id={`selectable-card-${cardRef.id}`}
      className={cn(
        "relative transition-all duration-200",
        selectMode && "cursor-crosshair",
        selectMode && "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 rounded-xl",
        isSelected && "ring-2 ring-primary ring-offset-2 rounded-xl",
        isHighlighted && "rounded-xl animate-card-highlight",
        className
      )}
      onClick={() => {
        if (selectMode) {
          selectCard(cardRef);
        }
      }}
    >
      {children}
      {selectMode && (
        <div className="absolute inset-0 rounded-xl bg-primary/5 pointer-events-none z-10" />
      )}
      {isSelected && (
        <div className="absolute -top-2 -right-2 z-20 flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-md">
          ✓
        </div>
      )}
    </div>
  );
}
