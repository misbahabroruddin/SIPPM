/** @type {import('next').NextConfig} */

const getHost = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://sippm.dev-unsia.id";
  }
  return process.env.NODE_ENV === "production"
    ? "https://sippm.dev-unsia.id"
    : "http://localhost:3000";
};
const nextConfig = {
  env: {
    BASE_URL: getHost(),
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "sippm.unsia.ac.id",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "backend-dev.unsia.ac.id",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
