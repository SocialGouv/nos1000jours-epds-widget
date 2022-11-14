import { useEffect, useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import {
  demandeDeDetailsByScoreLevel,
  estLePlusAdapte,
  estProcheDeLaRealite,
  estProcheDeLaRealiteCommentaireByScoreLevel,
  trackerForIntentions,
} from "../../../utils/ab-testing/measuring-intentions.utils"
import {
  SCORE_LEVEL_BAD,
  SCORE_LEVEL_GOOD,
  SCORE_LEVEL_MEDIUM,
} from "../../../utils/score-level.utils"
import { ContactMamanBlues } from "../../results/ContactMamanBlues"
import { AskForDetailsQuestion } from "./AskForDetailsQuestion"

export const BeCloseToRealityQuestion = ({
  scoreLevel,
  displayMamanBlues = true,
  setShowBackButton,
}) => {
  const [beCloseToReality, setBeCloseToReality] = useState("")
  const [displayMore, setDisplayMore] = useState()
  const [displayItemSelected, setDisplayItemSelected] = useState(false)

  useEffect(() => {
    if (
      (scoreLevel === SCORE_LEVEL_GOOD && beCloseToReality.value === "oui") ||
      beCloseToReality.value === "peutetre"
    ) {
      itemSelected(beCloseToReality.label)

      // Questionnaire terminé
      setDisplayMore(
        <div>
          {
            estProcheDeLaRealiteCommentaireByScoreLevel(scoreLevel)[
            beCloseToReality.value
            ]
          }
          {displayMamanBlues && <ContactMamanBlues scoreLevel={scoreLevel} />}
        </div>
      )
    }
    if (
      beCloseToReality.value === "non" ||
      (scoreLevel === SCORE_LEVEL_MEDIUM && beCloseToReality.value === "oui") ||
      (scoreLevel === SCORE_LEVEL_BAD && beCloseToReality.value === "oui")
    ) {
      let data
      if (beCloseToReality.value === "oui") data = estLePlusAdapte
      if (beCloseToReality.value === "non")
        data = demandeDeDetailsByScoreLevel(scoreLevel)

      itemSelected(beCloseToReality.label)

      // Réponses multiples
      setDisplayMore(
        <div>
          <AskForDetailsQuestion
            scoreLevel={scoreLevel}
            displayMamanBlues={displayMamanBlues}
            data={data}
          />
        </div>
      )
    }
  }, [beCloseToReality])

  const itemSelected = (label) => {
    trackerForIntentions(scoreLevel, label)
    setDisplayItemSelected(true)
    setShowBackButton(true)
  }

  return (
    <div>
      {!displayItemSelected && <b>{estProcheDeLaRealite.question}</b>}
      {!displayItemSelected && (
        <div className="buttons-block">
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
