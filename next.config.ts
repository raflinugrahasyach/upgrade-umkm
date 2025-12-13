// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Izinkan semua subdomain supabase
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Untuk placeholder testing
      }
    ],
  },
  // Opsi lain jika perlu
};

export default nextConfig;