import { useEffect, useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import {
  estProcheDeLaRealite,
  estProcheDeLaRealiteCommentaireByScoreLevel,
} from "../../../utils/measuring-intentions.utils"
import { ContactMamanBlues } from "../ContactMamanBlues"
import { AskForDetailsQuestion } from "./AskForDetailsQuestion"

export const BeCloseToRealityQuestion = ({
  scoreLevel,
  displayMamanBlues = true,
}) => {
  const [beCloseToReality, setBeCloseToReality] = useState("")
  const [displayMore, setDisplayMore] = useState()
  const [displayItemSelected, setDisplayItemSelected] = useState(false)

  useEffect(() => {
    switch (beCloseToReality.value) {
      case "oui":
      case "peutetre":
        setDisplayItemSelected(true)
        setDisplayMore(
          <div>
            <div className="measure-label-selected">
              {beCloseToReality.label}
            </div>
            {
              estProcheDeLaRealiteCommentaireByScoreLevel(scoreLevel)[
              beCloseToReality.value
              ]
            }

            {displayMamanBlues ? (
              <ContactMamanBlues scoreLevel={scoreLevel} />
            ) : null}
          </div>
        )
        break
      case "non":
        setDisplayItemSelected(true)
        setDisplayMore(
          <div>
            <div className="measure-label-selected">
              {beCloseToReality.label}
            </div>
            <AskForDetailsQuestion
              scoreLevel={scoreLevel}
              displayMamanBlues={displayMamanBlues}
            />
          </div>
        )
        break
    }
  }, [beCloseToReality])

  return (
    <div className="measure-card">
      <b>{estProcheDeLaRealite.question}</b>
      {!displayItemSelected && (
        <div className="buttons-bloc">
          <ToggleButtonGroup type="radio" name="radio-reality">
            {estProcheDeLaRealite.reponses.map((item, index) => (
              <ToggleButton
                className="measure-button"
                key={index}
                value={item.value}
                aria-label={item.label}
                onClick={() => setBeCloseToReality(item)}
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
