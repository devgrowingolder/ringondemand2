import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Call Center Readiness Checklist",
  description:
    "Check staffing, phone routing, schedules, customer criteria, agent preparation, outcome tracking, and quality review before requesting inbound calls.",
};

export default function CallCenterReadinessChecklistPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Match requested calls to the team ready to answer them.",
        copy: "Use your real phone coverage, locations, schedule, capacity, customer criteria, and destination when planning the campaign.",
        href: "/get-pricing?model=calls",
        label: "Plan my call campaign",
      }}
      eyebrow="Resources / Call center readiness"
      intro="Inbound calls work best when the phone team, routing, schedule, customer criteria, outcome process, and quality-review responsibilities are clear before the first call arrives."
      panelLabel="Readiness check"
      panelRows={[
        { label: "People", value: "Trained agents, schedule owner, and backup coverage" },
        { label: "Phone", value: "Approved number, routing, queue, and failure process" },
        { label: "Process", value: "Customer criteria, agent steps, and outcomes" },
        { label: "Review", value: "Recordings when available, evidence, and support owner" },
      ]}
      panelTitle="Prepare the sales floor before increasing call volume."
      primaryAction={{ href: "/get-pricing?model=calls", label: "Plan my call campaign" }}
      questions={[
        {
          question: "How many agents do I need?",
          answer:
            "The answer depends on requested volume, arrival pattern, call duration, schedule, queue design, agent availability, other work, and service expectations. Start with measured team capacity.",
        },
        {
          question: "What if my team cannot answer after hours?",
          answer:
            "Set delivery hours that match staffed coverage. Confirm overflow, voicemail, holiday, and unavailable-destination behavior in the campaign setup.",
        },
        {
          question: "Should agents know the campaign criteria?",
          answer:
            "Yes. Agents and reviewers should understand the agreed service area, customer criteria, expected conversation, outcome fields, and process for reporting a delivery question.",
        },
      ]}
      secondaryAction={{ href: "/products/calls", label: "Explore inbound calls" }}
      sections={[
        {
          code: "01",
          title: "Confirm staffing and schedule coverage.",
          copy: "Use the hours and volume the current team can support. Include breaks, meetings, training, absences, holidays, and other phone work.",
          points: [
            "Name the primary agents, backup coverage, schedule owner, and escalation contact.",
            "Map staffed hours to the correct timezone and requested delivery windows.",
            "Choose a starting volume based on measured coverage rather than a sales target alone.",
            "Define the process for pausing or changing volume when staffing changes.",
          ],
        },
        {
          code: "02",
          title: "Test the phone path.",
          copy: "The destination should reach the intended team during the selected schedule and have a known response when routing or staffing is unavailable.",
          points: [
            "Confirm the approved number, routing rules, queue, caller experience, and responsible owner.",
            "Test transfers, queue limits, voicemail, overflow, and after-hours behavior when applicable.",
            "Confirm which delivery and call details the buyer team can access.",
            "Document how agents report a routing issue or unexpected call pattern.",
          ],
        },
        {
          code: "03",
          title: "Prepare agents for the conversation.",
          copy: "Give agents the product context and customer criteria they need without assuming the customer will use internal campaign language.",
          points: [
            "Explain the customer path, service area, agreed criteria, and likely reason for the call.",
            "Provide the approved opening, discovery questions, disclosures, and escalation steps.",
            "Define the buyer outcome options agents should record after each conversation.",
            "Coach the team on the difference between a delivery question and a missed sale.",
          ],
        },
        {
          code: "04",
          title: "Set the review process.",
          copy: "Everyone involved should know which evidence is available, who reviews a question, how quickly it must be raised, and what decisions are possible.",
          points: [
            "Confirm recording availability and access only when enabled for the campaign.",
            "Keep the campaign ID, call details, outcome note, and reason for review together.",
            "Follow the campaign-specific review window and evidence requirements.",
            "Assign an owner for open questions, decisions, and team follow-up.",
          ],
          link: { href: "/resources/quality-and-credit-guide", label: "Read the quality and credit guide" },
        },
      ]}
      statement="The best starting call volume is the volume your trained phone team can answer and review well."
      title="Is your phone team ready for inbound customer calls?"
    />
  );
}
