import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Campaign Delivery",
  description:
    "See how Ring On Demand can send calls, leads, and appointments to an approved phone, CRM, calendar, or workflow.",
};

export default function DeliveryPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Choose the destination your team already watches.",
        copy: "Tell us what you want to receive and where it should arrive. The supported setup is confirmed before the campaign starts.",
        href: "/get-pricing",
        label: "Plan my delivery",
      }}
      eyebrow="Platform / Delivery"
      intro="Match each product to the place your team can respond: calls to a phone line, lead details to a supported system, and appointments to an approved calendar."
      panelLabel="Delivery map"
      panelRows={[
        { label: "Calls", value: "Approved phone line" },
        { label: "Leads", value: "Phone, CRM, or supported workflow" },
        { label: "Appointments", value: "Calendar or scheduling process" },
        { label: "Status", value: "Available delivery confirmation" },
      ]}
      panelTitle="Send each customer opportunity to the right place."
      primaryAction={{ href: "/get-pricing", label: "Plan my delivery" }}
      questions={[
        {
          question: "Can one campaign use more than one destination?",
          answer:
            "That depends on the delivery model and approved setup. List the destinations your team needs and confirm the supported routing before launch.",
        },
        {
          question: "What happens if a destination is unavailable?",
          answer:
            "The agreed operating and support process should define how delivery status is reviewed and what action the buyer should take. Confirm those steps during setup.",
        },
        {
          question: "Do you support webhooks?",
          answer:
            "System and webhook support is campaign-specific. Choose your preferred workflow and the team will confirm the supported connection and required fields.",
        },
      ]}
      secondaryAction={{ href: "/platform/campaign-setup", label: "See campaign setup" }}
      sections={[
        {
          code: "01",
          title: "Match the product to the destination.",
          copy: "Calls, leads, and appointments need different actions from your team. Choose the destination based on how the team will respond.",
          points: [
            "Use a phone line that is staffed during the selected call schedule.",
            "Use a CRM or workflow that assigns lead follow-up clearly.",
            "Use a calendar with enough open capacity for requested appointments.",
          ],
        },
        {
          code: "02",
          title: "Keep useful context with the result.",
          copy: "The available campaign and customer details should help the receiving team understand what arrived and what to do next.",
          points: [
            "Keep the campaign ID available for support and review.",
            "Include the customer fields approved for the product and vertical.",
            "Show the delivery time, destination, and available status.",
          ],
        },
        {
          code: "03",
          title: "Confirm the setup before launch.",
          copy: "A selected destination is not the same as a verified connection. Review the supported method, required fields, access, test process, and owner first.",
          points: [
            "Name the person responsible for the phone, system, or calendar.",
            "Confirm required fields and a safe test record when appropriate.",
            "Document how the team will report delivery questions or changes.",
          ],
          link: { href: "/platform/quality-review", label: "Continue to quality review" },
        },
      ]}
      statement="A useful delivery reaches the system and the person prepared to act on it."
      title="Delivery that fits your team’s daily workflow."
    />
  );
}
