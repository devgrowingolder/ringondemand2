import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-chrome";
import { verticalBySlug, verticals } from "@/lib/verticals";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return verticals.map(({ slug }) => ({ slug })); }
export const metadata: Metadata = { title: "Thank you", robots: { index: false, follow: false } };

export default async function VerticalThankYouPage({ params }: Props) {
  const vertical = verticalBySlug.get((await params).slug);
  if (!vertical) notFound();
  return (
    <SiteShell>
      <main className="funnel-thank-you">
        <CheckCircle2 aria-hidden="true" />
        <p className="section-code">{vertical.name} / Next step</p>
        <h1>Your {vertical.name} campaign details are ready.</h1>
        <p>Keep the campaign ID from your confirmation. Our team will use it to continue with the answers you already provided.</p>
        <div>
          <Link className="button button-dark" href="/build-campaign?intent=demo">Review my campaign</Link>
          <Link className="text-link" href={`/verticals/${vertical.slug}`}>Return to {vertical.name}<ArrowRight aria-hidden="true" size={15} /></Link>
        </div>
      </main>
    </SiteShell>
  );
}
