

## AI Sidekick 生成报表 — 在主屏幕展示

### 交互设计

用户在 Sidekick 对话中询问 Q3 revenue 下降原因后，AI 回复中包含一个 **"View Report"** 按钮。点击后：

1. 主屏幕（`<main>` 区域）切换为一个 **全屏报表视图**，覆盖当前 dashboard 内容
2. Sidekick 保持打开，用户可以继续对话或关闭
3. 报表顶部有返回按钮，点击回到原 dashboard

这个模式类似现有的 drill-down 导航，但不是跳转到另一个路由，而是在当前页面上叠加一个报表 overlay。

### 报表内容（mock）

**Q3 Revenue Decline Analysis Report**，包含：
- **Executive Summary** — 一段简短总结
- **KPI 对比卡片** — Q2 vs Q3 的 Revenue、Orders、AOV、CVR
- **区域影响瀑布图** — 哪个区域贡献了多少下降（用水平条形图模拟）
- **品类变化表格** — 各品类 Q2→Q3 变化
- **关键发现** — Evidence / Assumption / Unknown 的精简版
- **数据来源** 脚注

### 技术方案

```text
SidekickContext
  ├── activeReport: ReportData | null    ← 新状态
  └── setActiveReport / clearActiveReport

AiSidekick.tsx
  └── 检测到 "report" 类型回复时，消息下方渲染 "📊 View Report" 按钮
      → 点击调用 setActiveReport(mockReportData)

DashboardLayout.tsx
  └── 当 activeReport 存在时，<main> 中渲染 <ReportOverlay /> 替代 children

新文件:
  src/components/ReportOverlay.tsx     ← 报表全屏组件
  src/lib/mockReportData.ts            ← mock 报表数据
```

### 改动清单

1. **`SidekickContext.tsx`** — 添加 `activeReport` 状态和 setter/clear 方法
2. **`src/lib/mockReportData.ts`** (新) — Q3 下降分析的 mock 数据结构
3. **`src/components/ReportOverlay.tsx`** (新) — 报表渲染组件，含 KPI 对比、区域瀑布图、品类表格、关键发现、返回按钮
4. **`DashboardLayout.tsx`** — 读取 `activeReport`，有值时显示 `<ReportOverlay />` 替代 `{children}`
5. **`AiSidekick.tsx`** — 新增 `report` 类型消息，当用户问报表相关问题时返回带 "View Report" 按钮的回复；Message 接口新增 `hasReport` 字段

