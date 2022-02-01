import React from "react"
import { Row } from "react-bootstrap"
import { } from "@dataesr/react-dsfr"
import { useRouter } from "next/router"

export function ContactMamanBlues({ scoreLevel }) {
  const router = useRouter()
  let colorsByLevel

  switch (scoreLevel) {
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
    router.push({
      pathname: "/contact/to-be-contacted",
    })
  }

  return (
    <div className="contact-mamanblues">
      {scoreLevel > 1 ? (
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
