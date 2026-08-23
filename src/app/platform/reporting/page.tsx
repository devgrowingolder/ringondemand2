import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Campaign Reporting",
  description:
    "See how Ring On Demand can organize campaign activity, delivery details, buyer outcomes, and review status without using unverified performance claims.",
};

export default function ReportingPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Start with campaign reporting your team can explain.",
        copy: "Tell us which product, destination, and follow-up process you use. We will keep the campaign setup connected to the available delivery details.",
        href: "/get-pricing",
        label: "Plan my campaign",
      }}
      eyebrow="Platform / Reporting"
      intro="See campaign activity, delivery details, recorded buyer outcomes, and review status in context. Reporting should help your team ask better questions, not hide them behind unexplained numbers."
      panelLabel="Campaign view"
      panelRows={[
        { label: "Activity", value: "Calls, leads, or appointments received" },
        { label: "Context", value: "Campaign, date, destination, and available details" },
        { label: "Outcome", value: "Buyer-recorded follow-up status" },
        { label: "Review", value: "Open and completed review activity" },
      ]}
      panelTitle="Understand activity without losing the details."
      primaryAction={{ href: "/get-pricing", label: "Plan my campaign" }}
      questions={[
        {
          question: "Which metrics are available?",
          answer:
            "Available reporting depends on the product, delivery method, buyer workflow, and fields captured for the campaign. Confirm the exact views and definitions during setup.",
        },
        {
          question: "Does reporting show sales results?",
          answer:
            "Sales outcomes are available only when the buyer or a supported system records them. Delivery reporting and sales reporting should remain clearly separated.",
        },
        {
          question: "Can I export campaign activity?",
          answer:
            "Export and system access depend on the supported buyer workspace and campaign setup. Confirm the required format and fields before launch.",
        },
      ]}
      secondaryAction={{ href: "/platform/quality-review", label: "See quality review" }}
      sections={[
        {
          code: "01",
          title: "Begin with shared definitions.",
          copy: "A metric is useful only when everyone understands what it includes. Keep product, status, date range, timezone, and campaign criteria clear.",
          points: [
            "Distinguish a received result from a contacted customer or completed sale.",
            "Use the campaign timezone and agreed status definitions.",
            "Document any buyer-entered outcome fields and who maintains them.",
          ],
        },
        {
          code: "02",
          title: "Move from a total to the underlying record.",
          copy: "Summary activity can point to a question. The delivery record provides the context needed to understand it.",
          points: [
            "Filter by campaign, product, date, destination, and available status.",
            "Open the relevant delivery details when investigating a change.",
            "Use campaign IDs when requesting support or quality review.",
          ],
        },
        {
          code: "03",
          title: "Use outcomes to improve the team process.",
          copy: "Buyer-recorded outcomes can help identify staffing, follow-up, scheduling, or campaign questions when the data is complete enough to support the conclusion.",
          points: [
            "Check response coverage before changing campaign volume.",
            "Separate a delivery issue from a missed follow-up or sales outcome.",
            "Treat incomplete data as incomplete instead of filling in the story.",
          ],
          link: { href: "/resources", label: "Explore buyer resources" },
        },
      ]}
      statement="Useful reporting keeps every number close to the campaign and delivery that created it."
      title="Reporting built around questions your team can answer."
    />
  );
}
