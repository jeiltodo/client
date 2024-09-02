/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@jeiltodo/ui'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
