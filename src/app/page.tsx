import {
  ArrowRight,
  CalendarDays,
  Headphones,
  Inbox,
  PhoneCall,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { CampaignBriefDemo } from "@/components/home/campaign-brief-demo";
import { FAQ } from "@/components/home/faq";
import { ProductStory } from "@/components/home/product-story";
import { SiteShell } from "@/components/site/site-chrome";

const buyingModels = [
  {
    number: "01",
    icon: PhoneCall,
    name: "Inbound calls",
    headline: "Speak with prospects while intent is active.",
    copy: "Receive inbound calls routed to your agents according to the campaign rules you approve.",
    href: "/verticals/final-expense",
  },
  {
    number: "02",
    icon: Inbox,
    name: "Exclusive leads",
    headline: "Receive each lead in real time.",
    copy: "Send exclusive form leads to your CRM with the delivery details your team needs for follow-up.",
    href: "/verticals/home-services",
  },
  {
    number: "03",
    icon: CalendarDays,
    name: "Appointments",
    headline: "Put confirmed demand on the calendar.",
    copy: "Receive booked appointments with the time and campaign information your team needs.",
    href: "/verticals/personal-injury",
  },
];

const workspaceFeatures = [
  ["Live delivery", "See incoming calls, leads, and appointments as they arrive."],
  [
    "Recordings and details",
    "Review available delivery details and call recordings.",
  ],
  [
    "Quality review",
    "Add notes, track outcomes, and submit credit requests from the same record.",
  ],
  [
    "Campaign controls",
    "Manage locations, hours, availability, and volume by campaign.",
  ],
  [
    "Performance view",
    "Connect delivery data with the outcomes your team records.",
  ],
];

export default function Home() {
  return (
    <SiteShell>
      <main>
        <section className="home-hero">
          <div className="hero-fold-mark" aria-hidden="true" />
          <div className="hero-copy">
            <h1>Turn demand into live conversations.</h1>
            <p>
              Describe who you want to reach, where your team can take calls,
              and how much volume you can handle. Ring On Demand routes
              exclusive inbound calls, leads, and appointments into one buyer
              workspace.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/build-campaign">
                Build a campaign
              </Link>
              <Link
                className="button button-outline"
                href="/build-campaign?intent=demo"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </section>

        <div className="model-strip" aria-label="Available buying models">
          <span>Inbound calls</span>
          <span>Exclusive leads</span>
          <span>Appointments</span>
          <span>Buyer workspace</span>
        </div>

        <section className="campaign-demo-section">
          <div className="demo-instruction">
            <span>Try it out or scroll down</span>
          </div>
          <CampaignBriefDemo />
        </section>

        <section className="brand-statement">
          <p className="section-code">The new era of inbound demand</p>
          <h2>Demand should arrive ready for action.</h2>
          <p>
            Ring On Demand gives buyers control over who comes through, when
            campaigns run, and how every result is reviewed.
          </p>
        </section>

        <section className="section-frame" id="how-it-works">
          <div className="section-heading">
            <p className="section-code">[01] How it works</p>
            <div>
              <h2>Buyers plus one platform.</h2>
              <p>
                Describe the outcome once. Carry the same approved campaign from
                sales through routing, review, and handoff.
              </p>
            </div>
          </div>
          <ProductStory />
        </section>

        <section className="section-frame buying-models" id="buying-models">
          <div className="section-heading">
            <p className="section-code">[02] Buying models</p>
            <div>
              <h2>Choose how demand reaches your team.</h2>
            </div>
          </div>
          <div className="buying-model-grid">
            {buyingModels.map(({ icon: Icon, ...model }) => (
              <article key={model.name}>
                <div className="model-number">{model.number}</div>
                <Icon aria-hidden="true" size={38} strokeWidth={1.25} />
                <p className="section-code">{model.name}</p>
                <h3>{model.headline}</h3>
                <p>{model.copy}</p>
                <Link className="text-link" href={model.href}>
                  Explore {model.name.toLowerCase()}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="workspace-section">
          <div className="workspace-section-copy">
            <p className="section-code">[03] Buyer workspace</p>
            <h2>Control every campaign from one place.</h2>
            <div className="workspace-feature-list">
              {workspaceFeatures.map(([name, copy], index) => (
                <div key={name}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>
                    <strong>{name}</strong>
                    {copy}
                  </p>
                </div>
              ))}
            </div>
            <Link className="button button-light" href="/agents">
              Explore the buyer workspace
            </Link>
          </div>

          <div className="workspace-preview">
            <div className="workspace-preview-top">
              <span>Buyer workspace</span>
              <span>Campaign view</span>
            </div>
            <div className="workspace-preview-grid">
              <aside>
                {["Overview", "Campaigns", "Activity", "Quality", "Reports"].map(
                  (item, index) => (
                    <span className={index === 1 ? "is-active" : ""} key={item}>
                      {item}
                    </span>
                  ),
                )}
              </aside>
              <div className="campaign-table">
                <div className="campaign-table-head">
                  <strong>Campaign</strong>
                  <strong>Status</strong>
                  <strong>Delivery</strong>
                  <strong>Cap</strong>
                </div>
                {[
                  ["Final Expense — FL", "Ready", "Inbound calls", "25/day"],
                  ["Roofing — TX", "Review", "Exclusive leads", "40/day"],
                  ["Medicare — AZ", "Paused", "Appointments", "10/week"],
                ].map((row) => (
                  <div className="campaign-table-row" key={row[0]}>
                    {row.map((cell, index) =>
                      index === 1 ? (
                        <span className="table-status" key={cell}>
                          {cell}
                        </span>
                      ) : (
                        <span key={cell}>{cell}</span>
                      ),
                    )}
                  </div>
                ))}
                <div className="campaign-detail">
                  <div>
                    <Headphones aria-hidden="true" />
                    <span>
                      <small>Delivery destination</small>
                      <strong>Buyer phone line</strong>
                    </span>
                  </div>
                  <div>
                    <SlidersHorizontal aria-hidden="true" />
                    <span>
                      <small>Campaign control</small>
                      <strong>Schedule and cap</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-frame research-section">
          <div className="section-heading">
            <p className="section-code">[04] Research</p>
            <div>
              <h2>Why live conversations matter.</h2>
              <p>
                Our research program studies buyer intent, immediate
                engagement, lead quality, and performance-based pricing. We
                publish numerical claims only after source and compliance
                review.
              </p>
              <Link className="text-link" href="/blog">
                Read the research
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>
          <div className="research-graphic" aria-hidden="true">
            <div className="signal-line">
              {Array.from({ length: 24 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className="research-notes">
              <span>Intent</span>
              <span>Conversation</span>
              <span>Outcome</span>
            </div>
          </div>
        </section>

        <section className="section-frame questions-section">
          <div className="section-heading">
            <p className="section-code">[05] Questions</p>
            <div>
              <h2>Straight answers before you launch.</h2>
              <p>
                Campaign-specific terms remain visible in the approved buy box
                and agreement.
              </p>
            </div>
          </div>
          <FAQ />
        </section>
      </main>
    </SiteShell>
  );
}
