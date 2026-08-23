import type { Metadata } from "next";
import { VerticalBrowser } from "@/components/verticals/vertical-browser";
import { EditorialHero } from "@/components/site/editorial-page";
import { SiteShell } from "@/components/site/site-chrome";
import {
  catalogVerticals,
  verticalCategories,
} from "@/lib/verticals";

export const metadata: Metadata = {
  title: "Verticals",
  description:
    "Explore Ring On Demand pay-per-call, pay-per-lead, and pay-per-appointment campaigns by market.",
};

export default function VerticalsPage() {
  return (
    <SiteShell>
      <main>
        <EditorialHero
          action="Choose a program"
          code="[ Verticals ]"
          copy={`Explore ${catalogVerticals.length} services across ${verticalCategories.length} categories. Choose what you sell, then tell us whether you want calls, leads, or appointments.`}
          title="Choose the service your team sells."
        >
          <div className="vertical-hero-index">
            {verticalCategories.map((category, index) => (
                <div key={category.slug}>
                  <span>0{index + 1}</span>
                  <strong>{category.name}</strong>
                </div>
              ))}
          </div>
        </EditorialHero>
        <section className="vertical-browser-section">
          <div className="section-heading">
            <p className="section-code">[01] Browse markets</p>
            <div>
              <h2>Find your service, then choose how you want to receive new opportunities.</h2>
              <p>
                Each page explains the information we need, including
                locations, hours, volume, and service-specific customer
                questions.
              </p>
            </div>
          </div>
          <VerticalBrowser verticals={catalogVerticals} />
        </section>
      </main>
    </SiteShell>
  );
}
