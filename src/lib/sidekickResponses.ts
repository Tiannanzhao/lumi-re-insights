/**
 * AI Sidekick mock responses — tone: precise, grounded, low-ego.
 * Language: short sentences. Explicit labels. Hedging where data is incomplete.
 * Occasionally asks a clarifying question rather than assuming.
 */

// ── Overview page card responses ──────────────────────────────────────

export const overviewCardResponses: Record<string, Record<string, string>> = {
  "Total Revenue": {
    default: `### Total Revenue — Q3 snapshot

**Current**: $1.8M (down 14.3% QoQ).

**Evidence** — likely contributing factors:
1. **Footwear stockout** — Suede Ankle Boot (LUM-FW-007) out of stock. Estimated lost revenue: ~$48K.
2. **Middle East contraction** — 11% of revenue, dropped -15.1%. Estimated impact: ~$35K.
3. **Paid Social efficiency** — CVR fell from 3.1% → 2.2%. Acquisition costs likely rose.
4. **Seasonal pattern** — Q3 is historically slow for luxury. AOV dropped $286 → $262.

**Assumption**: These four factors explain most of the gap, but we don't have full attribution data.

**Worth considering**:
- Restock Suede Ankle Boot and Cashmere Overcoat as a priority
- Shift budget from Paid Social to Email (CVR 4.1%)
- Test Fragrance promotion — it's the only growing category

Do you want me to break down any of these factors further?`,
    reason: `Revenue declined 14.3%. Based on available data, the likely drivers are:

1. **Supply chain** (~30% est.): 2 core products out of stock
2. **Regional weakness** (~25% est.): Middle East -15.1%, Europe -12.3%
3. **Channel efficiency** (~25% est.): Paid Social CVR dropped to 2.2%
4. **Seasonal effects** (~20% est.): Q3 luxury slowdown

**Unknown**: We can't confirm exact attribution without a proper marketing mix model.`,
  },
  Orders: {
    default: `### Order Volume — Q3

**Current**: 6,210 orders (down 11.7% QoQ).

**Evidence**:
- Monthly trend: Jul 2,300 → Aug 2,080 → Sep 1,830. Consistent decline.
- Stockouts likely affected ~420 orders (Suede Ankle Boot + Cashmere Overcoat).
- Paid Social channel saw the steepest order drop.

**Assumption**: Email channel share grew, but volume wasn't enough to offset. We'd need campaign-level data to confirm.

**Suggested next step**: Check whether restocking alone would recover volume, or if there's a deeper demand issue.`,
  },
  "Avg. Order Value": {
    default: `### Average Order Value — Q3

**Current**: $262 (down 8.1% QoQ).

**Evidence**:
- High-AOV products unavailable (Suede Ankle Boot $350, Cashmere Overcoat $503).
- Accessories share increased — lower price point, pulling AOV down.
- Deeper discounts used more frequently this quarter.

**Unknown**: We don't have margin data, so it's unclear whether the discount strategy was net-positive on profit.

Would it help to look at AOV by channel to see where the drop is concentrated?`,
  },
  "Conversion Rate": {
    default: `### Conversion Rate — Q3

**Current**: 2.68% (down 0.56pp QoQ).

**Evidence**:
- Paid Social traffic quality appears to have dropped (CVR 2.2%).
- "Out of Stock" on key product pages likely hurts purchase intent.
- Landing page bounce rate up ~12%.

**By channel** (from available data):

| Channel | CVR |
|---------|-----|
| Email | 4.1% ✅ |
| Direct | 3.4% |
| Organic | 3.1% |
| Paid Social | 2.2% ⚠️ |
| Referral | 1.6% ⚠️ |

**Assumption**: Bounce rate increase is correlated with stockout pages, but we'd need page-level analytics to confirm.`,
  },
  "Revenue Trend": {
    default: `### Revenue Trend — Q3

Jul: $680K → Aug: $620K (-8.8%) → Sep: $510K (-17.7%).

September's acceleration likely driven by:
1. Two core products went out of stock simultaneously
2. Middle East campaigns fell behind competitors
3. Paid Social showing ad fatigue — both CTR and CVR declining

**Assumption**: Without intervention, October could land around $450–480K. This is a rough projection, not a model output.

Is there a specific month you'd like me to dig into?`,
  },
  "Category Breakdown": {
    default: `### Category Structure — Q3

| Category | Revenue | Share | Trend |
|----------|---------|-------|-------|
| Handbags | $576K | 32% | Stable |
| Ready-to-Wear | $450K | 25% | Slight decline |
| Footwear | $360K | 20% | ⚠️ Impacted by stockouts |
| Accessories | $252K | 14% | Stable |
| Fragrance | $162K | 9% | ✅ Growing against trend |

**Evidence**: Footwear decline maps directly to the Suede Ankle Boot stockout.

**Worth considering**:
- Restocking Footwear could recover an estimated ~$50K/month
- Fragrance growth might justify increased Q4 investment (target 12% share?)

**Unknown**: We don't have competitive data to know if Footwear demand shifted to competitors or simply deferred.`,
  },
  "Top Products": {
    default: `### Product Performance — Q3

**Stable performers**:
- Classique Leather Tote: $86.2K (consistent supply)
- Monogram Belt: $58.1K (581 units, high velocity)

**Needs attention** ⚠️:
- **Suede Ankle Boot**: Out of stock. Last period: $48.7K.
- **Cashmere Overcoat**: Out of stock. Last period: $31.2K.
- Silk Midi Dress: Low inventory flag.

**Estimated stockout impact**: ~$80K/period (4.4% of total revenue). This is based on prior period run rates — actual recovery may differ.`,
  },
  "Regional Performance": {
    default: `### Regional Performance — Q3

| Region | Revenue | Share | Growth |
|--------|---------|-------|--------|
| North America | $685K | 38% | -9.6% |
| Europe | $558K | 31% | -12.3% |
| Asia Pacific | $360K | 20% | -5.8% ✅ |
| Middle East | $197K | 11% | -15.1% ⚠️ |

**Evidence** (Middle East):
- Competitors increased Q3 discount intensity
- Local holiday marketing wasn't executed on time
- Logistics delays likely affecting repeat purchases

**Evidence** (Asia Pacific):
- Japan & Korea Fragrance demand growing. Relatively resilient.

**Unknown**: We don't have local competitor pricing data for a full comparison.`,
  },
  "Channel Performance": {
    default: `### Channel Efficiency — Q3

**Most efficient** (by CVR):
- **Email**: CVR 4.1%, 34K sessions → $210K. Highest ROI.
- **Direct**: CVR 3.4%, 92K sessions → $720K.

**Underperforming**:
- **Paid Social**: CVR 2.2%, 51K sessions → $285K.
  - Ad creative refresh may be insufficient.
  - Audience targeting appears too broad.
- **Referral**: CVR 1.6%. Partner quality worth evaluating.

**Assumption**: Paid Social's drop is primarily creative/targeting, not a platform algorithm change. We'd need platform-level data to rule that out.

Would you like me to compare channel ROAS if spend data is available?`,
  },
  "AI Summary": {
    default: `This summary is based on the Q3 data currently visible in the dashboard. It covers:

1. **Revenue**: Down 14.3% QoQ — supply chain and channel issues appear to be the main drivers
2. **Category risk**: Footwear stockout is likely the single largest factor
3. **Regional variance**: Middle East steepest drop; Asia Pacific relatively stable
4. **Channel insight**: Paid Social efficiency needs review
5. **Growth signal**: Fragrance growing against the trend

**Scope note**: This analysis is limited to the data shown here. CRM, margin, and competitive data would strengthen these conclusions.

Select a specific card to go deeper on any area.`,
  },
};

