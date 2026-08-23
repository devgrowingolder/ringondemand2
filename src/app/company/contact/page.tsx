import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Contact Ring On Demand",
  description:
    "Choose the right contact path for campaign pricing, booking, buyer support, partnerships, careers, or a general Ring On Demand question.",
};

export default function CompanyContactPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Not sure which path fits? Send one clear note.",
        copy: "Tell us what you are trying to accomplish and whether your question is about a new campaign, an existing campaign, a partnership, careers, or this website.",
        href: "mailto:hello@ringondemand.com?subject=Ring%20On%20Demand%20question",
        label: "Email Ring On Demand",
      }}
      eyebrow="Contact"
      intro="Choose the path that matches your next step. New buyers can request pricing or book a call. Existing buyers can sign in. Partners, candidates, and anyone with a general question can use the links below."
      panelLabel="Choose a contact path"
      panelRows={[
        { label: "New campaign", value: "Request pricing with your campaign details" },
        { label: "Conversation", value: "Book a call with the Ring On Demand team" },
        { label: "Existing buyer", value: "Sign in through the buyer login" },
        { label: "General", value: "Email hello@ringondemand.com" },
      ]}
      panelTitle="Start with the reason you are reaching out."
      primaryAction={{ href: "/get-pricing", label: "Get pricing" }}
      questions={[
        {
          question: "Do I need to enter my campaign information again?",
          answer:
            "Use the pricing or booking path that carries your saved campaign details forward. If you already have a campaign ID, include it when you contact the team.",
        },
        {
          question: "Where should an existing buyer ask about a delivery?",
          answer:
            "Start with the support or review channel listed in your campaign terms. Include the campaign ID and the delivery details needed to understand the question.",
        },
        {
          question: "Can publishers and referral partners use this page?",
          answer:
            "Yes. Use the partner path so your note includes the type of partnership, markets, and traffic or referral model you want to discuss.",
        },
      ]}
      secondaryAction={{ href: "/book-a-call", label: "Book a call" }}
      sections={[
        {
          code: "01",
          title: "Planning a new campaign?",
          copy: "Start with what you want to receive and where your team can handle it. The pricing flow keeps those answers together for the next conversation.",
          points: [
            "Choose calls, leads, or appointments.",
            "Add your service, locations, hours, volume, customer criteria, and delivery choice.",
            "Review the details once before requesting pricing or booking a call.",
          ],
          link: { href: "/get-pricing", label: "Request campaign pricing" },
        },
        {
          code: "02",
          title: "Already working with Ring On Demand?",
          copy: "Use the buyer login for account access. For a campaign or delivery question, follow the contact and review process named in your campaign terms.",
          points: [
            "Keep your campaign ID available when asking for help.",
            "Describe the delivery, date, and question in plain language.",
            "Use the agreed review path for eligibility, credit, or billing questions.",
          ],
          link: { href: "/login", label: "Open buyer login" },
        },
        {
          code: "03",
          title: "Reaching out for another reason?",
          copy: "Partnerships, community introductions, careers, and website questions each have a focused next step. Choose the closest path so your note reaches the right context.",
          points: [
            "Publishers and referral partners can start on the partners page.",
            "Candidates can review the careers page before introducing themselves.",
            "General and policy questions can be sent to hello@ringondemand.com.",
          ],
          link: { href: "/partners", label: "Explore partnerships" },
        },
      ]}
      statement="One clear contact path keeps your campaign details and next step easier to follow."
      title="Reach the right next step without starting over."
    />
  );
}
