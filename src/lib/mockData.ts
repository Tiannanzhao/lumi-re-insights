export const kpiData = [
  { label: "Total Revenue", value: "$1.8M", change: "-14.3%", trend: "down" as const },
  { label: "Orders", value: "6,210", change: "-11.7%", trend: "down" as const },
  { label: "Avg. Order Value", value: "$262", change: "-8.1%", trend: "down" as const },
  { label: "Conversion Rate", value: "2.68%", change: "-0.56%", trend: "down" as const },
];

export const revenueData = [
  { month: "Jul", revenue: 680000, orders: 2300 },
  { month: "Aug", revenue: 620000, orders: 2080 },
  { month: "Sep", revenue: 510000, orders: 1830 },
];

export const categoryData = [
  { name: "Handbags", value: 32, revenue: "$576K" },
  { name: "Ready-to-Wear", value: 25, revenue: "$450K" },
  { name: "Footwear", value: 20, revenue: "$360K" },
  { name: "Accessories", value: 14, revenue: "$252K" },
  { name: "Fragrance", value: 9, revenue: "$162K" },
];

export const topProducts = [
  { name: "Classique Leather Tote", sku: "LUM-HB-001", revenue: "$86,200", units: 287, status: "In Stock" },
  { name: "Silk Midi Dress", sku: "LUM-RW-042", revenue: "$64,500", units: 215, status: "Low Stock" },
  { name: "Monogram Belt", sku: "LUM-AC-019", revenue: "$58,100", units: 581, status: "In Stock" },
  { name: "Suede Ankle Boot", sku: "LUM-FW-007", revenue: "$48,700", units: 139, status: "Out of Stock" },
  { name: "Eau de Lumière 50ml", sku: "LUM-FR-003", revenue: "$42,300", units: 846, status: "In Stock" },
  { name: "Cashmere Overcoat", sku: "LUM-RW-088", revenue: "$31,200", units: 62, status: "Out of Stock" },
];

export const channelData = [
  { channel: "Direct", sessions: "92K", revenue: "$720K", conversion: "3.4%" },
  { channel: "Organic Search", sessions: "68K", revenue: "$480K", conversion: "3.1%" },
  { channel: "Paid Social", sessions: "51K", revenue: "$285K", conversion: "2.2%" },
  { channel: "Email", sessions: "34K", revenue: "$210K", conversion: "4.1%" },
  { channel: "Referral", sessions: "17K", revenue: "$65K", conversion: "1.6%" },
];

export const regionData = [
  { region: "North America", revenue: "$685K", share: 38, growth: "-9.6%" },
  { region: "Europe", revenue: "$558K", share: 31, growth: "-12.3%" },
  { region: "Asia Pacific", revenue: "$360K", share: 20, growth: "-5.8%" },
  { region: "Middle East", revenue: "$197K", share: 11, growth: "-15.1%" },
];
