/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // Remove the static export
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;