/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Sem projeto Sanity configurado o Studio não funciona — manda para a home.
  async redirects() {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
    return [{ source: '/studio/:path*', destination: '/', permanent: false }];
  },
};

export default nextConfig;
