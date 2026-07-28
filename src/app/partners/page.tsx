import type { Metadata } from "next";
import {
  ArrowRight,
  Blocks,
  Handshake,
  Network,
  Share2,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { EditorialHero } from "@/components/site/editorial-page";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Explore Ring On Demand technology, referral, and operations partnerships.",
};

const partnerTypes = [
  {
    icon: Blocks,
    title: "Technology partner",
    copy: "Connect approved phone, CRM, calendar, or operational systems to the campaign workflow.",
  },
  {
    icon: Handshake,
    title: "Business partner",
    copy: "Coordinate a qualified introduction with clear campaign details that can move into review.",
  },
  {
    icon: Network,
    title: "Network partner",
    copy: "Align delivery requirements, partner responsibilities, and proof standards before activation.",
  },
  {
    icon: Share2,
    title: "Referral partner",
    copy: "Send prospective buyers into a consistent campaign intake without re-entering their requirements.",
  },
  {
    icon: Workflow,
    title: "Operations partner",
    copy: "Support delivery, review, or downstream fulfillment using the reviewed campaign details.",
  },
];

export default function PartnersPage() {
  return (
    <SiteShell>
      <main>
        <EditorialHero
          action="Start a partner conversation"
          actionHref="/build-campaign?intent=demo"
          code="[ Partner network ]"
          copy="Connect buyers, technology, traffic, and operations through one clear set of campaign details."
          inverse
          title="Grow with Ring On Demand."
        >
          <div className="partner-route-map">
            <div>Campaign details</div>
            <ArrowRight aria-hidden="true" />
            <div>Shared rules</div>
            <ArrowRight aria-hidden="true" />
            <div>Next step</div>
          </div>
        </EditorialHero>

        <section className="partner-programs">
          <div className="section-heading">
            <p className="section-code">[01] Partner programs</p>
            <div>
              <h2>Choose how you want to work together.</h2>
              <p>
                We review the audience, responsibilities, systems, and campaign
                terms before any partner program goes live.
              </p>
            </div>
          </div>
          <div className="partner-list">
            {partnerTypes.map(({ icon: Icon, ...partner }, index) => (
              <article key={partner.title}>
                <span>0{index + 1}</span>
                <Icon aria-hidden="true" strokeWidth={1.25} />
                <div>
                  <h3>{partner.title}</h3>
                  <p>{partner.copy}</p>
                </div>
                <Link
                  href="/build-campaign?intent=demo"
                  aria-label={`Discuss a ${partner.title.toLowerCase()} with Ring On Demand`}
                >
                  <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
