# Ring On Demand external-link audit

Audit date: 2026-07-26

Surface: `https://ringondemand2.vercel.app/` and the corresponding local source tree

Mode: combined UX and accessibility audit
Capture: fresh browser run at 1440 × 900 and 390 × 844

## 1. Audit scope

This audit checked every browser-facing external destination found across 50 public routes: the Proaxis buyer login, three published brand properties, `mailto:` contact and recruiting/community handoffs, the Intercom loader, and the runtime-configured scheduling path. It also checked link labels, new-tab behavior, `rel` protection, visible focus, mobile target size, destination status, redirects, and journey continuity.

The route crawl found no `tel:` link and no published partner or calendar URL. All 50 checked public routes returned HTTP 200. The same two global external actions—buyer sign-in and email contact—appear throughout the shared site chrome.

## 2. User goal and accessibility target

The user should be able to leave Ring On Demand intentionally, understand where the link goes, retain a clear way back, and complete the task even when a local email application or third-party widget is unavailable. External controls should have unique accessible names, announce new-window behavior, show a strong keyboard focus state, and meet the project’s 44 px touch-target rule.

## 3. Overall verdict

No broken HTTP destination was found. The Proaxis and brand-property links reach the expected pages, HTTPS validation succeeds, and new-tab links use `rel="noreferrer"`. The main risks are resilience and clarity rather than URL correctness: the contact paths rely on `mailto:`, the Intercom script loads but did not render a launcher, repeated “Visit property” links have identical accessible names, and several mobile link targets are below the required 44 px height.

There are no P0 findings. There are two release-gate P1 risks to verify, three P2 usability/accessibility issues, and one P3 enhancement.

## 4. Numbered flow evidence

### Step 1 — Global entry, header, and footer

Health: needs work

![Homepage external-link context](../../.qa/audit-external/01-home-header-and-footer.png)

- Strength: “Sign in” is consistently located in the header and footer.
- Strength: the destination is HTTPS and opens outside the marketing-site tab.
- Risk: “Sign in” and “Contact” do not indicate that they leave the current browser experience or invoke another application.
- Risk: the full-page capture contains no visible Intercom launcher even though the loader script returned HTTP 200.

### Step 2 — Brand network

Health: needs work

![Brand network external-link cards](../../.qa/audit-external/02-brand-network-links.png)

- Strength: the page distinguishes website availability from ownership approval before linking out.
- Strength: all three external cards include a visible outbound-arrow cue.
- Risk: every link is named only “Visit property.” In a screen-reader links list, the three destinations are indistinguishable.
- Risk: the mobile links measure 36 px high, below the project’s 44 px touch-target requirement.

### Step 3 — Community contact on mobile

Health: at risk

![Community mail contact on mobile](../../.qa/audit-external/03-community-contact-mobile.png)

- Strength: the CTA is prominent and its purpose is clear in surrounding copy.
- Risk: “Request an introduction” is only a `mailto:` URL. If the device has no configured mail client, the sole conversion action has no in-page recovery path and the email address is not shown.

### Step 4 — Mobile navigation and buyer sign-in

Health: mostly healthy

![Mobile navigation external sign-in](../../.qa/audit-external/04-mobile-navigation-sign-in.png)

- Strength: the mobile drawer keeps the buyer sign-in separate from the main marketing links and gives it a large control.
- Risk: the control does not say that it opens a new tab or a separate buyer portal.

### Step 5 — Campaign-builder sign-in

Health: healthy with a clarity improvement

![Campaign builder buyer sign-in](../../.qa/audit-external/05-build-campaign-buyer-sign-in.png)

- Strength: “Buyer sign in” is clearer than the shorter global “Sign in” label.
- Strength: the campaign task stays open when the login launches in a new tab.
- Risk: there is no visible or assistive-text cue for the new tab.

### Step 6 — Proaxis destination

Health: healthy

![Proaxis buyer-login destination](../../.qa/audit-external/06-proaxis-destination.png)

- Verified destination: `https://ring-on-demand.proaxis.ai/cx/buyer/login`
- Result: HTTP 200, zero redirects, valid TLS.
- Browser title: “Ring on Demand - Performance Marketing Platform.”
- Strength: the destination preserves Ring On Demand branding and clearly identifies a buyer portal.
- Limit: authentication, password recovery, and post-login return behavior were not tested without a buyer account.

### Step 7 — Representative brand destination

Health: healthy

![Top 10 Rehab destination](../../.qa/audit-external/08-top10rehab-destination.png)

- Verified destination: `https://www.top10rehab.com/`
- Result: HTTP 200, zero redirects, valid TLS.
- Browser title: “Top Rehab Centers by City.”
- Strength: the title and content match the source card’s description.
- Risk: the Ring On Demand source page does not name the destination in the link itself, so users relying on link text alone do not get this context.

## 5. Destination inventory and status evidence

| Destination | Source context | Result on 2026-07-26 | Behavior |
|---|---|---:|---|
| `https://ring-on-demand.proaxis.ai/cx/buyer/login` | Global header/footer and campaign builder | 200; 0 redirects; valid TLS | `_blank`, `rel="noreferrer"` |
| `https://www.top10rehab.com/` | Brand network | 200; 0 redirects; valid TLS | `_blank`, `rel="noreferrer"` |
| `https://americanaddictionhotline.org/` | Brand network | 200; 0 redirects; valid TLS | `_blank`, `rel="noreferrer"` |
| `https://growingolder.com/` | Brand network | 200; 0 redirects; valid TLS | `_blank`, `rel="noreferrer"` |
| `mailto:hello@ringondemand.com` | Header/footer contact | Mail handler required; domain has Google MX | Same tab/application handoff |
| `mailto:hello@ringondemand.com?subject=Join…` | Community introduction | Mail handler required; domain has Google MX | Same tab/application handoff |
| Runtime-generated recruiting `mailto:` | Careers interest form | Address and fields confirmed in source | Same tab/application handoff |
| `https://widget.intercom.io/widget/u4881rls` | Global Intercom loader | 200 | Script, not an anchor |
| `RID_SCHEDULING_URL` | Post-submission demo booking | No static destination in the repository | Runtime environment; not verified |

