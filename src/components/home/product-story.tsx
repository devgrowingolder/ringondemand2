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
    headline: "Choose calls, leads, appointments—or ask for help.",
    copy: "Start with what you sell and how you want people to reach your team.",
    action: "Start my request",
    href: "/build-campaign",
  },
  {
    id: "route",
    label: "Add details",
    headline: "Tell us where, when, and how much.",
    copy: "Add your service areas, receiving hours, team capacity, audience, and preferred phone, system, or calendar.",
    action: "See what we’ll ask",
    href: "/platform/campaign-setup",
  },
  {
    id: "review",
    label: "Review",
    headline: "Check the full request before you send it.",
    copy: "Make changes, confirm your contact information once, then request pricing or book a call.",
    action: "See the full process",
    href: "/how-it-works",
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
              "What you want",
              "Industry",
              "Service area",
              "Receiving hours",
              "How many",
              "Who you want to reach",
              "Where to send them",
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
                    ? "Choose what you want"
                    : active === "route"
                      ? "Add your campaign details"
                      : "Review your request"}
                </span>
                <strong>
                  {active === "define"
                    ? "Final Expense — FL + TX"
                    : active === "route"
                      ? "Tell us where and when your team can respond"
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
                  <span>What you want</span>
                  <strong>Inbound calls</strong>
                </div>
                <div className="mock-field">
                  <span>Industry</span>
                  <strong>Final Expense</strong>
                </div>
                <div className="mock-field is-wide">
                  <span>Service area</span>
                  <strong>Florida · Texas</strong>
                </div>
                <div className="mock-field">
                  <span>Receiving hours</span>
                  <strong>Weekdays · 9am–5pm</strong>
                </div>
                <div className="mock-field">
                  <span>Requested amount</span>
                  <strong>25 / day</strong>
                </div>
                <div className="mock-field is-wide">
                  <span>Who you want to reach</span>
                  <strong>Your approved questions</strong>
                </div>
              </div>
            )}

            {active === "route" && (
              <div className="route-visual">
                <div className="route-origin">
                  <Route aria-hidden="true" />
                  <span>Reviewed request</span>
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
                  ["Service area", "Florida and Texas"],
                  ["What you want", "Inbound calls"],
                  ["Receiving hours", "Weekdays from 9am to 5pm"],
                  ["Requested amount", "25 calls per day"],
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
