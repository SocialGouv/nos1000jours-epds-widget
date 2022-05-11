import React, { useEffect, useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import {
  askForDetailsResponses,
  beCloseToRealityResponses,
  TEST_A,
  TEST_B,
  TEST_C,
} from "../../constants/measuring-intentions"
import { SCORE_LEVEL_GOOD } from "../../utils/score-level.utils"
import { ContactMamanBlues } from "./ContactMamanBlues"

export function MeasuringIntentions({ scoreLevel }) {
  const testId = generateRandomTest()

  const displayComponentsByTest = () => {
    switch (testId) {
      case TEST_B:
        // TODO: forcé pour le moment pour avoir le bloc d'Elise orange, à revoir
        return <BeCloseToRealityQuestion scoreLevel={3} />
      case TEST_C:
        return null
      default:
        return null
    }
  }

  // TODO: ne pas afficher le testId en prod
  return (
    <div className="measure">
      Test {testId}
      {scoreLevel == SCORE_LEVEL_GOOD ? displayComponentsByTest() : null}
    </div>
  )
}

const getRandomInt = (max) => Math.floor(Math.random() * max)

const generateRandomTest = () => {
  // expected output: 0, 1 or 2
  switch (getRandomInt(3)) {
    case 0:
      return TEST_A
    case 1:
      return TEST_B
    case 2:
      return TEST_C
  }
}

const BeCloseToRealityQuestion = ({ scoreLevel }) => {
  const [beCloseToReality, setBeCloseToReality] = useState("")
  const [displayMore, setDisplayMore] = useState()

  useEffect(() => {
    switch (beCloseToReality.value) {
      case "yes":
      case "maybe":
        setDisplayMore(
          <div>
            {beCloseToReality.contentResponse}
            <ContactMamanBlues scoreLevel={scoreLevel} />
          </div>
        )
        break
      case "no":
        setDisplayMore(<AskForDetailsQuestion scoreLevel={scoreLevel} />)
        break
    }
  }, [beCloseToReality])

  return (
    <div className="measure-card">
      <b>Ce résultat semble-t-il être proche de la réalité ?</b>
      <div className="buttons-bloc">
        <ToggleButtonGroup type="radio" name="radio-reality">
          {beCloseToRealityResponses.map((item, index) => (
            <ToggleButton
              className="measure-button"
              key={index}
              value={item.value}
              onClick={() => setBeCloseToReality(item)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      {displayMore}
    </div>
  )
}

const AskForDetailsQuestion = ({ scoreLevel }) => {
  const [askForDetails, setAskForDetails] = useState("")
  const [displayMore, setDisplayMore] = useState()

  // TODO: envoyer le contenu de la zone de texte
  useEffect(() => {
    switch (askForDetails.value) {
      case "bad":
        setDisplayMore(
          <div>
            {askForDetails.contentResponse}
            <ContactMamanBlues scoreLevel={scoreLevel} />
          </div>
        )
        break
      case "other":
        setDisplayMore(
          <div>
            {askForDetails.contentResponse}
            <input
              type="textarea"
              name="textValue"
              className="fr-input measure-textearea"
            />
          </div>
        )
        break
    }
  }, [askForDetails])

  return (
    <div>
      Précisez nous ce qui rapprocherait le plus de la réalité
      <div className="buttons-bloc">
        <ToggleButtonGroup type="radio" name="radio-details">
          {askForDetailsResponses.map((item, index) => (
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

      {displayMore}
    </div>
  )
}
