import type { Metadata } from "next";
import AboutPage from "@/app/about/page";

export const metadata: Metadata = {
  title: "About Ring On Demand",
  description:
    "Learn how Ring On Demand helps teams plan, receive, and review inbound calls, real-time leads, and booked appointments.",
};

export default function CompanyAboutPage() {
  return <AboutPage />;
}
