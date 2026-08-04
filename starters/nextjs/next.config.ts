import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // @sistem-digital/components și @sistem-digital/tokens sunt pachete ESM
  // publicate necompilate pentru bundler-ul aplicației — trebuie transpilate
  // aici, la fel ca în apps/website.
  transpilePackages: ['@sistem-digital/components', '@sistem-digital/tokens'],
};

export default nextConfig;
