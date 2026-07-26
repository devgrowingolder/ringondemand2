import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { IntercomChatbot } from "@/components/site/intercom-chatbot";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ringondemand.com"),
  title: {
    default: "Ring On Demand | Pay-Per-Call, Leads & Appointments",
    template: "%s | Ring On Demand",
  },
  description:
    "Buy inbound calls, real-time leads, and booked appointments across insurance, home services, legal, and financial markets.",
  openGraph: {
    title: "Ring On Demand | Pay-Per-Call, Leads & Appointments",
    description:
      "Choose your market, schedule, volume, and delivery model. Ring On Demand builds the campaign around your team.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <IntercomChatbot />
      </body>
    </html>
  );
}
