/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
  register: true,
  scope: "/",
  sw: "/service-worker.js",
});
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.chec.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.chec.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/:path*`,
      },
    ];
  },
  swcMinify: false,
};

module.exports = withPWA(nextConfig);
