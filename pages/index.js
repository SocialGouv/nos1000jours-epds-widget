import { Row } from "react-bootstrap"
import {} from "@dataesr/react-dsfr"
import { useEffect, useState } from "react"
import {
  DEFAULT_LOCAL,
  STORAGE_LABELS,
  STORAGE_LOCALE,
  STORAGE_SOURCE,
  STORAGE_TEST_ABC,
  STORAGE_TEST_ABC_CONTACT,
} from "../src/constants/constants"
import { useRouter } from "next/router"
import { gql, useLazyQuery } from "@apollo/client"
import { client, GET_TEMOIGNAGES_CHIFFRES } from "../apollo-client"
import {
  convertArrayLabelsToObject,
  readSourceInUrl,
} from "../src/utils/main.utils"
import {
  EPDS_LABELS_TRANSLATION_BY_LOCALE,
  GET_LOCALES,
} from "@socialgouv/nos1000jours-lib"
import { LocaleButton } from "../src/components/LocaleButton"
import { CarouselCustom } from "../src/components/CarouselCustom"
import * as AbTestingUtils from "../src/utils/ab-testing/ab-testing.utils"
import * as DemographicDataUtils from "../src/utils/ab-testing/demographic-data.utils"
import * as TrackerUtils from "../src/utils/tracker.utils"

export default function Home() {
  const router = useRouter()
  const MAX_CAROUSEL_ITEMS = 6

  const [source, setSource] = useState()
  const [localeSelected, setLocaleSelected] = useState()
  const [labelsTranslated, setLabelsTranslated] = useState()

  const [temoignages, setTemoignages] = useState()
  const [chiffresChoc, setChiffresChoc] = useState()

  useEffect(() => {
    const paramSource = readSourceInUrl()
    setSource(paramSource)

    const localesQuery = async () => {
      await getLocalesInDatabase()
    }
    localesQuery()

    const temoignagesQuery = async () => {
      await getTemoignagesAndChiffresInDatabase()
    }
    temoignagesQuery()
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
    TrackerUtils.genericTracker(
      TrackerUtils.CATEG.home,
      TrackerUtils.NAME.start
    )
    TrackerUtils.track(
      TrackerUtils.CATEG.home,
      TrackerUtils.EVENT_CLICK,
      `Commencer le test - ${source}`
    )
    DemographicDataUtils.trackerForDemographie("Home - Commencer")

    localStorage.setItem(STORAGE_SOURCE, source)
    localStorage.setItem(STORAGE_TEST_ABC, AbTestingUtils.generateRandomTest())
    localStorage.setItem(
      STORAGE_TEST_ABC_CONTACT,
      AbTestingUtils.generateRandomTestContact()
    )
    goToBeforeSurvey()
  }

  const goToBeforeSurvey = async (event) => {
    router.push({
      pathname: "/survey/before-survey",
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

  const [getTemoignagesAndChiffresInDatabase] = useLazyQuery(
    GET_TEMOIGNAGES_CHIFFRES,
    {
      client: client,
      onCompleted: (data) => {
        const chiffresInData = data.temoignages.filter(
          (item) => item.chiffre_choc
        )
        setChiffresChoc(chiffresInData.slice(0, MAX_CAROUSEL_ITEMS))

        const temoignagesInData = data.temoignages.filter(
          (item) => !item.chiffre_choc
        )
        setTemoignages(temoignagesInData.slice(0, MAX_CAROUSEL_ITEMS))
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

  const CarouselsTemoignagesEtChiffres = () => (
    <>
      {temoignages?.length > 0 && (
        <>
          <div className="accueil-title-carousel">Témoignages : </div>
          <CarouselCustom data={temoignages} />
        </>
      )}
      {chiffresChoc?.length > 0 && (
        <>
          <div className="accueil-title-carousel">En chiffres :</div>
          <CarouselCustom data={chiffresChoc} />
        </>
      )}
    </>
  )

  return (
    <div className="container">
      <div className="main">
        <img
          src="/img/logo-republique-francaise.png"
          alt="Logo république française"
          height={100}
          className="rep-francaise-img"
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.1000-premiers-jours.fr/fr/comment-differencier-baby-blues-et-depression-post-partum"
          className="logo-img"
        >
          <img
            src="/img/logo-1000j.svg"
            alt="Logo 1000 premiers jours"
            height={130}
            width={130}
          />
        </a>
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
        <CarouselsTemoignagesEtChiffres />
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
