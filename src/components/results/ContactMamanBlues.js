import React from "react"
import { Row } from "react-bootstrap"
import { } from "@dataesr/react-dsfr"

export function ContactMamanBlues({ scoreLevel }) {
  let colorsByLevel

  switch (scoreLevel) {
    case 2:
      colorsByLevel = "moderatelygood-mood"
      break;
    case 3:
      colorsByLevel = "bad-mood"
      break;
    default:
      break;
  }

  return (
    <div className="contact-mamanblues" style={{}}>
      {scoreLevel > 1 ?
        <Row className={`contact-content ${colorsByLevel}`}>
          <div style={{ display: "inline-flex" }}>
            <img
              alt="Portrait d'Elise"
              src="../img/portrait-elise.jpg"
              height={50}
              style={{ marginRight: 10 }}
            />
            <div style={{ alignSelf: "center", color: "black" }}>
              Vous pouvez être contacté(e) par Élise, notre partenaire (association composée par des volontaires ayant connu la difficulté maternelle), afin de <b>trouver une aide adaptée autour de vous.</b>
            </div>
          </div>
          <button className="fr-btn">
            être contacté(e)
          </button>
        </Row> : null}
    </div>
  )
}
