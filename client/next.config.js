/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js');
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});
const nextConfig = {
  i18n,
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
