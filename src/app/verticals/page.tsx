import type { Metadata } from "next";
import { VerticalBrowser } from "@/components/verticals/vertical-browser";
import { EditorialHero } from "@/components/site/editorial-page";
import { SiteShell } from "@/components/site/site-chrome";
import { verticals } from "@/lib/verticals";

export const metadata: Metadata = {
  title: "Verticals",
  description:
    "Explore controlled Ring On Demand campaign verticals and start a reviewable brief.",
};

export default function VerticalsPage() {
  return (
    <SiteShell>
      <main>
        <EditorialHero
          action="Describe a campaign"
          code="[ Verticals ]"
          copy="Choose a controlled vertical or describe the demand in normal language. The campaign builder keeps unsupported or ambiguous values unresolved until you confirm them."
          title="Start with the market. Finish with an approved buy box."
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
            <p className="section-code">[01] Controlled verticals</p>
            <div>
              <h2>Find the campaign you want to build.</h2>
              <p>
                Categories organize the intake experience; each campaign still
                requires buyer review.
              </p>
            </div>
          </div>
          <VerticalBrowser verticals={verticals} />
        </section>
      </main>
    </SiteShell>
  );
}
