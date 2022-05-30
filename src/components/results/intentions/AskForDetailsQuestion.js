import { useEffect, useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { demandeDeDetailsByScoreLevel } from "../../../utils/measuring-intentions.utils"
import { ContactMamanBlues } from "../ContactMamanBlues"

export const AskForDetailsQuestion = ({
  scoreLevel,
  displayMamanBlues = true,
}) => {
  const [askForDetails, setAskForDetails] = useState("")
  const [displayMore, setDisplayMore] = useState()
  const [displayItemSelected, setDisplayItemSelected] = useState(false)

  const [textValue, setTextValue] = useState("")
  const [sendDetails, setSendDetails] = useState(false)

  const handleSendDetails = () => setSendDetails(true)
  const demandeDeDetails = demandeDeDetailsByScoreLevel(scoreLevel)

  useEffect(() => {
    if (sendDetails) {
      // TODO: envoyer le contenu de la zone de texte dans le BO
      console.log(textValue)
    }
  }, [sendDetails])

  useEffect(() => {
    switch (askForDetails.value) {
      case "mal":
        setDisplayItemSelected(true)
        setDisplayMore(
          <div>
            <div className="measure-label-selected">{askForDetails.label}</div>
            {demandeDeDetails.commentaires[askForDetails.value]}
            {displayMamanBlues ? (
              <ContactMamanBlues scoreLevel={scoreLevel} />
            ) : null}
          </div>
        )
        break
      case "autre":
        setDisplayItemSelected(true)
        setDisplayMore(
          <div>
            <div className="measure-label-selected">{askForDetails.label}</div>
            {demandeDeDetails.commentaires[askForDetails.value]}
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
          </div>
        )
        break
    }
  }, [askForDetails])

  return (
    <div>
      {demandeDeDetails.question}
      {!displayItemSelected && (
        <div className="buttons-bloc">
          <ToggleButtonGroup type="radio" name="radio-details">
            {demandeDeDetails.reponses.map((item, index) => (
              <ToggleButton
                className="measure-button"
                key={index}
                value={item.value}
                onClick={() => setAskForDetails(item)}
              >
                {item.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      )}
      {displayMore}
    </div>
  )
}
