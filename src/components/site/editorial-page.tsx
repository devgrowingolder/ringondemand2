import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function EditorialHero({
  code,
  title,
  copy,
  action,
  actionHref = "/build-campaign",
  children,
  inverse = false,
}: {
  code: string;
  title: string;
  copy: string;
  action?: string;
  actionHref?: string;
  children?: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <section className={`editorial-hero ${inverse ? "is-inverse" : ""}`}>
      <div className="editorial-hero-copy">
        <p className="section-code">{code}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
        {action && (
          <Link
            className={`button ${inverse ? "button-light" : "button-dark"}`}
            href={actionHref}
          >
            {action}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        )}
      </div>
      {children && <div className="editorial-hero-media">{children}</div>}
    </section>
  );
}

export function NumberedFeature({
  number,
  title,
  copy,
  children,
  reverse = false,
}: {
  number: string;
  title: string;
  copy: string;
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section className={`numbered-feature ${reverse ? "is-reverse" : ""}`}>
      <div className="numbered-feature-copy">
        <p className="section-code">[{number}]</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className="numbered-feature-media">{children}</div>
    </section>
  );
}
