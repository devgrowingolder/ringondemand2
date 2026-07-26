import type { Metadata } from "next";
import { ArrowRight, Check, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { EditorialHero } from "@/components/site/editorial-page";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = {
  title: "Customer experience",
  description:
    "See how Ring On Demand makes campaign terms, deliveries, and next steps easier for buyers to understand.",
};

export default function CustomersPage() {
  return (
    <SiteShell>
      <main>
        <EditorialHero
          action="Book a walkthrough"
          actionHref="/build-campaign?intent=demo"
          code="[ Customer experience ]"
          copy="Know what you ordered, what was delivered, and what your team should do next. Every campaign begins with a buy box you can review."
          title="A clearer way to buy inbound demand."
        >
          <div className="proof-register-visual">
            <div className="proof-register-head">
              <MessageSquareText aria-hidden="true" />
              <span>Campaign record</span>
            </div>
            {[
              "Delivery model and vertical",
              "States, ZIP codes, and hours",
              "Volume and qualification rules",
              "Phone, CRM, or calendar destination",
              "Buyer approval before submission",
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
