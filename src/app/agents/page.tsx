import type { Metadata } from "next";
import {
  Check,
  Clock3,
  FileCheck2,
  MapPinned,
  PhoneCall,
  SlidersHorizontal,
} from "lucide-react";
import {
  EditorialHero,
  NumberedFeature,
} from "@/components/site/editorial-page";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = {
  title: "Buyer workspace",
  description:
    "Control Ring On Demand calls, leads, appointments, schedules, and delivery settings from one buyer workspace.",
};

export default function BuyerWorkspacePage() {
  return (
    <SiteShell>
      <main>
        <EditorialHero
          action="Build a campaign"
          code="[ Buyer workspace ]"
          copy="See your campaign settings, delivery details, call recordings, outcome notes, and quality-review activity without relying on separate spreadsheets."
          inverse
          title="Run every campaign from one buyer workspace."
        >
          <div className="agent-console">
            <div className="agent-console-head">
              <span>Campaign control</span>
              <span className="live-indicator">Ready for review</span>
            </div>
            <div className="agent-console-body">
              <div>
                <span>Campaign</span>
                <strong>Final Expense — FL + TX</strong>
              </div>
              <div>
                <span>Delivery</span>
                <strong>Live inbound calls</strong>
              </div>
              <div>
                <span>Schedule</span>
                <strong>Weekdays · 9am–5pm</strong>
              </div>
              <div>
                <span>Volume</span>
                <strong>25 per day</strong>
              </div>
            </div>
            <div className="agent-console-foot">
              <Check aria-hidden="true" size={16} />
              Buyer approval required before submission
            </div>
          </div>
        </EditorialHero>

        <section className="editorial-statement">
          <p className="section-code">Your campaign controls</p>
          <h2>
            Control your market, schedule, volume, and routing in one place.
          </h2>
        </section>

        <NumberedFeature
          copy="See the service type, vertical, locations, hours, volume, qualification rules, and destination in one editable summary."
          number="01"
          title="See exactly what you ordered."
        >
          <div className="feature-spec-sheet">
            {[
              ["Delivery model", "Inbound calls"],
              ["Vertical", "Final Expense"],
              ["Locations", "Florida and Texas"],
              ["Schedule", "Weekdays · 9am–5pm"],
              ["Volume", "25 / day"],
              ["Destination", "Buyer phone line"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <Check aria-hidden="true" size={15} />
              </div>
            ))}
          </div>
        </NumberedFeature>

        <NumberedFeature
          copy="Change delivery windows, locations, volume limits, and destinations as your team’s availability changes."
          number="02"
          reverse
          title="Adjust the campaign around your team."
        >
          <div className="control-grid">
            {[
              [Clock3, "Schedule", "Set delivery windows by timezone."],
              [MapPinned, "Locations", "Choose states and ZIP codes."],
              [SlidersHorizontal, "Volume", "Manage day, week, or month caps."],
              [PhoneCall, "Destination", "Send each result to the right team."],
            ].map(([Icon, title, copy]) => {
              const FeatureIcon = Icon as typeof Clock3;
              return (
                <div key={String(title)}>
                  <FeatureIcon aria-hidden="true" />
                  <strong>{String(title)}</strong>
                  <p>{String(copy)}</p>
                </div>
              );
            })}
          </div>
        </NumberedFeature>

        <NumberedFeature
          compact
          copy="Review delivery details, listen to available recordings, add outcome notes, and follow the applicable credit process."
          number="03"
          title="Review quality without leaving the campaign."
        >
          <div className="quality-timeline">
            {[
              "Delivery received",
              "Details available",
              "Buyer outcome recorded",
              "Quality review complete",
            ].map((item, index) => (
              <div key={item}>
                <span>{index + 1}</span>
                <FileCheck2 aria-hidden="true" size={19} />
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </NumberedFeature>
      </main>
    </SiteShell>
  );
}
