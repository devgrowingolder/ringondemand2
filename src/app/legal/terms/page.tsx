import type { Metadata } from "next";
import { LegalSummaryPage } from "@/app/legal/_components/legal-summary-page";

export const metadata: Metadata = {
  title: "Terms of Service Information",
  description:
    "A plain-language guide to Ring On Demand website terms, campaign-specific terms, and the documents buyers should review.",
};

export default function TermsPage() {
  return (
    <LegalSummaryPage
      intro="Use this guide to distinguish general website terms from the campaign terms and agreements that govern a specific commercial relationship."
      panelTitle="Separate general website use from the terms for a specific campaign."
      questions={[
        {
          question: "Are the website terms the same as campaign terms?",
          answer:
            "No. General website terms address use of the website. A campaign may also be governed by an order, agreement, approved campaign details, pricing terms, and operating rules.",
        },
        {
          question: "What should I review before approving a campaign?",
          answer:
            "Review the product, service area, hours, volume, customer criteria, delivery method, billable event, pricing, quality-review process, credit rules, responsibilities, and any referenced agreement.",
        },
        {
          question: "What if a website summary and an agreement differ?",
          answer:
            "Use the applicable signed or accepted agreement and campaign-specific terms. Ask Ring On Demand to identify the governing document if the relationship is unclear.",
        },
      ]}
      sections={[
        {
          code: "01",
          title: "Use the official terms for website use.",
          copy: "The official terms of service govern use of the Ring On Demand website. This page does not restate or change those terms.",
          points: [
            "Review the current official terms rather than relying on a page summary.",
            "Use the website only for lawful, authorized business purposes.",
            "Ask a question before relying on a term you do not understand.",
          ],
          link: {
            href: "https://ringondemand.com/legal/terms-of-service",
            label: "Read the official terms of service",
          },
        },
        {
          code: "02",
          title: "Put campaign decisions in the campaign terms.",
          copy: "Product labels and website descriptions do not determine the commercial terms for every campaign. The approved campaign and applicable agreement should state what the buyer is requesting and how it will operate.",
          points: [
            "Confirm calls, leads, or appointments and the eligible service and locations.",
            "Confirm schedule, volume, customer criteria, destination, and billable event.",
            "Confirm pricing, review, credit, pause, change, and cancellation rules.",
          ],
          link: { href: "/get-pricing", label: "Prepare campaign details" },
        },
        {
          code: "03",
          title: "Keep the governing documents connected.",
          copy: "A campaign can involve more than one document. Keep the approved campaign details, order or agreement, pricing terms, and operating rules available to the people responsible for delivery and review.",
          points: [
            "Identify the document version and date used for approval.",
            "Record approved changes instead of relying on an informal summary.",
            "Escalate conflicting language through the contact named in the applicable agreement.",
          ],
        },
      ]}
      statement="Clear terms connect the website promise to the exact campaign a buyer approves."
      title="Know which terms govern each part of the relationship."
    />
  );
}
