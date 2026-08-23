import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Inbound Calls",
  description:
    "Learn how Ring On Demand can send inbound customer calls to your team based on your service area, schedule, capacity, and campaign terms.",
};

export default function CallsProductPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Tell us when your team can answer.",
        copy: "Share your service, locations, hours, call capacity, and customer criteria. We will use those details to review availability and prepare pricing.",
        href: "/get-pricing?model=calls",
        label: "Get call pricing",
      }}
      eyebrow="Inbound calls"
      intro="Customers call while they are actively looking for help. You choose the service area, schedule, capacity, customer criteria, and phone number before pricing is prepared."
      panelLabel="Example call setup"
      panelRows={[
        { label: "Service", value: "Your selected vertical" },
        { label: "Coverage", value: "States, service areas, or ZIP codes" },
        { label: "Schedule", value: "The hours your team can answer" },
        { label: "Destination", value: "Your approved phone line" },
      ]}
      panelTitle="Send customer calls to the right team."
      primaryAction={{ href: "/get-pricing?model=calls", label: "Get call pricing" }}
      questions={[
        {
          question: "What makes a call billable?",
          answer:
            "The applicable duration, customer criteria, service area, schedule, and review rules are defined in the approved campaign terms. Review those terms before the campaign starts.",
        },
        {
          question: "Can I choose when calls arrive?",
          answer:
            "Yes. Add the days, hours, timezone, and capacity your team can support. Availability and delivery settings are confirmed for each campaign.",
        },
        {
          question: "What happens if a call needs review?",
          answer:
            "The available call details and recording, when applicable, can be reviewed against the campaign terms. Credit eligibility follows the agreed review process.",
        },
      ]}
      secondaryAction={{ href: "/how-it-works", label: "See how it works" }}
      sections={[
        {
          code: "01",
          title: "Best for teams ready to answer now.",
          copy: "Inbound calls work best when trained agents are available during the agreed schedule. If your team needs time to research each customer first, leads or appointments may be a better fit.",
          points: [
            "Set the days, hours, timezone, and number of calls your team can handle.",
            "Choose the states, service areas, or ZIP codes your team serves.",
            "Send calls to the phone line selected for the campaign.",
          ],
        },
        {
          code: "02",
          title: "Define the customer before the phone rings.",
          copy: "Write the customer criteria in plain language. Your team reviews the complete setup before requesting pricing or moving to the next step.",
          points: [
            "Choose the vertical and the customer situation your team can serve.",
            "Confirm required questions and any conditions that need review.",
            "Keep unresolved details visible instead of guessing the answer.",
          ],
        },
        {
          code: "03",
          title: "Review each call against the agreed terms.",
          copy: "Call details stay connected to the campaign settings so your team can understand what arrived and follow the applicable review process.",
          points: [
            "See the campaign, delivery time, destination, and available call details.",
            "Listen to a recording when recording is enabled and available for the campaign.",
            "Add an outcome note and request review when the campaign terms allow it.",
          ],
          link: { href: "/platform/quality-review", label: "Explore quality review" },
        },
      ]}
      statement="Your agents receive a customer conversation, not a form waiting in a queue."
      title="Inbound calls for teams ready to talk."
    />
  );
}
