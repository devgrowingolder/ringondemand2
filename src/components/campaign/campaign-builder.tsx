"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Edit3,
  LoaderCircle,
  MapPin,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { trackFunnelEvent } from "@/lib/analytics";
import type { CampaignDraftV1 } from "@/lib/campaign/schema";
import { verticals } from "@/lib/verticals";

const defaultBrief =
  "Final expense calls in Florida and Texas on weekdays from 9am to 5pm with a daily limit of 25 calls.";

const steps = [
  "Start",
  "Campaign",
  "Coverage",
  "Setup",
  "Contact",
  "Review",
] as const;

const initialDraft: CampaignDraftV1 = {
  deliveryModel: "undecided",
  vertical: { category: "", name: "" },
  locations: { states: [], zipCodes: [] },
  schedule: {
    timezone: "America/New_York",
    windows: [],
  },
  volume: { count: null, period: "day" },
  qualificationRules: [],
  destination: "undecided",
  unresolvedFields: [
    "deliveryModel",
    "vertical",
    "locations",
    "schedule",
    "volume",
    "qualificationRules",
    "destination",
  ],
};

type ContactState = {
  buyerName: string;
  company: string;
  workEmail: string;
  phone: string;
  consent: boolean;
};

const emptyContact: ContactState = {
  buyerName: "",
  company: "",
  workEmail: "",
  phone: "",
  consent: false,
};

function currentUnresolved(draft: CampaignDraftV1) {
  const fields: string[] = [];
  if (!draft.vertical.name) fields.push("vertical");
  if (!draft.locations.states.length && !draft.locations.zipCodes.length)
    fields.push("locations");
  if (!draft.schedule.windows.length || !draft.schedule.timezone)
    fields.push("schedule");
  if (!draft.volume.count) fields.push("volume");
  if (!draft.qualificationRules.length) fields.push("qualificationRules");
  return fields;
}

function splitCodes(value: string) {
  return Array.from(
    new Set(
      value
        .split(/[\s,]+/)
        .map((item) => item.trim().toUpperCase())
        .filter((item) => /^[A-Z]{2}$/.test(item)),
    ),
  );
}

function splitZips(value: string) {
  return Array.from(
    new Set(
      value
        .split(/[\s,]+/)
        .map((item) => item.trim())
        .filter((item) => /^\d{5}$/.test(item)),
    ),
  );
}

function deliveryLabel(model: CampaignDraftV1["deliveryModel"]) {
  return {
    inbound_calls: "Inbound calls",
    exclusive_leads: "Exclusive leads",
    appointments: "Appointments",
    undecided: "Help me choose",
  }[model];
}

