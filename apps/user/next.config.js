/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // pageExtensions: [],
  transpilePackages: ['@jeiltodo/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};
