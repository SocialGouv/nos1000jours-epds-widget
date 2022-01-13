import styles from "../styles/Home.module.css"
import { Col } from "react-bootstrap"
import { } from "@dataesr/react-dsfr"
import Head from "next/head"
import { useEffect, useState } from "react"
import { STORAGE_SOURCE } from "../src/constants/constants"
import { trackerClick } from "../src/utils/tracker.utils"

export default function Home() {
  const [source, setSource] = useState()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    setSource(params.source)
  }, [])

  const startSurvey = () => {
    localStorage.setItem(STORAGE_SOURCE, source)
    trackerClick("Home", "Click", "Commencer le test")

    // TODO: démarrer le questionnaire
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
        <Col style={{ fontWeight: "bolder" }}>
          Se tester c&#39;est déjà se soigner
        </Col>
        <br />
        <button
          className="fr-btn fr-btn--lg"
          onClick={startSurvey}
          disabled={!source}
        >
          COMMENCER LE TEST
        </button>
      </div>
    </div >
  )
}
