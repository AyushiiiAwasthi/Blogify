/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/assets/images/:filename*',
                destination: '/api/images/:filename*',
            },
        ];
    },
};

export default nextConfig;
