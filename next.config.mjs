/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SITE_URL: process.env.SITE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

export default nextConfig;
