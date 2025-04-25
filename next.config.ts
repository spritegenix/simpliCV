import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const pwaConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
});


const nextConfig: NextConfig = {
  runtime: "nodejs",
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "84lqzifsyk0p0dtg.public.blob.vercel-storage.com"
      }
    ]
  },
};

export default pwaConfig(nextConfig);
