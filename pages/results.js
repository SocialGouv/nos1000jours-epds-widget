import React from "react"
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
import { DownloadApp } from "../src/components/results/DownloadApp"
import { GiveAccessToResources } from "../src/components/ab-testing/resources/GiveAccessToResources"
import { LineProgressBar } from "@frogress/line"

export default function Results() {
  const SCORE_TO_SHOW_CONTACT_BLOC = 9

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
  const scorePercentage = ((parseInt(scoreValue) / 30) * 100).toFixed(2)

  return (
    <ContentLayout>
      <WidgetHeader title={Labels.titleDPP} locale={localeSelected} />
      {/* <ResultsMood scoreLevel={scoreLevelForMood} /> */}
      {parseInt(scoreValue) >= 11 && (
        <LineProgressBar percent={scorePercentage} rounded={36} height={36} />
      )}

      {scoreValue < SCORE_TO_SHOW_CONTACT_BLOC ? (
        <DownloadApp />
      ) : (
        <ContactMamanBlues scoreLevel={scoreLevelForMacaron} />
      )}

      <DescriptionAndConclusion />
      <GiveAccessToResources />
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
