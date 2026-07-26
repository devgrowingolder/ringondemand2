import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  MessageSquareText,
  Network,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Ring On Demand talent network and help build the infrastructure behind live demand.",
};

const principles = [
  {
    icon: MessageSquareText,
    title: "Start with the conversation",
    copy: "We work backward from the moment a buyer and prospect connect, then make every step around it clearer.",
  },
  {
    icon: Network,
    title: "Build connected systems",
    copy: "Sales, campaign setup, routing, quality review, and handoff should operate from one shared record.",
  },
  {
    icon: HeartHandshake,
    title: "Earn trust in the details",
    copy: "Clear expectations, buyer approval, and honest product communication matter more than shortcuts.",
  },
];

const process = [
  ["01", "Introduce yourself", "Share the work you want to do and the problems you are best at solving."],
  ["02", "Talk with the team", "If there is a potential fit, we will contact you for a focused conversation."],
  ["03", "Explore the work", "Relevant candidates may work through a role-specific discussion or practical exercise."],
  ["04", "Agree on the next step", "We will communicate the outcome and any role details directly."],
];

const faqs = [
  {
    question: "Are there open positions today?",
    answer:
      "This page currently accepts general interest submissions for the Ring On Demand talent network. A submission is not an application to a specific open role or a guarantee of employment.",
  },
  {
    question: "What should I include?",
    answer:
      "Tell us which kind of work you do, why Ring On Demand interests you, and include a link to your résumé, portfolio, or professional profile.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "Your email client will open with your information prepared for the Ring On Demand team. We will follow up only when there is a relevant opportunity.",
  },
];

export default function CareersPage() {
  return (
    <SiteShell>
      <main className="careers-page">
        <section className="careers-hero">
          <div className="careers-hero-copy">
            <p className="section-code">Careers</p>
            <h1>Help us build a better way to buy inbound demand.</h1>
            <p>
              Join a team making calls, leads, and appointments easier for
              buyers to define, receive, and review.
            </p>
            <Link className="button button-light" href="#open-positions">
              Join the talent network
              <ArrowDown aria-hidden="true" size={17} />
            </Link>
          </div>
          <div className="careers-hero-panel" aria-label="What we are building">
            <div>
              <span>01</span>
              <p>Define demand</p>
            </div>
            <div>
              <span>02</span>
              <p>Route conversations</p>
            </div>
            <div>
              <span>03</span>
              <p>Review outcomes</p>
            </div>
          </div>
        </section>

        <section className="section-frame careers-intro">
          <div className="section-heading">
            <p className="section-code">[01] Who we are</p>
            <div>
              <h2>Making performance marketing easier to understand and run.</h2>
              <p>
                Ring On Demand connects campaign intent with the systems that
                move a live call, lead, or appointment to the right buyer.
                We care about precise product thinking, accountable operations,
                and experiences people can understand on the first pass.
              </p>
            </div>
          </div>
          <div className="careers-principle-grid">
            {principles.map(({ icon: Icon, title, copy }, index) => (
              <article key={title}>
                <span className="careers-card-number">0{index + 1}</span>
                <Icon aria-hidden="true" size={32} strokeWidth={1.35} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="careers-openings" id="open-positions">
          <div className="section-heading">
            <p className="section-code">[02] Open positions</p>
            <div>
              <h2>Start with an open introduction.</h2>
              <p>
                We are building our talent network before publishing
                role-specific openings. Tell us where you can have the greatest
                impact and we will keep the conversation focused.
              </p>
            </div>
          </div>
          <div className="career-role-row">
            <div>
              <p className="career-role-team">Talent network</p>
              <h3>General interest</h3>
            </div>
            <div className="career-role-meta">
              <span>Remote-friendly</span>
              <span>Multiple disciplines</span>
              <span>No current role implied</span>
            </div>
            <Link className="button button-dark" href="/careers/apply">
              Introduce yourself
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </section>

        <section className="section-frame careers-work">
          <div className="section-heading">
            <p className="section-code">[03] How we work</p>
            <div>
              <h2>Small loops. Clear ownership. Real feedback.</h2>
            </div>
          </div>
          <div className="careers-work-grid">
            {[
              ["Customer close-up", "Stay close to the buyer, the operator, and the conversation being delivered.", Users],
              ["Make it legible", "Turn complex rules and workflows into decisions people can confidently approve.", Sparkles],
              ["Finish the loop", "Measure what happened, learn from it, and improve the next campaign.", CheckCircle2],
            ].map(([title, copy, icon]) => {
              const Icon = icon as typeof Users;
              return (
                <article key={title as string}>
                  <Icon aria-hidden="true" />
                  <h3>{title as string}</h3>
                  <p>{copy as string}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="careers-process">
          <div className="section-heading">
            <p className="section-code">[04] Hiring process</p>
            <div>
              <h2>Know what comes next.</h2>
              <p>
                The exact process may change with the work, but the principles
                stay consistent: relevant conversations, clear expectations,
                and direct communication.
              </p>
            </div>
          </div>
          <div className="careers-process-list">
            {process.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-frame careers-faq">
          <div className="section-heading">
            <p className="section-code">[05] Questions</p>
            <div>
              <h2>Before you introduce yourself.</h2>
            </div>
          </div>
          <div className="careers-faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
