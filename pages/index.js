import { Row } from "react-bootstrap"
import { } from "@dataesr/react-dsfr"
import { useEffect, useState } from "react"
import {
  DEFAULT_LOCAL,
  STORAGE_LABELS,
  STORAGE_LOCALE,
  STORAGE_SOURCE,
} from "../src/constants/constants"
import { CATEG, EVENT_CLICK, trackerClick } from "../src/utils/tracker.utils"
import { useRouter } from "next/router"
import { gql, useLazyQuery } from "@apollo/client"
import { client } from "../apollo-client"
import { convertArrayLabelsToObject } from "../src/utils/main.utils"
import {
  EPDS_LABELS_TRANSLATION_BY_LOCALE,
  GET_LOCALES,
} from "@socialgouv/nos1000jours-lib"
import { LocaleButton } from "../src/components/LocaleButton"

export default function Home() {
  const router = useRouter()

  const [source, setSource] = useState()
  const [localeSelected, setLocaleSelected] = useState()
  const [labelsTranslated, setLabelsTranslated] = useState()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    setSource(params.source)

    const localesQuery = async () => {
      await getLocalesInDatabase()
    }
    localesQuery()
  }, [])

  useEffect(() => {
    if (localeSelected) {
      localStorage.setItem(STORAGE_LOCALE, JSON.stringify(localeSelected))

      const translationQuery = async () => {
        await getLabelsTranslationsQuery({
          variables: { locale: localeSelected.identifiant },
        })
      }
      translationQuery()
    }
  }, [localeSelected])

  const startSurvey = () => {
    trackerClick(CATEG.Home, EVENT_CLICK, `Commencer le test - ${source}`)
    localStorage.setItem(STORAGE_SOURCE, source)

    goToEpdsSurvey()
  }

  const goToEpdsSurvey = async (event) => {
    router.push({
      pathname: "/epds-survey",
    })
  }

  const [getLabelsTranslationsQuery] = useLazyQuery(
    gql(EPDS_LABELS_TRANSLATION_BY_LOCALE),
    {
      client: client,
      onCompleted: (data) => {
        const labelsData = data.labelsEpdsTraductions[0]?.labels
        const labels = convertArrayLabelsToObject(labelsData)
        setLabelsTranslated(labels)
        localStorage.setItem(STORAGE_LABELS, JSON.stringify(labels))
      },
      onError: (err) => {
        console.warn(err)
      },
    }
  )

  const [getLocalesInDatabase] = useLazyQuery(gql(GET_LOCALES), {
    client: client,
    onCompleted: (data) => {
      const locale = data.locales.find(
        (element) => element.identifiant === DEFAULT_LOCAL
      )
      setLocaleSelected(locale)
    },
    onError: (err) => {
      console.warn(err)
    },
  })

  return (
    <div className="container">
      <div className="main">
        <img
          src="/img/logo-1000j.svg"
          alt="Logo 1000 premiers jours"
          height={130}
          width={130}
          onClick={source ? startSurvey : null}
          className={`${source ? "cursor-pointer" : ""}`}
        />
        <Row className="slogan">{getSlogan(source, labelsTranslated)}</Row>
        <br />
        <button
          className="fr-btn fr-btn--lg"
          onClick={startSurvey}
          disabled={!source}
          style={{ marginBottom: "5%" }}
        >
          {getStartButtonText(labelsTranslated)}
        </button>
        <LocaleButton
          locale={localeSelected}
          setLocaleSelected={setLocaleSelected}
          hasText={true}
        />
      </div>
    </div>
  )
}

export const getSlogan = (source, labels) => {
  if (labels) {
    if (source) {
      const sloganBySource = `slogan_${source.toLowerCase()}`
      if (labels[sloganBySource]) return labels[sloganBySource]
    }

    const sloganByLocale = labels.slogan
    if (sloganByLocale) return sloganByLocale
  }

  return "Futurs parents, parents, évaluez votre bien-être émotionnel en quelques minutes"
}

export const getStartButtonText = (labels) =>
  labels?.bouton_commencer ?? "Commencer"
