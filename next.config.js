/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'ru-msk-dr3-1.store.cloud.mts.ru',
      'store.cloud.mts.ru'
    ],
  }
}

module.exports = nextConfig; 