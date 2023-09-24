/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: process.env.REGISTERED_DOMAINS.split(',')
  },
  headers: async () => {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};

module.exports = nextConfig;

// [
//   'cdn.shopclues.com', 
//   'hips.hearstapps.com',
//   'images.immediate.co.uk',
//   'images.unsplash.com',
//   'i.imgur.com',
//   'lh3.googleusercontent.com',
// ]
