import React from "react"
import { WidgetHeader } from "../src/components/WidgetHeader"
import { ContentLayout } from "../src/components/Layout"
import { STORAGE_SCORE } from "../src/constants/constants"
import { EpdsResultsComments, Labels } from "../src/constants/specificLabels"
import * as StorageUtils from "../src/utils/storage.utils"
import { DownloadApp } from "../src/components/results/DownloadApp"
import { ScoreProgressBar } from "../src/components/contact/ScoreProgressBar"
import { BeBetter } from "../src/components/contact/BeBetter"
import { Button } from "@codegouvfr/react-dsfr/Button"
import { useRouter } from "next/router"
import { Quote } from "@codegouvfr/react-dsfr/Quote"
import { Tile } from "@codegouvfr/react-dsfr/Tile"

export default function Results() {
  const SCORE_TO_SHOW_CONTACT_BLOC = 9

  const scoreValue = StorageUtils.getInLocalStorage(STORAGE_SCORE)
  const localeSelected = StorageUtils.getLocaleInLocalStorage()
  const scorePercentage = ((parseInt(scoreValue) / 30) * 100).toFixed(2)

  return (
    <ContentLayout>
      <WidgetHeader title={Labels.titleDPP} locale={localeSelected} />
      {parseInt(scoreValue) >= SCORE_TO_SHOW_CONTACT_BLOC && (
        <>
          <div
            className="fr-tile fr-tile--horizontal remove-box-shadow"
            style={{
              backgroundColor: "#E3E3FD",
              marginBottom: "5%",
            }}
          >
            <div className="fr-tile__body text-color">
              <h4 className="fr-tile__title text-color">
                <a className="fr-tile__link text-color" href>
                  Mon score au questionnaire
                </a>
              </h4>
              <p className="fr-tile__desc">{`Votre score est : ${parseInt(
                scoreValue
              )}/30`}</p>
            </div>
            <div className="fr-tile__img">
              <img
                src="/img/icone-score-epds.svg"
                className="fr-responsive-img"
                alt="icone-score"
              />
            </div>
          </div>
          <div className="margin-bottom-8">
            {/* <ScoreProgressBar indexNow={scorePercentage} /> */}
            <h5>
              Ce que disent les parents ayant obtenu le même score que moi
            </h5>
            <figure className="fr-quote height-tile">
              <blockquote>
                <p className="size-font">
                  « J'ai du mal à dormir » (Hélène, 27 ans)
                </p>
                <p className="size-font">
                  « Je ne sais plus quoi faire » (Amandine, 31 ans)
                </p>
                <p className="size-font">
                  « Je ne sais pas vers qui me tourner » (Ali, 29 ans)
                </p>
              </blockquote>
            </figure>
          </div>
          <h5 className="padding-top-h5">Je ne suis pas seul.e</h5>
          <p>
            Déménagements, éloignement familial, père peu présent ... il existe
            autant de facteurs que d'enfants pouvant faire apparaitre des signes
            évocateurs de la dépression post-partum. Je peux être aidé.e dans ma
            démarche :
          </p>
          <BeBetter />
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
