"use client";

import { ArrowRight, Edit3, Sparkles } from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

const example =
  "Final expense calls in Florida and Texas on weekdays from 9am to 5pm with a daily limit of 25 calls.";

type DemoSummary = {
  campaign: string;
  locations: string;
  delivery: string;
  schedule: string;
  volume: string;
};

function parseDemoBrief(input: string): DemoSummary {
  const normalized = input.toLowerCase();
  const locations = [
    ["florida", "Florida"],
    ["texas", "Texas"],
    ["california", "California"],
    ["georgia", "Georgia"],
    ["arizona", "Arizona"],
  ]
    .filter(([match]) => normalized.includes(match))
    .map(([, label]) => label);

  const volume = normalized.match(/(\d+)\s*(?:calls?|leads?|appointments?)/)?.[1];

  return {
    campaign: normalized.includes("final expense")
      ? "Final Expense"
      : normalized.includes("medicare")
        ? "Medicare"
        : normalized.includes("roof")
          ? "Roofing"
          : "Needs confirmation",
    locations: locations.length ? locations.join(" and ") : "Needs confirmation",
    delivery: normalized.includes("appointment")
      ? "Appointments"
      : normalized.includes("lead")
        ? "Exclusive leads"
        : normalized.includes("call")
          ? "Live inbound calls"
          : "Needs confirmation",
    schedule:
      normalized.includes("weekday") &&
      (normalized.includes("9am") || normalized.includes("9 am"))
        ? "Weekdays from 9am to 5pm"
        : "Needs confirmation",
    volume: volume ? `${volume} per day` : "Needs confirmation",
  };
}

export function CampaignBriefDemo() {
  const [brief, setBrief] = useState(example);
  const [submitted, setSubmitted] = useState(true);
  const summary = useMemo(() => parseDemoBrief(brief), [brief]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="campaign-demo" id="campaign-demo">
      <form className="campaign-prompt" onSubmit={handleSubmit}>
        <label htmlFor="campaign-demo-brief">
          <Sparkles aria-hidden="true" size={18} strokeWidth={1.6} />
          What kind of demand do you want?
        </label>
        <div className="campaign-prompt-row">
          <textarea
            aria-describedby="campaign-demo-help"
            id="campaign-demo-brief"
            onChange={(event) => {
              setBrief(event.target.value);
              setSubmitted(false);
            }}
            rows={2}
            value={brief}
          />
          <button aria-label="Structure this campaign" type="submit">
            <ArrowRight aria-hidden="true" size={22} />
          </button>
        </div>
        <p id="campaign-demo-help">
          We structure only what you state. You approve every field before it is
          submitted.
        </p>
      </form>

      <div
        aria-live="polite"
        className={`campaign-result ${submitted ? "is-ready" : ""}`}
      >
        <div className="campaign-result-head">
          <div>
            <p className="section-code">Structured campaign</p>
            <h3>{submitted ? "Review the buy box" : "Ready to update"}</h3>
          </div>
          <span className="approval-state">
            {submitted ? "Buyer review required" : "Brief changed"}
          </span>
        </div>
        <dl>
          {Object.entries(summary).map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="campaign-result-actions">
          <button
            className="button button-outline"
            onClick={() =>
              document.getElementById("campaign-demo-brief")?.focus()
            }
            type="button"
          >
            <Edit3 aria-hidden="true" size={15} />
            Edit details
          </button>
          <Link
            className="button button-purple"
            href={`/build-campaign?brief=${encodeURIComponent(brief)}`}
          >
            Use this campaign
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
