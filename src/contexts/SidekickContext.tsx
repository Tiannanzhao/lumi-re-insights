import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";
import type { ReportData } from "@/lib/mockReportData";

export interface CardReference {
  id: string;
  label: string;
  type: "kpi" | "chart" | "table" | "breakdown" | "region" | "channel" | "ai-summary";
}

export interface DashboardFilter {
  region?: string;
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
  highlightedCardId: string | null;
  highlightCard: (cardId: string) => void;
  showBackToAnalysis: boolean;
  setShowBackToAnalysis: (v: boolean) => void;
  analysisScrollRef: React.RefObject<HTMLDivElement | null>;
  dashboardFilter: DashboardFilter;
  setDashboardFilter: (f: DashboardFilter) => void;
  clearDashboardFilter: () => void;
  pendingNavigation: string | null;
  setPendingNavigation: (path: string | null) => void;
  activeReport: ReportData | null;
  setActiveReport: (r: ReportData) => void;
  clearActiveReport: () => void;
}

const SidekickContext = createContext<SidekickContextValue | null>(null);

export function SidekickProvider({ children }: { children: ReactNode }) {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardReference | null>(null);
  const [sidekickOpen, setSidekickOpen] = useState(false);
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null);
  const [showBackToAnalysis, setShowBackToAnalysis] = useState(false);
  const analysisScrollRef = useRef<HTMLDivElement | null>(null);
  const [dashboardFilter, setDashboardFilter] = useState<DashboardFilter>({});
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const clearDashboardFilter = useCallback(() => {
    setDashboardFilter({});
  }, []);

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

  const highlightCard = useCallback((cardId: string) => {
    setHighlightedCardId(cardId);
    setShowBackToAnalysis(true);
    setTimeout(() => {
      const el = document.getElementById(`selectable-card-${cardId}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
    setTimeout(() => {
      setHighlightedCardId(null);
    }, 2000);
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
        highlightedCardId,
        highlightCard,
        showBackToAnalysis,
        setShowBackToAnalysis,
        analysisScrollRef,
        dashboardFilter,
        setDashboardFilter,
        clearDashboardFilter,
        pendingNavigation,
        setPendingNavigation,
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
