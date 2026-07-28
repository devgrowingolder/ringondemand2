import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, FileSearch, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { EditorialHero } from "@/components/site/editorial-page";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Ring On Demand research, campaign operations guidance, and buyer resources.",
};

const resources = [
  {
    type: "Research",
    title: "Why live conversations matter",
    copy: "A source-led look at intent, immediate engagement, performance-based pricing, and lead quality.",
    icon: FileSearch,
  },
  {
    type: "Campaign operations",
    title: "Build campaign details your whole team can use",
    copy: "How to document what you want to receive, your service, locations, schedule, volume, customer criteria, and destination.",
    icon: BookOpen,
  },
  {
    type: "Proof standards",
    title: "Publishing performance claims responsibly",
    copy: "The source, owner, review date, and approval status every public claim should carry.",
    icon: ShieldCheck,
  },
];

export default function ResourcesPage() {
  return (
    <SiteShell>
      <main>
        <EditorialHero
          code="[ Resources ]"
          copy="Practical guidance for buying inbound calls, real-time leads, and booked appointments."
          title="Learn how performance campaigns work."
        >
          <div className="resource-index-graphic">
            <span>Research</span>
            <span>Campaign operations</span>
            <span>Buyer workspace</span>
            <span>Proof and compliance</span>
          </div>
        </EditorialHero>

        <section className="resource-feed">
          <div className="resource-feed-head">
            <p className="section-code">Latest from Ring On Demand</p>
            <p>
              Start with the basics, then talk with our team about the campaign
              rules that apply to your market.
            </p>
          </div>
          <div className="resource-grid">
            {resources.map(({ icon: Icon, ...resource }, index) => (
              <article key={resource.title}>
                <div className="resource-card-top">
                  <Icon aria-hidden="true" strokeWidth={1.35} />
                  <span>0{index + 1}</span>
                </div>
                <p className="section-code">{resource.type}</p>
                <h2>{resource.title}</h2>
                <p>{resource.copy}</p>
                <Link className="text-link" href="/build-campaign?intent=demo">
                  Discuss this with the team
                  <ArrowUpRight aria-hidden="true" size={15} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
