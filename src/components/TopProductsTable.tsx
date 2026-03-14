import { topProducts } from "@/lib/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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

export function TopProductsTable() {
  return (
    <div className="rounded-xl border border-border bg-background shadow-sm">
      <div className="p-6 pb-4">
        <h3 className="text-sm font-semibold text-foreground">Top Products</h3>
        <p className="text-xs text-muted-foreground mt-0.5">By revenue, current period</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="label-caps text-xs font-medium pl-6">Product</TableHead>
            <TableHead className="label-caps text-xs font-medium">SKU</TableHead>
            <TableHead className="label-caps text-xs font-medium text-right">Revenue</TableHead>
            <TableHead className="label-caps text-xs font-medium text-right">Units</TableHead>
            <TableHead className="label-caps text-xs font-medium text-right pr-6">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProducts.map((product) => (
            <TableRow key={product.sku} className="border-border hover:bg-surface">
              <TableCell className="font-medium text-sm pl-6">{product.name}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{product.sku}</TableCell>
              <TableCell className="font-mono text-sm font-medium text-right">{product.revenue}</TableCell>
              <TableCell className="font-mono text-sm text-right text-muted-foreground">{product.units.toLocaleString()}</TableCell>
              <TableCell className="text-right pr-6">
                <StatusBadge status={product.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
