import type { Metadata } from "next";
import { ArrowRight, ClipboardCheck, PhoneCall, Route } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = { title: "About", description: "Ring On Demand builds pay-per-call, pay-per-lead, and pay-per-appointment campaigns around the way buyers operate." };

export default function AboutPage() {
  return <SiteShell><main className="about-page">
    <section className="about-hero"><p className="section-code">[ About Ring On Demand ]</p><h1>Performance marketing built for teams that close.</h1><p>Ring On Demand helps insurance, home-services, legal, and financial teams buy inbound calls, real-time leads, and booked appointments around their actual capacity.</p></section>
    <section className="about-system"><div className="section-heading"><p className="section-code">[01] How we work</p><div><h2>From your buy box to live delivery.</h2><p>You tell us the market, schedule, volume, filters, and destination. We keep those campaign requirements connected through routing and review.</p></div></div><div className="about-system-grid">{[[ClipboardCheck,"Define","Choose what you want to buy and set the campaign rules."],[Route,"Route","Send each result to the phone, CRM, or calendar selected for the campaign."],[PhoneCall,"Review","See delivery details and record what happened next."]].map(([Icon,title,copy])=>{const I=Icon as typeof Route;return <article key={String(title)}><I aria-hidden="true"/><h3>{String(title)}</h3><p>{String(copy)}</p></article>})}</div></section>
    <section className="about-proof"><p className="section-code">[02] Clear terms</p><h2>Know what you are buying before you launch.</h2><p>Your campaign brief defines the delivery model, service area, hours, volume, qualification rules, billing event, and destination before submission.</p><Link className="button button-light" href="/customers">See the buyer experience<ArrowRight aria-hidden="true" size={16}/></Link></section>
  </main></SiteShell>;
}