New-tab security is acceptable in current browsers: `noreferrer` suppresses `window.opener` and the referrer. Adding explicit `noopener` would make the intent clearer in source, but its absence is not a current security defect.

## 6. Strengths

1. All five public HTTPS destinations tested successfully with valid TLS and no redirect chain.
2. The buyer-login destination is on a Ring On Demand subdomain and maintains brand continuity.
3. The source uses `target="_blank"` with `rel="noreferrer"` consistently for every public HTTPS link.
4. Brand cards disclose that ownership documentation is pending rather than implying an unverified relationship.
5. Keyboard focus on a brand-property link produced a visible 3 px violet outline.
6. The careers form explains that it opens the user’s email client and that the website does not store the entered information.

## 7. UX risks

### P1 — Intercom is loaded but not visibly available

After network idle plus a five-second wait, the homepage had `window.Intercom`, the expected app ID, and a successfully loaded widget script, but no Intercom iframe, launcher, or visible chat control. This removes the expected fallback contact channel and makes the `mailto:` dependency more consequential.

Recommendation: treat widget boot as an observed production health check. Confirm that the Intercom workspace enables the launcher for this domain, add a visible first-party contact fallback, and monitor a DOM-level “launcher mounted” signal rather than only a script-load response.

### P1 — The production scheduling destination is not auditable from the public code

`RID_SCHEDULING_URL` is runtime-only. Local source falls back to `/build-campaign/booking`, which displays a configuration message, and no public calendar URL is present in source. Because completing the full campaign submission would create a record, the audit did not mutate production to discover the configured destination.

Recommendation: before release, run a dedicated test campaign through “Book a call,” verify the final hostname, campaign-ID carryover, HTTPS status, return path, and failure state. Treat a configuration fallback as a release blocker for the demo funnel.

### P2 — Email-only contact paths have no browser-native fallback

The global contact link, community introduction, and recruiting introduction all depend on a local mail handler. A user without one can receive no confirmation and has no visible address to copy. In the recruiting form, the UI sets “ready in your email client” before it can know whether an email application opened.

Recommendation: provide a first-party contact form or a visible copyable `hello@ringondemand.com` fallback. For recruiting, phrase the status as an instruction rather than a confirmed handoff and keep the “I sent my introduction” step explicitly user-confirmed.

### P2 — External-link names and new-window behavior are ambiguous

Three brand cards expose the same accessible name, “Visit property.” “Sign in” and “Buyer sign in” open new tabs without an assistive-text or visible cue.

Recommendation: use names such as “Visit Top 10 Rehab (opens in a new tab)” and “Open the Ring On Demand buyer portal (opens in a new tab).” Keep the outbound icon decorative only after the text carries the meaning.

### P2 — Several mobile external targets miss the 44 px project minimum

At 390 px width, brand-property links measured 36 px high; plain footer “Contact” and “Sign in” links measured 21 px high. Spacing may satisfy the WCAG 2.5.8 minimum-target exception, but it does not satisfy the project’s explicit 44 px touch-target rule.

Recommendation: apply at least 44 px `min-block-size` to interactive rows and preserve visible focus inside the enlarged box.

### P3 — There is no direct phone path

No `tel:` link exists anywhere in the public route set. This is not a broken-link defect, but it is a missed convenience for a company selling live phone conversations.

Recommendation: if a staffed and approved number exists, add it with operating hours and a descriptive accessible label. Do not publish a number without an owner and operational coverage.

## 8. Accessibility risks

- Identical “Visit property” names fail to communicate purpose when links are navigated out of surrounding article context.
- New-tab behavior is not announced to screen-reader users.
- Several mobile targets do not meet the project’s 44 px minimum.
- `mailto:` success and failure are not programmatically observable, so the UI must not imply a completed handoff.
- The Intercom launcher could not be inspected for keyboard order, label, focus trapping, close behavior, or screen-reader announcements because it did not render.

## 9. Evidence limits and verification gaps

- This is not a claim of WCAG conformance. Automated DOM inspection and screenshots cannot replace testing with VoiceOver, NVDA, or a switch/voice-control setup.
- Buyer login was verified only to the unauthenticated destination.
- The scheduling URL was not discovered by submitting a production campaign.
- Email delivery was not tested; only link construction, the domain’s MX record, and the surrounding UX were checked.
- External sites can change independently after the audit date.
- Intercom script availability was confirmed, but workspace configuration and consent/cookie policy were not accessible from the page.

## 10. Recommended order of work

1. Verify the production scheduling destination with a controlled test campaign.
2. Restore a reliable contact path: working Intercom launcher plus a first-party or copyable-email fallback.
3. Give every external link a destination-specific accessible name and a new-tab cue.
4. Raise mobile external-link targets to 44 px.
5. Add automated daily or release-time checks for external HTTP status, destination hostname, Intercom launcher mount, and the configured scheduling handoff.
