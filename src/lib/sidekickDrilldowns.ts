/**
 * Drill-down detection and responses for AI Sidekick.
 * When users ask region-specific questions, we return the response
 * and signal navigation + filter actions.
 */

export interface DrilldownAction {
  navigateTo: string;
  filter: { region?: string };
  response: string;
}

/**
 * Detect if a user message should trigger a drill-down navigation.
 * Returns null if no drill-down detected.
 */
export function detectDrilldown(input: string): DrilldownAction | null {
  const lower = input.toLowerCase();

  // Middle East + customer-related questions
  const isMiddleEast = lower.includes("middle east") || lower.includes("mideast") || lower.includes("mena");
  const isCustomer = lower.includes("customer") || lower.includes("segment") || lower.includes("retention") ||
    lower.includes("vip") || lower.includes("who") || lower.includes("buyer") || lower.includes("people") ||
    lower.includes("audience") || lower.includes("user");

  if (isMiddleEast && isCustomer) {
    return {
      navigateTo: "/customers",
      filter: { region: "Middle East" },
      response: getMiddleEastCustomerResponse(),
    };
  }

  // Middle East general (default to customers)
  if (isMiddleEast && (lower.includes("what happen") || lower.includes("drill") || lower.includes("deep") ||
    lower.includes("detail") || lower.includes("why") || lower.includes("explore") || lower.includes("具体"))) {
    return {
      navigateTo: "/customers",
      filter: { region: "Middle East" },
      response: getMiddleEastCustomerResponse(),
    };
  }

  return null;
}

function getMiddleEastCustomerResponse(): string {
  return `### Middle East — Customer Segment Changes (Q3 vs Q2)

I've navigated the dashboard to **Customers** and filtered to **Middle East** so you can see the data directly.

**Overview**: Total customers down **-8.4%** to 2,070. New customer acquisition dropped **-32.1%** — the steepest decline across all regions.

| Segment | Q3 Count | Q3 Revenue | QoQ Change | Signal |
|---------|----------|------------|------------|--------|
| VIP | 148 | $124K | -6.2% | ⚠️ Spend frequency declining |
| Regular | 620 | $48K | -14.8% | ⚠️ Significant drop |
| Occasional | 890 | $18K | -22.1% | 🔴 Steep decline |
| At Risk | 412 | $7K | +38.4% | 🔴 Growing rapidly |

**Evidence — what's driving this**:
1. **VIP churn signal** — avg orders dropped from 10.4 → 9.1. Top spenders like Fatima Al-Rashid haven't purchased since August.
2. **Regular → At Risk migration** — ~180 customers shifted from Regular to At Risk this quarter. Repeat rate fell from 32.8% → 28.6%.
3. **New acquisition collapse** — 124 new customers vs 183 in Q2 (-32.1%). Likely tied to Paid Social inefficiency in the region.
4. **LTV erosion** — Avg. LTV dropped from $1,346 → $1,180 (-12.3%).

**Assumption**: The At Risk segment growth suggests a retention problem, not just an acquisition one. Customers who used to buy are stopping.

**Unknown**: We don't have competitive intel to know if these customers are churning to competitors or simply deferring purchases.

**Suggested next steps**:
- Run a VIP win-back campaign targeting the 148 VIP customers — personalized outreach before Q4
- Investigate why new acquisition dropped so sharply — is the Paid Social audience targeting specific to this region?
- Consider a regional promotion tied to local holidays in Q4

Want me to compare this with another region, or dig into a specific segment?`;
}
