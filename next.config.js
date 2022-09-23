module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "backoffice-env-1000jours-develop-91uqrt.dev.fabrique.social.gouv.fr",
      "backoffice-1000jours-preprod.dev.fabrique.social.gouv.fr",
      "backoffice-1000jours.fabrique.social.gouv.fr",
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      }
    }

    return config
  },
}
