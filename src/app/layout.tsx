import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { IntercomChatbot } from "@/components/site/intercom-chatbot";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ringondemand.com"),
  title: {
    default: "Ring On Demand | Turn demand into live conversations",
    template: "%s | Ring On Demand",
  },
  description:
    "Define, route, and review inbound calls, exclusive leads, and appointments from one buyer experience.",
  openGraph: {
    title: "Ring On Demand",
    description: "Turn demand into live conversations.",
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
