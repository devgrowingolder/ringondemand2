"use client";

import {
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  PhoneCall,
  Route,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const stories = [
  {
    id: "define",
    label: "Define",
    headline: "Tell us exactly what you want.",
    copy: "Choose the service type, vertical, locations, hours, volume, and qualification rules. Every team works from the same approved buy box.",
    action: "Build my buy box",
    href: "/build-campaign",
  },
  {
    id: "route",
    label: "Route",
    headline: "Send every result where it belongs.",
    copy: "Calls connect to your agents. Leads post to your CRM. Appointments land on your calendar. Delivery follows the rules set for each campaign.",
    action: "See delivery options",
    href: "/agents",
  },
  {
    id: "review",
    label: "Review",
    headline: "See what happened after every delivery.",
    copy: "Review delivery details, add outcome notes, manage availability, and submit credit requests from one buyer workspace.",
    action: "Explore the buyer workspace",
    href: "/agents",
  },
] as const;

export function ProductStory() {
  const [active, setActive] = useState<(typeof stories)[number]["id"]>("define");
  const story = stories.find((item) => item.id === active) ?? stories[0];

  return (
    <div className="product-story">
      <div className="product-story-copy">
        <div className="story-tabs" role="tablist" aria-label="Campaign workflow">
          {stories.map((item, index) => (
            <button
              aria-controls={`story-panel-${item.id}`}
              aria-selected={item.id === active}
              className={item.id === active ? "is-active" : ""}
              id={`story-tab-${item.id}`}
              key={item.id}
              onClick={() => setActive(item.id)}
              role="tab"
              type="button"
            >
              <span>0{index + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div
          aria-labelledby={`story-tab-${story.id}`}
          id={`story-panel-${story.id}`}
          role="tabpanel"
        >
          <h3>{story.headline}</h3>
          <p>{story.copy}</p>
          <Link className="text-link" href={story.href}>
            {story.action} <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>

      <div className={`product-workspace is-${active}`}>
        <div className="workspace-topbar">
          <div className="mini-logo" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span>New campaign</span>
          <span className="workspace-save">Draft saved</span>
        </div>
        <div className="workspace-body">
          <aside aria-label="Campaign builder steps">
            {[
              "Delivery",
              "Vertical",
              "Locations",
              "Schedule",
              "Volume",
              "Qualification",
              "Destination",
            ].map((item, index) => (
              <div className={index < 2 ? "is-current" : ""} key={item}>
                <span>{index + 1}</span>
                {item}
              </div>
            ))}
          </aside>
          <div className="workspace-canvas">
            <div className="workspace-heading">
              <div>
                <span className="workspace-kicker">
                  {active === "define"
                    ? "Define your demand"
                    : active === "route"
                      ? "Delivery routing"
                      : "Campaign review"}
                </span>
                <strong>
                  {active === "define"
                    ? "Final Expense — FL + TX"
                    : active === "route"
                      ? "Route by campaign rule"
                      : "Approve the canonical brief"}
                </strong>
              </div>
              <span className="workspace-status">
                {active === "review" ? "Approval required" : "In progress"}
              </span>
            </div>

            {active === "define" && (
              <div className="workspace-form-grid">
                <div className="mock-field">
                  <span>Delivery model</span>
                  <strong>Inbound calls</strong>
                </div>
                <div className="mock-field">
                  <span>Vertical</span>
                  <strong>Final Expense</strong>
                </div>
                <div className="mock-field is-wide">
                  <span>Locations</span>
                  <strong>Florida · Texas</strong>
                </div>
                <div className="mock-field">
                  <span>Schedule</span>
                  <strong>Weekdays · 9am–5pm</strong>
                </div>
                <div className="mock-field">
                  <span>Volume</span>
                  <strong>25 / day</strong>
                </div>
                <div className="mock-field is-wide">
                  <span>Qualification rule</span>
                  <strong>Buyer-approved criteria</strong>
                </div>
              </div>
            )}

            {active === "route" && (
              <div className="route-visual">
                <div className="route-origin">
                  <Route aria-hidden="true" />
                  <span>Approved campaign</span>
                </div>
                <div className="route-line" />
                <div className="route-targets">
                  <div>
                    <PhoneCall aria-hidden="true" />
                    <span>Phone</span>
                    <small>Live call</small>
                  </div>
                  <div>
                    <MapPin aria-hidden="true" />
                    <span>CRM</span>
                    <small>Exclusive lead</small>
                  </div>
                  <div>
                    <CalendarDays aria-hidden="true" />
                    <span>Calendar</span>
                    <small>Appointment</small>
                  </div>
                </div>
              </div>
            )}

            {active === "review" && (
              <div className="review-table">
                {[
                  ["Campaign", "Final Expense"],
                  ["Locations", "Florida and Texas"],
                  ["Delivery", "Live inbound calls"],
                  ["Schedule", "Weekdays from 9am to 5pm"],
                  ["Volume", "25 calls per day"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <Check aria-hidden="true" size={16} />
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
