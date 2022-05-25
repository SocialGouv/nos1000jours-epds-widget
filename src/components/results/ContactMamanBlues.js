import React from "react"
import { Row } from "react-bootstrap"
import { } from "@dataesr/react-dsfr"
import { useRouter } from "next/router"
import { CATEG, EVENT_CLICK, trackerClick } from "../../utils/tracker.utils"

export function ContactMamanBlues({ scoreLevel, hideContact = false }) {
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
    trackerClick(
      CATEG.contact,
      `Macaron d'Elise ${EVENT_CLICK}`,
      "Être contacté(e)"
    )

    router.push({
      pathname: "/contact/to-be-contacted",
    })
  }

  return (
    <div className="contact-mamanblues">
      {!hideContact ? (
        <Row className={`contact-content ${colorsByLevel}`}>
          <div className="content-img-descr">
            <img alt="Portrait d'Elise" src="../img/portrait-elise.jpg" />
            <div className="mamanblues-description">
              Vous pouvez être contacté(e) par Élise, notre partenaire
              (association composée par des volontaires ayant connu la
              difficulté maternelle), afin de <b>trouver une aide adaptée autour de vous.</b>
            </div>
          </div>
          <button className="fr-btn" onClick={goToBeContacted}>
            être contacté(e)
          </button>
        </Row>
      ) : null}
    </div>
  )
}
