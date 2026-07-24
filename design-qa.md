# Ring On Demand Design QA

## Comparison target

- Structural reference:
  - `/Users/kelly/Documents/RID/.reference-captures-ringondemand2/juicebox-home-desktop-00-0.png`
  - `/Users/kelly/Documents/RID/.reference-captures-ringondemand2/juicebox-home-mobile-00-0.png`
  - `/Users/kelly/Documents/RID/.reference-captures-ringondemand2/moneylion-vertical-desktop-00-0.png`
- Production implementation: `https://ringondemand2.vercel.app/`
- Verified viewports: `1440 × 900`, `896 × 707`, and `390 × 844`
- Verified state: signed-out homepage, vertical mega-menu, mobile navigation,
  Final Expense landing page, vertical index, and campaign-builder entry.

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

## Automated and runtime evidence

- Production build: passed, 26 routes generated.
- ESLint: passed.
- TypeScript: passed.
- Unit tests: 14 passed.
- Residue scan: passed.
- Production deployment: `READY`.
- Browser console errors: none.
- Route checks: homepage, vertical index, Final Expense, Medicare, Roofing, and
  campaign builder all returned `200`.
- Mobile navigation: opened successfully and exposed the full vertical list.

## Remaining notes

- Campaign record creation still requires a production `DATABASE_URL`.
- Named competitor comparison pages must remain unpublished until their claims
  pass proof and legal review.

## Final result

final result: passed
