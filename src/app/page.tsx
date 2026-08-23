import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
  HeartPulse,
  House,
  Landmark,
  MapPinned,
  PencilLine,
  PhoneCall,
  Route,
  Scale,
  ShieldCheck,
  SlidersHorizontal,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RoutingStage, WorkspaceOverview } from "@/components/home/signal-experience";
import { SiteShell } from "@/components/site/site-chrome";
import { createPageMetadata } from "@/lib/seo";

const setupFields = [
  { icon: PhoneCall, label: "What you want", value: "Calls, leads, or appointments" },
  { icon: MapPinned, label: "Where", value: "States and ZIP codes" },
  { icon: Clock3, label: "When", value: "Days, hours, and time zone" },
  { icon: Volume2, label: "How many", value: "Daily or weekly limit" },
  { icon: SlidersHorizontal, label: "Who you want to reach", value: "Customer criteria" },
  { icon: Route, label: "Where it should go", value: "Phone, workflow, or calendar" },
] as const;

const setupSteps = [
  {
    icon: PencilLine,
    label: "Tell us what you need",
    copy: "Choose calls, leads, or appointments, then add your market and goals.",
  },
  {
    icon: FileCheck2,
    label: "Review every detail",
    copy: "Confirm locations, hours, volume, customer criteria, and destination.",
  },
  {
    icon: CalendarCheck2,
    label: "Choose your next step",
    copy: "Request pricing or schedule time with our team.",
  },
] as const;

const industryLinks = [
  { icon: ShieldCheck, label: "Insurance", href: "/verticals#category-insurance" },
  { icon: House, label: "Home services", href: "/verticals#category-home-services" },
  { icon: Scale, label: "Legal", href: "/verticals#category-legal" },
  { icon: Landmark, label: "Financial", href: "/verticals#category-financial" },
  { icon: HeartPulse, label: "Health", href: "/verticals#category-addiction-rehab" },
] as const;

const expectations = [
  {
    icon: CheckCircle2,
    title: "We confirm availability",
    copy: "We check current options for your market and hours.",
  },
  {
    icon: BriefcaseBusiness,
    title: "We explain pricing",
    copy: "We share pricing and what it includes.",
  },
  {
    icon: FileCheck2,
    title: "You review what counts",
    copy: "We confirm what counts and what doesn’t.",
  },
  {
    icon: CalendarDays,
    title: "You choose the next step",
    copy: "Request pricing or talk with our team.",
  },
] as const;

export const metadata = createPageMetadata({
  title: "Inbound Calls, Leads, and Appointments",
  description:
    "Choose the market, hours, volume, customer criteria, and destination that fit your team. Review the details before requesting pricing.",
  path: "/",
});

export default function Home() {
  return (
    <SiteShell showFooterCta={false}>
      <main className="operating-home">
        <section className="operating-hero">
          <Image
            alt=""
            aria-hidden="true"
            className="operating-hero-art"
            fill
            priority
            sizes="100vw"
            src="/media/rid/signal-room-hero.png"
          />
          <div className="operating-hero-content">
            <p className="operating-eyebrow">
              <span aria-hidden="true" />
              Inbound calls / Real-time leads / Booked appointments
              <span aria-hidden="true" />
            </p>
            <h1>The better way to buy inbound calls.</h1>
            <p>
              Choose the market, hours, volume, customer criteria, and phone
              line that fit your team. Need leads or appointments instead?
              Select the format that works for you.
            </p>
            <div className="operating-hero-actions">
              <Link className="button button-purple" href="/get-pricing">
                Get pricing <ArrowRight aria-hidden="true" size={15} />
              </Link>
              <Link className="button operating-outline-button" href="#how-it-works">
                See how it works
              </Link>
            </div>
          </div>

          <div className="operating-setup-wrap">
            <p className="operating-setup-label"><span>Start your setup</span></p>
            <div className="operating-setup-rail" aria-label="Details needed for pricing">
              {setupFields.map(({ icon: Icon, label, value }) => (
                <Link className="operating-setup-field" href="/get-pricing" key={label}>
                  <Icon aria-hidden="true" />
                  <span><small>{label}</small><strong>{value}</strong></span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ))}
              <Link className="operating-setup-action" href="/get-pricing">
                Start my setup <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <RoutingStage />

        <section className="operating-process" aria-labelledby="operating-process-title">
          <div className="operating-centered-copy">
            <h2 id="operating-process-title">Set the details your team can handle.</h2>
            <p>
              Tell us where you work, when you can respond, and how much volume
              you want. Review every detail before pricing.
            </p>
          </div>
          <ol className="operating-step-list">
            {setupSteps.map(({ icon: Icon, label, copy }, index) => (
              <li key={label}>
                <span className="operating-step-icon"><Icon aria-hidden="true" /></span>
                <small>0{index + 1}</small>
                <h3>{label}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>

          <div className="operating-review-panel" aria-label="Illustrative setup review">
            <div className="operating-review-topbar">
              <strong>Review your setup</strong>
              <div>
                <Link href="/get-pricing">Edit setup</Link>
                <Link className="operating-review-primary" href="/get-pricing">Request pricing</Link>
              </div>
            </div>
            <div className="operating-review-tabs" aria-hidden="true">
              <span className="is-active">Your setup</span>
              <span>Review details</span>
              <span>Team notes</span>
            </div>
            <dl className="operating-review-grid">
              {[
                ["What you want", "Calls, leads, or appointments"],
                ["Where", "Your selected locations"],
                ["When", "Your selected schedule"],
                ["How many", "Your daily or weekly limit"],
                ["Who you want to reach", "Your customer criteria"],
                ["Where it should go", "Your selected destination"],
              ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className="operating-industries" aria-labelledby="operating-industries-title">
          <div className="operating-centered-copy">
            <h2 id="operating-industries-title">Choose your industry.</h2>
            <p>See what we’ll ask for and check current options for your market.</p>
          </div>
          <div className="operating-industry-grid">
            {industryLinks.map(({ icon: Icon, label, href }) => (
              <Link href={href} key={label}>
                <Icon aria-hidden="true" />
                <span>{label}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <WorkspaceOverview />

        <section className="operating-expectations" aria-labelledby="operating-expectations-title">
          <h2 id="operating-expectations-title">Know what happens before you start.</h2>
          <div>
            {expectations.map(({ icon: Icon, title, copy }) => (
              <article key={title}>
                <Icon aria-hidden="true" />
                <span><h3>{title}</h3><p>{copy}</p></span>
              </article>
            ))}
          </div>
        </section>

        <section className="operating-final-cta" aria-labelledby="operating-final-cta-title">
          <Image
            alt=""
            aria-hidden="true"
            className="operating-final-art"
            fill
            sizes="100vw"
            src="/media/rid/signal-room-hero.png"
          />
          <div>
            <h2 id="operating-final-cta-title">Ready to see what’s available for your team?</h2>
            <p>
              Share your market, hours, volume, customer criteria, and
              destination. We’ll review the details and follow up with pricing
              or scheduling options.
            </p>
            <div>
              <Link className="button button-purple" href="/get-pricing">
                Get pricing <ArrowRight aria-hidden="true" size={15} />
              </Link>
              <Link className="button operating-outline-button" href="/book-a-call">
                Talk to our team
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