export function CampaignBuilder({
  initialBrief,
  initialIntent,
}: {
  initialBrief?: string;
  initialIntent: "pricing" | "demo";
}) {
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState(initialBrief || defaultBrief);
  const [draft, setDraft] = useState<CampaignDraftV1>(initialDraft);
  const [contact, setContact] = useState<ContactState>(emptyContact);
  const [intent] = useState(initialIntent);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [completedAction, setCompletedAction] = useState("");

  const unresolved = useMemo(() => currentUnresolved(draft), [draft]);

  function goTo(next: number) {
    setError("");
    setNotice("");
    setStep(Math.max(0, Math.min(steps.length - 1, next)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function parseBrief(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    trackFunnelEvent({ name: "campaign_start", step: "describe" });

    try {
      const response = await fetch("/api/campaigns/parse", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ brief }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to parse brief.");

      setBrief(payload.sanitizedBrief);
      setDraft(payload.draft);
      if (payload.containedContactData) {
        setNotice(
          "Contact details were removed from the campaign brief. Add them once in the contact step.",
        );
      }
      trackFunnelEvent({
        name: "campaign_parse",
        deliveryModel: payload.draft.deliveryModel,
        vertical: payload.draft.vertical.name,
      });
      goTo(1);
    } catch (parseError) {
      setNotice(
        "Your brief is preserved. Continue through the manual campaign questions.",
      );
      trackFunnelEvent({ name: "campaign_fallback", step: "describe" });
      setDraft(initialDraft);
      setError(
        parseError instanceof Error
          ? parseError.message
          : "Continue through the manual flow.",
      );
      goTo(1);
    } finally {
      setBusy(false);
    }
  }

  function saveStep(event: FormEvent, next: number) {
    event.preventDefault();
    trackFunnelEvent({
      name: "campaign_step_complete",
      step: steps[step],
      deliveryModel: draft.deliveryModel,
      vertical: draft.vertical.name,
    });
    goTo(next);
  }

  function setVertical(name: string) {
    const selected = verticals.find((vertical) => vertical.name === name);
    setDraft((current) => ({
      ...current,
      vertical: {
        name,
        category: selected?.category ?? "Other",
      },
    }));
  }

  async function submitCampaign() {
    setBusy(true);
    setError("");
    const approvedDraft = { ...draft, unresolvedFields: unresolved };

    if (unresolved.length) {
      setError(
        `Confirm every campaign field before submission: ${unresolved.join(", ")}.`,
      );
      setBusy(false);
      return;
    }

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          rawBrief: brief,
          approvedDraft,
          contact,
          intent,
          attribution: {
            landingPath: window.location.pathname,
            source: new URLSearchParams(window.location.search).get("utm_source") ?? undefined,
            medium: new URLSearchParams(window.location.search).get("utm_medium") ?? undefined,
            campaign:
              new URLSearchParams(window.location.search).get("utm_campaign") ??
              undefined,
          },
          buyerApproved: true,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to save campaign.");

      setCampaignId(payload.id);
      trackFunnelEvent({
        name: "campaign_submission",
        campaignId: payload.id,
        deliveryModel: draft.deliveryModel,
        vertical: draft.vertical.name,
      });
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "The campaign could not be saved.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function runAction(
    action: "request_pricing" | "start_demo_booking",
  ) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/actions`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action,
          idempotencyKey: `rid:${campaignId}:${action}`,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to continue.");

      if (action === "request_pricing") {
        setCompletedAction("Pricing request received.");
        trackFunnelEvent({ name: "pricing_request", campaignId });
      } else {
        trackFunnelEvent({ name: "booking_start", campaignId });
        if (payload.bookingUrl) {
          window.location.assign(payload.bookingUrl);
          return;
        }
        setCompletedAction("Demo request received.");
      }
    } catch (actionError) {
      setError(
        actionError instanceof Error
          ? actionError.message
          : "Unable to continue.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (campaignId) {
    return (
      <div className="campaign-builder-success">
        <CheckCircle2 aria-hidden="true" />
        <p className="section-code">Campaign brief saved</p>
        <h1>Your campaign is ready for the next step.</h1>
        <p>
          Your approved campaign details and contact information will carry
          into pricing or call scheduling. Reference: <strong>{campaignId}</strong>
        </p>
        {completedAction ? (
          <div className="campaign-action-complete">{completedAction}</div>
        ) : (
          <div className="campaign-success-actions">
            <button
              className="button button-purple"
              disabled={busy}
              onClick={() => runAction("request_pricing")}
              type="button"
            >
              Request pricing
            </button>
            <button
              className="button button-outline"
              disabled={busy}
              onClick={() => runAction("start_demo_booking")}
              type="button"
            >
              Book a demo
            </button>
          </div>
        )}
        <div className="campaign-next-steps">
          <h2>What happens next</h2>
          <ol>
            <li>We review the campaign details and any undecided fields.</li>
            <li>You confirm pricing, qualification, and delivery setup.</li>
            <li>The destination is tested before the campaign moves forward.</li>
          </ol>
          <Link className="text-link" href="/onboarding">
            View the onboarding checklist
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
        {error && <p className="form-error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="campaign-builder">
      <header className="campaign-builder-header">
        <div>
          <p className="section-code">
            {intent === "demo" ? "Demo campaign brief" : "Campaign brief"}
          </p>
          <h1>Tell us what you want to buy.</h1>
        </div>
        <span>
          Step {step + 1} of {steps.length}
        </span>
      </header>

      <div className="campaign-builder-intro">
        <strong>Start with what you know.</strong>
        <span>
          Choose “Help me choose” where needed. Nothing is submitted until the
          final review.
        </span>
      </div>

      <div className="campaign-progress" aria-label="Campaign progress">
        {steps.map((label, index) => (
          <button
            aria-current={index === step ? "step" : undefined}
            className={index === step ? "is-active" : index < step ? "is-done" : ""}
            disabled={index > step}
            key={label}
            onClick={() => index <= step && goTo(index)}
            type="button"
          >
            <span>{index < step ? <Check size={12} /> : index + 1}</span>
            {label}
          </button>
        ))}
      </div>

      <div className="campaign-builder-body">
        {notice && <div className="form-notice">{notice}</div>}
        {error && <div className="form-error">{error}</div>}

        {step === 0 && (
          <form className="builder-step builder-brief-step" onSubmit={parseBrief}>
            <div className="builder-step-copy">
              <Sparkles aria-hidden="true" />
              <p className="section-code">Describe</p>
              <h2>What kind of demand do you want?</h2>
              <p>
                Use normal language. We&apos;ll organize what you enter and ask
                you to confirm anything that is missing or unclear.
              </p>
            </div>
            <label>
              Campaign brief
              <textarea
                maxLength={2000}
                onChange={(event) => setBrief(event.target.value)}
                rows={8}
                value={brief}
              />
            </label>
            <div className="builder-step-actions">
              <button className="button button-purple" disabled={busy} type="submit">
                {busy ? (
                  <LoaderCircle className="spin" aria-hidden="true" />
                ) : (
                  <ArrowRight aria-hidden="true" />
                )}
                Structure this campaign
              </button>
            </div>
          </form>
        )}

        {step === 1 && (
          <form className="builder-step" onSubmit={(event) => saveStep(event, 2)}>
            <div className="builder-step-copy">
              <PhoneCall aria-hidden="true" />
              <p className="section-code">Delivery and vertical</p>
              <h2>How should demand reach your team?</h2>
            </div>
            <fieldset className="choice-grid">
              <legend>Delivery model</legend>
              {[
                ["inbound_calls", "Inbound calls"],
                ["exclusive_leads", "Exclusive leads"],
                ["appointments", "Appointments"],
                ["undecided", "Help me choose"],
              ].map(([value, label]) => (
                <label key={value}>
                  <input
                    checked={draft.deliveryModel === value}
                    name="deliveryModel"
                    onChange={() =>
                      setDraft((current) => ({
                        ...current,
                        deliveryModel: value as CampaignDraftV1["deliveryModel"],
                      }))
                    }
                    type="radio"
                    value={value}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
            <label className="form-field">
              Searchable vertical
              <input
                list="vertical-options"
                onChange={(event) => setVertical(event.target.value)}
                placeholder="Search or enter a vertical"
                required
                value={draft.vertical.name}
              />
              <datalist id="vertical-options">
                {verticals.map((vertical) => (
                  <option key={vertical.slug} value={vertical.name}>
                    {vertical.category}
                  </option>
                ))}
              </datalist>
            </label>
            <div className="builder-step-actions">
              <button
                className="button button-outline"
                onClick={() => goTo(0)}
                type="button"
              >
                <ArrowLeft aria-hidden="true" />
                Back
              </button>
              <button className="button button-purple" type="submit">
                Continue
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form
            className="builder-step"
            onSubmit={(event) => {
              setDraft((current) => ({
                ...current,
                schedule: current.schedule.windows.length
                  ? current.schedule
                  : {
                      timezone:
                        current.schedule.timezone || "America/New_York",
                      windows: [
                        {
                          days: [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                          ],
                          start: "09:00",
                          end: "17:00",
                        },
                      ],
                    },
              }));
              saveStep(event, 3);
            }}
          >
            <div className="builder-step-copy">
              <MapPin aria-hidden="true" />
              <p className="section-code">Locations and schedule</p>
              <h2>Where and when can your team take demand?</h2>
            </div>
            <div className="two-column-fields">
              <label className="form-field">
                State codes
                <input
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      locations: {
                        ...current.locations,
                        states: splitCodes(event.target.value),
                      },
                    }))
                  }
                  placeholder="FL, TX"
                  value={draft.locations.states.join(", ")}
                />
              </label>
              <label className="form-field">
                ZIP codes (optional)
                <input
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      locations: {
                        ...current.locations,
                        zipCodes: splitZips(event.target.value),
                      },
                    }))
                  }
                  placeholder="33101, 75201"
                  value={draft.locations.zipCodes.join(", ")}
                />
              </label>
              <label className="form-field">
                Timezone
                <select
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      schedule: {
                        ...current.schedule,
                        timezone: event.target.value,
                      },
                    }))
                  }
                  value={draft.schedule.timezone}
                >
                  <option disabled value="">
                    Select a timezone
                  </option>
                  <option value="America/New_York">Eastern</option>
                  <option value="America/Chicago">Central</option>
                  <option value="America/Denver">Mountain</option>
                  <option value="America/Los_Angeles">Pacific</option>
                </select>
              </label>
              <label className="form-field">
                Days
                <select
                  onChange={(event) => {
                    const days =
                      event.target.value === "weekdays"
                        ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
                        : [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday",
                          ];
                    setDraft((current) => ({
                      ...current,
                      schedule: {
                        ...current.schedule,
                        windows: [
                          {
                            days,
                            start: current.schedule.windows[0]?.start ?? "09:00",
                            end: current.schedule.windows[0]?.end ?? "17:00",
                          },
                        ],
                      },
                    }));
                  }}
                  value={
                    draft.schedule.windows[0]?.days.length === 7
                      ? "everyday"
                      : "weekdays"
                  }
                >
                  <option value="weekdays">Weekdays</option>
                  <option value="everyday">Every day</option>
                </select>
              </label>
              <label className="form-field">
                Start time
                <input
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      schedule: {
                        ...current.schedule,
                        windows: [
                          {
                            days:
                              current.schedule.windows[0]?.days ??
                              ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                            start: event.target.value,
                            end: current.schedule.windows[0]?.end ?? "17:00",
                          },
                        ],
                      },
                    }))
                  }
                  required
                  type="time"
                  value={draft.schedule.windows[0]?.start ?? "09:00"}
                />
              </label>
              <label className="form-field">
                End time
                <input
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      schedule: {
                        ...current.schedule,
                        windows: [
                          {
                            days:
                              current.schedule.windows[0]?.days ??
                              ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                            start: current.schedule.windows[0]?.start ?? "09:00",
                            end: event.target.value,
                          },
                        ],
                      },
                    }))
                  }
                  required
                  type="time"
                  value={draft.schedule.windows[0]?.end ?? "17:00"}
                />
              </label>
            </div>
            <div className="builder-step-actions">
              <button className="button button-outline" onClick={() => goTo(1)} type="button">
                <ArrowLeft aria-hidden="true" /> Back
              </button>
              <button className="button button-purple" type="submit">
                Continue <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="builder-step" onSubmit={(event) => saveStep(event, 4)}>
            <div className="builder-step-copy">
              <Clock3 aria-hidden="true" />
              <p className="section-code">Volume, rules, and destination</p>
              <h2>Set your volume, filters, and destination.</h2>
            </div>
            <div className="two-column-fields">
              <label className="form-field">
                Expected volume
                <input
                  min={1}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      volume: {
                        ...current.volume,
                        count: event.target.value
                          ? Number(event.target.value)
                          : null,
                      },
                    }))
                  }
                  required
                  type="number"
                  value={draft.volume.count ?? ""}
                />
              </label>
              <label className="form-field">
                Period
                <select
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      volume: {
                        ...current.volume,
                        period: event.target.value as CampaignDraftV1["volume"]["period"],
                      },
                    }))
                  }
                  value={draft.volume.period}
                >
                  <option value="day">Per day</option>
                  <option value="week">Per week</option>
                  <option value="month">Per month</option>
                </select>
              </label>
            </div>
            <label className="form-field">
              Qualification rules (one per line)
              <textarea
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    qualificationRules: event.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean),
                  }))
                }
                placeholder="Add buyer-approved criteria"
                required
                rows={5}
                value={draft.qualificationRules.join("\n")}
              />
            </label>
            <button
              className="builder-help-choice"
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  qualificationRules: [
                    "Help me define the qualification rules",
                  ],
                }))
              }
              type="button"
            >
              I need help defining the rules
            </button>
            <fieldset className="choice-grid">
              <legend>Delivery destination</legend>
              {[
                ["phone", "Phone"],
                ["crm", "CRM"],
                ["calendar", "Calendar"],
                ["undecided", "Help me choose"],
              ].map(([value, label]) => (
                <label key={value}>
                  <input
                    checked={draft.destination === value}
                    name="destination"
                    onChange={() =>
                      setDraft((current) => ({
                        ...current,
                        destination: value as CampaignDraftV1["destination"],
                      }))
                    }
                    type="radio"
                    value={value}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
            <div className="builder-step-actions">
              <button className="button button-outline" onClick={() => goTo(2)} type="button">
                <ArrowLeft aria-hidden="true" /> Back
              </button>
              <button className="button button-purple" type="submit">
                Continue <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <form className="builder-step" onSubmit={(event) => saveStep(event, 5)}>
            <div className="builder-step-copy">
              <PhoneCall aria-hidden="true" />
              <p className="section-code">Contact once</p>
              <h2>Who should own the next step?</h2>
              <p>
                Enter your contact details once. We&apos;ll reuse them for
                pricing, scheduling, and onboarding.
              </p>
            </div>
            <div className="two-column-fields">
              <label className="form-field">
                Full name
                <input
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      buyerName: event.target.value,
                    }))
                  }
                  required
                  value={contact.buyerName}
                />
              </label>
              <label className="form-field">
                Company
                <input
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      company: event.target.value,
                    }))
                  }
                  required
                  value={contact.company}
                />
              </label>
              <label className="form-field">
                Work email
                <input
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      workEmail: event.target.value,
                    }))
                  }
                  required
                  type="email"
                  value={contact.workEmail}
                />
              </label>
              <label className="form-field">
                Phone
                <input
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  required
                  type="tel"
                  value={contact.phone}
                />
              </label>
            </div>
            <label className="consent-field">
              <input
                checked={contact.consent}
                onChange={(event) =>
                  setContact((current) => ({
                    ...current,
                    consent: event.target.checked,
                  }))
                }
                required
                type="checkbox"
              />
              <span>
                I approve Ring On Demand using this information to respond to
                this campaign request.
              </span>
            </label>
            <div className="builder-step-actions">
              <button className="button button-outline" onClick={() => goTo(3)} type="button">
                <ArrowLeft aria-hidden="true" /> Back
              </button>
              <button className="button button-purple" type="submit">
                Review campaign <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </form>
        )}

        {step === 5 && (
          <div className="builder-step builder-review-step">
            <div className="builder-step-copy">
              <CheckCircle2 aria-hidden="true" />
              <p className="section-code">Buyer approval</p>
              <h2>Review your campaign.</h2>
              <p>
                Nothing is submitted until you approve the details below.
              </p>
            </div>
            <dl className="builder-summary">
              {[
                ["Delivery", deliveryLabel(draft.deliveryModel), 1],
                [
                  "Vertical",
                  `${draft.vertical.name} · ${draft.vertical.category}`,
                  1,
                ],
                [
                  "Locations",
                  [...draft.locations.states, ...draft.locations.zipCodes].join(", "),
                  2,
                ],
                [
                  "Schedule",
                  draft.schedule.windows.length
                    ? `${draft.schedule.windows[0].days.length === 5 ? "Weekdays" : "Every day"} · ${draft.schedule.windows[0].start}–${draft.schedule.windows[0].end} · ${draft.schedule.timezone}`
                    : "Needs confirmation",
                  2,
                ],
                [
                  "Volume",
                  draft.volume.count
                    ? `${draft.volume.count} per ${draft.volume.period}`
                    : "Needs confirmation",
                  3,
                ],
                [
                  "Qualification",
                  draft.qualificationRules.join("; ") || "Needs confirmation",
                  3,
                ],
                ["Destination", draft.destination, 3],
                [
                  "Contact",
                  `${contact.buyerName} · ${contact.company} · ${contact.workEmail}`,
                  4,
                ],
              ].map(([label, value, editStep]) => (
                <div key={String(label)}>
                  <dt>{String(label)}</dt>
                  <dd>{String(value)}</dd>
                  <button
                    aria-label={`Edit ${label}`}
                    onClick={() => {
                      trackFunnelEvent({
                        name: "campaign_summary_edit",
                        step: String(label),
                      });
                      goTo(Number(editStep));
                    }}
                    type="button"
                  >
                    <Edit3 aria-hidden="true" size={15} />
                  </button>
                </div>
              ))}
            </dl>
            {unresolved.length > 0 && (
              <div className="unresolved-warning">
                Confirm before submission: {unresolved.join(", ")}.
              </div>
            )}
            <div className="builder-step-actions">
              <button className="button button-outline" onClick={() => goTo(4)} type="button">
                <ArrowLeft aria-hidden="true" /> Back
              </button>
              <button
                className="button button-purple"
                disabled={busy || unresolved.length > 0}
                onClick={submitCampaign}
                type="button"
              >
                {busy ? (
                  <LoaderCircle className="spin" aria-hidden="true" />
                ) : (
                  <Check aria-hidden="true" />
                )}
                Approve and submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
