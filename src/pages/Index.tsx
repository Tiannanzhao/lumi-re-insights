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
import { kpiData } from "@/lib/mockData";
import type { DateRange } from "react-day-picker";

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
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <CategoryBreakdown />
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <TopProductsTable />
          </div>
          <RegionCards />
        </div>

        {/* Channels */}
        <ChannelsTable />
      </div>
    </DashboardLayout>
  );
};

export default Index;
