import { useLazyQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { client, QUESTIONNAIRE_EPDS_TRADUCTION } from "../apollo-client"
import { ContentLayout } from "../src/components/Layout"
import { SurveyCarousel } from "../src/components/survey/SurveyCarousel"
import { } from "@dataesr/react-dsfr"
import { SurveyProgressBar } from "../src/components/survey/SurveyProgressBar"

export default function EpdsSurvey() {
  const router = useRouter()
  const ref = useRef(null)

  const [questionsEpds, setQuestionsEpds] = useState()
  const [resultsBoard, setResultsBoard] = useState()

  const [actualIndex, setActualIndex] = useState(1)
  const [isEnabledNextButton, setEnabledNextButton] = useState(false)
  const [sendScore, setSendScore] = useState(false)
  const [isIdReturned, setIdReturned] = useState(false)

  const [getEpdsSurveyQuery] = useLazyQuery(QUESTIONNAIRE_EPDS_TRADUCTION, {
    client: client,
    onCompleted: (data) => {
      const dataSorted = checkQuestionsOrder([
        ...data.questionnaireEpdsTraductions,
      ])
      //TODO:
      setQuestionsEpds(dataSorted)
    },
    onError: (err) => {
      console.warn(err)
    },
  })

  const goToResults = async (event) => {
    // router.push({
    //   pathname: "/",
    // })
  }

  useEffect(() => {
    // TODO: la locale sera a modifier lorsque l'on ajoutera la traduction
    const epdsSurveyQuery = async () => {
      await getEpdsSurveyQuery({
        variables: { locale: "FR" },
      })
    }

    epdsSurveyQuery()
  }, [])

  useEffect(() => {
    setResultsBoard(new Array(questionsEpds?.length))
  }, [questionsEpds])

  useEffect(() => {
    if (resultsBoard != undefined)
      setEnabledNextButton(resultsBoard[actualIndex - 1] != null)
  }, [actualIndex])

  const onPreviousQuestion = () => {
    ref.current.prev()
    setActualIndex(actualIndex - 1)
  }

  const onNextQuestion = () => {
    ref.current.next()
    setActualIndex(actualIndex + 1)
  }

  return (
    <ContentLayout>
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
              onPrevious={onPreviousQuestion}
              onNext={onNextQuestion}
              showPrevious={actualIndex > 1}
              isEnabledNext={isEnabledNextButton}
              showNext={actualIndex < questionsEpds?.length}
              nextPage={goToResults}
              sendScore={setSendScore}
              isIdReturned={isIdReturned}
            />
          </>
        ) : null}
      </div>
    </ContentLayout>
  )
}

const PreviousAndNextButton = (props) => (
  <div
    className="survey-buttons"
    style={{
      justifyContent: props.showPrevious ? "space-between" : "flex-end",
    }}
  >
    <button
      className="fr-btn fr-btn--secondary"
      onClick={props.onPrevious}
      style={{ display: props.showPrevious ? "block" : "none" }}
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
      onClick={props.onNext}
      disabled={!props.isEnabledNext}
      style={{ display: props.showNext ? "block" : "none" }}
    >
      <img
        alt=""
        src="/img/icone-suivant.svg"
        height={10}
        style={{ marginRight: 10 }}
      />
      Suivant
    </button>
  </div>
)

export const checkQuestionsOrder = (questionsEpds) => {
  for (const [index, value] of questionsEpds.entries()) {
    if (value.ordre != index + 1) {
      return questionsEpds.sort((a, b) => a.ordre - b.ordre)
    }
  }

  return questionsEpds
}
