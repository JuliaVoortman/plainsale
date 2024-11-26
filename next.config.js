/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Ignore bcrypt's HTML files
    config.module.rules.push({
      test: /\.html$/,
      loader: 'ignore-loader'
    });
    return config;
  }
};

module.exports = nextConfig;