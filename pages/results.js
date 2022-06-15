import { useRouter } from "next/router"
import { Row } from "react-bootstrap"
import { WidgetHeader } from "../src/components/WidgetHeader"
import { ContentLayout } from "../src/components/Layout"
import { ContactMamanBlues } from "../src/components/results/ContactMamanBlues"
import { ResultsMood } from "../src/components/results/ResultsMood"
import {
  STORAGE_SCORE_LEVEL_MACARON,
  STORAGE_SCORE_LEVEL_MOOD,
  STORAGE_SCORE_LEVEL_TEXTS,
} from "../src/constants/constants"
import { EpdsResultsComments, Labels } from "../src/constants/specificLabels"
import {
  getInLocalStorage,
  getLocaleInLocalStorage,
} from "../src/utils/main.utils"
import { MeasuringIntentions } from "../src/components/results/intentions/MeasuringIntentions"
import { TEST } from "../src/utils/measuring-intentions.utils"
import { useState } from "react"

export default function Results() {
  const router = useRouter()
  const [testId, setTestId] = useState(null)
  const [isTestStarted, setTestStarted] = useState(false)

  const localeSelected = getLocaleInLocalStorage()
  const scoreLevelForMood = parseInt(
    getInLocalStorage(STORAGE_SCORE_LEVEL_MOOD)
  )
  const scoreLevelForTexts = parseInt(
    getInLocalStorage(STORAGE_SCORE_LEVEL_TEXTS)
  )
  const scoreLevelForMacaron = parseInt(
    getInLocalStorage(STORAGE_SCORE_LEVEL_MACARON)
  )

  const goToSurvey = () => {
    router.push({
      pathname: "/epds-survey",
    })
  }

  const DescriptionAndConclusion = () => (
    <Row>
      <div className="margin-bottom-8">
        <b>Oser en parler, c’est déjà prendre soin de soi et de son enfant !</b>
      </div>
      <div className="margin-bottom-8">
        {descriptionByScoreLevel(scoreLevelForTexts)}
      </div>
      <div className="margin-bottom-8">
        <b>{conclusionByScoreLevel(scoreLevelForTexts)}</b>
      </div>
    </Row>
  )

  return (
    <ContentLayout>
      <WidgetHeader title={Labels.titleDPP} locale={localeSelected} />
      <ResultsMood scoreLevel={scoreLevelForMood} />
      <MeasuringIntentions
        scoreLevel={scoreLevelForMood}
        setTestId={setTestId}
        setTestStarted={setTestStarted}
      />
      {!isTestStarted && <DescriptionAndConclusion />}
      {showContactMamanBlues(scoreLevelForMacaron, testId) && (
        <ContactMamanBlues scoreLevel={scoreLevelForMacaron} />
      )}

      <button
        className="fr-btn fr-btn--secondary result-return-bt"
        onClick={goToSurvey}
      >
        Recommencer le questionnaire
      </button>
    </ContentLayout>
  )
}

export const descriptionByScoreLevel = (level) => {
  switch (level) {
    case 1:
      return EpdsResultsComments.level1.description
    case 2:
      return EpdsResultsComments.level2.description
    case 3:
      return EpdsResultsComments.level3.description
    default:
      return "Pas de description disponible"
  }
}

export const conclusionByScoreLevel = (level) => {
  switch (level) {
    case 1:
      return EpdsResultsComments.level1.conclusion
    case 2:
      return EpdsResultsComments.level2.conclusion
    case 3:
      return EpdsResultsComments.level3.conclusion
    default:
      return "Pas de conclusion disponible"
  }
}

export const showContactMamanBlues = (scoreLevel, testId) => {
  return (scoreLevel != 1 && testId !== TEST.B) || testId === TEST.C
}