// ── Page-specific general responses ──────────────────────────────────

export const pageResponses: Record<string, (input: string) => string> = {
  "/products": (input) => {
    const lower = input.toLowerCase();
    if (lower.includes("stock") || lower.includes("inventory")) {
      return `Based on the inventory table, 2 SKUs are currently out of stock: **Suede Ankle Boot** and **Cashmere Overcoat**. 3 more are flagged as low stock.

**Evidence**: These 2 items generated ~$80K last period. The revenue loss is likely ongoing until restocked.

**Unknown**: We don't have supplier lead-time data here, so I can't estimate restock dates. Worth checking with procurement.`;
    }
    if (lower.includes("best") || lower.includes("top") || lower.includes("perform")) {
      return `**Top by revenue**: Classique Leather Tote ($86.2K), followed by Monogram Belt ($58.1K).

**Top by volume**: Monogram Belt leads with 581 units — likely a high-velocity, lower-AOV item.

**Assumption**: "Best performing" here means revenue. If you're optimizing for margin, we'd need cost data to rank differently. Which metric matters most to you?`;
    }
    return `Here's what stands out on the Products page:

- **2 SKUs out of stock**, estimated ~$80K/period impact
- **3 SKUs at low stock** — potential future risk
- Top performer (Classique Leather Tote) is stable at $86.2K

**Suggested next check**: Verify restock ETAs with procurement. The revenue impact compounds each week.

Anything specific you'd like to dig into — inventory risk, category mix, or individual SKUs?`;
  },

  "/sales": (input) => {
    const lower = input.toLowerCase();
    if (lower.includes("trend") || lower.includes("decline")) {
      return `Sales trend shows a consistent Q3 decline: Jul → Aug → Sep, each month lower than the last.

**Evidence**: September was the weakest at ~$510K. The drop accelerated mid-quarter.

**Assumption**: This correlates with the stockout timeline, but we can't rule out demand-side factors without traffic data.

Would you like me to cross-reference this with channel performance?`;
    }
    if (lower.includes("order") || lower.includes("aov")) {
      return `**AOV**: $262 (down 8.1% QoQ). **Orders**: 6,210 (down 11.7%).

Both metrics declining together suggests this isn't just a mix-shift — there may be a volume problem on top of the AOV compression.

**Unknown**: We don't have return rate data here, so net revenue could differ from gross.`;
    }
    return `Sales page summary:

- **Revenue**: $1.8M, down 14.3% QoQ
- **Orders**: 6,210, down 11.7%
- **AOV**: $262, down 8.1%

All three KPIs are declining. The combination of fewer orders *and* lower AOV suggests pressure from multiple directions — not just one root cause.

**Suggested next check**: Look at the order-level data to see if discount depth increased. That could explain both the AOV drop and order quality.`;
  },

  "/customers": (input) => {
    const lower = input.toLowerCase();
    if (lower.includes("vip") || lower.includes("loyal") || lower.includes("retention")) {
      return `**Assumption**: VIP customers (top 10% by LTV) likely account for a disproportionate share of revenue. But we don't have purchase frequency data loaded here to confirm retention trends.

**Suggested next check**: Compare VIP purchase frequency Q3 vs Q2. If VIP repeat rate dropped, that's a leading indicator worth acting on.

Do you have CRM access? That would give us the full retention picture.`;
    }
    if (lower.includes("segment") || lower.includes("acqui")) {
      return `From the available segments:

- New customers appear to be declining — likely tied to Paid Social efficiency drop
- Returning customer share may be stable, but without cohort data we can't confirm

**Unknown**: Acquisition cost by segment isn't available here. That's an important gap for understanding true customer economics.`;
    }
    return `Customers page — here's what I can see:

- Segment breakdown is visible, but **cohort-level retention data isn't loaded**
- Geographic distribution shows concentration in North America (38%)

**Honest assessment**: This page would benefit from CRM integration. Without purchase frequency and churn data, customer analysis is limited to demographics.

What's most important to you here — acquisition, retention, or lifetime value?`;
  },

  "/channels": (input) => {
    const lower = input.toLowerCase();
    if (lower.includes("paid") || lower.includes("social")) {
      return `**Paid Social** is the most concerning channel right now.

**Evidence**: CVR at 2.2% (lowest of all channels), 51K sessions → $285K revenue.

**Likely causes** (based on pattern, not confirmed):
- Creative fatigue — same assets running too long
- Audience targeting too broad — diluting quality traffic

**Unknown**: We don't have platform-level data (CPM trends, frequency caps) to pinpoint the exact issue.

**Suggested next check**: Pull the last 30 days of ad-level performance from the ad platform. Look for CTR decay as a signal of creative fatigue.`;
    }
    if (lower.includes("email")) {
      return `**Email** is your highest-efficiency channel. CVR 4.1%, significantly above average.

**Evidence**: 34K sessions contributing $210K. Small volume, but strong conversion.

**Consideration**: Increasing email frequency could help, but there's a risk of list fatigue. Worth A/B testing frequency before scaling.

**Unknown**: We don't have deliverability or unsubscribe rate data here.`;
    }
    return `Channel overview:

| Channel | CVR | Signal |
|---------|-----|--------|
| Email | 4.1% | ✅ Best efficiency |
| Direct | 3.4% | Stable |
| Organic | 3.1% | Stable |
| Paid Social | 2.2% | ⚠️ Needs review |
| Referral | 1.6% | ⚠️ Low quality |

**Key tension**: Paid Social drives volume but converts poorly. Email converts well but is low volume.

**Suggested next check**: Calculate blended ROAS per channel if spend data is available. CVR alone doesn't tell the full cost story.

Which channel are you most concerned about?`;
  },

  "/performance": (input) => {
    const lower = input.toLowerCase();
    if (lower.includes("target") || lower.includes("goal") || lower.includes("attain")) {
      return `Based on the targets visible here:

**Evidence**: Most KPIs are below Q3 targets. Revenue at ~86% of target, orders at ~88%.

**Context**: These targets may have been set before the stockout issues emerged. If so, the gap is partly structural, not just execution.

**Assumption**: Targets appear to be set quarterly without mid-quarter revision. A mid-quarter reset process could help teams focus on recoverable gaps.

Should I compare actual vs target by category to find where the biggest gaps are?`;
    }
    if (lower.includes("week") || lower.includes("score")) {
      return `Weekly performance scores show a downward trajectory through Q3.

**Evidence**: Early July scores were above benchmark. By late September, scores dropped below threshold.

**Assumption**: This tracks with the stockout timeline — performance likely degraded as inventory ran out.

**Unknown**: The scoring methodology isn't documented here, so I can't confirm what's weighted most heavily.`;
    }
    return `Performance page summary:

- Most Q3 targets were **not met**. Revenue and orders both fell short.
- Weekly scores show a **declining trend** through the quarter.
- YoY comparison appears unfavorable, but Q3 last year may have had different conditions.

**Honest note**: Performance metrics are only as useful as the targets they're measured against. If targets weren't adjusted for the stockout, the gap overstates the execution problem.

What would be most helpful — target gap analysis, trend breakdown, or YoY comparison?`;
  },
};

