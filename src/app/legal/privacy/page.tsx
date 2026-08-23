import type { Metadata } from "next";
import { LegalSummaryPage } from "@/app/legal/_components/legal-summary-page";

export const metadata: Metadata = {
  title: "Privacy Information",
  description:
    "A plain-language guide to the privacy questions Ring On Demand website visitors and campaign buyers should review.",
};

export default function PrivacyPage() {
  return (
    <LegalSummaryPage
      intro="Use this guide to understand which privacy questions to ask when you use the website, submit campaign details, or receive customer information."
      panelTitle="Know which information is involved and which document controls its use."
      questions={[
        {
          question: "Is this page the official privacy policy?",
          answer:
            "No. This page explains privacy questions in plain language. Review the official privacy policy and any applicable agreement for the terms that govern your use of Ring On Demand.",
        },
        {
          question: "Does one privacy statement cover every campaign?",
          answer:
            "Not necessarily. The parties, data fields, customer path, delivery method, retention needs, and applicable requirements can vary by campaign. Confirm those details in the applicable agreement and campaign terms.",
        },
        {
          question: "Where can I ask a privacy question?",
          answer:
            "Use the contact page or email hello@ringondemand.com. Include enough context to identify whether your question concerns the website, a buyer account, a campaign, or delivered customer information, but do not email sensitive customer information unless instructed through an approved channel.",
        },
      ]}
      sections={[
        {
          code: "01",
          title: "Start with the information you choose to submit.",
          copy: "Website forms may ask for campaign details and business contact information so the team can understand the request. Review each form before you submit it.",
          points: [
            "Enter contact information only in the designated contact fields.",
            "Do not place sensitive customer information in a campaign description or general email.",
            "Review the official privacy policy for the current website terms.",
          ],
          link: {
            href: "https://ringondemand.com/legal/privacy-policy",
            label: "Read the official privacy policy",
          },
        },
        {
          code: "02",
          title: "Treat campaign data as a separate operating question.",
          copy: "A campaign may involve customer information moving between sites, sources, Ring On Demand, buyers, and approved destinations. The applicable terms should identify the data and responsibilities for that campaign.",
          points: [
            "Confirm which customer fields are requested and why they are needed.",
            "Name the approved phone, system, calendar, and people who may receive the information.",
            "Confirm the applicable access, retention, security, and incident process before launch.",
          ],
          link: { href: "/trust", label: "Review trust questions" },
        },
        {
          code: "03",
          title: "Use the right channel for questions and requests.",
          copy: "A useful privacy request identifies the relationship and the information involved without exposing additional sensitive data in an unapproved channel.",
          points: [
            "State whether you are a website visitor, buyer, partner, candidate, or another party.",
            "Include the campaign or account identifier when it is relevant and safe to share.",
            "Follow the verification and response process described in the official policy or applicable agreement.",
          ],
          link: { href: "/company/contact", label: "Choose a contact path" },
        },
      ]}
      statement="Privacy is easier to manage when the data, purpose, destination, access, and governing terms are clear."
      title="Understand the privacy terms before information moves."
    />
  );
}
