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
    label: "Choose",
    headline: "Choose the program that fits your team.",
    copy: "Start with calls, leads, or appointments. Then choose your service, locations, hours, volume, and customer criteria.",
    action: "Choose my program",
    href: "/build-campaign",
  },
  {
    id: "route",
    label: "Deliver",
    headline: "Choose where each delivery should go.",
    copy: "Send calls to a phone, leads to your selected system, and appointments to a calendar.",
    action: "See delivery options",
    href: "/agents",
  },
  {
    id: "review",
    label: "Review",
    headline: "See what your team received.",
    copy: "Review delivery details, add outcome notes, manage availability, and follow the applicable credit process from one workspace.",
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
              "Customer criteria",
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
                    ? "Choose your program"
                    : active === "route"
                      ? "Choose a destination"
                      : "Review your campaign"}
                </span>
                <strong>
                  {active === "define"
                    ? "Final Expense — FL + TX"
                    : active === "route"
                      ? "Send each delivery to the right place"
                      : "Approve the campaign details"}
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
                  <span>Customer criteria</span>
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
                    <small>Real-time lead</small>
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
