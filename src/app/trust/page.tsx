import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "Understand the questions Ring On Demand buyers should confirm about traffic sources, customer consent, recording, delivery, quality review, data, and disputes.",
};

export default function TrustPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Put the important terms in writing before launch.",
        copy: "Use your campaign review to confirm sourcing, customer criteria, consent responsibilities, recording, delivery, quality review, data handling, and support contacts.",
        href: "/get-pricing",
        label: "Review my campaign",
      }}
      eyebrow="Trust center"
      intro="Trust starts with clear responsibilities and campaign-specific terms. This page explains the questions buyers should confirm; it does not replace an agreement, legal advice, or a campaign review."
      panelLabel="Before launch"
      panelRows={[
        { label: "Source", value: "Customer path and traffic-source category" },
        { label: "Permission", value: "Consent responsibilities and available records" },
        { label: "Delivery", value: "Destination, fields, schedule, and access" },
        { label: "Review", value: "Eligibility, evidence, timing, and support owner" },
      ]}
      panelTitle="Know what to confirm, who owns it, and where it is written."
      primaryAction={{ href: "/get-pricing", label: "Review my campaign" }}
      questions={[
        {
          question: "Does this page certify every campaign?",
          answer:
            "No. Requirements and responsibilities vary by product, vertical, location, traffic source, communication method, agreement, and applicable law. Confirm the terms for your campaign.",
        },
        {
          question: "Who is responsible for customer consent?",
          answer:
            "Responsibility depends on the customer path, parties involved, communication method, agreement, and applicable law. The campaign review should identify the responsible party and available records.",
        },
        {
          question: "How should a buyer report a concern?",
          answer:
            "Use the support channel and review process named in the campaign terms. Include the campaign ID, delivery details, reason for concern, and requested supporting information.",
        },
      ]}
      secondaryAction={{ href: "/platform/quality-review", label: "See quality review" }}
      sections={[
        {
          code: "01",
          title: "Understand how the customer reached the campaign.",
          copy: "Traffic sourcing can involve different sites, media, partners, and customer actions. Ask for a plain explanation that matches the specific campaign.",
          points: [
            "Identify the traffic-source category and customer path used for the campaign.",
            "Confirm which party controls the customer-facing experience and records.",
            "Do not treat a general website statement as proof for every delivery.",
          ],
        },
        {
          code: "02",
          title: "Confirm consent and recording responsibilities.",
          copy: "Customer permission, disclosures, calling or messaging rules, and recording requirements can vary. The responsible parties and available records should be named before launch.",
          points: [
            "Document the approved customer action and communication method.",
            "Confirm who maintains the relevant consent or permission records.",
            "Enable recording only under the approved process and applicable requirements.",
          ],
        },
        {
          code: "03",
          title: "Protect data through clear access and delivery choices.",
          copy: "Use only the customer fields needed for the campaign, choose an approved destination, and define who can access the information after delivery.",
          points: [
            "Review the requested fields and remove information the workflow does not need.",
            "Confirm the receiving phone, system, calendar, and responsible owner.",
            "Use the applicable privacy, retention, security, and incident process.",
          ],
          link: { href: "/platform/delivery", label: "Explore delivery controls" },
        },
        {
          code: "04",
          title: "Make quality review and disputes inspectable.",
          copy: "The applicable agreement should explain eligible delivery, review timing, required evidence, possible outcomes, and the support path for unresolved questions.",
          points: [
            "Keep campaign terms and delivery details available to the reviewer.",
            "Separate a delivery question from the buyer's sales outcome.",
            "Record the question, evidence, decision, owner, and next action.",
          ],
          link: { href: "/platform/quality-review", label: "Explore quality review" },
        },
      ]}
      statement="Trust grows when buyers can see the rules, responsibilities, records, and review path."
      title="Clear campaign terms before customer information moves."
    />
  );
}
