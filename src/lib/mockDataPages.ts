// ── Products Page ──
export const productsKpi = [
  { label: "Total SKUs", value: "1,247", change: "+32", trend: "up" as const },
  { label: "In Stock", value: "891", change: "-4.2%", trend: "down" as const },
  { label: "Low Stock", value: "184", change: "+12.6%", trend: "down" as const },
  { label: "Out of Stock", value: "172", change: "+28.3%", trend: "down" as const },
];

export const productInventory = [
  { name: "Classique Leather Tote", sku: "LUM-HB-001", category: "Handbags", stock: 342, reorderPoint: 100, revenue: "$86,200", status: "In Stock" },
  { name: "Silk Midi Dress", sku: "LUM-RW-042", category: "Ready-to-Wear", stock: 18, reorderPoint: 50, revenue: "$64,500", status: "Low Stock" },
  { name: "Monogram Belt", sku: "LUM-AC-019", category: "Accessories", stock: 581, reorderPoint: 100, revenue: "$58,100", status: "In Stock" },
  { name: "Suede Ankle Boot", sku: "LUM-FW-007", category: "Footwear", stock: 0, reorderPoint: 75, revenue: "$48,700", status: "Out of Stock" },
  { name: "Eau de Lumière 50ml", sku: "LUM-FR-003", category: "Fragrance", stock: 846, reorderPoint: 200, revenue: "$42,300", status: "In Stock" },
  { name: "Cashmere Overcoat", sku: "LUM-RW-088", category: "Ready-to-Wear", stock: 0, reorderPoint: 30, revenue: "$31,200", status: "Out of Stock" },
  { name: "Leather Card Holder", sku: "LUM-AC-055", category: "Accessories", stock: 22, reorderPoint: 80, revenue: "$27,800", status: "Low Stock" },
  { name: "Embroidered Clutch", sku: "LUM-HB-034", category: "Handbags", stock: 156, reorderPoint: 40, revenue: "$24,100", status: "In Stock" },
];

export const categoryPerformance = [
  { name: "Handbags", skus: 186, revenue: "$576K", growth: "+2.1%", trend: "up" as const },
  { name: "Ready-to-Wear", skus: 342, revenue: "$450K", growth: "-8.4%", trend: "down" as const },
  { name: "Footwear", skus: 198, revenue: "$360K", growth: "-12.1%", trend: "down" as const },
  { name: "Accessories", skus: 387, revenue: "$252K", growth: "-3.2%", trend: "down" as const },
  { name: "Fragrance", skus: 134, revenue: "$162K", growth: "+5.6%", trend: "up" as const },
];

// ── Sales Page ──
export const salesKpi = [
  { label: "Total Sales", value: "$1.8M", change: "-14.3%", trend: "down" as const },
  { label: "Orders", value: "6,210", change: "-11.7%", trend: "down" as const },
  { label: "Avg. Order Value", value: "$262", change: "-8.1%", trend: "down" as const },
  { label: "Return Rate", value: "4.8%", change: "+1.2%", trend: "down" as const },
];

export const monthlySales = [
  { month: "Jan", revenue: 820000, orders: 2850 },
  { month: "Feb", revenue: 780000, orders: 2640 },
  { month: "Mar", revenue: 910000, orders: 3100 },
  { month: "Apr", revenue: 870000, orders: 2980 },
  { month: "May", revenue: 840000, orders: 2870 },
  { month: "Jun", revenue: 790000, orders: 2650 },
  { month: "Jul", revenue: 680000, orders: 2300 },
  { month: "Aug", revenue: 620000, orders: 2080 },
  { month: "Sep", revenue: 510000, orders: 1830 },
];

