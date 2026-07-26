import type { Metadata } from "next";
import { ArrowRight, ClipboardCheck, PhoneCall, Route } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = { title: "About", description: "How Ring On Demand connects campaign intent, live demand, and buyer operations." };

export default function AboutPage() {
  return <SiteShell><main className="about-page">
    <section className="about-hero"><p className="section-code">[ About Ring On Demand ]</p><h1>Built around the moment demand becomes a conversation.</h1><p>Ring On Demand structures what buyers need, where it should go, and how the result should be reviewed—without separating the campaign from the operational handoff.</p></section>
    <section className="about-system"><div className="section-heading"><p className="section-code">[01] Our system</p><div><h2>One record from definition to review.</h2><p>Every public claim, campaign rule, and downstream handoff has an owner and a review state.</p></div></div><div className="about-system-grid">{[[ClipboardCheck,"Define","Document the buy box and unresolved decisions."],[Route,"Route","Send approved demand to the selected destination."],[PhoneCall,"Review","Keep delivery details and outcomes connected."]].map(([Icon,title,copy])=>{const I=Icon as typeof Route;return <article key={String(title)}><I aria-hidden="true"/><h3>{String(title)}</h3><p>{String(copy)}</p></article>})}</div></section>
    <section className="about-proof"><p className="section-code">[02] Proof standard</p><h2>Publish only what can survive diligence.</h2><p>Performance, compliance, customer, integration, ownership, and operating claims require a named source, owner, review date, and approval status before publication.</p><Link className="button button-light" href="/customers">See the proof approach<ArrowRight aria-hidden="true" size={16}/></Link></section>
  </main></SiteShell>;
}
