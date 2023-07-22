/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
  register: true,
  scope: "/",
  sw: "/sw.js",
});
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://localhost:3000/:path*`,
      },
    ];
  },
  swcMinify: false,
};

module.exports = withPWA(nextConfig);
