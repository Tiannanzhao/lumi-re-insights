import { DashboardLayout } from "@/components/DashboardLayout";
import { KpiCard } from "@/components/KpiCard";
import { SelectableCard } from "@/components/SelectableCard";
import { channelsKpi, channelDetails, channelTrend, campaignRoi } from "@/lib/mockDataPages";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

function RoiStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-success-light text-success",
    Completed: "bg-surface text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium ${styles[status] || ""}`}>
      {status}
    </span>
  );
}

const channelColors = ["hsl(220 100% 64%)", "hsl(234 56% 60%)", "hsl(47 100% 47%)", "hsl(160 60% 45%)", "hsl(0 72% 51%)"];

const Channels = () => {
  const kpiRefs = [
    { id: "ch-sessions", label: "Total Sessions", type: "kpi" as const },
    { id: "ch-revenue", label: "Revenue", type: "kpi" as const },
    { id: "ch-cvr", label: "Blended CVR", type: "kpi" as const },
    { id: "ch-cac", label: "CAC", type: "kpi" as const },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Channels</h2>
          <p className="text-sm text-muted-foreground">Traffic sources, conversion and campaign ROI</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channelsKpi.map((kpi, i) => (
            <SelectableCard key={kpi.label} cardRef={kpiRefs[i]}>
              <KpiCard {...kpi} />
            </SelectableCard>
          ))}
        </div>

        <SelectableCard cardRef={{ id: "channel-trend", label: "Channel Trend", type: "chart" }}>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Channel Traffic Trend</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Sessions by source</p>
              </div>
              <div className="flex gap-4">
                {["Direct", "Organic", "Paid Social", "Email", "Referral"].map((name, i) => (
                  <div key={name} className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: channelColors[i] }} />
                    <span className="text-xs text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={channelTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 86%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(240 1% 62%)" }} axisLine={{ stroke: "hsl(0 0% 86%)" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(240 1% 62%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(0 0% 86%)", fontSize: "12px" }} formatter={(value: number) => [`${(value / 1000).toFixed(0)}K`, ""]} />
                <Area type="monotone" dataKey="direct" stroke={channelColors[0]} strokeWidth={2} fill="transparent" />
                <Area type="monotone" dataKey="organic" stroke={channelColors[1]} strokeWidth={2} fill="transparent" />
                <Area type="monotone" dataKey="paidSocial" stroke={channelColors[2]} strokeWidth={2} fill="transparent" />
                <Area type="monotone" dataKey="email" stroke={channelColors[3]} strokeWidth={2} fill="transparent" />
                <Area type="monotone" dataKey="referral" stroke={channelColors[4]} strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SelectableCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SelectableCard cardRef={{ id: "channel-details", label: "Channel Details", type: "table" }}>
            <div className="rounded-xl border border-border bg-card shadow-sm">
              <div className="p-6 pb-4">
                <h3 className="text-sm font-semibold text-foreground">Channel Details</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Performance metrics by channel</p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="label-caps text-xs font-medium pl-6">Channel</TableHead>
                    <TableHead className="label-caps text-xs font-medium text-right">Sessions</TableHead>
                    <TableHead className="label-caps text-xs font-medium text-right">Revenue</TableHead>
                    <TableHead className="label-caps text-xs font-medium text-right">CVR</TableHead>
                    <TableHead className="label-caps text-xs font-medium text-right pr-6">Bounce</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {channelDetails.map((ch) => (
                    <TableRow key={ch.channel} className="border-border hover:bg-surface">
                      <TableCell className="font-medium text-sm pl-6">{ch.channel}</TableCell>
                      <TableCell className="font-mono text-sm text-right text-muted-foreground">{ch.sessions}</TableCell>
                      <TableCell className="font-mono text-sm font-medium text-right">{ch.revenue}</TableCell>
                      <TableCell className="font-mono text-sm text-right">{ch.conversion}</TableCell>
                      <TableCell className="font-mono text-sm text-right text-muted-foreground pr-6">{ch.bounceRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SelectableCard>

          <SelectableCard cardRef={{ id: "campaign-roi", label: "Campaign ROI", type: "table" }}>
            <div className="rounded-xl border border-border bg-card shadow-sm">
              <div className="p-6 pb-4">
                <h3 className="text-sm font-semibold text-foreground">Campaign ROI</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Return on ad spend</p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="label-caps text-xs font-medium pl-6">Campaign</TableHead>
                    <TableHead className="label-caps text-xs font-medium text-right">Spend</TableHead>
                    <TableHead className="label-caps text-xs font-medium text-right">Revenue</TableHead>
                    <TableHead className="label-caps text-xs font-medium text-right">ROI</TableHead>
                    <TableHead className="label-caps text-xs font-medium text-right pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignRoi.map((c) => (
                    <TableRow key={c.campaign} className="border-border hover:bg-surface">
                      <TableCell className="pl-6">
                        <p className="font-medium text-sm">{c.campaign}</p>
                        <p className="text-xs text-muted-foreground">{c.channel}</p>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-right text-muted-foreground">{c.spend}</TableCell>
                      <TableCell className="font-mono text-sm font-medium text-right">{c.revenue}</TableCell>
                      <TableCell className="font-mono text-sm font-medium text-right text-success">{c.roi}</TableCell>
                      <TableCell className="text-right pr-6"><RoiStatusBadge status={c.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SelectableCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Channels;
