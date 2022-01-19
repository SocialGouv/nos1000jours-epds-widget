import { Row } from "react-bootstrap"
import { ContentLayout } from "../src/components/Layout"
import { STORAGE_SCORE_LEVEL } from "../src/constants/constants"
import { EpdsResultsComments, Labels } from "../src/constants/specificLabels"

export default function Results() {
  const scoreLevel = parseInt(localStorage.getItem(STORAGE_SCORE_LEVEL))

  return (
    <ContentLayout>
      <h5 className="title-ddp">{Labels.titleDPP}</h5>

      <Row>
        <b>Oser en parler, c’est déjà prendre soin de soi et de son enfant !</b>
        <br />
        <span>{descriptionByScoreLevel(scoreLevel)}</span>
        <br />
        <b>{conclusionByScoreLevel(scoreLevel)}</b>
      </Row>
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
