import { useEffect, useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { convertStringWithfirstPartInBold } from "../../../utils/main.utils"
import {
  saveIsIntentionVersQuiSeTourner,
  trackerForIntentions,
} from "../../../utils/measuring-intentions.utils"
import {
  SCORE_LEVEL_BAD,
  SCORE_LEVEL_MEDIUM,
} from "../../../utils/score-level.utils"
import { ContactMamanBlues } from "../../results/ContactMamanBlues"
import { FormToSendMail } from "./FormToSendMail"
import { TextAreaToSendDetails } from "./TextAreaToSendDetails"

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

  useEffect(() => {
    switch (getDetailsTypeByValue(askForDetails.value)) {
      case DETAILS_TYPE.TEXTE:
        itemSelected(askForDetails.label)
        saveIsIntentionVersQuiSeTourner(askForDetails.label)

        setDisplayMore(
          <div>
            <div className="measure-label-selected">{askForDetails.label}</div>
            {data.commentaires[askForDetails.value]}
            {displayMamanBlues && askForDetails.value !== "proSante" && (
              <ContactMamanBlues scoreLevel={scoreLevel} />
            )}
          </div>
        )
        break
      case DETAILS_TYPE.TEXT_AREA:
        itemSelected(askForDetails.label)

        setDisplayMore(
          <div>
            <div className="measure-label-selected">{askForDetails.label}</div>
            {data.commentaires[askForDetails.value]}
            <TextAreaToSendDetails
              scoreLevel={scoreLevel}
              displayMamanBlues={
                displayMamanBlues &&
                (scoreLevel == SCORE_LEVEL_MEDIUM ||
                  scoreLevel == SCORE_LEVEL_BAD)
              }
            />
          </div>
        )
        break
      case DETAILS_TYPE.FORM:
        itemSelected(askForDetails.label)

        setDisplayMore(
          <div>
            <div className="measure-label-selected">{askForDetails.label}</div>
            <FormToSendMail
              scoreLevel={scoreLevel}
              forHimself={askForDetails.value === "quiJoindre"}
              displayMamanBlues={displayMamanBlues}
            />
          </div>
        )
        break
    }
  }, [askForDetails])

  const itemSelected = (label) => {
    trackerForIntentions(scoreLevel, label)
    setDisplayItemSelected(true)
  }

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
      {!displayItemSelected &&
        convertStringWithfirstPartInBold("?", data.question)}
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
