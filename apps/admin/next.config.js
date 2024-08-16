/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@jeiltodo/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};
