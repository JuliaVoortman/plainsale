/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add any image domains you need to use
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    return config;
  },
}