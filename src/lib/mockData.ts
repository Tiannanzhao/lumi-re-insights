export const kpiData = [
  { label: "Total Revenue", value: "$2.4M", change: "+12.5%", trend: "up" as const },
  { label: "Orders", value: "8,421", change: "+8.2%", trend: "up" as const },
  { label: "Avg. Order Value", value: "$285", change: "-2.1%", trend: "down" as const },
  { label: "Conversion Rate", value: "3.24%", change: "+0.4%", trend: "up" as const },
];

export const revenueData = [
  { month: "Jul", revenue: 186000, orders: 620 },
  { month: "Aug", revenue: 205000, orders: 680 },
  { month: "Sep", revenue: 237000, orders: 710 },
  { month: "Oct", revenue: 198000, orders: 650 },
  { month: "Nov", revenue: 280000, orders: 890 },
  { month: "Dec", revenue: 345000, orders: 1120 },
  { month: "Jan", revenue: 220000, orders: 730 },
  { month: "Feb", revenue: 195000, orders: 640 },
  { month: "Mar", revenue: 267000, orders: 810 },
  { month: "Apr", revenue: 289000, orders: 860 },
  { month: "May", revenue: 310000, orders: 940 },
  { month: "Jun", revenue: 278000, orders: 820 },
];

export const categoryData = [
  { name: "Handbags", value: 35, revenue: "$840K" },
  { name: "Ready-to-Wear", value: 28, revenue: "$672K" },
  { name: "Footwear", value: 18, revenue: "$432K" },
  { name: "Accessories", value: 12, revenue: "$288K" },
  { name: "Fragrance", value: 7, revenue: "$168K" },
];

export const topProducts = [
  { name: "Classique Leather Tote", sku: "LUM-HB-001", revenue: "$124,500", units: 415, status: "In Stock" },
  { name: "Silk Midi Dress", sku: "LUM-RW-042", revenue: "$98,200", units: 328, status: "Low Stock" },
  { name: "Monogram Belt", sku: "LUM-AC-019", revenue: "$87,600", units: 876, status: "In Stock" },
  { name: "Suede Ankle Boot", sku: "LUM-FW-007", revenue: "$76,300", units: 218, status: "In Stock" },
  { name: "Eau de Lumière 50ml", sku: "LUM-FR-003", revenue: "$65,400", units: 1308, status: "In Stock" },
  { name: "Cashmere Overcoat", sku: "LUM-RW-088", revenue: "$54,100", units: 108, status: "Out of Stock" },
];

export const channelData = [
  { channel: "Direct", sessions: "124K", revenue: "$1.02M", conversion: "4.1%" },
  { channel: "Organic Search", sessions: "89K", revenue: "$680K", conversion: "3.8%" },
  { channel: "Paid Social", sessions: "67K", revenue: "$420K", conversion: "2.9%" },
  { channel: "Email", sessions: "45K", revenue: "$310K", conversion: "5.2%" },
  { channel: "Referral", sessions: "23K", revenue: "$98K", conversion: "2.1%" },
];

export const regionData = [
  { region: "North America", revenue: "$920K", share: 38, growth: "+14.2%" },
  { region: "Europe", revenue: "$780K", share: 32, growth: "+9.8%" },
  { region: "Asia Pacific", revenue: "$480K", share: 20, growth: "+22.1%" },
  { region: "Middle East", revenue: "$240K", share: 10, growth: "+18.5%" },
];
