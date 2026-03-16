import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { KpiCard } from "@/components/KpiCard";
import { RevenueChart } from "@/components/RevenueChart";
import { CategoryBreakdown } from "@/components/CategoryBreakdown";
import { TopProductsTable } from "@/components/TopProductsTable";
import { ChannelsTable } from "@/components/ChannelsTable";
import { RegionCards } from "@/components/RegionCards";
import { DateRangePicker } from "@/components/DateRangePicker";
import { AiSummary } from "@/components/AiSummary";
import { SelectableCard } from "@/components/SelectableCard";
import { kpiData } from "@/lib/mockData";
import type { DateRange } from "react-day-picker";

const kpiCardRefs = [
  { id: "kpi-total-revenue", label: "Total Revenue", type: "kpi" as const },
  { id: "kpi-orders", label: "Orders", type: "kpi" as const },
  { id: "kpi-aov", label: "Avg. Order Value", type: "kpi" as const },
  { id: "kpi-conversion", label: "Conversion Rate", type: "kpi" as const },
];

const Index = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 6, 1),
    to: new Date(2025, 8, 30),
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Overview</h2>
            <p className="text-sm text-muted-foreground">
              Key metrics and performance insights
            </p>
          </div>
          <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, i) => (
            <SelectableCard key={kpi.label} cardRef={kpiCardRefs[i]}>
              <KpiCard {...kpi} />
            </SelectableCard>
          ))}
        </div>

        {/* AI Summary */}
        <SelectableCard cardRef={{ id: "ai-summary", label: "AI Summary", type: "ai-summary" }}>
          <AiSummary />
        </SelectableCard>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SelectableCard cardRef={{ id: "revenue-chart", label: "Revenue Trend", type: "chart" }} className="lg:col-span-2">
            <RevenueChart />
          </SelectableCard>
          <SelectableCard cardRef={{ id: "category-breakdown", label: "Category Breakdown", type: "breakdown" }}>
            <CategoryBreakdown />
          </SelectableCard>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SelectableCard cardRef={{ id: "top-products", label: "Top Products", type: "table" }} className="lg:col-span-2">
            <TopProductsTable />
          </SelectableCard>
          <SelectableCard cardRef={{ id: "regional-performance", label: "Regional Performance", type: "region" }}>
            <RegionCards />
          </SelectableCard>
        </div>

        {/* Channels */}
        <SelectableCard cardRef={{ id: "channel-performance", label: "Channel Performance", type: "channel" }}>
          <ChannelsTable />
        </SelectableCard>
      </div>
    </DashboardLayout>
  );
};

export default Index;
