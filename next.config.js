/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['image.tmdb.org'],
    unoptimized: true,
  },
  ignoreWarnings: [/Prop `className` did not match/],
}

module.exports = nextConfig
