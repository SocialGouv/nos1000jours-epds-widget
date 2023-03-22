import { Button } from "@dataesr/react-dsfr"
import * as TrackerUtils from "../../utils/tracker.utils"
import * as MainUtils from "../../utils/main.utils"

export function RecruitParents() {
  const INDIVIDUAL_URL = "https://calendly.com/1000-jours-blues/30min"

  const onClickParticipate = (url) => {
    MainUtils.openUrl(url)
    TrackerUtils.trackerForIntentions(TrackerUtils.ACTION.recruit)
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
          onClick={() => onClickParticipate(INDIVIDUAL_URL)}
        >
          Choisir mon créneau
        </Button>
      </div>
    </div>
  )
}
