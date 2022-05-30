import { useEffect, useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { ContactMamanBlues } from "../ContactMamanBlues"

const DETAILS_TYPE = {
  TEXTE: "text",
  TEXT_AREA: "text_area",
  FORM: "form",
}

export const AskForDetailsQuestion = ({
  scoreLevel,
  displayMamanBlues = true,
  data,
}) => {
  const [askForDetails, setAskForDetails] = useState("")
  const [displayMore, setDisplayMore] = useState()
  const [displayItemSelected, setDisplayItemSelected] = useState(false)

  const [textValue, setTextValue] = useState("")
  const [sendDetails, setSendDetails] = useState(false)

  const handleSendDetails = () => setSendDetails(true)

  useEffect(() => {
    if (sendDetails) {
      // TODO: envoyer le contenu de la zone de texte dans le BO
      console.log(textValue)
    }
  }, [sendDetails])

  useEffect(() => {
    switch (getDetailsTypeByValue(askForDetails.value)) {
      case DETAILS_TYPE.TEXTE:
        setDisplayItemSelected(true)
        setDisplayMore(
          <div>
            <div className="measure-label-selected">{askForDetails.label}</div>
            {data.commentaires[askForDetails.value]}
            {displayMamanBlues ? (
              <ContactMamanBlues scoreLevel={scoreLevel} />
            ) : null}
          </div>
        )
        break
      case DETAILS_TYPE.TEXT_AREA:
        setDisplayItemSelected(true)
        setDisplayMore(
          <div>
            <div className="measure-label-selected">{askForDetails.label}</div>
            {data.commentaires[askForDetails.value]}
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
      case DETAILS_TYPE.FORM:
        setDisplayItemSelected(true)
        setDisplayMore(
          <div>
            <div className="measure-label-selected">{askForDetails.label}</div>
            {/* TODO: formulaire */}
          </div>
        )
        break
    }
  }, [askForDetails])

  const getDetailsTypeByValue = (value) => {
    switch (value) {
      case "mal":
      case "seTourner":
      case "bien":
      case "curiosite":
      case "proSante":
        return DETAILS_TYPE.TEXTE
      case "autre":
      case "aucune":
        return DETAILS_TYPE.TEXT_AREA
      case "quiJoindre":
      case "quoiFaire":
        return DETAILS_TYPE.FORM
    }
  }

  return (
    <div>
      {data.question}
      {!displayItemSelected && (
        <div className="buttons-bloc">
          <ToggleButtonGroup type="radio" name="radio-details">
            {data.reponses.map((item, index) => (
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
