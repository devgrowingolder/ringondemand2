import type { Metadata } from "next";
import { ArrowRight, CalendarClock, Check, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-chrome";
import { verticalBySlug, verticals } from "@/lib/verticals";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return verticals.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vertical = verticalBySlug.get((await params).slug);
  return vertical ? { title: `Book a ${vertical.name} call`, description: `Share your ${vertical.name} campaign details before scheduling a Ring On Demand call.` } : {};
}

export default async function VerticalBookPage({ params }: Props) {
  const vertical = verticalBySlug.get((await params).slug);
  if (!vertical) notFound();
  const brief = `${vertical.name} campaign`; 

  return (
    <SiteShell>
      <main className="vertical-book-page">
        <section className="vertical-book-hero">
          <div>
            <p className="section-code">{vertical.category} / Book a call</p>
            <h1>Book a call about {vertical.name} campaigns.</h1>
            <p>Share what your team wants to receive first, so the call can focus on availability, pricing, and next steps.</p>
            <Link className="button button-purple" href={`/build-campaign?intent=demo&brief=${encodeURIComponent(brief)}`}>
              Prepare and schedule <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="vertical-book-checklist">
            <div><CalendarClock aria-hidden="true" /><h2>Before the call</h2></div>
            {["Choose calls, leads, or appointments", "Confirm target locations", "Set hours and volume", "Review customer criteria"].map(item => <p key={item}><Check aria-hidden="true" size={16} />{item}</p>)}
          </div>
        </section>
        <section className="vertical-book-process">
          <p className="section-code">[ One set of details ]</p>
          <div><ClipboardCheck aria-hidden="true" /><h2>Enter your campaign details once.</h2><p>Your reviewed answers stay with you when you continue to scheduling.</p></div>
          <Link className="text-link" href={`/verticals/${vertical.slug}`}>Return to {vertical.name}<ArrowRight aria-hidden="true" size={15} /></Link>
        </section>
      </main>
    </SiteShell>
  );
}
