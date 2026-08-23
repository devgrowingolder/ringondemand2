import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Booked Appointments",
  description:
    "Learn how Ring On Demand can place customer appointments on an approved calendar based on your schedule and campaign settings.",
};

export default function AppointmentsProductPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Tell us which appointment slots your team can support.",
        copy: "Share your service, coverage, calendar availability, volume, customer criteria, and scheduling destination. We will review availability and prepare pricing.",
        href: "/get-pricing?model=appointments",
        label: "Get appointment pricing",
      }}
      eyebrow="Booked appointments"
      intro="Receive scheduled conversations in the calendar selected for the campaign. You choose the service area, available times, appointment capacity, and customer criteria before pricing is prepared."
      panelLabel="Example appointment setup"
      panelRows={[
        { label: "Service", value: "Your selected vertical" },
        { label: "Availability", value: "Approved appointment windows" },
        { label: "Capacity", value: "The number of slots your team can take" },
        { label: "Destination", value: "Your selected calendar" },
      ]}
      panelTitle="Fill approved calendar time with customer conversations."
      primaryAction={{
        href: "/get-pricing?model=appointments",
        label: "Get appointment pricing",
      }}
      questions={[
        {
          question: "Who chooses the appointment times?",
          answer:
            "Your team provides the available days, times, timezone, and capacity. The exact scheduling process and supported calendar are confirmed during setup.",
        },
        {
          question: "What happens when a customer needs to reschedule?",
          answer:
            "Rescheduling and cancellation responsibilities depend on the approved campaign terms and scheduling workflow. Confirm those steps before launch.",
        },
        {
          question: "How are appointments reviewed?",
          answer:
            "The available scheduling and customer details can be reviewed against the agreed criteria. Eligibility for any credit follows the campaign terms.",
        },
      ]}
      secondaryAction={{ href: "/products/leads", label: "Compare with leads" }}
      sections={[
        {
          code: "01",
          title: "Best for teams that sell through scheduled meetings.",
          copy: "Appointments fit teams that want a customer conversation placed into an available calendar slot. Keep enough calendar capacity open for the volume you request.",
          points: [
            "Set the days, times, timezone, meeting length, and available capacity.",
            "Choose the service area and customer situation your team can support.",
            "Select the calendar or scheduling destination for the campaign.",
          ],
        },
        {
          code: "02",
          title: "Define what should be confirmed before booking.",
          copy: "List the customer details and questions that matter for the meeting. Your team reviews the setup before any scheduling request moves forward.",
          points: [
            "Confirm the service, location, and customer criteria for the appointment.",
            "Choose which details should appear with the calendar event.",
            "Keep unclear answers visible for review instead of filling them in automatically.",
          ],
        },
        {
          code: "03",
          title: "Keep scheduling and review connected.",
          copy: "The campaign settings provide context for each appointment so the team can prepare, record the outcome, and follow the agreed review process.",
          points: [
            "See the scheduled time, customer details, campaign, and destination together.",
            "Record whether the appointment occurred and what happened next.",
            "Review cancellations or eligibility questions under the campaign terms.",
          ],
          link: { href: "/platform/delivery", label: "Explore delivery" },
        },
      ]}
      statement="Your team receives a scheduled customer conversation, not another task to coordinate."
      title="Appointments placed into your team’s schedule."
    />
  );
}
