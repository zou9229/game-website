import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: process.env.DOCKER ? 'standalone' : undefined,
  reactStrictMode: false,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;
