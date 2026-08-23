import type {
  FoundationQuestion,
  FoundationSection,
} from "@/components/site/public-foundation-page";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

type LegalSummaryPageProps = {
  title: string;
  intro: string;
  statement: string;
  panelTitle: string;
  sections: FoundationSection[];
  questions: FoundationQuestion[];
};

export function LegalSummaryPage({
  title,
  intro,
  statement,
  panelTitle,
  sections,
  questions,
}: LegalSummaryPageProps) {
  return (
    <PublicFoundationPage
      closing={{
        title: "Confirm what applies before you rely on a summary.",
        copy: "Campaign-specific terms and applicable agreements govern campaign pricing, delivery, billing, review, credits, responsibilities, and data handling. Contact Ring On Demand if you need help finding the terms for your situation.",
        href: "/company/contact",
        label: "Ask a policy question",
      }}
      eyebrow="Legal information"
      intro={`${intro} This page is a plain-language website summary. It is not legal advice and does not replace an applicable agreement or campaign-specific terms.`}
      panelLabel="How to use this page"
      panelRows={[
        { label: "Purpose", value: "Plain-language website summary" },
        { label: "Scope", value: "General information, not campaign approval" },
        { label: "Authority", value: "Applicable agreements and campaign terms govern" },
        { label: "Questions", value: "Contact Ring On Demand for the relevant document" },
      ]}
      panelTitle={panelTitle}
      primaryAction={{ href: "/company/contact", label: "Ask a question" }}
      questions={questions}
      secondaryAction={{ href: "/trust", label: "Visit trust center" }}
      sections={sections}
      statement={statement}
      title={title}
    />
  );
}
