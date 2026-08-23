import type { Metadata } from "next";
import { CareerInterestForm } from "@/components/careers/career-interest-form";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = {
  title: "Join the Talent Network",
  description:
    "Introduce yourself to the Ring On Demand team for future opportunities.",
};

export default function CareerInterestPage() {
  return (
    <SiteShell>
      <main className="career-apply-page">
        <section className="career-apply-intro">
          <p className="section-code">Talent network / General interest</p>
          <h1>Tell us where you do your best work.</h1>
          <p>
            This is an open introduction, not an application to a specific
            position. We will contact you if a relevant opportunity develops.
          </p>
        </section>
        <CareerInterestForm />
      </main>
    </SiteShell>
  );
}
