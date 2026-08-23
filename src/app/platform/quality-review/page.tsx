import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Quality Review",
  description:
    "Understand how Ring On Demand campaign settings, delivery details, recordings when available, and outcome notes support quality review.",
};

export default function QualityReviewPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Define the review rules before the first delivery.",
        copy: "Add the customer criteria your team cares about and review how delivery questions, recordings, outcomes, and eligible credits will be handled.",
        href: "/get-pricing",
        label: "Set my campaign rules",
      }}
      eyebrow="Platform / Quality review"
      intro="Review what arrived against the campaign terms your team approved. Use available delivery details, recordings when applicable, outcome notes, and a defined review process."
      panelLabel="Review record"
      panelRows={[
        { label: "Campaign", value: "Approved customer criteria and delivery settings" },
        { label: "Delivery", value: "Available result details and timestamps" },
        { label: "Outcome", value: "Buyer note about what happened next" },
        { label: "Review", value: "Status under the agreed campaign terms" },
      ]}
      panelTitle="Quality review starts with written expectations."
      primaryAction={{ href: "/get-pricing", label: "Set my campaign rules" }}
      questions={[
        {
          question: "Are recordings always available?",
          answer:
            "No. Recording availability depends on the product, campaign setup, consent requirements, applicable law, and approved operating process.",
        },
        {
          question: "Does a missed sale qualify for a credit?",
          answer:
            "A sales outcome by itself does not determine eligibility. Review follows the agreed campaign criteria, billable or eligible delivery definition, and credit process.",
        },
        {
          question: "What should I include in a review request?",
          answer:
            "Use the campaign ID, delivery details, reason for review, relevant outcome notes, and any supporting information requested by the campaign terms.",
        },
      ]}
      secondaryAction={{ href: "/trust", label: "Visit the trust center" }}
      sections={[
        {
          code: "01",
          title: "Agree on the criteria first.",
          copy: "Quality cannot be reviewed fairly when the campaign terms are vague. Confirm the service area, schedule, customer criteria, eligibility rules, and review window before launch.",
          points: [
            "Write customer criteria in terms a buyer and reviewer can understand.",
            "Define billable or eligible delivery under the applicable agreement.",
            "Confirm the review window, required evidence, and possible outcomes.",
          ],
        },
        {
          code: "02",
          title: "Look at the delivery in context.",
          copy: "Use the details available for the specific result rather than relying on a summary number or memory of the interaction.",
          points: [
            "Check the campaign, time, destination, customer fields, and status.",
            "Review the recording only when it is enabled and available.",
            "Record what the buyer team did and what happened next.",
          ],
        },
        {
          code: "03",
          title: "Keep the decision easy to follow.",
          copy: "A clear review record should show the question, the relevant campaign term, the available evidence, the decision, and the next action.",
          points: [
            "Use a specific reason instead of a general quality label.",
            "Keep status and ownership visible until the review is resolved.",
            "Separate campaign eligibility from whether the buyer closed a sale.",
          ],
          link: { href: "/platform/reporting", label: "Continue to reporting" },
        },
      ]}
      statement="Review works when campaign terms, delivery details, and buyer outcomes stay connected."
      title="A quality-review process buyers can follow."
    />
  );
}
