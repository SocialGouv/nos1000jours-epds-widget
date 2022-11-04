import React from "react"
import { Row } from "react-bootstrap"
import { } from "@dataesr/react-dsfr"
import { useRouter } from "next/router"
import { CATEG, EVENT_CLICK, trackerClick } from "../../utils/tracker.utils"
import { STORAGE_TEST_VERS_QUI_SE_TOURNER } from "../../constants/constants"
import { clearIntentionsData } from "../../utils/ab-testing/measuring-intentions.utils"
import * as StorageUtils from "../../utils/storage.utils"

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
    trackerClick(
      CATEG.contact,
      `Macaron d'Elise ${EVENT_CLICK}`,
      "Être contacté(e)"
    )

    if (StorageUtils.getInLocalStorage(STORAGE_TEST_VERS_QUI_SE_TOURNER))
      trackerClick(
        CATEG.contact,
        `Macaron d'Elise ${EVENT_CLICK}`,
        "Être contacté(e) - Je ne sais pas vers qui me tourner"
      )

    clearIntentionsData()

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
          être contacté(e)
        </button>
      </Row>
    </div>
  )
}
