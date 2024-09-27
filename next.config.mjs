/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: false,
	env: {
		SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		API_TRANSMANAGER_URL: process.env.API_TRANSMANAGER_URL,
	},
};

export default nextConfig;
