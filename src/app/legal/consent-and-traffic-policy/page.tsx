import type { Metadata } from "next";
import { LegalSummaryPage } from "@/app/legal/_components/legal-summary-page";

export const metadata: Metadata = {
  title: "Consent and Traffic Policy Information",
  description:
    "A plain-language guide to the traffic-source, customer-path, consent, recording, and responsibility questions buyers should confirm.",
};

export default function ConsentAndTrafficPolicyPage() {
  return (
    <LegalSummaryPage
      intro="Traffic sources, customer actions, communication methods, recordings, and party responsibilities can differ by campaign. Use this guide to identify what must be confirmed for the specific customer path."
      panelTitle="Connect each traffic source to the customer action, records, and responsible parties."
      questions={[
        {
          question: "Does this page certify that every campaign meets every legal requirement?",
          answer:
            "No. Requirements vary by product, location, traffic source, customer path, communication method, parties, agreement, and applicable law. This page does not certify a campaign or replace legal advice.",
        },
        {
          question: "Who is responsible for customer consent?",
          answer:
            "Responsibility depends on the customer path, parties, communication method, agreement, and applicable law. The campaign terms should identify the responsible party and the records available for the approved process.",
        },
        {
          question: "Are call recordings always available?",
          answer:
            "No general promise is made here. Recording availability and use depend on the campaign setup, disclosures, consent responsibilities, applicable requirements, and approved operating process.",
        },
      ]}
      sections={[
        {
          code: "01",
          title: "Describe the traffic source and customer path.",
          copy: "A source label alone does not explain what the customer saw or did. The campaign review should connect the source category to the actual path used for the campaign.",
          points: [
            "Identify the traffic-source category and customer-facing experience.",
            "Describe the customer action that leads to a call, lead, or appointment.",
            "Name which party controls each material step and record.",
          ],
        },
        {
          code: "02",
          title: "Confirm permission and communication responsibilities.",
          copy: "The parties should know which permission, disclosure, or consent process applies to the approved customer action and any later contact.",
          points: [
            "Confirm the approved customer action and communication method.",
            "Identify the party responsible for the relevant disclosures and records.",
            "Limit follow-up to the approved purpose, parties, channels, and applicable requirements.",
          ],
        },
        {
          code: "03",
          title: "Treat recording and review as campaign-specific choices.",
          copy: "Call recording, storage, access, disclosure, and use can involve different requirements. Enable or use recording only through the approved process for the campaign.",
          points: [
            "Confirm whether recording is enabled and which parties can access it.",
            "Confirm the disclosure, permission, retention, and review process that applies.",
            "Use the available records only for the approved campaign and review purposes.",
          ],
          link: { href: "/trust", label: "Review trust questions" },
        },
        {
          code: "04",
          title: "Recheck the setup when the campaign changes.",
          copy: "A new source, market, product, communication method, destination, or customer path can change the responsibilities that need review.",
          points: [
            "Document the requested change instead of extending the old approval by assumption.",
            "Review the relevant parties, records, disclosures, and operating steps again.",
            "Approve the updated campaign terms before the changed path goes live.",
          ],
        },
      ]}
      statement="Responsible traffic starts with a customer path and consent process that the parties can identify and review."
      title="Make traffic sources and consent responsibilities inspectable."
    />
  );
}
