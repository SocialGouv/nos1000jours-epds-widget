import React from "react"
import { WidgetHeader } from "../src/components/WidgetHeader"
import { ContentLayout } from "../src/components/Layout"
import {
  STORAGE_SCORE,
  STORAGE_SOURCE,
  moderateTestimonyList,
  highTestimonyList,
  veryHighTestimonyList,
} from "../src/constants/constants"
import { EpdsResultsComments, Labels } from "../src/constants/specificLabels"
import * as StorageUtils from "../src/utils/storage.utils"
import { DownloadApp } from "../src/components/results/DownloadApp"
import { ResultMood } from "../src/components/results/ResultMood"
import { BeBetter } from "../src/components/results/BeBetter"

export default function Results() {
  const scoreValue = StorageUtils.getInLocalStorage(STORAGE_SCORE)
  const source = StorageUtils.getInLocalStorage(STORAGE_SOURCE)
  const localeSelected = StorageUtils.getLocaleInLocalStorage()
  const score = parseInt(scoreValue)

  return (
    <ContentLayout>
      <WidgetHeader title={Labels.titleDPP} locale={localeSelected} />
      {scoreValue < 9 && <DownloadApp />}
      {score >= 9 && score <= 11 && (
        <ResultMood
          scoreText="moyennement élevé"
          testimonyList={moderateTestimonyList}
          source={source}
        />
      )}
      {score > 11 && score <= 15 && (
        <ResultMood scoreText="élevé" testimonyList={highTestimonyList} />
      )}
      {score > 15 && (
        <ResultMood
          scoreText="très élevé"
          testimonyList={veryHighTestimonyList}
          source={source}
        />
      )}
      {source !== "doctolib" && <BeBetter score={score} linkActive={true} />}
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
