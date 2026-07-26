"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

const disciplines = [
  "Engineering",
  "Product",
  "Design",
  "Growth",
  "Sales",
  "Customer success",
  "Operations",
  "Other",
];

export function CareerInterestForm() {
  const [prepared, setPrepared] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const discipline = String(form.get("discipline") ?? "");
    const profile = String(form.get("profile") ?? "");
    const note = String(form.get("note") ?? "");
    const subject = encodeURIComponent(`Talent network introduction — ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Discipline: ${discipline}`,
        `Résumé / portfolio / profile: ${profile}`,
        "",
        "Introduction:",
        note,
      ].join("\n"),
    );

    setPrepared(true);
    window.location.href = `mailto:hello@ringondemand.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="career-interest-section">
      <form className="career-interest-form" onSubmit={handleSubmit}>
        <div className="field-grid">
          <label>
            Name
            <input autoComplete="name" name="name" required />
          </label>
          <label>
            Work email
            <input autoComplete="email" name="email" required type="email" />
          </label>
        </div>
        <label>
          Area of interest
          <select defaultValue="" name="discipline" required>
            <option disabled value="">
              Select a discipline
            </option>
            {disciplines.map((discipline) => (
              <option key={discipline}>{discipline}</option>
            ))}
          </select>
        </label>
        <label>
          Résumé, portfolio, or professional profile URL
          <input
            name="profile"
            placeholder="https://"
            required
            type="url"
          />
        </label>
        <label>
          What kind of work do you want to do?
          <textarea
            name="note"
            placeholder="Share the problems you are strongest at solving and why Ring On Demand interests you."
            required
            rows={7}
          />
        </label>
        <label className="career-consent">
          <input name="consent" required type="checkbox" />
          <span>
            I understand this is a general interest submission, not an
            application to a currently open role.
          </span>
        </label>
        <button className="button button-purple" type="submit">
          Prepare my introduction
          <ArrowRight aria-hidden="true" size={16} />
        </button>
        <p className="career-form-note">
          Submitting opens your email client with this information prepared. No
          information is stored by this website.
        </p>
        {prepared && (
          <div className="career-form-status" role="status">
            <CheckCircle2 aria-hidden="true" size={18} />
            <span>Your introduction is ready in your email client.</span>
            <Link href="/careers/thank-you">I sent my introduction</Link>
          </div>
        )}
      </form>
      <aside className="career-apply-aside">
        <p className="section-code">What helps</p>
        <h2>Keep it specific.</h2>
        <ul>
          <li>The discipline or problems you want to own</li>
          <li>One or two examples of relevant work</li>
          <li>The way you collaborate best</li>
          <li>A link the team can review</li>
        </ul>
      </aside>
    </section>
  );
}
