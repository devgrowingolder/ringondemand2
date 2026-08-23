import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Compare Calls, Leads, and Appointments",
  description:
    "Compare inbound calls, real-time leads, booked appointments, paid clicks, and internal customer acquisition by workflow and team responsibility.",
};

export default function ComparePage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Choose the option that matches how your team sells.",
        copy: "Tell us whether your team answers live, follows up from customer details, or sells through scheduled meetings. Keep the choice open if you want help deciding.",
        href: "/get-pricing",
        label: "Compare my options",
      }}
      eyebrow="Buyer comparisons"
      intro="Compare the customer experience, buyer workload, destination, staffing needs, and campaign choices behind calls, leads, appointments, paid clicks, and internal acquisition."
      panelLabel="Quick comparison"
      panelRows={[
        { label: "Calls", value: "Customer conversation sent to an available phone team" },
        { label: "Leads", value: "Customer details sent into a follow-up process" },
        { label: "Appointments", value: "Customer conversation placed on an available calendar" },
        { label: "Other paths", value: "Clicks, forms, or an internally managed acquisition program" },
      ]}
      panelTitle="Different products create different work for your team."
      primaryAction={{ href: "/get-pricing", label: "Compare my options" }}
      questions={[
        {
          question: "Which option is best?",
          answer:
            "The right option depends on how your team responds, the customer journey, staffing, service area, schedule, capacity, sales process, destination, and current availability.",
        },
        {
          question: "Can a buyer use more than one product?",
          answer:
            "That depends on the vertical, locations, operating setup, and current availability. Plan each product around a clear destination, owner, and follow-up process.",
        },
        {
          question: "Do comparison pages include competitor claims?",
          answer:
            "This hub compares buyer workflows and responsibilities. A named-company comparison should be published only when every factual row has a current source and the page has completed review.",
        },
      ]}
      secondaryAction={{ href: "/resources", label: "Read buyer guides" }}
      sections={[
        {
          code: "01",
          title: "Calls versus customer forms.",
          copy: "A call begins with a live conversation. A form begins with customer details that your team still needs to assign and contact.",
          points: [
            "Calls require trained agents to be available during the selected schedule.",
            "Forms require a fast and clearly owned follow-up process.",
            "Compare phone coverage, response workflow, and the information your team needs.",
          ],
          link: { href: "/products/calls", label: "Explore inbound calls" },
        },
        {
          code: "02",
          title: "Leads versus booked appointments.",
          copy: "A lead gives your team a customer record to contact. An appointment places a conversation into an approved calendar slot.",
          points: [
            "Leads give the buyer more control over assignment and follow-up timing.",
            "Appointments require accurate calendar availability and a rescheduling process.",
            "Compare staffing, scheduling, customer details, and the action expected after delivery.",
          ],
          link: { href: "/products/leads", label: "Explore real-time leads" },
        },
        {
          code: "03",
          title: "Managed campaigns versus paid clicks.",
          copy: "Paid clicks send visitors to an experience the buyer usually builds and measures. A managed calls, leads, or appointments campaign focuses on an agreed customer result and delivery workflow.",
          points: [
            "Compare responsibility for landing pages, forms, routing, and follow-up.",
            "Define the billable event and customer criteria for each option.",
            "Include media cost, team time, technology, review, and operating effort in the comparison.",
          ],
          link: { href: "/how-it-works", label: "See the Ring On Demand process" },
        },
        {
          code: "04",
          title: "Managed campaigns versus building internally.",
          copy: "An internal program gives the buyer direct control but also makes the buyer responsible for sourcing, media, customer experience, routing, quality review, technology, and staffing.",
          points: [
            "List the people, systems, media, and operating processes each path requires.",
            "Compare what the buyer controls directly and what depends on campaign terms.",
            "Use the same definitions and time period when comparing cost or outcomes.",
          ],
          link: { href: "/trust", label: "Review trust questions" },
        },
      ]}
      statement="The useful comparison is not which label sounds better. It is which workflow your team can run well."
      title="Compare the work behind every customer opportunity."
    />
  );
}
