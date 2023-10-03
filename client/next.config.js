/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config.js");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});
const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: ["cdn.chec.io", "images.openfoodfacts.net", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.openfoodfacts.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_STRAPI_URL.replace("http://",""),
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
      {
        source: "/food/api/:path*",
        destination: `https://world.openfoodfacts.net/api/v2/:path*`,
      },
    ];
  },
  swcMinify: false,
};

module.exports = withPWA(nextConfig);
