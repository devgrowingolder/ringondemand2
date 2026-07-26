import type { Metadata } from "next";
import { ArrowUpRight, BadgeCheck, FileClock } from "lucide-react";
import { SiteShell } from "@/components/site/site-chrome";
import { brandNetwork, unresolvedBrandSubmissions } from "@/lib/brand-network";

export const metadata: Metadata = { title: "Brand network", description: "Public web properties submitted for the Ring On Demand brand network, with verification status shown." };
export default function BrandsPage() {
  return <SiteShell><main className="brands-page"><section className="brands-hero"><p className="section-code">[ Brand network ]</p><h1>Web properties with a visible proof trail.</h1><p>Website availability is verified separately from ownership. A property is not described as an in-house brand until ownership documentation is approved.</p></section><section className="brand-register"><div className="section-heading"><p className="section-code">[01] Verified online</p><div><h2>Submitted properties currently resolving on the public web.</h2></div></div><div className="brand-register-grid">{brandNetwork.map(brand=><article key={brand.domain}><div><BadgeCheck aria-hidden="true"/><span>Website verified · {brand.checkedAt}</span></div><h3>{brand.name}</h3><p>{brand.publicTitle}</p><small><FileClock aria-hidden="true"/>Ownership documentation pending</small><a href={brand.domain} rel="noreferrer" target="_blank">Visit property<ArrowUpRight aria-hidden="true" size={16}/></a></article>)}</div></section><section className="brand-review-queue"><p className="section-code">[02] Not published as brands</p><h2>Submitted names that could not be verified.</h2>{unresolvedBrandSubmissions.map(item=><p key={item}>{item}</p>)}</section></main></SiteShell>;
}
