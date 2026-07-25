import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { IntercomChatbot } from "@/components/site/intercom-chatbot";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ringondemand.com"),
  title: {
    default: "Ring On Demand | Turn Demand Into Live Conversations",
    template: "%s | Ring On Demand",
  },
  description:
    "Build and manage inbound call, exclusive lead, and appointment campaigns across insurance, home services, legal, and financial markets.",
  openGraph: {
    title: "Ring On Demand | Turn Demand Into Live Conversations",
    description:
      "Describe the demand you need, approve the campaign, and route live conversations into one buyer workspace.",
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
