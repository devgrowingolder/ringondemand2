import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Route,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = {
  title: "Getting started",
  description:
    "See the information Ring On Demand needs to review, route, and prepare a campaign.",
};

const onboardingSteps = [
  {
    icon: SlidersHorizontal,
    title: "Build your buy box",
    copy: "Choose the vertical, delivery type, locations, hours, volume, and qualification rules.",
  },
  {
    icon: ClipboardCheck,
    title: "Review the campaign",
    copy: "Check one clear summary. Edit anything that is wrong or still undecided before you submit.",
  },
  {
    icon: Route,
    title: "Confirm delivery",
    copy: "Tell us whether demand should route to a phone line, CRM, calendar, or another approved destination.",
  },
  {
    icon: ShieldCheck,
    title: "Approve the setup",
    copy: "Review the agreed campaign details, complete any required business checks, and approve the launch setup.",
  },
];

const readyList = [
  "The vertical or service you want",
  "Calls, leads, appointments, or help choosing",
  "States, ZIP codes, or service areas",
  "Days, hours, timezone, and expected volume",
  "The rules your team wants applied",
  "A phone, CRM, calendar, or preferred destination",
  "One contact who can approve the next step",
];

export default function OnboardingPage() {
  return (
    <SiteShell>
      <main className="onboarding-page">
        <section className="onboarding-hero">
          <div>
            <p className="section-code">Getting started</p>
            <h1>One campaign brief. One review. One clear handoff.</h1>
            <p>
              You do not need to know every technical detail. Start with what
              you want to buy, and the guided flow will show you what is still
              needed before the campaign can move forward.
            </p>
            <div>
              <Link className="button button-purple" href="/build-campaign">
                Start my campaign
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
              <Link className="button button-outline" href="/verticals">
                Browse verticals
              </Link>
            </div>
          </div>
          <aside>
            <span>What you will do</span>
            {["Choose", "Confirm", "Connect", "Approve"].map((item, index) => (
              <div key={item}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <p>{item}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="onboarding-process">
          <div className="section-heading">
            <p className="section-code">[01] The process</p>
            <div>
              <h2>Four steps from interest to a review-ready campaign.</h2>
              <p>
                Your answers stay connected, so pricing, scheduling, routing,
                and onboarding do not need the same information entered again.
              </p>
            </div>
          </div>
          <div>
            {onboardingSteps.map(({ icon: Icon, title, copy }, index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" strokeWidth={1.4} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="onboarding-ready">
          <div>
            <p className="section-code">[02] What to have ready</p>
            <h2>A short list is enough to begin.</h2>
            <p>
              If you are unsure about a delivery type, qualification rule, or
              destination, choose “Help me choose.” The team can resolve it
              with you before activation.
            </p>
          </div>
          <div>
            {readyList.map((item) => (
              <p key={item}>
                <Check aria-hidden="true" size={17} />
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="onboarding-cta">
          <p className="section-code">Ready to begin?</p>
          <h2>Tell us what your team wants to receive.</h2>
          <p>
            Start in plain language. Review every field before anything is
            submitted.
          </p>
          <Link className="button button-light" href="/build-campaign">
            Build my campaign
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </section>
      </main>
    </SiteShell>
  );
}
