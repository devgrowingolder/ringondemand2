import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/about", destination: "/company/about", permanent: true },
      { source: "/products/calls", destination: "/products/inbound-calls", permanent: true },
      { source: "/products/leads", destination: "/products/real-time-leads", permanent: true },
      { source: "/products/appointments", destination: "/products/booked-appointments", permanent: true },
      { source: "/products/quality-review", destination: "/platform/quality-review", permanent: true },
      { source: "/products/campaign-controls", destination: "/platform/campaign-setup", permanent: true },
      { source: "/platform/buyer-workspace", destination: "/agents", permanent: false },
      { source: "/platform/campaign-management", destination: "/platform/campaign-setup", permanent: true },
      { source: "/platform/integrations", destination: "/connected-apps", permanent: true },
      { source: "/platform/security-and-trust", destination: "/trust", permanent: true },
      { source: "/resources/blog", destination: "/blog", permanent: true },
      { source: "/resources/guides", destination: "/resources", permanent: false },
      { source: "/resources/research", destination: "/resources", permanent: false },
    ];
  },
};

export default nextConfig;
