import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { IntercomChatbot } from "@/components/site/intercom-chatbot";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ringondemand.com"),
  title: {
    default: "Ring On Demand | High Volume Final Expense Calls",
    template: "%s | Ring On Demand",
  },
  description:
    "Build a Final Expense inbound-call campaign, or explore Ring On Demand campaigns across insurance, home services, legal, and financial verticals.",
  openGraph: {
    title: "Ring On Demand | High Volume Final Expense Calls",
    description:
      "High volume Final Expense calls with guaranteed intent and 90 second call times.",
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
