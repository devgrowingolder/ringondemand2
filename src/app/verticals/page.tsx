import type { Metadata } from "next";
import { VerticalBrowser } from "@/components/verticals/vertical-browser";
import { EditorialHero } from "@/components/site/editorial-page";
import { SiteShell } from "@/components/site/site-chrome";
import { verticals } from "@/lib/verticals";

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
          copy="Choose your market, then tell us whether you want calls, leads, or appointments. Set your locations, hours, volume, and filters before requesting pricing."
          title="Find the right campaign for your sales team."
        >
          <div className="vertical-hero-index">
            {["Insurance", "Home services", "Legal", "Financial"].map(
              (category, index) => (
                <div key={category}>
                  <span>0{index + 1}</span>
                  <strong>{category}</strong>
                </div>
              ),
            )}
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
          <VerticalBrowser verticals={verticals} />
        </section>
      </main>
    </SiteShell>
  );
}
