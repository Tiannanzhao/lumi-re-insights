import { DashboardLayout } from "@/components/DashboardLayout";
import { KpiCard } from "@/components/KpiCard";
import { SelectableCard } from "@/components/SelectableCard";
import { customersKpi, customerSegments, customerDemographics, topCustomers } from "@/lib/mockDataPages";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

function TierBadge({ tier }: { tier: string }) {
  const styles: Record<string, string> = {
    VIP: "bg-brand-light text-primary",
    Regular: "bg-success-light text-success",
  };
  return (
    <span className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium ${styles[tier] || "bg-surface text-muted-foreground"}`}>
      {tier}
    </span>
  );
}

const Customers = () => {
  const kpiRefs = [
    { id: "cust-total", label: "Total Customers", type: "kpi" as const },
    { id: "cust-new", label: "New Customers", type: "kpi" as const },
    { id: "cust-repeat", label: "Repeat Rate", type: "kpi" as const },
    { id: "cust-ltv", label: "Avg. LTV", type: "kpi" as const },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Customers</h2>
          <p className="text-sm text-muted-foreground">Acquisition, retention and lifetime value</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {customersKpi.map((kpi, i) => (
            <SelectableCard key={kpi.label} cardRef={kpiRefs[i]}>
              <KpiCard {...kpi} />
            </SelectableCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SelectableCard cardRef={{ id: "customer-segments", label: "Customer Segments", type: "breakdown" }} className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-1">Customer Segments</h3>
              <p className="text-xs text-muted-foreground mb-6">Revenue contribution by segment</p>
              <div className="space-y-3">
                {customerSegments.map((seg) => (
                  <div key={seg.segment} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{seg.segment}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{seg.count} customers · {seg.avgOrders} avg orders</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm font-semibold text-foreground">{seg.revenue}</p>
                      <div className="mt-2 h-1.5 w-24 rounded-full bg-surface-2">
                        <div className="h-1.5 rounded-full bg-primary" style={{ width: `${seg.share}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{seg.share}% of revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SelectableCard>

          <SelectableCard cardRef={{ id: "customer-demographics", label: "Demographics", type: "breakdown" }}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-1">Age Distribution</h3>
              <p className="text-xs text-muted-foreground mb-6">Customer demographics</p>
              <div className="space-y-4">
                {customerDemographics.map((d) => (
                  <div key={d.ageGroup}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-foreground">{d.ageGroup}</span>
                      <span className="text-xs text-muted-foreground">{d.percentage}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface-2">
                      <div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${d.percentage * 100 / 31}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SelectableCard>
        </div>

        <SelectableCard cardRef={{ id: "top-customers", label: "Top Customers", type: "table" }}>
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="p-6 pb-4">
              <h3 className="text-sm font-semibold text-foreground">Top Customers</h3>
              <p className="text-xs text-muted-foreground mt-0.5">By total spend</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="label-caps text-xs font-medium pl-6">Customer</TableHead>
                  <TableHead className="label-caps text-xs font-medium text-right">Orders</TableHead>
                  <TableHead className="label-caps text-xs font-medium text-right">Total Spent</TableHead>
                  <TableHead className="label-caps text-xs font-medium text-right">Last Order</TableHead>
                  <TableHead className="label-caps text-xs font-medium text-right pr-6">Tier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((c) => (
                  <TableRow key={c.email} className="border-border hover:bg-surface">
                    <TableCell className="pl-6">
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-right text-muted-foreground">{c.orders}</TableCell>
                    <TableCell className="font-mono text-sm font-medium text-right">{c.totalSpent}</TableCell>
                    <TableCell className="text-sm text-right text-muted-foreground">{c.lastOrder}</TableCell>
                    <TableCell className="text-right pr-6"><TierBadge tier={c.tier} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SelectableCard>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
