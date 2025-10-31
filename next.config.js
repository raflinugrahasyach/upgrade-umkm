/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  experimental: {
    turbopack: {
      root: __dirname, // pastikan Turbopack tahu direktori root proyek
    },
  },
};

module.exports = nextConfig;
