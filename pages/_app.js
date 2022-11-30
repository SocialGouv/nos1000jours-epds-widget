import "bootstrap/dist/css/bootstrap.css"
import "../styles/index.scss"
import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css"

import { init } from "@socialgouv/matomo-next"
import App from "next/app"
import React from "react"
import { ThemeProvider } from "react-bootstrap"
import Head from "next/head"

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID
const MATOMO_ENABLED = process.env.NEXT_PUBLIC_MATOMO_ENABLED

const theme = {
  font: "Marianne",
}
class MyApp extends App {
  componentDidMount() {
    if (MATOMO_ENABLED === "true")
      init({ siteId: MATOMO_SITE_ID, url: MATOMO_URL })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Head>
            <title>1000 premiers jours</title>
            <meta
              property="og:title"
              content="1000 premiers jours"
              key="title"
            />
          </Head>
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default MyApp
