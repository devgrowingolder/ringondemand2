import {
  ArrowRight,
  Check,
  CircleHelp,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-chrome";

export type FoundationPanelRow = {
  label: string;
  value: string;
};

export type FoundationSection = {
  code: string;
  title: string;
  copy: string;
  points: string[];
  link?: {
    href: string;
    label: string;
  };
};

export type FoundationQuestion = {
  question: string;
  answer: string;
};

type PublicFoundationPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  primaryAction: {
    href: string;
    label: string;
  };
  secondaryAction?: {
    href: string;
    label: string;
  };
  panelLabel: string;
  panelTitle: string;
  panelRows: FoundationPanelRow[];
  statement: string;
  sections: FoundationSection[];
  questions?: FoundationQuestion[];
  closing: {
    title: string;
    copy: string;
    href: string;
    label: string;
  };
};

function ActionLink({
  action,
  inverse = false,
}: {
  action: { href: string; label: string };
  inverse?: boolean;
}) {
  return (
    <Link
      className={`button ${inverse ? "button-light" : "button-dark"}`}
      href={action.href}
    >
      {action.label}
      <ArrowRight aria-hidden="true" size={16} />
    </Link>
  );
}

export function PublicFoundationPage({
  eyebrow,
  title,
  intro,
  primaryAction,
  secondaryAction,
  panelLabel,
  panelTitle,
  panelRows,
  statement,
  sections,
  questions = [],
  closing,
}: PublicFoundationPageProps) {
  return (
    <SiteShell>
      <main className="bg-white text-[var(--rid-ink)]">
        <section className="mx-4 grid min-h-[620px] items-center gap-14 border-b border-[color:var(--rid-border)] bg-[var(--rid-navy)] px-6 py-20 text-white sm:px-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,.88fr)] lg:px-20 lg:py-24">
          <div className="max-w-[790px]">
            <p className="section-code text-[#9f82ff]">{eyebrow}</p>
            <h1 className="mt-7 max-w-[820px] text-[clamp(3rem,6vw,6.5rem)] font-[470] leading-[.92] tracking-[-.06em]">
              {title}
            </h1>
            <p className="mt-8 max-w-[690px] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.55] text-[#d5d0df]">
              {intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink action={primaryAction} inverse />
              {secondaryAction ? (
                <Link
                  className="button button-ghost-light"
                  href={secondaryAction.href}
                >
                  {secondaryAction.label}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              ) : null}
            </div>
          </div>

          <aside className="border border-white/25 bg-[#0a071c]" aria-label={panelLabel}>
            <div className="flex min-h-16 items-center justify-between border-b border-white/20 px-5 font-mono text-[10px] uppercase tracking-[.13em] text-[#d8d0e5] sm:px-6">
              <span>{panelLabel}</span>
              <span className="flex items-center gap-2 text-[#73e1ce]">
                <span className="h-2 w-2 rounded-full bg-[#43cdb8]" aria-hidden="true" />
                Ready to review
              </span>
            </div>
            <div className="px-5 py-7 sm:px-6">
              <h2 className="max-w-[420px] text-[clamp(2rem,3.6vw,3.75rem)] font-[480] leading-[.98] tracking-[-.05em]">
                {panelTitle}
              </h2>
              <dl className="mt-8 border-t border-white/20">
                {panelRows.map((row) => (
                  <div
                    className="grid min-h-20 gap-2 border-b border-white/20 py-5 sm:grid-cols-[130px_1fr] sm:items-center"
                    key={row.label}
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[.12em] text-[#a9a1b8]">
                      {row.label}
                    </dt>
                    <dd className="m-0 text-[15px] font-medium leading-6 text-white">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </section>

        <section className="mx-4 border-b border-[color:var(--rid-border)] px-6 py-20 sm:px-10 lg:px-20 lg:py-28">
          <p className="section-code">What this means for your team</p>
          <h2 className="mt-7 max-w-[1120px] text-[clamp(2.65rem,5.3vw,5.5rem)] font-[470] leading-[.96] tracking-[-.055em]">
            {statement}
          </h2>
        </section>

        {sections.map((section) => (
          <section
            className="mx-4 grid gap-12 border-b border-[color:var(--rid-border)] px-6 py-20 sm:px-10 lg:grid-cols-[minmax(250px,.65fr)_minmax(0,1.35fr)] lg:gap-24 lg:px-20 lg:py-28"
            key={section.code}
          >
            <div>
              <p className="section-code">[{section.code}]</p>
              <h2 className="mt-6 max-w-[540px] text-[clamp(2.5rem,4.6vw,4.75rem)] font-[480] leading-[.98] tracking-[-.055em]">
                {section.title}
              </h2>
              <p className="mt-7 max-w-[570px] text-[17px] leading-7 text-[var(--rid-muted)]">
                {section.copy}
              </p>
              {section.link ? (
                <Link
                  className="mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[.08em] text-[var(--rid-violet)] underline decoration-1 underline-offset-4"
                  href={section.link.href}
                >
                  {section.link.label}
                  <ArrowRight aria-hidden="true" size={15} />
                </Link>
              ) : null}
            </div>

            <div className="border-t border-[color:var(--rid-border-strong)]">
              {section.points.map((point, pointIndex) => (
                <div
                  className="grid min-h-24 grid-cols-[42px_1fr] items-start gap-4 border-b border-[color:var(--rid-border)] py-6 sm:grid-cols-[58px_1fr]"
                  key={point}
                >
                  <span className="font-mono text-[11px] text-[var(--rid-violet)]">
                    {String(pointIndex + 1).padStart(2, "0")}
                  </span>
                  <p className="m-0 max-w-[760px] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-7">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {questions.length ? (
          <section className="mx-4 grid gap-12 border-b border-[color:var(--rid-border)] px-6 py-20 sm:px-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-24 lg:px-20 lg:py-28">
            <div>
              <p className="section-code">Questions buyers ask</p>
              <h2 className="mt-6 text-[clamp(2.5rem,4.5vw,4.5rem)] font-[480] leading-[.98] tracking-[-.055em]">
                Clear answers before the next step.
              </h2>
            </div>
            <div className="border-t border-[color:var(--rid-border-strong)]">
              {questions.map((item) => (
                <details
                  className="group border-b border-[color:var(--rid-border)] py-1"
                  key={item.question}
                >
                  <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium marker:hidden">
                    <span>{item.question}</span>
                    <CircleHelp
                      aria-hidden="true"
                      className="shrink-0 text-[var(--rid-violet)]"
                      size={20}
                      strokeWidth={1.5}
                    />
                  </summary>
                  <p className="mb-7 max-w-[760px] pr-10 leading-7 text-[var(--rid-muted)]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mx-4 grid gap-8 border-b border-[color:var(--rid-border)] px-6 py-16 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-end lg:px-20 lg:py-20">
          <div>
            <p className="section-code">Your next step</p>
            <h2 className="mt-5 max-w-[880px] text-[clamp(2.4rem,4.3vw,4.5rem)] font-[480] leading-[.98] tracking-[-.055em]">
              {closing.title}
            </h2>
            <p className="mt-5 max-w-[690px] text-[17px] leading-7 text-[var(--rid-muted)]">
              {closing.copy}
            </p>
          </div>
          <ActionLink action={{ href: closing.href, label: closing.label }} />
        </section>
      </main>
    </SiteShell>
  );
}

export type DirectoryItem = {
  href: string;
  title: string;
  copy: string;
  icon: LucideIcon;
};

export function FoundationDirectory({
  items,
}: {
  items: DirectoryItem[];
}) {
  return (
    <div className="border-t border-[color:var(--rid-border-strong)]">
      {items.map(({ href, title, copy, icon: Icon }) => (
        <Link
          className="group grid min-h-28 gap-4 border-b border-[color:var(--rid-border)] py-6 sm:grid-cols-[52px_1fr_auto] sm:items-center"
          href={href}
          key={href}
        >
          <span className="flex h-11 w-11 items-center justify-center border border-[color:var(--rid-border)] text-[var(--rid-violet)] transition-colors group-hover:border-[color:var(--rid-violet)]">
            <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
          </span>
          <span>
            <strong className="block text-xl font-medium">{title}</strong>
            <span className="mt-1 block max-w-[720px] leading-6 text-[var(--rid-muted)]">
              {copy}
            </span>
          </span>
          <span className="flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[.08em] text-[var(--rid-violet)]">
            Explore
            <ArrowRight aria-hidden="true" size={15} />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function FoundationChecklist({ items }: { items: string[] }) {
  return (
    <div className="border border-[color:var(--rid-border)] bg-[var(--rid-canvas-soft)] p-5 sm:p-7">
      {items.map((item) => (
        <p
          className="m-0 flex min-h-14 items-center gap-3 border-b border-[color:var(--rid-border)] py-3 text-[15px] leading-6 last:border-b-0"
          key={item}
        >
          <Check
            aria-hidden="true"
            className="shrink-0 text-[var(--rid-success)]"
            size={17}
          />
          {item}
        </p>
      ))}
    </div>
  );
}
