import "bootstrap/dist/css/bootstrap.css"
import "../styles/index.scss"
import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css"

import App from "next/app"
import Head from "next/head"
import Link from "next/link"
import React from "react"
import { init } from "@socialgouv/matomo-next"
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui"
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next-pagesdir"

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID
const MATOMO_ENABLED = process.env.NEXT_PUBLIC_MATOMO_ENABLED

const { withDsfr, dsfrDocumentApi } = createNextDsfrIntegrationApi({
  defaultColorScheme: "system",
  Link,
  preloadFonts: [
    "Marianne-Light",
    "Marianne-Light_Italic",
    "Marianne-Regular",
    "Marianne-Regular_Italic",
    "Marianne-Medium",
    "Marianne-Medium_Italic",
    "Marianne-Bold",
    "Marianne-Bold_Italic",
    "Spectral-Regular",
    "Spectral-ExtraBold",
  ],
})

export { dsfrDocumentApi }

class MyApp extends App {
  componentDidMount() {
    if (MATOMO_ENABLED === "true")
      init({ siteId: MATOMO_SITE_ID, url: MATOMO_URL })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <React.Fragment>
        <MuiDsfrThemeProvider>
          <Head>
            <title>1000 premiers jours</title>
            <meta
              property="og:title"
              content="1000 premiers jours"
              key="title"
            />
          </Head>
          <Component {...pageProps} />
        </MuiDsfrThemeProvider>
      </React.Fragment>
    )
  }
}

export default withDsfr(MyApp)
