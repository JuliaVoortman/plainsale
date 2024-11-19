/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Disable experimental features
    serverActions: false,
    serverComponents: false
  },
  // Use simplified compilation
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    return config;
  }
};

module.exports = nextConfig;