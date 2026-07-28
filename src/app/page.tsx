import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Headphones,
  Inbox,
  MapPinned,
  PhoneCall,
  ShieldCheck,
  SlidersHorizontal,
  Volume2,
} from "lucide-react";
import Link from "next/link";
import { CampaignBriefDemo } from "@/components/home/campaign-brief-demo";
import { FAQ } from "@/components/home/faq";
import { ProductStory } from "@/components/home/product-story";
import { SiteShell } from "@/components/site/site-chrome";
import {
  catalogVerticals,
  verticalCategories,
} from "@/lib/verticals";

const buyingModels = [
  {
    number: "01",
    icon: PhoneCall,
    name: "Pay per call",
    headline: "Talk to people who are calling now.",
    copy: "Send inbound calls to your team during the hours and in the locations you choose.",
    linkLabel: "See Final Expense call campaigns",
    href: "/verticals/final-expense",
  },
  {
    number: "02",
    icon: Inbox,
    name: "Pay per lead",
    headline: "Receive new leads for your team to follow up.",
    copy: "Send contact details to the destination you choose, with the campaign information attached.",
    linkLabel: "See Home Services lead campaigns",
    href: "/verticals/home-services",
  },
  {
    number: "03",
    icon: CalendarDays,
    name: "Pay per appointment",
    headline: "Put scheduled conversations on your calendar.",
    copy: "Receive booked appointments with the details your team needs to prepare and follow up.",
    linkLabel: "See Personal Injury appointment campaigns",
    href: "/verticals/personal-injury",
  },
];

const workspaceFeatures = [
  ["Live delivery", "See calls, leads, and appointments as they arrive."],
  [
    "Recordings and details",
    "Review the delivery details and available call recordings.",
  ],
  [
    "Quality review",
    "Add notes, record outcomes, and submit credit requests from one record.",
  ],
  [
    "Campaign controls",
    "Set locations, hours, availability, and volume for each campaign.",
  ],
  [
    "Performance view",
    "See delivery information beside the outcomes your team records.",
  ],
];

const categoryOrder = verticalCategories
  .slice(0, 4)
  .map((category) => category.name);

