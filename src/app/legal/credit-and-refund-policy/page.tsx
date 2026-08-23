import type { Metadata } from "next";
import { LegalSummaryPage } from "@/app/legal/_components/legal-summary-page";

export const metadata: Metadata = {
  title: "Credit and Refund Policy Information",
  description:
    "A plain-language guide to the campaign-specific credit, refund, evidence, and review terms buyers should confirm.",
};

export default function CreditAndRefundPolicyPage() {
  return (
    <LegalSummaryPage
      intro="Credit and refund eligibility depends on the applicable agreement and campaign terms. This guide explains the questions a buyer should answer before relying on a review outcome."
      panelTitle="Know the eligible event, evidence, timing, and possible outcome."
      questions={[
        {
          question: "Does this page promise a credit or refund?",
          answer:
            "No. Eligibility, submission timing, evidence, review, and available outcomes depend on the applicable agreement and campaign-specific terms.",
        },
        {
          question: "Are a credit and a refund the same thing?",
          answer:
            "Not necessarily. A credit may be applied according to account or campaign terms, while a refund may involve a different payment outcome. The governing terms should name the available remedy.",
        },
        {
          question: "What information should support a review request?",
          answer:
            "Use the campaign ID, delivery identifier, reason tied to an eligible campaign term, and the supporting information requested by the review process.",
        },
      ]}
      sections={[
        {
          code: "01",
          title: "Start with the eligibility rule.",
          copy: "A delivery question becomes a credit or refund question only when the applicable terms define an eligible reason and an available outcome.",
          points: [
            "Identify the campaign term connected to the request.",
            "Distinguish a delivery issue from a buyer sales outcome or staffing issue.",
            "Confirm whether the applicable remedy is a credit, refund, replacement, another action, or no adjustment.",
          ],
        },
        {
          code: "02",
          title: "Follow the stated review window and evidence process.",
          copy: "The governing terms should state how a request is submitted, when it is due, which details are required, and who reviews it.",
          points: [
            "Submit through the support or review channel named for the campaign.",
            "Include the campaign and delivery identifiers needed to locate the record.",
            "Provide only relevant supporting information through an approved channel.",
          ],
          link: { href: "/platform/quality-review", label: "See the review workflow" },
        },
        {
          code: "03",
          title: "Keep the decision and account treatment visible.",
          copy: "A completed review should connect the request to the applicable term and make the resulting account action understandable to the responsible buyer contact.",
          points: [
            "Record the review status and the campaign term considered.",
            "Identify the resulting account treatment under the applicable agreement.",
            "Use the escalation path named in the agreement for unresolved questions.",
          ],
        },
      ]}
      statement="Credits and refunds should follow written campaign terms and a review process buyers can trace."
      title="Understand the review before expecting an adjustment."
    />
  );
}
