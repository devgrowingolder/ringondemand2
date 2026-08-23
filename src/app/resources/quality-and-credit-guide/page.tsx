import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Quality Review and Credit Guide",
  description:
    "Learn how campaign terms, delivery details, buyer outcomes, evidence, review windows, and credit eligibility fit into a clear quality-review process.",
};

export default function QualityAndCreditGuidePage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Agree on the review rules before the campaign starts.",
        copy: "Confirm the eligible delivery definition, review window, available evidence, request process, decision owner, and possible outcomes in the applicable campaign terms.",
        href: "/get-pricing",
        label: "Review my campaign details",
      }}
      eyebrow="Resources / Quality and credits"
      intro="Quality review compares a specific delivery with the campaign terms the buyer approved. Credit eligibility depends on those terms, the available evidence, and the required review process."
      panelLabel="Review sequence"
      panelRows={[
        { label: "Define", value: "Eligible delivery and customer criteria" },
        { label: "Record", value: "Delivery details and buyer outcome" },
        { label: "Request", value: "Reason, evidence, and review timing" },
        { label: "Resolve", value: "Decision, owner, credit status, and next action" },
      ]}
      panelTitle="A review should connect the question to the agreed term."
      primaryAction={{ href: "/platform/quality-review", label: "See quality review" }}
      questions={[
        {
          question: "Does a customer who does not buy qualify for a credit?",
          answer:
            "Not by that fact alone. Sales outcome and delivery eligibility are different. Credit eligibility follows the applicable campaign terms and review process.",
        },
        {
          question: "Are review windows the same for every campaign?",
          answer:
            "Do not assume so. The applicable agreement should state the review window, required information, evidence, decision process, and possible outcomes for the campaign.",
        },
        {
          question: "What if evidence is unavailable?",
          answer:
            "State what is and is not available. The reviewer should apply the campaign terms to the available record without inventing missing facts.",
        },
      ]}
      secondaryAction={{ href: "/trust", label: "Visit the trust center" }}
      sections={[
        {
          code: "01",
          title: "Define eligible delivery in writing.",
          copy: "The agreement should make the billable or eligible event, customer criteria, service area, schedule, and important exceptions understandable to the buyer and reviewer.",
          points: [
            "Name the product and the event that creates a charge under the campaign terms.",
            "Define the relevant duration, fields, customer criteria, or scheduling requirements.",
            "State distribution, timing, recording, and destination terms when they affect review.",
            "Give a concrete example for any term that could reasonably be read two ways.",
          ],
        },
        {
          code: "02",
          title: "Keep the delivery and buyer outcome separate.",
          copy: "A delivery record shows what arrived. A buyer outcome shows what happened after the team received it. Both can matter, but they answer different questions.",
          points: [
            "Keep the campaign ID, delivery time, destination, customer fields, and available status.",
            "Use recordings only when they are enabled, available, and handled under the approved process.",
            "Record the buyer action and sales outcome without changing the original delivery record.",
            "Do not use a missed sale as the only reason a delivery should be credited.",
          ],
        },
        {
          code: "03",
          title: "Submit a specific review request.",
          copy: "A useful request identifies the delivery, the relevant campaign term, the reason for review, and the supporting information available within the required window.",
          points: [
            "Use the campaign ID and delivery identifier or timestamp.",
            "Choose a specific review reason connected to the applicable term.",
            "Add requested outcome notes or supporting evidence without unrelated customer data.",
            "Submit through the named support channel within the campaign review window.",
          ],
        },
        {
          code: "04",
          title: "Document the decision and next action.",
          copy: "The final record should make the decision easy to understand and show whether a credit applies, who owns follow-up, and whether campaign settings need review.",
          points: [
            "Record the relevant term, available evidence, decision, and decision owner.",
            "Show credit status separately from the buyer's sales outcome.",
            "Close the review only when the next action and ownership are clear.",
            "Use repeated issues to review staffing, routing, customer criteria, or campaign settings.",
          ],
          link: { href: "/platform/quality-review", label: "Explore the review workflow" },
        },
      ]}
      statement="A fair quality review uses written campaign terms, the specific delivery record, and a visible decision path."
      title="Quality review and credits, explained in plain language."
    />
  );
}