export default function Home() {
  return (
    <SiteShell>
      <main>
        <section className="home-hero">
          <div className="hero-fold-mark" aria-hidden="true" />
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span aria-hidden="true" />
              Calls / Leads / Appointments
            </p>
            <h1>Only pay for the calls, leads, and appointments you choose.</h1>
            <p>
              Choose what you want to receive, where your team works, when
              you are available, and how much volume you can handle. We turn
              those answers into one campaign for you to review.
            </p>
            <div className="hero-actions">
              <Link
                className="button button-purple"
                href="/build-campaign"
              >
                Get pricing
              </Link>
              <Link
                className="button button-outline"
                href="/build-campaign?intent=demo"
              >
                See how it works
              </Link>
            </div>
          </div>

          <div className="hero-campaign-panel">
            <div className="hero-panel-top">
              <span>Campaign details</span>
              <span className="hero-live-status">
                <i aria-hidden="true" />
                Ready to configure
              </span>
            </div>
            <div className="hero-panel-title">
              <span>RID / CAMPAIGN / 01</span>
              <h2>Set up your campaign</h2>
              <p>Start with calls, leads, or appointments</p>
            </div>
            <div className="hero-panel-fields">
              <div>
                <MapPinned aria-hidden="true" />
                <span>
                  <small>Coverage</small>
                  <strong>Choose states and ZIPs</strong>
                </span>
              </div>
              <div>
                <Clock3 aria-hidden="true" />
                <span>
                  <small>Call window</small>
                  <strong>Set team availability</strong>
                </span>
              </div>
              <div>
                <Volume2 aria-hidden="true" />
                <span>
                  <small>Daily capacity</small>
                  <strong>Choose your daily volume</strong>
                </span>
              </div>
              <div>
                <PhoneCall aria-hidden="true" />
                <span>
                  <small>Destination</small>
                  <strong>Route to phone, CRM, or calendar</strong>
                </span>
              </div>
            </div>
            <div className="hero-panel-foot">
              <span>
                <ShieldCheck aria-hidden="true" />
                Buyer approval required
              </span>
              <Link
                href="/build-campaign"
              >
                Choose a program
                <ArrowRight aria-hidden="true" size={15} />
              </Link>
            </div>
          </div>
        </section>

        <div className="model-strip hero-proof-strip" aria-label="Ring On Demand campaign models">
          <span>
            <PhoneCall aria-hidden="true" />
            Pay per call
          </span>
          <span>
            <Check aria-hidden="true" />
            Real-time leads
          </span>
          <span>
            <CalendarDays aria-hidden="true" />
            Booked appointments
          </span>
          <span>
            <ShieldCheck aria-hidden="true" />
            Your states, hours, and filters
          </span>
        </div>

        <section className="campaign-demo-section">
          <div className="demo-instruction">
            <span>Try it out or scroll down</span>
          </div>
          <CampaignBriefDemo />
        </section>

        <section className="brand-statement">
          <p className="section-code">Three ways to buy production</p>
          <h2>Choose how you want new customers to reach you.</h2>
          <p>
            Start with inbound calls, new leads, or booked appointments. Then
            choose the vertical, locations, hours, and volume that fit your
            team.
          </p>
        </section>

        <section className="section-frame" id="how-it-works">
          <div className="section-heading">
            <p className="section-code">[01] How it works</p>
            <div>
              <h2>Choose a service. Set your rules. Review the details.</h2>
              <p>
                Tell us what you sell, where and when your team can respond,
                and how much volume you want. You can edit every answer before
                you request pricing.
              </p>
            </div>
          </div>
          <ProductStory />
        </section>

        <section className="section-frame buying-models" id="buying-models">
          <div className="section-heading">
            <p className="section-code">[02] Buying models</p>
            <div>
              <h2>Three simple ways to buy new opportunities.</h2>
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
                  {model.linkLabel}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="workspace-section">
          <div className="workspace-section-copy">
            <p className="section-code">[03] Buyer workspace</p>
            <h2>See what arrived and what happened next.</h2>
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
                  ["Roofing — TX", "Review", "Real-time leads", "40/day"],
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

        <section className="section-frame home-verticals-section" id="verticals">
          <div className="section-heading">
            <p className="section-code">[04] Verticals</p>
            <div>
              <h2>Choose the service your team sells.</h2>
              <p>
                Browse {catalogVerticals.length} programs across{" "}
                {verticalCategories.length} categories. Pick a service, then
                tell us whether you want calls, leads, or appointments.
              </p>
            </div>
          </div>
          <div className="vertical-catalog">
            {categoryOrder.map((category, categoryIndex) => (
              <section
                className={`vertical-catalog-group vertical-tone-${category
                  .toLowerCase()
                  .replace(" ", "-")}`}
                key={category}
              >
                <div className="vertical-catalog-head">
                  <span>0{categoryIndex + 1}</span>
                  <h3>{category}</h3>
                </div>
                <div>
                  {catalogVerticals
                    .filter((vertical) => vertical.category === category)
                    .slice(0, 5)
                    .map((vertical) => (
                      <Link
                        href={`/verticals/${vertical.slug}`}
                        key={vertical.slug}
                      >
                        <span>{vertical.name}</span>
                        <ArrowRight aria-hidden="true" size={16} />
                      </Link>
                    ))}
                </div>
              </section>
            ))}
          </div>
          <Link className="text-link vertical-catalog-all" href="/verticals">
            Browse all vertical pages
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </section>

        <section className="section-frame research-section">
          <div className="section-heading">
            <p className="section-code">[05] Research</p>
            <div>
              <h2>Understand what you are buying before you begin.</h2>
              <p>
                Learn how calls, leads, and appointments work, what details to
                confirm, and how to review what your team receives.
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
            <p className="section-code">[06] Questions</p>
            <div>
              <h2>Straight answers before you launch.</h2>
              <p>
                Your service type, locations, hours, volume, customer
                criteria, and pricing are confirmed before a campaign moves
                forward.
              </p>
            </div>
          </div>
          <FAQ />
        </section>
      </main>
    </SiteShell>
  );
}
