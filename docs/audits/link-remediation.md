# Link-audit remediation

Date: 2026-07-26

The internal and external audit reports preserve the live pre-fix evidence.
This addendum records the changes applied to the local release candidate.

## Fixed

1. Mobile in-page links now close the drawer, release body scroll, and move to
   the selected section.
2. Escape closes the mobile drawer and restores focus to the menu trigger.
3. The mobile drawer now shows four representative verticals plus a clear
   “View all verticals” route instead of placing all twelve above primary
   actions.
4. Footer Privacy Policy and Terms of Service labels now link to the currently
   published Ring On Demand legal pages.
5. Buying-model links now identify the example market they open.
6. Vague “Start” and partner arrow-only actions now have descriptive labels.
7. A branded 404 provides recovery to verticals, pricing, and home.
8. The booking fallback no longer exposes infrastructure configuration. It
   preserves the campaign reference and provides email and return-to-brief
   actions.
9. Proaxis links now identify the buyer portal and announce new-tab behavior
   through their accessible names.
10. Brand-property links now name the destination and announce new-tab
    behavior.
11. Brand and footer link targets now meet the project's 44 px minimum.
12. The community page exposes `hello@ringondemand.com` in readable text as a
    fallback to the email CTA.

## Verified after remediation

- Mobile in-page selection:
  `drawer=false`, `aria-expanded=false`, and `body.style.overflow=""`.
- Escape close:
  `drawer=false`, focus restored to “Open navigation.”
- Nineteen representative public routes showed zero horizontal overflow at
  `390 × 844`.
- Lint and TypeScript checks passed after the changes.

## External configuration still requiring observation

- Intercom's loader and app ID are present, but launcher visibility is
  controlled by the Intercom workspace/domain settings.
- The final scheduling hostname is runtime-configured and should be verified
  with a controlled campaign after deployment.
- Vertical thank-you routes remain non-indexed templates; the campaign
  builder's inline confirmation is the current canonical success state.
