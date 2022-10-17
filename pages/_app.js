import "bootstrap/dist/css/bootstrap.css"
import "../styles/index.scss"

import { init } from "@socialgouv/matomo-next"
import App from "next/app"
import React from "react"
import { ThemeProvider } from "react-bootstrap"

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
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default MyApp
