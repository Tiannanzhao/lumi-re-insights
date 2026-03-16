import { channelData } from "@/lib/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ChannelsTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="p-6 pb-4">
        <h3 className="text-sm font-semibold text-foreground">Channel Performance</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Traffic sources & conversion</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="label-caps text-xs font-medium pl-6">Channel</TableHead>
            <TableHead className="label-caps text-xs font-medium text-right">Sessions</TableHead>
            <TableHead className="label-caps text-xs font-medium text-right">Revenue</TableHead>
            <TableHead className="label-caps text-xs font-medium text-right pr-6">CVR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {channelData.map((ch) => (
            <TableRow key={ch.channel} className="border-border hover:bg-surface">
              <TableCell className="font-medium text-sm pl-6">{ch.channel}</TableCell>
              <TableCell className="font-mono text-sm text-right text-muted-foreground">{ch.sessions}</TableCell>
              <TableCell className="font-mono text-sm font-medium text-right">{ch.revenue}</TableCell>
              <TableCell className="font-mono text-sm text-right pr-6">{ch.conversion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
