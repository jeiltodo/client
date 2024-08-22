/** @type {import('next').NextConfig} */
module.exports = {
  basePath: '/admin',
  assetPrefix: '/admin/',
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  reactStrictMode: true,
  transpilePackages: ['@jeiltodo/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};
