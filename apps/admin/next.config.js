/** @type {import('next').NextConfig} */
module.exports = {
  basePath: '/admin',
  assetPrefix: '/admin/',
  reactStrictMode: true,
  transpilePackages: ['@jeiltodo/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};
