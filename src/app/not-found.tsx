import Link from "next/link";
import { SiteShell } from "@/components/site/site-chrome";

export default function NotFound() {
  return (
    <SiteShell>
      <main className="funnel-thank-you">
        <p className="section-code">404 / Page not found</p>
        <h1>Let&apos;s get you back to the right place.</h1>
        <p>
          The page may have moved. Browse campaign verticals, get pricing, or
          return to the Ring On Demand homepage.
        </p>
        <div>
          <Link className="button button-dark" href="/verticals">
            Browse verticals
          </Link>
          <Link className="button button-outline" href="/build-campaign">
            Get pricing
          </Link>
          <Link className="text-link" href="/">
            Return home
          </Link>
        </div>
      </main>
    </SiteShell>
  );
}
