/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true }, // Hindari optimasi gambar karena tanpa server
  };
  
  module.exports = nextConfig;
  