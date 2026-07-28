import type { Metadata } from "next";
import { ArrowRight, ClipboardCheck, PhoneCall, Route } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = { title: "About", description: "Ring On Demand builds pay-per-call, pay-per-lead, and pay-per-appointment campaigns around the way buyers operate." };

export default function AboutPage() {
  return <SiteShell><main className="about-page">
    <section className="about-hero"><p className="section-code">[ About Ring On Demand ]</p><h1>Performance marketing built for teams that close.</h1><p>Ring On Demand helps insurance, home-services, legal, and financial teams buy inbound calls, real-time leads, and booked appointments around their actual capacity.</p></section>
    <section className="about-system"><div className="section-heading"><p className="section-code">[01] How we work</p><div><h2>From your campaign details to delivery.</h2><p>You choose calls, leads, or appointments and tell us your service area, schedule, volume, rules, and destination. We keep those answers connected through setup and review.</p></div></div><div className="about-system-grid">{[[ClipboardCheck,"Choose","Pick what you want to receive and set the campaign rules."],[Route,"Deliver","Send each result to the phone, system, or calendar selected for the campaign."],[PhoneCall,"Review","See delivery details and record what happened next."]].map(([Icon,title,copy])=>{const I=Icon as typeof Route;return <article key={String(title)}><I aria-hidden="true"/><h3>{String(title)}</h3><p>{String(copy)}</p></article>})}</div></section>
    <section className="about-proof"><p className="section-code">[02] Clear terms</p><h2>Know what you are buying before you begin.</h2><p>Your campaign summary shows what you want to receive, your service, locations, hours, volume, customer criteria, billable event, and destination before you submit.</p><Link className="button button-light" href="/customers">See the buyer experience<ArrowRight aria-hidden="true" size={16}/></Link></section>
  </main></SiteShell>;
}
