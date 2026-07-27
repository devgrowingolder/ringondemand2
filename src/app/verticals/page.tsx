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
          action="Describe a campaign"
          code="[ Verticals ]"
          copy={`Explore ${catalogVerticals.length} verticals across ${verticalCategories.length} markets. Choose one, then set your delivery type, locations, hours, volume, and filters.`}
          title="Find the right campaign for your sales team."
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
              <h2>Start with the vertical you sell.</h2>
              <p>
                Every vertical uses the same simple campaign brief, with
                market-specific qualification questions.
              </p>
            </div>
          </div>
          <VerticalBrowser verticals={catalogVerticals} />
        </section>
      </main>
    </SiteShell>
  );
}
