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
import { getInLocalStorage } from "../src/utils/main.utils"

export default function Results() {
  const router = useRouter()

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

  return (
    <ContentLayout>
      <WidgetHeader title={Labels.titleDPP} />
      <ResultsMood scoreLevel={scoreLevelForMood} />
      <Row>
        <p>
          <b>
            Oser en parler, c’est déjà prendre soin de soi et de son enfant !
          </b>
        </p>
        <p>{descriptionByScoreLevel(scoreLevelForTexts)}</p>
        <p>
          <b>{conclusionByScoreLevel(scoreLevelForTexts)}</b>
        </p>
      </Row>
      <ContactMamanBlues scoreLevel={scoreLevelForMacaron} />

      <button
        className="fr-btn"
        onClick={goToSurvey}
        style={{ width: "auto", marginBottom: 10 }}
      >
        Retour au questionnaire
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
