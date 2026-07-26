import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-chrome";

export const metadata: Metadata = { title: "Introduction sent", robots: { index: false, follow: false } };
export default function CareerThankYouPage() {
  return <SiteShell><main className="funnel-thank-you"><CheckCircle2 aria-hidden="true" /><p className="section-code">Talent network</p><h1>Thank you for introducing yourself.</h1><p>This confirms only that you prepared and sent a general-interest introduction. It is not an application to a currently open role.</p><Link className="button button-dark" href="/careers">Return to careers</Link></main></SiteShell>;
}
