/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			new URL('https://placehold.co/**'),
			new URL('https://cdn.grofers.com/**'),
		],
	},
};

export default nextConfig;
