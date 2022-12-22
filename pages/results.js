import { Row } from "react-bootstrap"
import { WidgetHeader } from "../src/components/WidgetHeader"
import { ContentLayout } from "../src/components/Layout"
import { ContactMamanBlues } from "../src/components/results/ContactMamanBlues"
import { ResultsMood } from "../src/components/results/ResultsMood"
import {
  STORAGE_SCORE,
  STORAGE_SCORE_LEVEL_MACARON,
  STORAGE_SCORE_LEVEL_MOOD,
  STORAGE_SCORE_LEVEL_TEXTS,
} from "../src/constants/constants"
import { EpdsResultsComments, Labels } from "../src/constants/specificLabels"
import * as StorageUtils from "../src/utils/storage.utils"
import {
  SCORE_LEVEL_BAD,
  SCORE_LEVEL_MEDIUM,
} from "../src/utils/score-level.utils"
import * as TrackerUtils from "../src/utils/tracker.utils"
import * as MainUtils from "../src/utils/main.utils"
import { Intentions } from "../src/components/results/Intentions"
import { DownloadApp } from "../src/components/results/DownloadApp"
import { RecruitParents } from "../src/components/results/RecruitParents"
import { GiveAccessToResources } from "../src/components/ab-testing/resources/GiveAccessToResources"

export default function Results() {
  const SCORE_TO_SHOW_CONTACT_BLOC = 9
  const OPINION_GOUV_URL =
    "https://jedonnemonavis.numerique.gouv.fr/Demarches/3483?&view-mode=formulaire-avis&nd_source=button&key=9a76fb7d40d8cf4bb6036779de4d92c9"
  const OPINION_GOUV_IMG =
    "https://jedonnemonavis.numerique.gouv.fr/static/bouton-bleu.svg"

  const randomForParentsFeedback = MainUtils.getRandomInt(2)

  const scoreValue = StorageUtils.getInLocalStorage(STORAGE_SCORE)
  const localeSelected = StorageUtils.getLocaleInLocalStorage()
  const scoreLevelForMood = parseInt(
    StorageUtils.getInLocalStorage(STORAGE_SCORE_LEVEL_MOOD)
  )
  const scoreLevelForTexts = parseInt(
    StorageUtils.getInLocalStorage(STORAGE_SCORE_LEVEL_TEXTS)
  )
  const scoreLevelForMacaron = parseInt(
    StorageUtils.getInLocalStorage(STORAGE_SCORE_LEVEL_MACARON)
  )

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

  const GiveOpinion = () => {
    return (
      <div className="give-opinion">
        <div className="content">
          <div>
            Aidez-nous à améliorer cette démarche ! Donnez-nous votre avis, cela
            ne prend que 2 minutes.
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            href={OPINION_GOUV_URL}
            onClick={() =>
              TrackerUtils.track(
                TrackerUtils.CATEG.results,
                TrackerUtils.EVENT_CLICK,
                "Je donne mon avis"
              )
            }
          >
            <img
              className="participate-btn"
              src={OPINION_GOUV_IMG}
              alt="Je donne mon avis"
            />
          </a>
        </div>
      </div>
    )
  }

  return (
    <ContentLayout>
      <WidgetHeader title={Labels.titleDPP} locale={localeSelected} />
      <ResultsMood scoreLevel={scoreLevelForMood} />

      {scoreValue < SCORE_TO_SHOW_CONTACT_BLOC ? (
        <DownloadApp />
      ) : (
        <ContactMamanBlues scoreLevel={scoreLevelForMacaron} />
      )}

      <DescriptionAndConclusion />
      <GiveAccessToResources />
      {scoreLevelForMacaron == SCORE_LEVEL_MEDIUM ||
        scoreLevelForMacaron == SCORE_LEVEL_BAD ? (
        <Intentions moodLevel={scoreLevelForMood} />
      ) : null}

      {randomForParentsFeedback == 0 ? <GiveOpinion /> : <RecruitParents />}
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
