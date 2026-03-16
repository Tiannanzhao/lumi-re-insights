import { DashboardLayout } from "@/components/DashboardLayout";
import { KpiCard } from "@/components/KpiCard";
import { SelectableCard } from "@/components/SelectableCard";
import { productsKpi, productInventory, categoryPerformance } from "@/lib/mockDataPages";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "In Stock": "bg-success-light text-success",
    "Low Stock": "bg-warning-light text-warning",
    "Out of Stock": "bg-error-light text-error",
  };
  return (
    <span className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium ${styles[status] || ""}`}>
      {status}
    </span>
  );
}

const Products = () => {
  const kpiRefs = [
    { id: "prod-total-skus", label: "Total SKUs", type: "kpi" as const },
    { id: "prod-in-stock", label: "In Stock", type: "kpi" as const },
    { id: "prod-low-stock", label: "Low Stock", type: "kpi" as const },
    { id: "prod-out-of-stock", label: "Out of Stock", type: "kpi" as const },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Products</h2>
          <p className="text-sm text-muted-foreground">Inventory status and product performance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productsKpi.map((kpi, i) => (
            <SelectableCard key={kpi.label} cardRef={kpiRefs[i]}>
              <KpiCard {...kpi} />
            </SelectableCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SelectableCard cardRef={{ id: "product-inventory", label: "Product Inventory", type: "table" }} className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card shadow-sm">
              <div className="p-6 pb-4">
                <h3 className="text-sm font-semibold text-foreground">Product Inventory</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Stock levels & revenue</p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="label-caps text-xs font-medium pl-6">Product</TableHead>
                    <TableHead className="label-caps text-xs font-medium">Category</TableHead>
                    <TableHead className="label-caps text-xs font-medium text-right">Stock</TableHead>
                    <TableHead className="label-caps text-xs font-medium text-right">Revenue</TableHead>
                    <TableHead className="label-caps text-xs font-medium text-right pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productInventory.map((p) => (
                    <TableRow key={p.sku} className="border-border hover:bg-surface">
                      <TableCell className="pl-6">
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="font-mono text-xs text-muted-foreground">{p.sku}</p>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.category}</TableCell>
                      <TableCell className="font-mono text-sm text-right">{p.stock.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm font-medium text-right">{p.revenue}</TableCell>
                      <TableCell className="text-right pr-6"><StatusBadge status={p.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SelectableCard>

          <SelectableCard cardRef={{ id: "category-performance", label: "Category Performance", type: "breakdown" }}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-1">Category Performance</h3>
              <p className="text-xs text-muted-foreground mb-6">Revenue & growth by category</p>
              <div className="space-y-4">
                {categoryPerformance.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{cat.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cat.skus} SKUs</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm font-semibold text-foreground">{cat.revenue}</p>
                      <div className="flex items-center gap-1 justify-end mt-1">
                        {cat.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 text-success" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-error" />
                        )}
                        <span className={`text-xs font-medium ${cat.trend === "up" ? "text-success" : "text-error"}`}>
                          {cat.growth}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SelectableCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Products;
