import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Real-Time Leads",
  description:
    "Learn how Ring On Demand can send customer lead details to your selected system based on your campaign settings.",
};

export default function LeadsProductPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Tell us which customer details your team needs.",
        copy: "Choose your service, coverage, hours, volume, customer criteria, and preferred destination. We will review availability and prepare the next step.",
        href: "/get-pricing?model=leads",
        label: "Get lead pricing",
      }}
      eyebrow="Real-time leads"
      intro="Receive customer details in the phone, CRM, or workflow selected for the campaign. Your team chooses the service area, schedule, volume, and customer criteria before pricing is prepared."
      panelLabel="Example lead setup"
      panelRows={[
        { label: "Customer", value: "Details defined by the campaign" },
        { label: "Coverage", value: "Your selected service areas" },
        { label: "Timing", value: "Delivery during the agreed schedule" },
        { label: "Destination", value: "Phone, CRM, or selected system" },
      ]}
      panelTitle="Put useful customer details in one record."
      primaryAction={{ href: "/get-pricing?model=leads", label: "Get lead pricing" }}
      questions={[
        {
          question: "What information arrives with a lead?",
          answer:
            "The fields depend on the vertical and approved campaign settings. Your team reviews the requested customer details and destination before the campaign starts.",
        },
        {
          question: "How quickly should my team follow up?",
          answer:
            "Set an internal response process that matches your staffing and sales cycle. Ring On Demand will confirm the delivery schedule for the campaign, but your team owns the follow-up process.",
        },
        {
          question: "Can leads go to my CRM?",
          answer:
            "CRM or system delivery depends on the destination supported for the campaign. You can choose a preferred destination and confirm the connection during setup.",
        },
      ]}
      secondaryAction={{ href: "/products/calls", label: "Compare with calls" }}
      sections={[
        {
          code: "01",
          title: "Best for teams with a follow-up process.",
          copy: "Leads give your team a customer record to review and contact. They fit teams that can assign ownership quickly and record what happened next.",
          points: [
            "Choose the fields your team needs to understand the customer request.",
            "Set the service area, schedule, and volume your follow-up team can support.",
            "Select the phone, CRM, or workflow that should receive the record.",
          ],
        },
        {
          code: "02",
          title: "Keep the campaign details attached.",
          copy: "The vertical, coverage, customer criteria, and destination remain part of the saved campaign details so sales and onboarding can work from the same answers.",
          points: [
            "Review the selected vertical and customer criteria before submission.",
            "Confirm which fields are required and which details remain unresolved.",
            "Use one campaign ID to connect the request with the next step.",
          ],
        },
        {
          code: "03",
          title: "Record outcomes and improve the process.",
          copy: "A clear follow-up process helps your team distinguish a delivery issue from a sales outcome. Use the agreed campaign terms when requesting review.",
          points: [
            "Assign the lead to a person or team in your selected system.",
            "Record contact attempts and the customer outcome in your own workflow.",
            "Submit an eligible review request with the relevant delivery details.",
          ],
          link: { href: "/platform/reporting", label: "Explore reporting" },
        },
      ]}
      statement="Your team receives the customer details it asked for, with the campaign context kept close."
      title="Customer leads your team can follow up on."
    />
  );
}
