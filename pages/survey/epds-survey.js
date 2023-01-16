import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import {
  client,
  UPDATE_REPONSES_EPDS_ID_IN_INFORMATION_DEMOGRAPHIQUES,
} from "../../apollo-client"
import { ContentLayout } from "../../src/components/Layout"
import { SurveyCarousel } from "../../src/components/survey/SurveyCarousel"
import { SurveyProgressBar } from "../../src/components/survey/SurveyProgressBar"
import {
  CRISP_CHAT_ID,
  EpdsGender,
  EPDS_SOURCE,
  STORAGE_RESULTS_BOARD,
  STORAGE_RESULTS_ID,
  STORAGE_SCORE,
  STORAGE_SCORE_LEVEL_MACARON,
  STORAGE_SCORE_LEVEL_MOOD,
  STORAGE_SCORE_LEVEL_TEXTS,
  STORAGE_SOURCE,
} from "../../src/constants/constants"
import { Accordion, Spinner } from "react-bootstrap"
import {
  scoreLevelForMacaron,
  scoreLevelForMood,
  scoreLevelForTexts,
} from "../../src/utils/score-level.utils"
import { Labels } from "../../src/constants/specificLabels"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import {
  EPDS_SAVE_RESPONSES_FOR_WIDGET,
  EPDS_SURVEY_TRANSLATION_BY_LOCALE,
} from "@socialgouv/nos1000jours-lib"
import { updateDemographicData } from "../ab-testing/demographic-data-survey"
import * as StorageUtils from "../../src/utils/storage.utils"
import * as TrackerUtils from "../../src/utils/tracker.utils"
import { Crisp } from "crisp-sdk-web"

export default function EpdsSurvey() {
  const router = useRouter()
  const ref = useRef(null)

  const [questionsEpds, setQuestionsEpds] = useState()
  const [resultsBoard, setResultsBoard] = useState()
  const [localeSelected, setLocaleSelected] = useState()
  const [isRTL, setRTL] = useState(false)
  const [showConsigne, setShowConsigne] = useState(true)

  const [actualIndex, setActualIndex] = useState(1)
  const [isEnabledNextButton, setEnabledNextButton] = useState(false)
  const [sendScore, setSendScore] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const source = StorageUtils.getInLocalStorage(STORAGE_SOURCE)

  const [getEpdsSurveyQuery] = useLazyQuery(
    gql(EPDS_SURVEY_TRANSLATION_BY_LOCALE),
    {
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
    }
  )

  const [saveResponseQuery] = useMutation(gql(EPDS_SAVE_RESPONSES_FOR_WIDGET), {
    client: client,
    onError: (err) => {
      console.warn(err)
      setLoading(false)
    },
    onCompleted: (data) => {
      // Le niveau du score est mis en mémoire ici afin de ne pas faire transiter les résultats
      const totalScore = totalScoreFromResults(resultsBoard)
      localStorage.setItem(STORAGE_SCORE, totalScore)
      localStorage.setItem(STORAGE_RESULTS_BOARD, JSON.stringify(resultsBoard))
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
      localStorage.setItem(STORAGE_RESULTS_ID, data.createReponsesEpdsWidget.id)

      updateDemographicData(
        updateEpdsIdInInfosQuery,
        data.createReponsesEpdsWidget.id
      )

      goToResults()
    },
  })

  const [updateEpdsIdInInfosQuery] = useMutation(
    UPDATE_REPONSES_EPDS_ID_IN_INFORMATION_DEMOGRAPHIQUES,
    {
      client: client,
      onError: (err) => console.error(err),
    }
  )

  const goToResults = async (event) => {
    router.push({
      pathname: "/results",
    })
  }

  useEffect(() => {
    Crisp.configure(CRISP_CHAT_ID)
    setLocaleSelected(StorageUtils.getLocaleInLocalStorage())
  }, [])

  useEffect(() => {
    const epdsSurveyQuery = async () => {
      await getEpdsSurveyQuery({
        variables: { locale: localeSelected.identifiant },
      })
    }

    if (localeSelected) {
      setRTL(localeSelected?.sens_lecture_droite_vers_gauche)
      epdsSurveyQuery()
    }
  }, [localeSelected])

  useEffect(() => {
    setResultsBoard(new Array(questionsEpds?.length))
  }, [questionsEpds])

  useEffect(() => {
    if (resultsBoard != undefined)
      setEnabledNextButton(resultsBoard[actualIndex - 1] != null)

    if (actualIndex == 2) setShowConsigne(false)
  }, [actualIndex])

  useEffect(() => {
    const saveEpdsResults = async () => {
      if (sendScore) {
        const score = resultsBoard
          .map((data) => data.points)
          .reduce((a, b) => a + b, 0)

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
          <img alt="" src="/img/icone-precedent.svg" />
          Précédent
        </button>

        <button
          className="fr-btn fr-btn--secondary"
          onClick={onNextQuestion}
          disabled={!isEnabledNextButton}
          style={{ display: showNext ? "block" : "none" }}
        >
          <img alt="" src="/img/icone-suivant.svg" />
          Suivant
        </button>

        <div style={{ display: showNext ? "none" : "flex" }}>
          <button
            className="fr-btn"
            onClick={() => {
              setSendScore(true)
              setLoading(true)

              TrackerUtils.genericTracker(
                TrackerUtils.CATEG.survey,
                TrackerUtils.NAME.end
              )
              TrackerUtils.track(
                TrackerUtils.CATEG.survey,
                TrackerUtils.EVENT_CLICK,
                `Terminer - ${source}`
              )
            }}
            disabled={!isEnabledNextButton || isLoading}
          >
            Terminer
          </button>
          <Spinner animation="border" hidden={!isLoading} />
        </div>
      </div>
    )
  }

  const getExplanations = () => {
    const labels = StorageUtils.getLabelsInLocalStorage()
    return labels?.consigne ? labels.consigne : Labels.surveyExplanations
  }

  const onConsigneClick = () => {
    setShowConsigne(!showConsigne)
  }

  const Consigne = () => {
    return (
      <div className="consignes">
        <Accordion defaultActiveKey={showConsigne ? "0" : null}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Consignes</Accordion.Header>
            <Accordion.Body>
              <i>{getExplanations()}</i>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    )
  }

  return (
    <ContentLayout>
      <WidgetHeader title={Labels.titleDPP} locale={localeSelected} />

      <Consigne />
      <div className="epds-survey">
        {questionsEpds ? (
          <>
            <SurveyCarousel
              questions={questionsEpds}
              refForOnClick={ref}
              resultsBoard={resultsBoard}
              setEnabledNextButton={setEnabledNextButton}
              isRTL={isRTL}
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
