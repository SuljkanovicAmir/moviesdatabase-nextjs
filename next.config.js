const webpack = require('webpack')
const dotenv = require('dotenv-webpack')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['image.tmdb.org'],
    unoptimized: true,
  },
  webpack: (config) => {
    config.plugins.push(new dotenv({ path: './.env.production' }))
    return config
  },
}

module.exports = nextConfig
