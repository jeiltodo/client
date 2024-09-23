/** @type {import('next').NextConfig} */
module.exports = {
  basePath: '/admin',
  assetPrefix: '/admin/',
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@jeiltodo/ui'],
};
