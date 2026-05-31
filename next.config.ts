import type { NextConfig } from "next";

// Sent on every response. These are framework-agnostic hardening headers that
// don't depend on per-page nonces, so they're safe to apply globally.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // HSTS is honoured only over HTTPS, so it's a no-op on localhost http.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// Clickjacking protection for the authenticated admin surfaces only. We do NOT
// set frame-ancestors on public pages so the Sanity Studio Presentation tool can
// still iframe them. A full site-wide script-src CSP should be rolled out
// separately (report-only first) since Sanity Studio needs 'unsafe-eval'.
const frameProtection = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["isomorphic-dompurify", "jsdom"],
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/secretpanel", headers: frameProtection },
      { source: "/secretpanel/:path*", headers: frameProtection },
      { source: "/studio", headers: frameProtection },
      { source: "/studio/:path*", headers: frameProtection },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "watandesigns.sa",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "jvl.kfw.mybluehost.me",
        pathname: "/website_5934159e/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "swissbluehotels.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
