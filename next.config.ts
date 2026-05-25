import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
