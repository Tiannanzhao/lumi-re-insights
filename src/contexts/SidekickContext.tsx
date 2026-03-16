import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface CardReference {
  id: string;
  label: string;
  type: "kpi" | "chart" | "table" | "breakdown" | "region" | "channel" | "ai-summary";
}

interface SidekickContextValue {
  selectMode: boolean;
  setSelectMode: (v: boolean) => void;
  selectedCard: CardReference | null;
  selectCard: (card: CardReference) => void;
  clearSelection: () => void;
  sidekickOpen: boolean;
  setSidekickOpen: (v: boolean) => void;
  toggleSidekick: () => void;
}

const SidekickContext = createContext<SidekickContextValue | null>(null);

export function SidekickProvider({ children }: { children: ReactNode }) {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardReference | null>(null);
  const [sidekickOpen, setSidekickOpen] = useState(false);

  const selectCard = useCallback((card: CardReference) => {
    setSelectedCard(card);
    setSelectMode(false);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCard(null);
  }, []);

  const toggleSidekick = useCallback(() => {
    setSidekickOpen((v) => !v);
  }, []);

  return (
    <SidekickContext.Provider
      value={{
        selectMode,
        setSelectMode,
        selectedCard,
        selectCard,
        clearSelection,
        sidekickOpen,
        setSidekickOpen,
        toggleSidekick,
      }}
    >
      {children}
    </SidekickContext.Provider>
  );
}

export function useSidekick() {
  const ctx = useContext(SidekickContext);
  if (!ctx) throw new Error("useSidekick must be used within SidekickProvider");
  return ctx;
}
