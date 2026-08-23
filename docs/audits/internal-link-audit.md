# Ring On Demand internal-link audit

Audit date: 2026-07-26

Live target: `https://ringondemand2.vercel.app/`

Repository baseline: `8569e06e81a1f01f1708c01b5ed059c2ab654dda`
Mode: combined UX and accessibility audit

## 1. Audit scope

This audit follows the public paths a buyer, partner, or candidate can take through:

1. the home page and global navigation;
2. a representative vertical landing page;
3. the corresponding vertical book-a-call and thank-you pages;
4. the careers, careers introduction, and careers thank-you pages;
5. the booking fallback and invalid-route recovery states.

It also checks the current local source for internal `href` destinations, programmatic navigation, anchor targets, route generation, link naming, and footer/legal destinations. The live screenshots were captured during this audit run at `1440 × 900` and `390 × 844`.

The primary user goal is to understand the offer, select the relevant vertical, preserve campaign context, and reach pricing or booking without losing their place. The accessibility target is a clear, keyboard-operable route system with visible focus, descriptive links, predictable menu state, and recovery from invalid or incomplete paths.

## 2. Route and HTTP evidence

- All 51 tested public routes returned HTTP `200`: 15 static pages plus landing, booking, and thank-you routes for all 12 configured verticals.
- All three invalid dynamic routes tested returned HTTP `404`: `/verticals/not-a-market`, `/verticals/not-a-market/book`, and `/verticals/not-a-market/thank-you`.
- `/#how-it-works`, `/#buying-models`, and `/careers#open-positions` all have matching IDs in source.
- `/privacy` and `/terms` both return HTTP `404`; the footer currently renders “Privacy policy” and “Terms of service” as plain text rather than links.
- The 12 `/verticals/[slug]/thank-you` pages are valid routes, but no rendered internal link or programmatic navigation in `src/` points to them.
- `/build-campaign/booking` is the local fallback returned by the campaign action when `RID_SCHEDULING_URL` is not configured.

## 3. Strengths

- The main buyer entry points are consistent: pricing and demo CTAs preserve intent through `/build-campaign` query parameters.
- Every configured vertical has a landing and book-a-call path, invalid vertical slugs correctly reject with a `404`, and vertical pages link back to the vertical directory.
- The vertical booking page preserves vertical context in the campaign brief and offers a clear return path to its landing page.
- The careers introduction deliberately distinguishes a general-interest introduction from a live-job application and reveals the thank-you link only after an email draft is prepared.
- Link text is generally specific, especially “Return to Final Expense,” “Browse all vertical pages,” and “Explore the buyer workspace.”
- The global stylesheet provides a visible `3px` `:focus-visible` outline, and the mobile menu button exposes a changing `aria-expanded` state.

## 4. Numbered flow evidence

### Step 1 — Home and desktop navigation: mostly healthy

![Home page at 1440 × 900](../../.qa/audit-internal/01-home-desktop.png)

The page exposes pricing, demo, campaign, buyer-workspace, resource, partner, and vertical routes from multiple points. The full vertical catalog is reachable without relying only on a dropdown. The biggest clarity gap is that the three buying-model links promise pay-per-call, pay-per-lead, and pay-per-appointment information but route to example vertical pages instead of dedicated buying-model destinations.

### Step 2 — Mobile navigation: needs work

![Open mobile navigation at 390 × 844](../../.qa/audit-internal/09-home-mobile-nav-open.png)

The menu button is named and reports expanded state, and the links have comfortably sized rows. However, all 12 verticals appear before resources, partners, company links, sign-in, and the primary pricing action. At `390px`, a user cannot see the latter destinations without a long scroll.

More importantly, selecting an in-page anchor does not close the drawer:

![Mobile drawer still open after selecting How it works](../../.qa/audit-internal/16-mobile-anchor-drawer-stuck.png)

The browser reached `/#how-it-works`, but live DOM evidence still reported:

```text
bodyOverflow: "hidden"
aria-expanded: "true"
drawer: true
targetTop: -0.4375
```

Pressing `Escape` also left the drawer open. The destination is technically reached behind the menu, but the user remains visually blocked and the document remains scroll-locked.

### Step 3 — Vertical landing page: healthy with one expectation mismatch

![Final Expense landing page at 1440 × 900](../../.qa/audit-internal/02-vertical-desktop.png)

The landing page provides two clear next actions, links to adjacent verticals, and a route back to the full directory. The path is understandable on desktop and mobile.

