# Ring On Demand Design QA

## Comparison target

- Structural reference:
  - `/Users/kelly/Documents/RID/.reference-captures-ringondemand2/juicebox-home-desktop-00-0.png`
  - `/Users/kelly/Documents/RID/.reference-captures-ringondemand2/juicebox-home-mobile-00-0.png`
  - `/Users/kelly/Documents/RID/.reference-captures-ringondemand2/moneylion-vertical-desktop-00-0.png`
- Production implementation: `https://ringondemand2.vercel.app/`
- Verified viewports: `1440 × 900`, `896 × 707`, and `390 × 844`
- Verified state: signed-out homepage, vertical mega-menu, mobile navigation,
  Final Expense landing page, vertical index, campaign-builder entry, careers
  landing page, and talent-network introduction form.

## Visual evidence

- Desktop homepage:
  - `.qa/final-rid-home-1440.png`
  - `.qa/qa-home-comparison.png`
- Mobile homepage and navigation:
  - `.qa/final-rid-home-390.png`
  - `.qa/final-rid-mobile-menu.png`
  - `.qa/qa-home-mobile-comparison.png`
- Final Expense:
  - `.qa/refined-final-expense.png`
  - `.qa/qa-vertical-comparison.png`
- Careers:
  - `.qa/juicebox-careers-desktop-top.png`
  - `.qa/rid-careers-desktop-top.png`
  - `.qa/rid-careers-mobile-top.png`
  - `.qa/careers-reference-vs-rid.png`
- Connected operations:
  - `.qa/stytch-connected-apps-desktop-top.png`
  - `.qa/connected-apps-reference-vs-rid.png`

The QA files are local review artifacts and intentionally ignored by Git.

## Findings and fixes

### Pass 1

- The signal-field image dominated the homepage and weakened the content
  hierarchy.
- The main vertical taxonomy was hidden inside a short link list.
- The Final Expense offer was not the homepage focus.

Fixes:

- Replaced the decorative hero field with a restrained white/navy product
  composition.
- Added the requested Final Expense headline and approved it through the proof
  register.
- Added all twelve verticals to the homepage, desktop mega-menu, mobile
  navigation, and searchable vertical index.

### Pass 2

- The `896px` layout still exposed the desktop mega-menu, allowing the fourth
  category to overflow the viewport.
- The exact Final Expense headline pushed the primary mobile CTA below the
  first viewport.

Fixes:

- Switched the header to the compact mobile navigation below `1080px`.
- Reduced only the small-screen headline size and vertical spacing.
- Shortened the supporting paragraph without changing the requested headline.
- Verified that both mobile CTAs and the campaign panel begin in the first
  `390 × 844` viewport.

### Pass 3

- The supplied lockup retained colored/dark pixels instead of reading as a
  consistent white mark on navy surfaces.

Fix:

- Applied one white-lockup treatment to the site header, footer, and campaign
  builder.

### Pass 4

- Final Expense positioning had leaked into the global metadata, announcement
  bar, homepage hero, and homepage proof strip.
- The site did not have a careers destination or a controlled hiring funnel.

Fixes:

- Restored the homepage to the platform-wide “Turn demand into live
  conversations” position and kept the requested Final Expense claim on its
  dedicated vertical page.
- Added `/careers` and `/careers/apply` using the reference’s editorial pacing,
  numbered sections, focused openings area, process, and FAQ in the original
  RID visual system.
- Implemented a transparent general-interest talent-network flow without
  inventing open roles, compensation, benefits, or employment claims.
- Compared the reference and implementation together at `1440 × 900`, then
  separately verified the implementation at `390 × 844`. No P0, P1, or P2
  visual issues remain.

### Pass 5

- The public route system did not include dedicated vertical booking and
  thank-you templates.
- The hiring funnel ended at the open-introduction form.
- Connected operations, About, community, and brand-network information had no
  controlled page structure.

Fixes:

- Added static booking and non-indexed thank-you pages for all twelve
  verticals, producing a consistent landing → booking → confirmation path.
- Added a non-indexed careers confirmation page and connected it to the
  existing email-based introduction flow.
- Added About, Pay Per Call Community, Connected Operations, and Brand Network
  pages with original RID copy and components.
- Matched the Connected Operations hero to the Stytch reference’s measured
  line geometry, editorial offset, oversized headline, and restrained CTA
  treatment, then compared both at `1440 × 900` in one composite.
- Verified Connected Operations and Careers at `390 × 844`; no overflow,
  cropped primary actions, or P0/P1/P2 issues remain.
- Kept submitted brand ownership in review while separately displaying the
  properties whose websites could be verified online.

## Automated and runtime evidence

- Production build: passed, 57 routes generated.
- ESLint: passed.
- TypeScript: passed.
- Unit tests: 14 passed.
- Residue scan: passed.
- Production deployment: `READY`.
- Browser console errors: none.
- Route checks: homepage, careers, talent-network form, buyer workspace,
  resources, customers, partners, vertical index, sampled verticals, and
  campaign builder all returned `200`.
- Mobile navigation: opened successfully and exposed the full vertical list.

## Remaining notes

- Campaign record creation still requires a production `DATABASE_URL`.
- Named competitor comparison pages must remain unpublished until their claims
  pass proof and legal review.

## Final result

final result: passed
