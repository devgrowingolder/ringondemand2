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
  isVerticalIndexable,
  type VerticalDefinition,
  verticalAvailabilityLabel,
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
    title:
      vertical.contentTier === 3
        ? `${vertical.name} availability`
        : `${vertical.name} campaign planning`,
    description: vertical.description,
    robots: isVerticalIndexable(vertical)
      ? undefined
      : { index: false, follow: true },
  };
}

function buildPricingHref(vertical: VerticalDefinition) {
  const brief = `I want to check ${vertical.name} availability. I need to choose calls, leads, or appointments, locations, hours, volume, customer criteria, and a delivery destination.`;
  const params = new URLSearchParams({
    brief,
    vertical: vertical.slug,
  });

  return `/get-pricing?${params.toString()}`;
}

function findRelatedVerticals(vertical: VerticalDefinition) {
  const related = vertical.relatedSlugs
    .map((slug) => verticalBySlug.get(slug))
    .filter((item): item is VerticalDefinition => Boolean(item));

  for (const item of catalogVerticals) {
    if (related.length >= 6) break;
    if (
      item.slug !== vertical.slug &&
      item.category === vertical.category &&
      !related.some((candidate) => candidate.slug === item.slug)
    ) {
      related.push(item);
    }
  }

  return related.slice(0, 6);
}

export default async function VerticalPage({ params }: Props) {
  const { slug } = await params;
  const vertical = verticalBySlug.get(slug);
  if (!vertical) notFound();

  const pricingHref = buildPricingHref(vertical);
  const categoryClass = categorySlug(vertical.category);
  const availabilityLabel = verticalAvailabilityLabel(vertical);
  const relatedVerticals = findRelatedVerticals(vertical);
  const isAvailabilityOnly = vertical.contentTier === 3;
  const decisionItems = vertical.campaignInputs.slice(0, 3);
  const processItems = isAvailabilityOnly
    ? [
        {
          title: "Share what your team needs",
          copy: "Choose your preferred delivery model, locations, hours, capacity, customer criteria, and destination.",
        },
        {
          title: "We check current availability",
          copy: `Our team confirms whether ${vertical.name} is supported for the requested market and delivery method.`,
        },
        {
          title: "Review the supported next step",
          copy: "If the request can be supported, review the available setup, pricing, and terms before deciding to continue.",
        },
      ]
    : [
        {
          title: "Customer situation",
          copy: vertical.customerIntent,
        },
        {
          title: "Details your team approves",
          copy: `Review ${vertical.customerCriteria
            .slice(0, 2)
            .join(" and ")
            .toLowerCase()} before anything starts.`,
        },
        {
          title: "Destination to confirm",
          copy: `Choose from ${vertical.deliveryDestinations
            .join(", ")
            .toLowerCase()}. The final method is confirmed before launch.`,
        },
      ];

  return (
    <SiteShell>
      <main className={`vertical-funnel vertical-tone-${categoryClass}`}>
        <section className="vertical-funnel-hero">
          <div className="vertical-funnel-copy">
            <p className="section-code">
              [ {vertical.category} / {availabilityLabel} ]
            </p>
            <h1 className={vertical.headline.length > 62 ? "is-long" : ""}>
              {vertical.headline}
            </h1>
            <p>{vertical.description}</p>
            <ul>
              <li>
                <Check aria-hidden="true" size={17} />
                Tell us whether you prefer calls, leads, or appointments
              </li>
              <li>
                <Check aria-hidden="true" size={17} />
                Set the locations, hours, and volume your team can support
              </li>
              <li>
                <Check aria-hidden="true" size={17} />
                Confirm availability before reviewing pricing or terms
              </li>
            </ul>
            <Link className="button button-dark" href={pricingHref}>
              Check {vertical.name} availability
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
            <Link
              className="text-link"
              href={`/verticals/${vertical.slug}/book`}
            >
              Plan a call
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>

          <div className="vertical-offer-card">
            <div className="vertical-offer-head">
              <span>Campaign planning</span>
              <span>{availabilityLabel}</span>
            </div>
            <h2>{vertical.name}</h2>
            <p>{vertical.statusNote}</p>
            <div className="vertical-offer-fields">
              <div>
                <span>Delivery</span>
                <strong>Choose calls, leads, or appointments</strong>
              </div>
              <div>
                <span>Locations</span>
                <strong>Set by your team</strong>
              </div>
              <div>
                <span>Schedule</span>
                <strong>Match your staffed hours</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{availabilityLabel}</strong>
              </div>
            </div>
            <Link className="button button-purple" href={pricingHref}>
              Start an availability request
            </Link>
          </div>
        </section>

        <section className="vertical-value-band">
          <div>
            <Route aria-hidden="true" />
            <span>Your requirements</span>
          </div>
          <ArrowRight aria-hidden="true" />
          <div>
            <ClipboardCheck aria-hidden="true" />
            <span>Availability check</span>
          </div>
          <ArrowRight aria-hidden="true" />
          <div>
            <PhoneCall aria-hidden="true" />
            <span>Clear next step</span>
          </div>
        </section>

        <section className="vertical-benefits">
          <p className="section-code">[01] Before pricing</p>
          <h2>Decide what your team needs us to review.</h2>
          <div>
            {decisionItems.map((item, index) => {
              const icons = [MapPinned, CalendarClock, SlidersHorizontal];
              const BenefitIcon = icons[index] ?? SlidersHorizontal;
              const detail =
                vertical.commonUseCases[index] ??
                "Add this requirement to the request, then confirm it before submitting.";

              return (
                <article key={item}>
                  <span>0{index + 1}</span>
                  <BenefitIcon aria-hidden="true" strokeWidth={1.25} />
                  <h3>{item}</h3>
                  <p>{detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="vertical-process">
          <div className="vertical-process-copy">
            <p className="section-code">
              [02] {isAvailabilityOnly ? "Availability first" : "What you define"}
            </p>
            <h2>
              {isAvailabilityOnly
                ? "We confirm the program before discussing a launch."
                : "Define the customer situation and delivery before anything starts."}
            </h2>
            <p>
              {isAvailabilityOnly
                ? vertical.statusNote
                : "The request records what your team wants. The final delivery details and commercial terms still require review and approval."}
            </p>
          </div>
          <ol>
            {processItems.map((item, index) => (
              <li key={item.title}>
                <span>{index + 1}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {!isAvailabilityOnly && (
          <section className="vertical-qualification">
            <div>
              <p className="section-code">[03] Customer criteria</p>
              <h2>Write down what a useful conversation looks like.</h2>
            </div>
            <div className="vertical-qualification-list">
              {vertical.customerCriteria.map((criterion, index) => (
                <div key={criterion}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{criterion}</strong>
                  <Check aria-hidden="true" />
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedVerticals.length > 0 && (
          <section className="vertical-related">
            <div>
              <p className="section-code">[ Related planning guides ]</p>
              <h2>Explore nearby services.</h2>
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
            <h2>What to know before you request pricing.</h2>
          </div>
          <VerticalFAQ items={vertical.faqItems} />
        </section>

        <section className="vertical-final-cta">
          <p className="section-code">[ Availability before commitment ]</p>
          <h2>Check {vertical.name} availability.</h2>
          <p>
            Share your preferred delivery model, locations, hours, volume,
            customer criteria, and destination. Review the details once before
            you send them.
          </p>
          <Link className="button button-light" href={pricingHref}>
            Start an availability request
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
          <Link
            className="button button-ghost-light"
            href={`/verticals/${vertical.slug}/book`}
          >
            Plan a call
          </Link>
        </section>
      </main>
    </SiteShell>
  );
}