![Final Expense landing page at 390 × 844](../../.qa/audit-internal/10-vertical-mobile.png)

The route structure scales consistently across all 12 slugs. The copy and destination are vertical-specific, and no broken route was found.

### Step 4 — Vertical book-a-call page: mostly healthy

![Vertical booking page at 1440 × 900](../../.qa/audit-internal/03-book-desktop.png)

The primary action keeps the vertical in the campaign brief and sets `intent=demo`. “Return to Final Expense” is a clear recovery path.

![Vertical booking page at 390 × 844](../../.qa/audit-internal/11-book-mobile.png)

The mobile route remains linear and the two next-step actions in the shared footer stay visible. The actual scheduling handoff was not submitted in this audit because doing so would create a campaign record.

### Step 5 — Vertical thank-you page: route is orphaned

![Vertical thank-you page at 1440 × 900](../../.qa/audit-internal/04-vertical-thank-you-desktop.png)

![Vertical thank-you page at 390 × 844](../../.qa/audit-internal/12-vertical-thank-you-mobile.png)

The page has clear forward and backward actions, but the template is not connected to the campaign builder, its action response, or any rendered link. The builder instead shows an inline success state. Because the route is directly accessible, it can display success language without a campaign submission or campaign ID. “Review my campaign” starts a new demo-intent builder rather than restoring a known campaign.

### Step 6 — Careers landing page: healthy

![Careers page at 1440 × 900](../../.qa/audit-internal/05-careers-desktop.png)

![Careers page at 390 × 844](../../.qa/audit-internal/13-careers-mobile.png)

The jump link to open positions has a valid target, the general-interest card reaches `/careers/apply`, and the hiring steps set expectations before the form.

### Step 7 — Careers introduction and confirmation: mostly healthy

![Careers introduction form at 1440 × 900](../../.qa/audit-internal/06-careers-apply-desktop.png)

![Careers introduction form at 390 × 844](../../.qa/audit-internal/14-careers-apply-mobile.png)

The form explains that submission opens the user’s email client. After the draft is prepared, the UI exposes an explicit “I sent my introduction” link to `/careers/thank-you`; this avoids falsely confirming delivery before the user acts in their mail client.

![Careers thank-you page at 390 × 844](../../.qa/audit-internal/15-careers-thank-you-mobile.png)

The thank-you page returns to careers, but it is also directly accessible without the prepared state. That is a lower-risk issue because its copy carefully says the user prepared and sent an introduction rather than implying an application was received by an applicant-tracking system.

### Step 8 — Booking fallback and invalid-route recovery: at risk

![Production-visible booking fallback](../../.qa/audit-internal/17-booking-fallback-desktop.png)

The booking fallback exposes the server variable name `RID_SCHEDULING_URL` and tells a visitor to configure production infrastructure. If the production scheduling URL is absent, the primary demo flow can terminate here with no scheduling option, support contact, or return-to-campaign action.

![Default invalid-route page](../../.qa/audit-internal/18-404-desktop.png)

The default Next.js 404 has no Ring On Demand context and no links back to home, verticals, pricing, or careers.

## 5. Prioritized findings

### P1 — Mobile in-page links leave the navigation drawer open

Evidence: Step 2 and `16-mobile-anchor-drawer-stuck.png`.

The drawer state is not reset when a mobile link is selected. In-page links are the clearest failure because the shared header does not unmount, leaving `bodyOverflow: hidden`, `aria-expanded: true`, and the drawer covering the reached section. `Escape` does not close the drawer either.

Recommendation: close the drawer on every mobile-nav link activation; add `Escape` handling; move focus into the drawer on open and restore it to the menu button on close. If the drawer behaves as a modal overlay, trap focus and mark the background inert while it is open.

### P1 — The vertical thank-you templates are disconnected from the campaign flow

Evidence: Step 5, repository search for `thank-you`, and route crawl.

All 12 routes render, but the campaign builder completes inline and never navigates to them. A direct visit can claim the campaign is ready even with no campaign ID, while “Review my campaign” starts a new brief.

Recommendation: choose one canonical success pattern. Either remove/redirect these routes and keep the inline result, or navigate to a thank-you URL containing a validated opaque campaign reference and load only the minimal state needed to continue. Do not render success copy without a completed campaign state.

### P1 — The production booking fallback can expose an implementation failure

Evidence: Step 8 and `17-booking-fallback-desktop.png`.

