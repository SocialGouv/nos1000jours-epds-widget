import React from "react"
import { Row } from "react-bootstrap"
import {} from "@dataesr/react-dsfr"
import { useRouter } from "next/router"
import * as TrackerUtils from "../../utils/tracker.utils"
import * as AbTestingUtils from "../../utils/ab-testing/ab-testing.utils"

export const buttonLabel = "Je veux être accompagné.e"

export function ContactMamanBlues({ scoreLevel }) {
  const router = useRouter()
  let colorsByLevel

  switch (scoreLevel) {
    case 1:
      colorsByLevel = "good-mood"
      break
    case 2:
      colorsByLevel = "moderatelygood-mood"
      break
    case 3:
      colorsByLevel = "bad-mood"
      break
    default:
      break
  }

  const goToBeContacted = async (event) => {
    TrackerUtils.trackerForResults(TrackerUtils.ACTION.be_contacted)
    AbTestingUtils.trackerForAbTesting(TrackerUtils.ACTION.be_contacted)
    router.push({
      pathname: "/contact/to-be-contacted",
    })
  }

  return (
    <div className="contact-mamanblues">
      <Row className={`contact-content ${colorsByLevel}`}>
        <div className="content-img-descr">
          <img alt="Logo portrait" src="../img/portrait.png" />
          <div className="mamanblues-description">
            <b>Trouvez un accompagnement personnalisé près de chez vous </b>
            auprès de professionnels sensibilisés aux difficultés maternelles en
            échangeant avec un membre de notre équipe.
          </div>
        </div>
        <button className="fr-btn" onClick={goToBeContacted}>
          {buttonLabel}
        </button>
      </Row>
    </div>
  )
}
