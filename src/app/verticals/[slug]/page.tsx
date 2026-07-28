import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarClock,
  Check,
  ClipboardCheck,
  MapPinned,
  PhoneCall,
  Route,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-chrome";
import { VerticalFAQ } from "@/components/verticals/vertical-faq";
import {
  catalogVerticals,
  categorySlug,
  verticalBySlug,
  verticals,
} from "@/lib/verticals";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return verticals.map((vertical) => ({ slug: vertical.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vertical = verticalBySlug.get(slug);
  if (!vertical) return {};

  return {
    title: `${vertical.name} campaigns`,
    description: vertical.description,
  };
}

export default async function VerticalPage({ params }: Props) {
  const { slug } = await params;
  const vertical = verticalBySlug.get(slug);
  if (!vertical) notFound();

  const brief = `${vertical.name} inbound calls in Florida on weekdays from 9am to 5pm with a daily limit of 25 calls.`;
  const campaignHref = `/build-campaign?brief=${encodeURIComponent(brief)}`;
  const categoryClass = categorySlug(vertical.category);
  const relatedVerticals = catalogVerticals
    .filter(
      (item) =>
        item.slug !== vertical.slug && item.category === vertical.category,
    )
    .slice(0, 6);

  return (
    <SiteShell>
      <main className={`vertical-funnel vertical-tone-${categoryClass}`}>
        <section className="vertical-funnel-hero">
          <div className="vertical-funnel-copy">
            <p className="section-code">[ {vertical.category} ]</p>
            <h1 className={vertical.slug === "final-expense" ? "is-long" : ""}>
              {vertical.headline}
            </h1>
            <p>{vertical.description}</p>
            <ul>
              <li>
                <Check aria-hidden="true" size={17} />
                Choose your states, ZIPs, and delivery hours
              </li>
              <li>
                <Check aria-hidden="true" size={17} />
                Pick calls, leads, or appointments
              </li>
              <li>
                <Check aria-hidden="true" size={17} />
                Set the rules and volume your team can handle
              </li>
            </ul>
            <Link className="button button-dark" href={campaignHref}>
              Build this campaign
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
            <Link className="text-link" href={`/verticals/${vertical.slug}/book`}>
              Book a {vertical.name} call
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>

          <div className="vertical-offer-card">
            <div className="vertical-offer-head">
              <span>Campaign preview</span>
              <span>Buyer approval required</span>
            </div>
            <h2>{vertical.name}</h2>
            <p>
              Answer a few simple questions, then check every detail before
              you submit.
            </p>
            <div className="vertical-offer-fields">
              <div>
                <span>Delivery</span>
                <strong>Inbound calls</strong>
              </div>
              <div>
                <span>Locations</span>
                <strong>Needs your selection</strong>
              </div>
              <div>
                <span>Schedule</span>
                <strong>Needs your selection</strong>
              </div>
              <div>
                <span>Volume</span>
                <strong>Needs your selection</strong>
              </div>
            </div>
            <Link className="button button-purple" href={campaignHref}>
              Start my campaign
            </Link>
          </div>
        </section>

        <section className="vertical-value-band">
          <div>
            <Route aria-hidden="true" />
            <span>One set of answers</span>
          </div>
          <ArrowRight aria-hidden="true" />
          <div>
            <ClipboardCheck aria-hidden="true" />
            <span>One review</span>
          </div>
          <ArrowRight aria-hidden="true" />
          <div>
            <PhoneCall aria-hidden="true" />
            <span>One connected next step</span>
          </div>
        </section>

        <section className="vertical-benefits">
          <p className="section-code">[01] Your campaign</p>
          <h2>Choose where, when, and how much your team can receive.</h2>
          <div>
            {[
              [
                MapPinned,
                "Choose the market",
                "Tell us the states and ZIP codes where your team works.",
              ],
              [
                CalendarClock,
                "Set the schedule",
                "Choose the days and hours when your team can respond.",
              ],
              [
                SlidersHorizontal,
                "Control volume",
                "Tell us how many calls, leads, or appointments your team can handle.",
              ],
            ].map(([Icon, title, copy], index) => {
              const BenefitIcon = Icon as typeof MapPinned;
              return (
                <article key={String(title)}>
                  <span>0{index + 1}</span>
                  <BenefitIcon aria-hidden="true" strokeWidth={1.25} />
                  <h3>{String(title)}</h3>
                  <p>{String(copy)}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="vertical-process">
          <div className="vertical-process-copy">
            <p className="section-code">[02] How it works</p>
            <h2>Tell us. Review it. Get pricing.</h2>
            <p>
              Start in your own words or follow the guided questions. Nothing
              is submitted until you check the answers.
            </p>
          </div>
          <ol>
            <li>
              <span>1</span>
              <div>
                <strong>Choose your program</strong>
                <p>Pick calls, leads, or appointments and the service you sell.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <strong>Set your campaign rules</strong>
                <p>Add locations, hours, volume, customer criteria, and a destination.</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <strong>Request pricing or book a call</strong>
                <p>Review your answers once, then continue without entering them again.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="vertical-qualification">
          <div>
            <p className="section-code">[03] Customer criteria</p>
            <h2>Tell us what a good match looks like.</h2>
          </div>
          <div className="vertical-qualification-list">
            {vertical.qualificationPrompts.map((prompt, index) => (
              <div key={prompt}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{prompt}</strong>
                <Check aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        {relatedVerticals.length > 0 && (
          <section className="vertical-related">
            <div>
              <p className="section-code">[ Also in {vertical.category} ]</p>
              <h2>Explore related services.</h2>
            </div>
            <div>
              {relatedVerticals.map((item) => (
                <Link href={`/verticals/${item.slug}`} key={item.slug}>
                  <span>{item.name}</span>
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              ))}
              <Link href="/verticals">
                <span>View every vertical</span>
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </section>
        )}

        <section className="vertical-faq-section">
          <div>
            <p className="section-code">[04] Questions</p>
            <h2>Answers before you build.</h2>
          </div>
          <VerticalFAQ vertical={vertical.name} />
        </section>

        <section className="vertical-final-cta">
          <p className="section-code">[ Build your campaign ]</p>
          <h2>Get pricing for a {vertical.name} campaign.</h2>
          <p>
            Choose calls, leads, or appointments, then add your locations,
            hours, volume, and customer criteria.
          </p>
          <Link className="button button-light" href={campaignHref}>
            Build this campaign
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
          <Link className="button button-ghost-light" href={`/verticals/${vertical.slug}/book`}>
            Book a call
          </Link>
        </section>
      </main>
    </SiteShell>
  );
}
