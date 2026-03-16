export interface ReportKpi {
  label: string;
  q2: string;
  q3: string;
  change: string;
  trend: "up" | "down";
}

export interface RegionImpact {
  region: string;
  impact: number; // negative = decline
  percentage: string;
}

export interface CategoryChange {
  category: string;
  q2Revenue: string;
  q3Revenue: string;
  change: string;
  trend: "up" | "down";
}

export interface KeyFinding {
  type: "evidence" | "assumption" | "unknown";
  text: string;
}

export interface ReportData {
  title: string;
  generatedAt: string;
  executiveSummary: string;
  kpis: ReportKpi[];
  regionImpacts: RegionImpact[];
  categoryChanges: CategoryChange[];
  keyFindings: KeyFinding[];
  dataSources: string[];
}

export const q3RevenueReport: ReportData = {
  title: "Q3 Revenue Decline Analysis",
  generatedAt: "2025-10-02, 09:41 AM",
  executiveSummary:
    "Q3 2025 revenue declined 14.3% vs Q2, driven primarily by a 22% drop in the Middle East region and a significant contraction in the Electronics category. Order volume fell 8.7% while AOV decreased 6.1%, indicating both demand and basket-size headwinds. Conversion rate erosion suggests top-of-funnel or pricing friction.",
  kpis: [
    { label: "Revenue", q2: "$2.4M", q3: "$2.06M", change: "-14.3%", trend: "down" },
    { label: "Orders", q2: "18,420", q3: "16,818", change: "-8.7%", trend: "down" },
    { label: "AOV", q2: "$130.30", q3: "$122.35", change: "-6.1%", trend: "down" },
    { label: "CVR", q2: "3.8%", q3: "3.2%", change: "-0.6pp", trend: "down" },
  ],
  regionImpacts: [
    { region: "Middle East", impact: -198000, percentage: "-22.0%" },
    { region: "North America", impact: -87000, percentage: "-9.4%" },
    { region: "Europe", impact: -42000, percentage: "-5.8%" },
    { region: "Asia-Pacific", impact: -13000, percentage: "-2.1%" },
  ],
  categoryChanges: [
    { category: "Electronics", q2Revenue: "$820K", q3Revenue: "$640K", change: "-22.0%", trend: "down" },
    { category: "Apparel", q2Revenue: "$540K", q3Revenue: "$490K", change: "-9.3%", trend: "down" },
    { category: "Home & Garden", q2Revenue: "$380K", q3Revenue: "$355K", change: "-6.6%", trend: "down" },
    { category: "Beauty", q2Revenue: "$310K", q3Revenue: "$295K", change: "-4.8%", trend: "down" },
    { category: "Sports", q2Revenue: "$350K", q3Revenue: "$280K", change: "-20.0%", trend: "down" },
  ],
  keyFindings: [
    { type: "evidence", text: "Middle East region saw the steepest decline at -22%, correlating with new competitor entry in July 2025." },
    { type: "evidence", text: "Electronics category dropped 22%, with discounting on flagship SKUs compressing margins." },
    { type: "assumption", text: "Seasonal demand shift likely contributed to Apparel slowdown; historical pattern shows Q3 dip." },
    { type: "unknown", text: "Conversion rate drop origin unclear — could be pricing, UX friction, or traffic quality change." },
  ],
  dataSources: [
    "Shopify Orders API (Jul–Sep 2025)",
    "Google Analytics 4 — Traffic & Conversion",
    "Regional Sales CRM Export",
    "Internal Pricing Engine Logs",
  ],
};
