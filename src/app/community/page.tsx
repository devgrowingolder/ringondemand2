import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, Handshake, PhoneCall, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = { title: "Pay Per Call Community", description: "Join the Ring On Demand pay-per-call community for buyers, operators, and approved partners." };
export default function CommunityPage() {
  return <SiteShell><main className="community-page"><section className="community-hero"><div><p className="section-code">[ Pay per call community ]</p><h1>Join the people building better pay-per-call programs.</h1><p>Connect with buyers, operators, and partners who work on campaign setup, routing, call quality, and responsible growth. You can also email hello@ringondemand.com directly.</p><Link className="button button-light" href="mailto:hello@ringondemand.com?subject=Join%20the%20Pay%20Per%20Call%20Community">Request an introduction<ArrowRight aria-hidden="true" size={16}/></Link></div><div className="community-panel">{[[PhoneCall,"Buyers"],[Handshake,"Partners"],[ShieldCheck,"Operators"]].map(([Icon,label])=>{const I=Icon as typeof PhoneCall;return <div key={String(label)}><I aria-hidden="true"/><span>{String(label)}</span></div>})}</div></section><section className="community-standards"><div className="section-heading"><p className="section-code">[01] Community standard</p><div><h2>Useful conversations start with clear expectations.</h2></div></div><div>{["Identify your role and markets","Keep campaign terms explicit","Do not publish unverified performance claims","Respect buyer, consumer, and partner data"].map(item=><p key={item}><BadgeCheck aria-hidden="true"/>{item}</p>)}</div></section></main></SiteShell>;
}
