import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { IntercomChatbot } from "@/components/site/intercom-chatbot";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";
import "./rid-signal.css";
import "./homepage.css";

export const metadata: Metadata = rootMetadata;

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
