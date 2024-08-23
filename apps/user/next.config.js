/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@jeiltodo/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};
