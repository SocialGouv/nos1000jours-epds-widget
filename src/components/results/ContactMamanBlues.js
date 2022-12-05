import React from "react"
import { Row } from "react-bootstrap"
import { } from "@dataesr/react-dsfr"
import { useRouter } from "next/router"
import * as TrackerUtils from "../../utils/tracker.utils"
import * as ContactButtonLabelAbTesting from "../../utils/ab-testing/contact-button-label.utils"
import * as AbTestingUtils from "../../utils/ab-testing/ab-testing.utils"

export function ContactMamanBlues({ scoreLevel }) {
  const router = useRouter()
  let colorsByLevel
  const buttonLabel = ContactButtonLabelAbTesting.getContactButtonLabelByTest()

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
  AbTestingUtils.trackerForAbTesting(`Macaron Elise - ${colorsByLevel}`)

  const goToBeContacted = async (event) => {
    TrackerUtils.track(
      TrackerUtils.CATEG.contact,
      `Macaron d'Elise ${TrackerUtils.EVENT_CLICK}`,
      "Être contacté(e)"
    )
    AbTestingUtils.trackerForAbTesting(buttonLabel)

    router.push({
      pathname: "/contact/to-be-contacted",
    })
  }

  return (
    <div className="contact-mamanblues">
      <Row className={`contact-content ${colorsByLevel}`}>
        <div className="content-img-descr">
          <img
            alt="Portrait d'Elise : présidente de l'association Maman Blues"
            src="../img/portrait-elise.jpg"
          />
          <div className="mamanblues-description">
            <b>Trouvez un accompagnement personnalisé près de chez vous </b>
            auprès de professionnels sensibilisés aux difficultés maternelles en
            échangeant avec Elise, présidente de l’association Maman Blues
          </div>
        </div>
        <button className="fr-btn" onClick={goToBeContacted}>
          {buttonLabel}
        </button>
      </Row>
    </div>
  )
}
