import { cestUneBonneEtape } from "../../../utils/measuring-intentions.utils"
import { ContactMamanBlues } from "../ContactMamanBlues"

// TODO: formulaire + envoie pdf
export const FormToSendMail = ({ scoreLevel, displayMamanBlues = true }) => {
  return (
    <div>
      {cestUneBonneEtape}
      {displayMamanBlues && <ContactMamanBlues scoreLevel={scoreLevel} />}
    </div>
  )
}
