import type { Metadata } from "next";
import { LegalSummaryPage } from "@/app/legal/_components/legal-summary-page";

export const metadata: Metadata = {
  title: "Billable Call Guidelines",
  description:
    "A plain-language guide to the campaign-specific details buyers should confirm when a call may be billable.",
};

export default function BillableCallGuidelinesPage() {
  return (
    <LegalSummaryPage
      intro="Billable-call rules can vary by campaign. Use this guide to identify the call event, duration rule, customer criteria, exclusions, evidence, and review process that need to be written down before launch."
      panelTitle="Define the billable event before the first call reaches your team."
      questions={[
        {
          question: "Is there one billable duration for every call?",
          answer:
            "No universal duration is stated on this page. Any duration threshold, start point, end point, and exception must come from the applicable campaign terms.",
        },
        {
          question: "Does a sale determine whether a call is billable?",
          answer:
            "A buyer's sales outcome is not automatically the billable event. Eligibility and billability depend on the event and criteria stated in the campaign terms.",
        },
        {
          question: "How should a buyer question a call?",
          answer:
            "Use the review channel and timing stated in the campaign terms. Include the campaign ID, call details, reason for review, and requested supporting information without adding unrelated customer data.",
        },
      ]}
      sections={[
        {
          code: "01",
          title: "Write the billable event in operational terms.",
          copy: "A buyer and reviewer should be able to identify when measurement starts, when it stops, and which call record is used without guessing from marketing copy.",
          points: [
            "Name the event that may become billable and the measurement source.",
            "State any applicable duration threshold and how transfers, holds, or disconnects are treated.",
            "State the service area, schedule, customer criteria, and routing conditions tied to eligibility.",
          ],
        },
        {
          code: "02",
          title: "Name exclusions and operating responsibilities.",
          copy: "The campaign terms should explain which delivery conditions may be excluded and which buyer-side conditions remain the buyer's responsibility.",
          points: [
            "Confirm how duplicates, wrong geography, ineligible services, or technical routing issues are evaluated when applicable.",
            "Confirm the buyer's responsibilities for availability, phone routing, staffing, and outcome notes.",
            "Do not assume a website example creates an exclusion or credit right.",
          ],
        },
        {
          code: "03",
          title: "Make review evidence and timing explicit.",
          copy: "A consistent review needs an identifier, a defined submission window, the relevant delivery details, and a stated outcome under the applicable terms.",
          points: [
            "Keep the campaign terms and available call details together.",
            "Use recordings only when they are available under the approved process and applicable requirements.",
            "Record the review request, evidence considered, decision, and next action.",
          ],
          link: { href: "/platform/quality-review", label: "Explore quality review" },
        },
      ]}
      statement="A billable call should be defined by the approved campaign terms, not by an assumed website rule."
      title="Make the billable call definition clear before launch."
    />
  );
}
