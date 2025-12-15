import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const pwaConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
});


const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {},
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
    // Increase cache limit for static files (e.g. large images)
    // Default is 2MB, increasing to 5MB
    // @ts-ignore
    maximumFileSizeToCacheInBytes: 5242880,

  },
  // @ts-ignore
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "84lqzifsyk0p0dtg.public.blob.vercel-storage.com"
      },
      {
        protocol: "https",
        hostname: "simplicv.s3.ap-south-1.amazonaws.com"
      }
    ]
  },
};

export default pwaConfig(nextConfig);
