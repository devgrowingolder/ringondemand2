import type { Metadata } from "next";
import { ArrowUpRight, BadgeCheck, FileClock } from "lucide-react";
import { SiteShell } from "@/components/site/site-chrome";
import { brandNetwork, unresolvedBrandSubmissions } from "@/lib/brand-network";

export const metadata: Metadata = { title: "Brand network", description: "Explore public web properties submitted for the Ring On Demand publishing network, with verification status shown." };
export default function BrandsPage() {
  return <SiteShell><main className="brands-page"><section className="brands-hero"><p className="section-code">[ Publishing network ]</p><h1>Consumer sites built around high-intent markets.</h1><p>Explore the public web properties submitted for the Ring On Demand network. Website availability is verified separately from ownership.</p></section><section className="brand-register"><div className="section-heading"><p className="section-code">[01] Verified online</p><div><h2>Explore the sites currently available on the public web.</h2></div></div><div className="brand-register-grid">{brandNetwork.map(brand=><article key={brand.domain}><div><BadgeCheck aria-hidden="true"/><span>Website verified · {brand.checkedAt}</span></div><h3>{brand.name}</h3><p>{brand.publicTitle}</p><small><FileClock aria-hidden="true"/>Ownership documentation pending</small><a aria-label={`Visit ${brand.name} in a new tab`} href={brand.domain} rel="noreferrer" target="_blank">Visit {brand.name}<ArrowUpRight aria-hidden="true" size={16}/></a></article>)}</div></section><section className="brand-review-queue"><p className="section-code">[02] Verification queue</p><h2>Submitted names that are not yet published.</h2>{unresolvedBrandSubmissions.map(item=><p key={item}>{item}</p>)}</section></main></SiteShell>;
}
