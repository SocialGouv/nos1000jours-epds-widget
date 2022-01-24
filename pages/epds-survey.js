import { useLazyQuery, useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import {
  client,
  EPDS_SAVE_RESPONSE,
  GET_LOCALES,
  QUESTIONNAIRE_EPDS_TRADUCTION,
} from "../apollo-client"
import { ContentLayout } from "../src/components/Layout"
import { SurveyCarousel } from "../src/components/survey/SurveyCarousel"
import { } from "@dataesr/react-dsfr"
import { SurveyProgressBar } from "../src/components/survey/SurveyProgressBar"
import {
  EpdsGender,
  EPDS_SOURCE,
  STORAGE_SCORE_LEVEL_MACARON,
  STORAGE_SCORE_LEVEL_MOOD,
  STORAGE_SCORE_LEVEL_TEXTS,
  STORAGE_SOURCE,
} from "../src/constants/constants"
import { EVENT_CLICK, trackerClick } from "../src/utils/tracker.utils"
import { Spinner } from "react-bootstrap"
import {
  scoreLevelForMacaron,
  scoreLevelForMood,
  scoreLevelForTexts,
} from "../src/utils/utils"
import { Labels } from "../src/constants/specificLabels"

export default function EpdsSurvey() {
  const router = useRouter()
  const ref = useRef(null)

  const DEFAULT_LOCAL = "FR"

  const [questionsEpds, setQuestionsEpds] = useState()
  const [resultsBoard, setResultsBoard] = useState()
  const [localeSelected, setLocaleSelected] = useState()

  const [actualIndex, setActualIndex] = useState(1)
  const [isEnabledNextButton, setEnabledNextButton] = useState(false)
  const [sendScore, setSendScore] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const [getEpdsSurveyQuery] = useLazyQuery(QUESTIONNAIRE_EPDS_TRADUCTION, {
    client: client,
    onCompleted: (data) => {
      const dataSorted = checkQuestionsOrder([
        ...data.questionnaireEpdsTraductions,
      ])
      setQuestionsEpds(dataSorted)
    },
    onError: (err) => {
      console.warn(err)
    },
  })

  const [saveResponseQuery] = useMutation(EPDS_SAVE_RESPONSE, {
    client: client,
    onError: (err) => {
      console.warn(err)
      setLoading(false)
    },
    onCompleted: (data) => {
      // Le niveau du score est mis en mémoire ici afin de ne pas faire transiter les résultats
      const totalScore = totalScoreFromResults(resultsBoard)
      localStorage.setItem(
        STORAGE_SCORE_LEVEL_MOOD,
        scoreLevelForMood(totalScore, resultsBoard[9].points)
      )
      localStorage.setItem(
        STORAGE_SCORE_LEVEL_TEXTS,
        scoreLevelForTexts(totalScore, resultsBoard[9].points)
      )
      localStorage.setItem(
        STORAGE_SCORE_LEVEL_MACARON,
        scoreLevelForMacaron(totalScore, resultsBoard[9].points)
      )

      goToResults()
    },
  })

  const [getLocalesInDatabase] = useLazyQuery(GET_LOCALES, {
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

  const goToResults = async (event) => {
    router.push({
      pathname: "/results",
    })
  }

  useEffect(() => {
    const localesQuery = async () => {
      await getLocalesInDatabase()
    }

    localesQuery()
  }, [])

  useEffect(() => {
    const epdsSurveyQuery = async () => {
      await getEpdsSurveyQuery({
        variables: { locale: localeSelected.identifiant },
      })
    }

    if (localeSelected) epdsSurveyQuery()
  }, [localeSelected])

  useEffect(() => {
    setResultsBoard(new Array(questionsEpds?.length))
  }, [questionsEpds])

  useEffect(() => {
    if (resultsBoard != undefined)
      setEnabledNextButton(resultsBoard[actualIndex - 1] != null)
  }, [actualIndex])

  useEffect(() => {
    const saveEpdsResults = async () => {
      if (sendScore) {
        const score = resultsBoard
          .map((data) => data.points)
          .reduce((a, b) => a + b, 0)

        const source = localStorage.getItem(STORAGE_SOURCE)

        await saveResponseQuery({
          variables: {
            compteur: 1,
            genre: EpdsGender.inconnu.strapiLibelle,
            reponseNum1: resultsBoard[0].points,
            reponseNum10: resultsBoard[9].points,
            reponseNum2: resultsBoard[1].points,
            reponseNum3: resultsBoard[2].points,
            reponseNum4: resultsBoard[3].points,
            reponseNum5: resultsBoard[4].points,
            reponseNum6: resultsBoard[5].points,
            reponseNum7: resultsBoard[6].points,
            reponseNum8: resultsBoard[7].points,
            reponseNum9: resultsBoard[8].points,
            score: score,
            langue: localeSelected.id,
            source: EPDS_SOURCE,
            sourceWidgetNom: source,
          },
        })
      }
    }

    saveEpdsResults()
  }, [sendScore])

  const onPreviousQuestion = () => {
    ref.current.prev()
    setActualIndex(actualIndex - 1)
  }

  const onNextQuestion = () => {
    ref.current.next()
    setActualIndex(actualIndex + 1)
  }

  const PreviousAndNextButton = ({ showPrevious, showNext }) => {
    return (
      <div
        className="survey-buttons"
        style={{
          justifyContent: showPrevious ? "space-between" : "flex-end",
        }}
      >
        <button
          className="fr-btn fr-btn--secondary"
          onClick={onPreviousQuestion}
          style={{ display: showPrevious ? "block" : "none" }}
          disabled={isLoading}
        >
          <img
            alt=""
            src="/img/icone-precedent.svg"
            height={10}
            style={{ marginRight: 10 }}
          />
          Précédent
        </button>

        <button
          className="fr-btn fr-btn--secondary"
          onClick={onNextQuestion}
          disabled={!isEnabledNextButton}
          style={{ display: showNext ? "block" : "none" }}
        >
          <img
            alt=""
            src="/img/icone-suivant.svg"
            height={10}
            style={{ marginRight: 10 }}
          />
          Suivant
        </button>

        <div style={{ display: showNext ? "none" : "flex" }}>
          <button
            className="fr-btn"
            onClick={() => {
              setSendScore(true)
              setLoading(true)
              trackerClick("Questionnaire", EVENT_CLICK, "Terminer")
            }}
            disabled={!isEnabledNextButton || isLoading}
          >
            Terminer
          </button>
          <Spinner
            animation="border"
            hidden={!isLoading}
            style={{ margin: 3 }}
          />
        </div>
      </div>
    )
  }

  return (
    <ContentLayout>
      <h5 className="title-ddp">{Labels.titleDPP}</h5>
      <div>{Labels.surveyExplanations}</div>
      <div style={{ alignItems: "center" }}>
        {questionsEpds ? (
          <>
            <SurveyCarousel
              questions={questionsEpds}
              refForOnClick={ref}
              resultsBoard={resultsBoard}
              setEnabledNextButton={setEnabledNextButton}
            />

            <SurveyProgressBar
              indexNow={actualIndex}
              size={questionsEpds.length}
            />

            <PreviousAndNextButton
              showPrevious={actualIndex > 1}
              showNext={actualIndex < questionsEpds?.length}
            />
          </>
        ) : null}
      </div>
    </ContentLayout>
  )
}

export const checkQuestionsOrder = (questionsEpds) => {
  for (const [index, value] of questionsEpds.entries()) {
    if (value.ordre !== index + 1) {
      return questionsEpds.sort((a, b) => a.ordre - b.ordre)
    }
  }

  return questionsEpds
}

export const totalScoreFromResults = (resultsBoard) =>
  resultsBoard.map((data) => data.points).reduce((a, b) => a + b, 0)
