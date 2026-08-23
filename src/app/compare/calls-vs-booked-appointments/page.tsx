import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Inbound Calls vs Booked Appointments",
  description:
    "Compare inbound calls with booked appointments by customer timing, buyer staffing, calendar capacity, delivery, and review workflow.",
};

export default function CallsVsBookedAppointmentsPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Choose between live phone coverage and scheduled capacity.",
        copy: "Tell us when your team can answer calls or which appointment slots it can support. We will use the campaign details to review availability and prepare pricing.",
        href: "/get-pricing",
        label: "Compare my options",
      }}
      eyebrow="Comparison / Calls and appointments"
      intro="Inbound calls connect customers to an available phone team. Booked appointments place a customer conversation into an approved calendar slot. Each requires a different kind of capacity."
      panelLabel="Capacity comparison"
      panelRows={[
        { label: "Calls", value: "Agents available during a live delivery window" },
        { label: "Appointments", value: "Open calendar slots for scheduled conversations" },
        { label: "Destination", value: "Phone line or approved calendar" },
        { label: "Follow-through", value: "Answer coverage or meeting attendance process" },
      ]}
      panelTitle="Answer now or reserve time for later."
      primaryAction={{ href: "/get-pricing", label: "Compare my options" }}
      questions={[
        {
          question: "Which option requires more staff?",
          answer:
            "That depends on call duration, schedule, requested volume, appointment length, attendance, and the buyer's process. Plan around the capacity needed for the specific campaign.",
        },
        {
          question: "Can appointments be rescheduled?",
          answer:
            "Rescheduling responsibilities and supported methods depend on the campaign setup. Confirm who owns changes, cancellations, reminders, and calendar updates before launch.",
        },
        {
          question: "Can I run calls and appointments together?",
          answer:
            "Supported combinations and availability are campaign-specific. Give each product a clear schedule, destination, owner, capacity, and review process.",
        },
      ]}
      secondaryAction={{ href: "/products/appointments", label: "Explore appointments" }}
      sections={[
        {
          code: "01",
          title: "Compare the moment your team responds.",
          copy: "A call needs an available agent when the customer phones. An appointment needs a future slot that the customer and buyer team can attend.",
          points: [
            "For calls, map agent coverage to the selected days, hours, and timezone.",
            "For appointments, publish only the slots and meeting capacity the team can support.",
            "Choose help deciding when staffing or scheduling is still unresolved.",
          ],
        },
        {
          code: "02",
          title: "Compare delivery and preparation.",
          copy: "Call routing prioritizes an immediate connection. Appointment delivery should give the team enough context to prepare for a scheduled conversation.",
          points: [
            "Confirm the phone destination and overflow process for calls.",
            "Confirm the calendar, meeting details, timezone, and owner for appointments.",
            "Define which customer criteria and fields apply to each product.",
          ],
        },
        {
          code: "03",
          title: "Compare what can go wrong.",
          copy: "Calls and appointments have different operational risks. Put the review and recovery steps in writing rather than assuming they are the same.",
          points: [
            "Calls can be affected by missed routing, unavailable agents, or call eligibility questions.",
            "Appointments can be affected by calendar conflicts, cancellations, or attendance questions.",
            "Use the agreed terms to review the specific delivery and decide the next action.",
          ],
          link: { href: "/resources/call-center-readiness-checklist", label: "Check team readiness" },
        },
      ]}
      statement="Calls use live staffing capacity. Appointments use future calendar capacity."
      title="Inbound calls or booked appointments: when should the conversation happen?"
    />
  );
}
