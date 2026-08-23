# Ring On Demand Site Architecture and Comparison Page Plan

## Direction

Ring On Demand should keep a short, intent-led URL system. The primary
navigation should answer four questions:

1. What can I buy?
2. Does it work for my vertical?
3. Why should I choose Ring On Demand?
4. How do I start?

Comparison pages should use the editorial rhythm of
[Stytch vs. Fingerprint](https://stytch.com/stytch-vs-fingerprint) as a
structural reference: a clear hero, an at-a-glance comparison, focused
advantage sections, a detailed table, migration/support content, and a strong
final CTA. RID will use original copy, components, product panels, artwork,
brand colors, and proof.

## URL Rules

- Use lowercase, hyphenated, readable URLs.
- Organize pages by buyer intent rather than internal departments.
- Keep vertical pages at `/verticals/[slug]`.
- Keep the main conversion route at `/build-campaign`.
- Use `/compare` for category and named-competitor comparison pages.
- Avoid dates, file extensions, tracking parameters, and duplicate aliases in
  canonical URLs.
- Add a canonical tag to every indexable page.
- Use permanent redirects only after the replacement route is live and
  approved.

## Recommended Top-Level Structure

### Core conversion

| URL | Purpose | Primary action |
| --- | --- | --- |
| `/` | Final Expense-led homepage and platform overview | Build a campaign |
| `/build-campaign` | Canonical campaign funnel | Approve campaign |
| `/book-demo` | Short entry route that forwards into the campaign record with `intent=demo` | Book a demo |
| `/login` | Redirect to the current Proaxis buyer login | Sign in |

### Platform

| URL | Purpose |
| --- | --- |
| `/platform` | Product overview: define, route, review |
| `/platform/campaign-builder` | Natural-language brief and progressive questions |
| `/platform/buyer-workspace` | Campaign controls, delivery records, and review |
| `/platform/quality-review` | Delivery details, recordings, notes, and credit workflow |
| `/platform/reporting` | Approved reporting and outcome-recording capabilities |

### Delivery models

| URL | Purpose |
| --- | --- |
| `/delivery/inbound-calls` | Live inbound call delivery |
| `/delivery/exclusive-leads` | Real-time exclusive lead delivery |
| `/delivery/appointments` | Booked appointment delivery |

### Verticals

Keep the current controlled taxonomy:

- `/verticals`
- `/verticals/final-expense`
- `/verticals/medicare`
- `/verticals/aca`
- `/verticals/auto-insurance`
- `/verticals/mortgage-protection`
- `/verticals/home-services`
- `/verticals/roofing`
- `/verticals/hvac`
- `/verticals/solar`
- `/verticals/personal-injury`
- `/verticals/tax-debt`
- `/verticals/debt-settlement`

Each vertical page should share one component system while changing the
campaign brief, qualification questions, examples, metadata, and approved
proof.

### Comparison and decision pages

Start with category comparisons because they explain the buying decision
without relying on unverified claims about a named competitor:

- `/compare`
- `/compare/inbound-calls-vs-form-leads`
- `/compare/exclusive-leads-vs-shared-leads`
- `/compare/live-calls-vs-booked-appointments`
- `/compare/ring-on-demand-vs-lead-marketplaces`
- `/compare/ring-on-demand-vs-building-in-house`

Add named competitor pages only after research, legal review, and proof
approval:

- `/compare/ring-on-demand-vs-[competitor]`

The competitor slug must use the competitor's common public brand name. Do not
publish a named page until every comparison row has a source, owner, review
date, and status.

### Customer proof

| URL | Purpose |
| --- | --- |
| `/customers` | Approved customer-story index |
| `/customers/[company]` | One sourced customer story |
| `/results/[vertical]` | Aggregated, source-approved outcome narrative by vertical |

Do not create thin testimonial pages. Customer routes disappear from
navigation when there is no approved proof.

### Partners

| URL | Purpose |
| --- | --- |
| `/partners` | Partnership overview |
| `/partners/technology` | Approved platform and integration partners |
| `/partners/referral` | Referral partnership model |
| `/partners/publishers` | Supply-side operating expectations |

### Resources

| URL | Purpose |
| --- | --- |
| `/resources` | Resource hub |
| `/resources/guides` | Campaign buying and operations guides |
| `/resources/research` | Source-led research narratives |
| `/resources/blog` | News and editorial posts |
| `/resources/glossary` | Definitions for calls, leads, appointments, qualification, caps, and routing |
| `/resources/campaign-planning-template` | High-intent downloadable or interactive planning tool |

Suggested resource clusters:

- How inbound call campaigns work
- How to set a daily call cap
- Exclusive vs. shared leads
- Call qualification and buyer approval
- Final Expense campaign planning
- Routing calls by location and schedule
- Quality review and credit workflows

### Company and legal

| URL | Purpose |
| --- | --- |
| `/company` | Company overview |
| `/company/about` | Mission and operating model |
| `/company/contact` | Contact options with campaign context preserved |
| `/legal/privacy` | Privacy policy |
| `/legal/terms` | Terms of service |
| `/legal/consent` | Lead/call consent disclosures |
| `/legal/do-not-sell-or-share` | Applicable privacy request route |
| `/legal/accessibility` | Accessibility statement |

## Comparison Page Template

Every page under `/compare` should use this section order:

1. Breadcrumb and proof-aware eyebrow.
2. Direct decision headline: `Ring On Demand vs. [alternative]`.
3. Short explanation of the buyer situation and two CTAs.
4. At-a-glance comparison card with RID as the highlighted middle column.
5. Optional approved customer/logo strip.
6. Three focused advantage sections with alternating copy and real RID product
   panels.
7. Dark inverse section for the core operational difference.
8. Optional approved customer story.
9. Detailed, accessible comparison table.
10. Switching and operational handoff CTA.
11. Expert support / implementation sequence.
12. Related verticals and comparison pages.
13. Final `Build a campaign` CTA.

### RID visual translation

- White or warm off-white canvas.
- Deep navy text and inverse panels.
- Violet for RID-selected states and highlighted comparison columns.
- Teal for verified positive states.
- Amber for conditional or needs-review states.
- Thin rules, square panels, editorial spacing, restrained shadows.
- All-white RID logo on dark surfaces.
- No competitor logos unless brand-use terms permit them.

### Responsive behavior

- Desktop: copy and comparison card side by side.
- Mobile: copy first, actions second, comparison card third.
- Comparison tables become horizontally scrollable with the first feature
  column pinned, or transform into one feature card at a time.
- Keep the primary action visible in the first mobile viewport.
- Minimum 44px touch targets and visible keyboard focus.

## Comparison Data Contract

Comparison content should be data-driven so the design cannot publish an
unreviewed claim.

```ts
type ComparisonPageV1 = {
  slug: string;
  alternativeName: string;
  alternativeType: "competitor" | "category" | "in_house";
  headline: string;
  summary: string;
  lastReviewedAt: string;
  owner: string;
  rows: Array<{
    feature: string;
    ridValue: string;
    alternativeValue: string;
    ridStatus: "yes" | "conditional" | "no";
    alternativeStatus: "yes" | "conditional" | "no" | "unknown";
    sourceIds: string[];
  }>;
  proofIds: string[];
  relatedVerticalSlugs: string[];
  status: "draft" | "legal_review" | "approved" | "expired";
};
```

Only `approved` pages and `approved` proof entries render publicly.
`unknown` must display as `Not verified`, never as a negative claim.

## Navigation Plan

### Desktop

- Product
- Solutions
- Verticals
- Compare
- Resources
- Partners
- Sign in
- Book a demo
- Build a campaign

Add `Compare` to the top navigation only when the hub and at least three useful
comparison pages are live. Until then, place the comparison hub under
Resources.

### Footer

Expose the platform, delivery models, top verticals, comparison hub, customer
stories, partners, resources, company, legal pages, and external sign-in.

## Redirect Plan

Keep existing routes live until their replacements ship:

| Existing route | Future route | Timing |
| --- | --- | --- |
| `/agents` | `/platform/buyer-workspace` | Redirect after replacement is approved |
| `/blog` | `/resources/blog` | Redirect after content migration |
| `/customers` | `/customers` | Keep |
| `/partners` | `/partners` | Keep |
| `/verticals/*` | `/verticals/*` | Keep |
| `/build-campaign` | `/build-campaign` | Keep |

## Delivery Sequence

### Phase 1: Information architecture

- Add route constants and navigation data.
- Add canonical metadata helpers.
- Create `/platform`, `/delivery`, `/compare`, and `/resources` index pages.
- Keep old routes active.

### Phase 2: Comparison system

- Build one reusable comparison-page component.
- Add the comparison data contract and proof gating.
- Launch the three category comparisons with the strongest buyer intent.
- Add analytics for comparison CTA clicks and campaign starts.

### Phase 3: Product and delivery pages

- Move the buyer-workspace story to `/platform/buyer-workspace`.
- Build the three delivery-model pages.
- Connect every page to a prefilled campaign brief.

### Phase 4: Resources and proof

- Migrate the existing resources page.
- Add campaign-planning and glossary clusters.
- Publish only approved customer stories and integrations.

### Phase 5: Named competitor pages

- Select competitors using search demand, sales objections, and deal data.
- Capture current competitor evidence.
- Complete legal and claim review.
- Publish one page at a time with a 90-day review cycle.

## Definition of Done

- Every public route has a unique title, description, canonical URL, and social
  preview.
- No orphan pages.
- No route duplicates or conflicting slugs.
- Every CTA carries campaign context into `/build-campaign`.
- All comparison rows are keyboard and screen-reader accessible.
- No horizontal page overflow at 390px.
- No unapproved competitor, performance, customer, compliance, or integration
  claim is visible.
- Named comparison pages show their last review date.
- Build, typecheck, lint, tests, residue scan, and visual QA pass before
  production release.