// ── Generic fallback responses (non-card, non-page) ──────────────────

export function getGenericResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("revenue")) {
    return "Q3 total revenue was **$1.8M**, down 14.3% QoQ. The Footwear category and Middle East market appear to be the main drags. Fragrance is the one bright spot — worth exploring.\n\nWant me to break down the drivers in more detail?";
  }
  if (lower.includes("product")) {
    return "**Suede Ankle Boot** is out of stock — that's likely the single biggest product-level issue. Classique Leather Tote and Monogram Belt remain stable.\n\n**Suggested next check**: Confirm restock timeline with procurement. Each week of stockout costs an estimated ~$12K.";
  }
  if (lower.includes("channel")) {
    return "**Paid Social** CVR is at 2.2% — lowest across channels. **Email** (4.1%) and **Organic** (3.1%) are significantly more efficient.\n\n**Assumption**: Reallocating some Paid Social budget to Email could improve blended ROAS, but we'd need spend data to model the tradeoff properly.";
  }
  if (lower.includes("region")) {
    return "**Middle East** saw the steepest decline (-15.1%). **Asia Pacific** was relatively stable (-5.8%), partly driven by Fragrance demand in Japan & Korea.\n\n**Unknown**: We don't have local competitive data, so the Middle East decline could be market-wide or brand-specific.";
  }
  return `Based on the data currently loaded, here are the key signals:

1. **Revenue**: $1.8M, down 14.3% QoQ
2. **Biggest risk**: Footwear stockout (est. ~$80K/period impact)
3. **Regional concern**: Middle East -15.1%, steepest drop
4. **Channel issue**: Paid Social CVR at 2.2%, needs review
5. **Growth signal**: Fragrance category growing against the trend

**Scope note**: This is based on dashboard data only. CRM and margin data would add important context.

What area would you like to explore first?`;
}

// ── Suggested questions per page ─────────────────────────────────────

export const pageSuggestedQuestions: Record<string, string[]> = {
  "/": [
    "Why did revenue dip in Q3?",
    "Which products need attention?",
    "How efficient are the channels?",
    "How are regions performing?",
  ],
  "/products": [
    "Which SKUs are at inventory risk?",
    "What's the revenue impact of stockouts?",
    "Which products are top performers?",
    "How does category mix look?",
  ],
  "/sales": [
    "What's driving the sales decline?",
    "How is AOV trending?",
    "Show me the monthly breakdown",
    "Are returns affecting revenue?",
  ],
  "/customers": [
    "How are customer segments shifting?",
    "What does VIP retention look like?",
    "Where are customers concentrated?",
    "Is acquisition cost increasing?",
  ],
  "/channels": [
    "Why is Paid Social underperforming?",
    "Which channel has the best ROI?",
    "Should we scale Email volume?",
    "How is Referral quality trending?",
  ],
  "/performance": [
    "Are we on track for Q3 targets?",
    "What's the weekly score trend?",
    "How does this compare to last year?",
    "Where are the biggest target gaps?",
  ],
};