export const recentOrders = [
  { id: "ORD-7291", customer: "Sophie Laurent", items: 3, total: "$1,240", date: "Sep 28", status: "Delivered" },
  { id: "ORD-7290", customer: "James Chen", items: 1, total: "$890", date: "Sep 28", status: "Shipped" },
  { id: "ORD-7289", customer: "Aisha Patel", items: 2, total: "$1,650", date: "Sep 27", status: "Processing" },
  { id: "ORD-7288", customer: "Marco Rossi", items: 4, total: "$2,180", date: "Sep 27", status: "Delivered" },
  { id: "ORD-7287", customer: "Emma Wilson", items: 1, total: "$420", date: "Sep 26", status: "Returned" },
  { id: "ORD-7286", customer: "Yuki Tanaka", items: 2, total: "$760", date: "Sep 26", status: "Delivered" },
];

export const salesByDayOfWeek = [
  { day: "Mon", sales: 42000 },
  { day: "Tue", sales: 38000 },
  { day: "Wed", sales: 35000 },
  { day: "Thu", sales: 41000 },
  { day: "Fri", sales: 56000 },
  { day: "Sat", sales: 68000 },
  { day: "Sun", sales: 52000 },
];

// ── Customers Page ──
export const customersKpi = [
  { label: "Total Customers", value: "24,812", change: "+6.3%", trend: "up" as const },
  { label: "New Customers", value: "1,847", change: "-18.2%", trend: "down" as const },
  { label: "Repeat Rate", value: "34.2%", change: "+2.1%", trend: "up" as const },
  { label: "Avg. LTV", value: "$1,420", change: "+4.8%", trend: "up" as const },
];

export const customerSegments = [
  { segment: "VIP", count: "1,240", revenue: "$892K", avgOrders: 8.2, share: 49 },
  { segment: "Regular", count: "8,560", revenue: "$612K", avgOrders: 3.1, share: 34 },
  { segment: "Occasional", count: "10,412", revenue: "$248K", avgOrders: 1.4, share: 14 },
  { segment: "At Risk", count: "4,600", revenue: "$48K", avgOrders: 0.3, share: 3 },
];

export const customerDemographics = [
  { ageGroup: "18–24", percentage: 12 },
  { ageGroup: "25–34", percentage: 31 },
  { ageGroup: "35–44", percentage: 28 },
  { ageGroup: "45–54", percentage: 18 },
  { ageGroup: "55+", percentage: 11 },
];

export const topCustomers = [
  { name: "Sophie Laurent", email: "sophie@example.com", orders: 24, totalSpent: "$18,420", lastOrder: "Sep 28", tier: "VIP" },
  { name: "James Chen", email: "james@example.com", orders: 19, totalSpent: "$14,890", lastOrder: "Sep 25", tier: "VIP" },
  { name: "Aisha Patel", email: "aisha@example.com", orders: 16, totalSpent: "$12,340", lastOrder: "Sep 22", tier: "VIP" },
  { name: "Marco Rossi", email: "marco@example.com", orders: 12, totalSpent: "$9,670", lastOrder: "Sep 20", tier: "VIP" },
  { name: "Emma Wilson", email: "emma@example.com", orders: 8, totalSpent: "$6,240", lastOrder: "Sep 18", tier: "Regular" },
  { name: "Yuki Tanaka", email: "yuki@example.com", orders: 7, totalSpent: "$5,180", lastOrder: "Sep 15", tier: "Regular" },
];

// ── Channels Page ──
export const channelsKpi = [
  { label: "Total Sessions", value: "262K", change: "-9.4%", trend: "down" as const },
  { label: "Revenue", value: "$1.76M", change: "-12.8%", trend: "down" as const },
  { label: "Blended CVR", value: "2.68%", change: "-0.56%", trend: "down" as const },
  { label: "CAC", value: "$42", change: "+18.3%", trend: "down" as const },
];

export const channelDetails = [
  { channel: "Direct", sessions: "92K", revenue: "$720K", conversion: "3.4%", bounceRate: "28%", avgSession: "4:12", trend: "stable" as const },
  { channel: "Organic Search", sessions: "68K", revenue: "$480K", conversion: "3.1%", bounceRate: "35%", avgSession: "3:45", trend: "down" as const },
  { channel: "Paid Social", sessions: "51K", revenue: "$285K", conversion: "2.2%", bounceRate: "42%", avgSession: "2:58", trend: "down" as const },
  { channel: "Email", sessions: "34K", revenue: "$210K", conversion: "4.1%", bounceRate: "22%", avgSession: "5:10", trend: "up" as const },
  { channel: "Referral", sessions: "17K", revenue: "$65K", conversion: "1.6%", bounceRate: "48%", avgSession: "2:20", trend: "down" as const },
];

