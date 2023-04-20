const withTM = require("next-transpile-modules")(["@codegouvfr/react-dsfr"])

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["fr-FR"],
    defaultLocale: "fr-FR",
  },
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
  transpilePackages: ["@codegouvfr/react-dsfr"],
})
