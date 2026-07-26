# Ring On Demand Design QA

Audit date: 2026-07-26
Final result: passed

## 1. Source truth and implementation

- Copy and offer-language source truth:
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/current-source/ringondemand-home-1440x900.png`
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/current-source/ringondemand-home-390x844.png`
  - `https://ringondemand.com/`
- Approved implementation:
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-3-home-1440x900.png`
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-2-home-896x707.png`
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-2-home-390x844.png`
- Local review target: `http://localhost:3000/`
- Intended production target: `https://ringondemand2.vercel.app/`
- State: signed out, default homepage, default campaign preview, no modal or
  dropdown open.
- Density: CSS pixel screenshots at device scale 1.

The current Ring On Demand website is the language and offer reference. The
implementation intentionally keeps the approved RID editorial design system
rather than copying the source site's artwork, serif typography, effects, or
unverified live statistics.

## 2. Required comparison evidence

### Full-view comparison

- Source: `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/source-home-full-1440.png`
- Implementation: `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/implementation-home-full-1440.png`
- Same-composite comparison:
  `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/comparison-home-full-1440.png`
- Viewport: `1440 × 900`; full-page captures are `1440 × 6501` and
  `1440 × 9803`, top-aligned in a padded `2880 × 9803` composite.

### Desktop focused comparison

- Same-composite hero comparison:
  `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/comparison-home-final-1440x900.png`
- Same-composite header crop:
  `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/comparison-header-final-1440x160.png`
- Viewport: `1440 × 900`; header crop: `1440 × 160` per side.

### Mobile focused comparison

- Same-composite comparison:
  `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/comparison-home-final-390x844.png`
- Viewport: `390 × 844`.

### Template coverage

- Buyer workspace:
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-3-agents-1440x900.png`
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-3-agents-390x844.png`
- Final Expense landing:
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-2-final-expense-1440x900.png`
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-2-final-expense-390x844.png`
- Careers:
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-2-careers-1440x900.png`
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-2-careers-390x844.png`
- Connected operations:
  `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-2-connected-1440x900.png`
- Vertical booking:
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-2-book-1440x900.png`
  - `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-2-book-390x844.png`
- Brand network mobile:
  `/Users/kelly/Documents/RID/ringondemand2/.qa/design-qa/iteration-2-brands-390x844.png`

## 3. Iteration history

### Iteration 1

Findings:

- P2: the desktop hero eyebrow wrapped at an awkward phrase boundary.
- P2: editorial page headings remained too large and produced excessive line
  counts on the Buyer Workspace page.
- P2: global navigation type was visually smaller than the rest of the
  interface.
- P1: selecting an in-page mobile link left the drawer open and the body
  scroll-locked; Escape also failed to close it.
- P2: buying-model links promised service information but opened unexplained
  example verticals.
- P2: external brand links had repeated names and several external/footer
  targets missed the project's 44 px touch minimum.
- P1: the scheduling fallback exposed an environment-variable name to buyers.
- P2: the generic 404 had no recovery path.

Fixes:

- Shortened the hero eyebrow to “Calls / Leads / Appointments.”
- Reduced editorial display sizes independently of the homepage display scale.
- Tightened header height and logo width while increasing navigation type.
- Added mobile link-close behavior, Escape handling, focus restoration, and a
  shorter featured-vertical list.
- Renamed buying-model links to identify the example vertical they open.
- Added destination-specific external-link names and 44 px minimum target
  sizes.
- Replaced the operator-facing booking error with a buyer-safe email and
  return-to-brief fallback.
- Added a branded 404 with home, vertical, and pricing recovery actions.

### Iteration 2

Recaptured the exact desktop, tablet, and mobile viewports after the fixes.

### Iteration 3

The first type-scale rules were being partially superseded by legacy page
layers later in the stylesheet. Moved the final editorial scale enforcement to
the end of the cascade, then recaptured the homepage and Buyer Workspace at
desktop and mobile sizes. The source and implementation were recomposited and
inspected together. No remaining P0, P1, or P2 visual defects were found.

## 4. Surface-by-surface QA

### Typography

- DM Sans remains the primary readable interface face; IBM Plex Mono is
  limited to labels, navigation, metadata, and buttons.
- A shared responsive display scale now controls homepage, editorial,
  vertical, career, funnel, and builder headings.
- Desktop editorial headings no longer dominate their product panels.
- Mobile headings remain readable without clipping or horizontal overflow.

Result: passed.

### Spacing and layout

- Header height, logo footprint, navigation padding, and hero spacing are
  consistent at desktop, tablet, and mobile breakpoints.
- Buyer Workspace numbered sections use a reduced compact-section height and
  balanced media/copy gap.
- Homepage copy precedes the campaign panel on mobile and keeps both primary
  actions visible.
- Representative checks across 19 public routes reported zero horizontal
  overflow at `390px`.

Result: passed.

### Color and tokens

- The implementation consistently uses RID navy, violet, teal, white, muted
  text, and border tokens.
- White text is reserved for approved dark surfaces; body copy uses the muted
  token on white.
- Focus uses the global 3 px violet outline.

Result: passed.

### Imagery and artwork

- No source-site artwork or protected assets were copied.
- Existing RID signal artwork is restrained to editorial and inverse sections.
- Product panels remain original RID compositions.

Result: passed.

### Copy and information hierarchy

- The hero now explains the offer in plain language: inbound calls, real-time
  leads, booked appointments, markets, hours, volume, and filters.
- “Campaign infrastructure,” “canonical record,” and similar internal jargon
  were removed from primary buyer-facing flows.
- Unverified live counters, testimonials, performance rates, launch-speed, and
  compliance statistics from the current site were not carried over.
- The owner-approved Final Expense headline remains isolated to its dedicated
  vertical page.

Result: passed.

### Icons and controls

- Lucide icons use a consistent lightweight stroke and remain decorative where
  adjacent text already names the control.
- Primary controls meet the 44 px touch-target rule.
- External brand links now include the destination in their accessible name.

Result: passed.

### Interaction and accessibility

- Mobile navigation closes on link selection and Escape, restores focus to the
  trigger, and releases body scroll.
- Product tabs, FAQ disclosures, campaign progress, fields, and action buttons
  retain semantic roles and visible focus states.
- The branded 404 provides useful recovery links.
- Mobile and desktop screenshots show no clipped primary action or overlapping
  controls.

Result: passed.

## 5. Known release checks outside visual QA

- The production Intercom script loads, but launcher visibility depends on the
  Intercom workspace/domain configuration and must be monitored after deploy.
- The production scheduling hostname requires a controlled, non-public test
  campaign because it is supplied at runtime.
- Vertical thank-you templates remain non-indexed and are not the canonical
  campaign-builder success state.
- This review is not a claim of complete WCAG conformance; hands-on
  VoiceOver/NVDA testing remains appropriate before a high-risk production
  release.

final result: passed
