import { useEffect, useState } from "react"
import { cestUneBonneEtape } from "../../../utils/measuring-intentions.utils"
import { ContactMamanBlues } from "../ContactMamanBlues"

export const TextAreaToSendDetails = ({
  scoreLevel,
  displayMamanBlues = true,
}) => {
  const [textValue, setTextValue] = useState("")
  const [sendDetails, setSendDetails] = useState(false)

  const handleSendDetails = () => setSendDetails(true)

  useEffect(() => {
    if (sendDetails) {
      // TODO: envoyer le contenu de la zone de texte dans le BO
      console.log(textValue)
    }
  }, [sendDetails])

  return (
    <div>
      <input
        aria-label="textValueOther"
        type="textarea"
        name="textValue"
        className="fr-input measure-textearea"
        onChange={(e) => setTextValue(e.target.value)}
      />
      <button className="fr-btn" onClick={handleSendDetails}>
        Valider
      </button>

      {displayMamanBlues && (
        <div>
          {cestUneBonneEtape}
          <ContactMamanBlues scoreLevel={scoreLevel} />
        </div>
      )}
    </div>
  )
}
