import styles from "../styles/Home.module.css"
import { Col } from "react-bootstrap"
import { } from "@dataesr/react-dsfr"
import Head from "next/head"
import { useEffect, useState } from "react"

export default function Home() {
  const [source, setSource] = useState()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    setSource(params.source)
  }, [])

  const startSurvey = () => {
    console.log("START")
    /**
     * -> event matoto
     * -> nom du canal (ex : SiteWebPro, Appli1000j ... ou utilisateur du widget, mettre le nom du canal dans les paramètre du widget)
     */
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Questioinnaire EPDS" />
        <link rel="icon" href="/img/logo-1000j.svg" />
      </Head>

      <div className={styles.main}>
        <img
          src="/img/logo-1000j.svg"
          height={75}
          style={{ margin: 15 }}
          alt="Logo 1000 premiers jours"
        />
        <Col>Se tester c&#39;est déjà se soigner</Col>
        <br />
        <button
          className="fr-btn fr-btn--lg"
          onClick={startSurvey}
          disabled={!source}
        >
          COMMENCER LE TEST
        </button>
      </div>
    </div>
  )
}
