import type { Metadata } from "next";
import { LegalSummaryPage } from "@/app/legal/_components/legal-summary-page";

export const metadata: Metadata = {
  title: "Accessibility Information",
  description:
    "Learn how to report an accessibility barrier on the Ring On Demand website or request another contact path.",
};

export default function AccessibilityPage() {
  return (
    <LegalSummaryPage
      intro="Ring On Demand wants website visitors to be able to understand the offer, navigate the site, and complete an important next step. Use this page to report a barrier or request another contact path."
      panelTitle="Tell us what you were trying to do and what prevented it."
      questions={[
        {
          question: "Does this page claim a specific accessibility certification?",
          answer:
            "No. This page explains how to report a barrier and request another path. It does not state or certify conformance with a particular standard.",
        },
        {
          question: "What should I include in a barrier report?",
          answer:
            "Include the page address, the task you were trying to complete, the barrier you encountered, and the browser, device, or assistive technology involved when you are comfortable sharing that information.",
        },
        {
          question: "How can I contact Ring On Demand if a form is not usable?",
          answer:
            "Email hello@ringondemand.com with the subject “Accessibility help” and describe the task you need to complete. Do not include sensitive customer information in a general email.",
        },
      ]}
      sections={[
        {
          code: "01",
          title: "Start with the task that matters.",
          copy: "A useful accessibility report explains the intended task and the point where the website stopped being understandable or usable.",
          points: [
            "Name the page and the action you were trying to complete.",
            "Describe what happened and what you expected to happen.",
            "Include the affected content, control, form step, or navigation path when possible.",
          ],
        },
        {
          code: "02",
          title: "Share enough context to reproduce the barrier.",
          copy: "Device and access context can help identify a problem without requiring you to disclose more personal information than the report needs.",
          points: [
            "Include the browser and device when they are relevant.",
            "Name the assistive technology or input method involved when you are comfortable doing so.",
            "Avoid sending passwords, sensitive customer information, or unnecessary personal data.",
          ],
        },
        {
          code: "03",
          title: "Request another path for an important action.",
          copy: "If a website barrier prevents a pricing request, booking, account access, partner introduction, or job-interest submission, describe the action you need to complete in your email.",
          points: [
            "For a new campaign, state whether you want pricing or a conversation.",
            "For an existing campaign, include the campaign ID when it is safe and relevant.",
            "For a general website question, include the page address and the best non-sensitive context.",
          ],
          link: {
            href: "mailto:hello@ringondemand.com?subject=Accessibility%20help",
            label: "Request accessibility help",
          },
        },
      ]}
      statement="Accessibility feedback is most useful when it connects a real barrier to the task a visitor needs to complete."
      title="Report a website barrier or request another path."
    />
  );
}
