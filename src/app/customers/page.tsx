import type { Metadata } from "next";
import { ArrowRight, Check, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { EditorialHero } from "@/components/site/editorial-page";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = {
  title: "Customer experience",
  description:
    "How Ring On Demand structures the buyer experience without publishing unapproved customer claims.",
};

export default function CustomersPage() {
  return (
    <SiteShell>
      <main>
        <EditorialHero
          action="Book a walkthrough"
          actionHref="/build-campaign?intent=demo"
          code="[ Customer experience ]"
          copy="We publish named customer stories only after the company, role, timeframe, campaign type, and outcome are approved. The product experience does not depend on anonymous proof."
          title="Proof without the hype."
        >
          <div className="proof-register-visual">
            <div className="proof-register-head">
              <MessageSquareText aria-hidden="true" />
              <span>Story approval record</span>
            </div>
            {[
              "Named company and role",
              "Campaign type and timeframe",
              "Source for measurable outcome",
              "Owner and review date",
              "Publication approval",
            ].map((item) => (
              <div key={item}>
                <Check aria-hidden="true" size={15} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </EditorialHero>

        <section className="customer-principles">
          <p className="section-code">[01] Buyer principles</p>
          <h2>What every buyer should be able to see.</h2>
          <div className="principle-list">
            {[
              [
                "The approved campaign",
                "The delivery model, locations, schedule, volume, qualification rules, and destination.",
              ],
              [
                "What was delivered",
                "The record and details available for each call, lead, or appointment.",
              ],
              [
                "What happens next",
                "The applicable action, quality review, pricing request, or scheduling handoff.",
              ],
            ].map(([title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <Link className="button button-dark" href="/build-campaign">
            Build a campaign
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </section>
      </main>
    </SiteShell>
  );
}