The fallback tells visitors to configure an environment variable. That language is appropriate for operators, not buyers, and the page has only a home link.

Recommendation: block production cutover unless `RID_SCHEDULING_URL` is configured. Keep a buyer-safe fallback with campaign ID preserved, a retry/contact path, and a return to the saved campaign; log the configuration error server-side.

### P1 — Privacy and terms look like footer links but are not links

Evidence: source inspection of `SiteFooter`; `/privacy` and `/terms` each returned `404`.

The visual treatment places these labels beside copyright text where users expect legal navigation. This is a trust and release-readiness gap, even though the text itself is not a broken anchor.

Recommendation: add approved legal routes or point to the approved external legal documents, then render real anchors with descriptive titles.

### P2 — Buying-model links do not match their promised destination

Evidence: Step 1 and `buyingModels` in `src/app/page.tsx`.

“Explore pay per call” routes to Final Expense, “Explore pay per lead” routes to Home Services, and “Explore pay per appointment” routes to Personal Injury. Users asking about a delivery model are unexpectedly sent into one vertical.

Recommendation: create canonical service/model destinations such as `/services/pay-per-call`, `/services/pay-per-lead`, and `/services/pay-per-appointment`, or relabel the links to say which example vertical they open.

### P2 — The mobile drawer is not a complete keyboard dialog

Evidence: Step 2 and source inspection of `SiteHeader`.

The trigger has `aria-expanded`, but opening the drawer does not move focus, `Escape` does not close it, and no focus containment or background-inert behavior is implemented. Screenshot evidence cannot establish screen-reader behavior, but the DOM and interaction test confirm the missing close behavior.

Recommendation: implement dialog-like focus management or make the drawer a non-modal disclosure that does not lock the document. In either case, close it predictably on selection and `Escape`.

### P2 — Invalid routes offer no recovery path

Evidence: Step 8 and `18-404-desktop.png`.

The generic 404 is a dead end with no navigation.

Recommendation: add a branded `not-found.tsx` with links to home, verticals, pricing, and contact.

### P2 — Several action links have weak standalone names

Evidence: the home campaign card exposes “Start”; partner arrow links use only a partner-type title as their accessible name; the live home demo also exposes “Configure.”

These names are understandable visually in context but become vague in a screen-reader link list or analytics report.

Recommendation: use names such as “Start a campaign brief,” “Configure this campaign,” and “Discuss a technology partnership.” Keep the visible label concise and add an `aria-label` only when it preserves the visible wording.

### P3 — Mobile navigation makes high-value destinations expensive to reach

Evidence: Step 2.

At `390px`, 12 vertical rows precede resources, company links, sign-in, and the primary campaign action.

Recommendation: show the four vertical categories first, provide a “View all verticals” link, and keep Get pricing, Book a call, and Sign in in a sticky or immediately visible action group.

## 6. Accessibility risks and verification gaps

- Confirmed: a global visible focus treatment exists; mobile link rows meet the intended minimum touch size; the menu button has a useful name and changing expanded state.
- Confirmed risk: mobile anchor selection and `Escape` fail to close the menu.
- Likely risk: the mobile drawer needs focus transfer/containment or a non-modal implementation; this requires hands-on screen-reader and keyboard regression testing after the behavior is changed.
- Link names should be checked in VoiceOver/NVDA link-list views after “Start,” “Configure,” and partner arrow labels are revised.
- Screenshots alone cannot confirm contrast across every interactive state, semantic announcement of SPA navigation, zoom resilience, or behavior in third-party scheduling and sign-in surfaces.

## 7. Recommended fix order

1. Close and restore the mobile drawer correctly for link selection and `Escape`.
2. Make scheduling configuration a production gate and replace the operator-facing booking fallback.
3. Remove or correctly connect the vertical thank-you route family.
4. Add real privacy/terms destinations and a branded recovery page.
5. Align buying-model link labels with their destinations.
6. Improve standalone action names and shorten the mobile vertical list.

## 8. Audit limits

- The audit did not create a live campaign record, trigger a webhook, or complete third-party scheduling.
- The Proaxis authenticated buyer workspace was out of scope.
- The careers mail draft was not sent, so email-client and delivery behavior were not verified.
- The live screenshots represent the deployed site at capture time. The local working tree had active copy and typography edits during the audit, so visual wording may change in the next deployment; the underlying route and interaction findings were checked against current source where applicable.
- This is not a claim of complete WCAG conformance.
