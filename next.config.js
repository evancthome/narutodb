/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['narutoql.s3.amazonaws.com'],
  },
}

module.exports = nextConfig
