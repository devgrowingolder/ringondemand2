import type { Metadata } from "next";
import { ArrowRight, CalendarClock, Check, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-chrome";
import {
  verticalAvailabilityLabel,
  verticalBySlug,
  verticals,
} from "@/lib/verticals";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return verticals.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vertical = verticalBySlug.get((await params).slug);

  return vertical
    ? {
        title: `Plan a call about ${vertical.name}`,
        description: `Prepare your ${vertical.name} requirements before scheduling a Ring On Demand call.`,
        robots: { index: false, follow: true },
      }
    : {};
}

export default async function VerticalBookPage({ params }: Props) {
  const vertical = verticalBySlug.get((await params).slug);
  if (!vertical) notFound();

  const brief = `I want to check ${vertical.name} availability. I need to choose a delivery model, locations, hours, volume, customer criteria, and a destination.`;
  const entryParams = new URLSearchParams({
    brief,
    vertical: vertical.slug,
  });
  const bookingHref = `/book-a-call?${entryParams.toString()}`;
  const pricingHref = `/get-pricing?${entryParams.toString()}`;
  const availabilityLabel = verticalAvailabilityLabel(vertical);

  return (
    <SiteShell>
      <main className="vertical-book-page">
        <section className="vertical-book-hero">
          <div>
            <p className="section-code">
              {vertical.category} / {availabilityLabel}
            </p>
            <h1>Plan a call about {vertical.name}.</h1>
            <p>
              Share what your team needs first. We will use those details to
              check current availability, then keep the conversation focused
              on supported options, pricing, and next steps.
            </p>
            <Link className="button button-purple" href={bookingHref}>
              Prepare and schedule
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link className="text-link" href={pricingHref}>
              Request pricing instead
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="vertical-book-checklist">
            <div>
              <CalendarClock aria-hidden="true" />
              <h2>Before the call</h2>
            </div>
            {vertical.campaignInputs.slice(0, 4).map((item) => (
              <p key={item}>
                <Check aria-hidden="true" size={16} />
                {item}
              </p>
            ))}
          </div>
        </section>
        <section className="vertical-book-process">
          <p className="section-code">[ One set of details ]</p>
          <div>
            <ClipboardCheck aria-hidden="true" />
            <h2>Your {vertical.name} context stays with the next step.</h2>
            <p>{vertical.statusNote}</p>
            <p>
              The campaign builder opens with {vertical.name} selected and the
              planning prompt already prepared. You can edit and review it
              before entering contact information.
            </p>
          </div>
          <Link
            className="text-link"
            href={`/verticals/${vertical.slug}`}
          >
            Return to {vertical.name}
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </section>
      </main>
    </SiteShell>
  );
}
