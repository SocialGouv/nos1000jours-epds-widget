import React from "react"
import { WidgetHeader } from "../src/components/WidgetHeader"
import { ContentLayout } from "../src/components/Layout"
import { STORAGE_SCORE } from "../src/constants/constants"
import { EpdsResultsComments, Labels } from "../src/constants/specificLabels"
import * as StorageUtils from "../src/utils/storage.utils"
import { DownloadApp } from "../src/components/results/DownloadApp"
import { ScoreProgressBar } from "../src/components/contact/ScoreProgressBar"
import { Button } from "@codegouvfr/react-dsfr/Button"
import { useRouter } from "next/router"

export default function Results() {
  const router = useRouter()
  const SCORE_TO_SHOW_CONTACT_BLOC = 9

  const scoreValue = StorageUtils.getInLocalStorage(STORAGE_SCORE)
  const localeSelected = StorageUtils.getLocaleInLocalStorage()
  const scorePercentage = ((parseInt(scoreValue) / 30) * 100).toFixed(2)

  const goToDecideBeBetter = () => {
    router.push({
      pathname: "/contact/be-better",
    })
  }

  return (
    <ContentLayout>
      <WidgetHeader title={Labels.titleDPP} locale={localeSelected} />
      {parseInt(scoreValue) >= SCORE_TO_SHOW_CONTACT_BLOC && (
        <>
          <div className="margin-bottom-8">
            <ScoreProgressBar indexNow={scorePercentage} />
            <br />
            <b>Comprendre mon score</b>
            <br />
            Explication du résultat: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
            <br />
            Verbatisme, vous avez l'impression ... Vous n'avez plus envie ...
            Vous vous sentez... Vous avez peur de ... Prenez contact avec ...
          </div>

          <div className="center-button">
            <Button
              className="button-be-better"
              colors={["#6363db"]}
              onClick={() => goToDecideBeBetter()}
            >
              Je souhaite aller mieux
            </Button>
          </div>
        </>
      )}

      {scoreValue < SCORE_TO_SHOW_CONTACT_BLOC && <DownloadApp />}

      {/* <DescriptionAndConclusion /> */}
      {/* <GiveAccessToResources /> */}
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
