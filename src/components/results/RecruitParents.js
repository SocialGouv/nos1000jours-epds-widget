import * as TrackerUtils from "../../utils/tracker.utils"
import * as MainUtils from "../../utils/main.utils"
import Button from "@codegouvfr/react-dsfr/Button"

export function RecruitParents() {
  const INDIVIDUAL_URL = "https://calendly.com/1000-jours-blues/30min"

  const onClickParticipate = (url, label) => {
    MainUtils.openUrl(url)
    TrackerUtils.track(
      TrackerUtils.CATEG.recruit,
      TrackerUtils.EVENT_CLICK,
      label
    )
  }

  return (
    <div className="recruit-parents">
      <div className="content">
        <div>
          Aidez-nous à améliorer ce service public ! Choisissez un créneau dans
          notre calendrier pour échanger avec un membre de notre équipe.
        </div>

        <Button
          className="participate-btn"
          onClick={() =>
            onClickParticipate(INDIVIDUAL_URL, "Choisir mon créneau")
          }
        >
          Choisir mon créneau
        </Button>
      </div>
    </div>
  )
}