export const channelTrend = [
  { month: "Jan", direct: 110000, organic: 82000, paidSocial: 64000, email: 42000, referral: 22000 },
  { month: "Feb", direct: 108000, organic: 80000, paidSocial: 61000, email: 40000, referral: 21000 },
  { month: "Mar", direct: 115000, organic: 85000, paidSocial: 68000, email: 45000, referral: 24000 },
  { month: "Apr", direct: 112000, organic: 83000, paidSocial: 65000, email: 43000, referral: 23000 },
  { month: "May", direct: 105000, organic: 78000, paidSocial: 60000, email: 39000, referral: 20000 },
  { month: "Jun", direct: 100000, organic: 75000, paidSocial: 56000, email: 37000, referral: 19000 },
  { month: "Jul", direct: 96000, organic: 71000, paidSocial: 53000, email: 35000, referral: 18000 },
  { month: "Aug", direct: 93000, organic: 69000, paidSocial: 52000, email: 34000, referral: 17000 },
  { month: "Sep", direct: 92000, organic: 68000, paidSocial: 51000, email: 34000, referral: 17000 },
];

export const campaignRoi = [
  { campaign: "Summer Sale 2025", channel: "Paid Social", spend: "$12,400", revenue: "$48,200", roi: "289%", status: "Completed" },
  { campaign: "Fall Lookbook", channel: "Email", spend: "$3,200", revenue: "$28,600", roi: "794%", status: "Active" },
  { campaign: "Brand Awareness", channel: "Paid Social", spend: "$18,600", revenue: "$32,100", roi: "73%", status: "Active" },
  { campaign: "Retargeting Q3", channel: "Paid Social", spend: "$8,900", revenue: "$22,400", roi: "152%", status: "Completed" },
  { campaign: "VIP Early Access", channel: "Email", spend: "$1,800", revenue: "$41,200", roi: "2189%", status: "Completed" },
];

// ── Performance Page ──
export const performanceKpi = [
  { label: "Revenue Target", value: "72%", change: "-18% behind", trend: "down" as const },
  { label: "Order Target", value: "78%", change: "-12% behind", trend: "down" as const },
  { label: "NPS Score", value: "67", change: "-4 pts", trend: "down" as const },
  { label: "YoY Growth", value: "-8.2%", change: "vs +12.4% LY", trend: "down" as const },
];

export const monthlyTargets = [
  { month: "Jul", actual: 680000, target: 850000 },
  { month: "Aug", actual: 620000, target: 830000 },
  { month: "Sep", actual: 510000, target: 820000 },
];

export const performanceByCategory = [
  { category: "Handbags", actual: "$576K", target: "$620K", attainment: 93, trend: "stable" as const },
  { category: "Ready-to-Wear", actual: "$450K", target: "$580K", attainment: 78, trend: "down" as const },
  { category: "Footwear", actual: "$360K", target: "$440K", attainment: 82, trend: "down" as const },
  { category: "Accessories", actual: "$252K", target: "$280K", attainment: 90, trend: "stable" as const },
  { category: "Fragrance", actual: "$162K", target: "$150K", attainment: 108, trend: "up" as const },
];

export const weeklyTrend = [
  { week: "W27", score: 82 },
  { week: "W28", score: 79 },
  { week: "W29", score: 76 },
  { week: "W30", score: 74 },
  { week: "W31", score: 71 },
  { week: "W32", score: 68 },
  { week: "W33", score: 65 },
  { week: "W34", score: 63 },
  { week: "W35", score: 60 },
  { week: "W36", score: 58 },
  { week: "W37", score: 55 },
  { week: "W38", score: 52 },
  { week: "W39", score: 50 },
];
