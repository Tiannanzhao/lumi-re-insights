import { DashboardLayout } from "@/components/DashboardLayout";
import { KpiCard } from "@/components/KpiCard";
import { SelectableCard } from "@/components/SelectableCard";
import { salesKpi, monthlySales, recentOrders, salesByDayOfWeek } from "@/lib/mockDataPages";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Delivered: "bg-success-light text-success",
    Shipped: "bg-brand-light text-primary",
    Processing: "bg-warning-light text-warning",
    Returned: "bg-error-light text-error",
  };
  return (
    <span className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium ${styles[status] || ""}`}>
      {status}
    </span>
  );
}

const Sales = () => {
  const kpiRefs = [
    { id: "sales-total", label: "Total Sales", type: "kpi" as const },
    { id: "sales-orders", label: "Orders", type: "kpi" as const },
    { id: "sales-aov", label: "Avg. Order Value", type: "kpi" as const },
    { id: "sales-returns", label: "Return Rate", type: "kpi" as const },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Sales</h2>
          <p className="text-sm text-muted-foreground">Revenue trends, orders and return analysis</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {salesKpi.map((kpi, i) => (
            <SelectableCard key={kpi.label} cardRef={kpiRefs[i]}>
              <KpiCard {...kpi} />
            </SelectableCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SelectableCard cardRef={{ id: "sales-trend", label: "Sales Trend", type: "chart" }} className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground">Monthly Sales</h3>
              <p className="text-xs text-muted-foreground mt-0.5 mb-6">Revenue & order volume</p>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={monthlySales}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(220 100% 64%)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="hsl(220 100% 64%)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 86%)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(240 1% 62%)" }} axisLine={{ stroke: "hsl(0 0% 86%)" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(240 1% 62%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(0 0% 86%)", fontSize: "12px" }} formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(220 100% 64%)" strokeWidth={2} fill="url(#salesGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SelectableCard>

          <SelectableCard cardRef={{ id: "sales-by-day", label: "Sales by Day", type: "chart" }}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground">Sales by Day</h3>
              <p className="text-xs text-muted-foreground mt-0.5 mb-6">Weekly distribution</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={salesByDayOfWeek}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 86%)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(240 1% 62%)" }} axisLine={{ stroke: "hsl(0 0% 86%)" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(240 1% 62%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(0 0% 86%)", fontSize: "12px" }} formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, "Sales"]} />
                  <Bar dataKey="sales" fill="hsl(220 100% 64%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SelectableCard>
        </div>

        <SelectableCard cardRef={{ id: "recent-orders", label: "Recent Orders", type: "table" }}>
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="p-6 pb-4">
              <h3 className="text-sm font-semibold text-foreground">Recent Orders</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Latest transactions</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="label-caps text-xs font-medium pl-6">Order</TableHead>
                  <TableHead className="label-caps text-xs font-medium">Customer</TableHead>
                  <TableHead className="label-caps text-xs font-medium text-right">Items</TableHead>
                  <TableHead className="label-caps text-xs font-medium text-right">Total</TableHead>
                  <TableHead className="label-caps text-xs font-medium text-right">Date</TableHead>
                  <TableHead className="label-caps text-xs font-medium text-right pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((o) => (
                  <TableRow key={o.id} className="border-border hover:bg-surface">
                    <TableCell className="font-mono text-sm font-medium pl-6">{o.id}</TableCell>
                    <TableCell className="text-sm">{o.customer}</TableCell>
                    <TableCell className="font-mono text-sm text-right text-muted-foreground">{o.items}</TableCell>
                    <TableCell className="font-mono text-sm font-medium text-right">{o.total}</TableCell>
                    <TableCell className="text-sm text-right text-muted-foreground">{o.date}</TableCell>
                    <TableCell className="text-right pr-6"><OrderStatusBadge status={o.status} /></TableCell>
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

export default Sales;
