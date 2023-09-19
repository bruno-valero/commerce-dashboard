/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: process.env.REGISTERED_DOMAINS.split(',')
  }
}

module.exports = nextConfig;

// [
//   'cdn.shopclues.com', 
//   'hips.hearstapps.com',
//   'images.immediate.co.uk',
//   'images.unsplash.com',
//   'i.imgur.com',
//   'lh3.googleusercontent.com',
// ]
