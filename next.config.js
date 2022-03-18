/** @type {import('next').NextConfig} */
const nextConfig = {
  basepath: "/",
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/v1/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
