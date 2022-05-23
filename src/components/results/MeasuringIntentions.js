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
import { ACTION, CATEG, trackerClick } from "../../utils/tracker.utils"
import { ContactMamanBlues } from "./ContactMamanBlues"

const TEST_NUMBER_ENABLED = process.env.NEXT_PUBLIC_TEST_NUMBER_ENABLED

export function MeasuringIntentions({ scoreLevel }) {
  const testId = generateRandomTest()
  trackerClick(CATEG.contact, `${ACTION.contact_confirm_sent}${testId}`)

  // TODO: forcé pour le moment pour avoir le bloc d'Elise orange, à revoir
  return (
    <div className="measure">
      {TEST_NUMBER_ENABLED === "true" ? <div>Test {testId}</div> : null}
      {scoreLevel == SCORE_LEVEL_GOOD
        ? displayComponentsByTest({ testId: testId, scoreLevel: 3 })
        : null}
    </div>
  )
}

const getRandomInt = (max) => {
  if (typeof window !== "undefined") {
    const randomArray = window.crypto.getRandomValues(new Uint16Array(1))
    const randomVal = randomArray[0]
    return randomVal % max
  }
}

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

export const displayComponentsByTest = ({ testId, scoreLevel }) => {
  switch (testId) {
    case TEST_B:
      return <BeCloseToRealityQuestion scoreLevel={scoreLevel} />
    case TEST_C:
      return (
        <div>
          <BeCloseToRealityQuestion
            scoreLevel={scoreLevel}
            displayMamanBlues={false}
          />
          <ContactMamanBlues scoreLevel={scoreLevel} />
        </div>
      )
    default:
      return null
  }
}

export const BeCloseToRealityQuestion = ({
  scoreLevel,
  displayMamanBlues = true,
}) => {
  const [beCloseToReality, setBeCloseToReality] = useState("")
  const [displayMore, setDisplayMore] = useState()
  const [displayItemSelected, setDisplayItemSelected] = useState(false)

  useEffect(() => {
    switch (beCloseToReality.value) {
      case "yes":
      case "maybe":
        setDisplayItemSelected(true)
        setDisplayMore(
          <div>
            <div className="measure-label-selected">
              {beCloseToReality.label}
            </div>
            {beCloseToReality.contentResponse}
            {displayMamanBlues ? (
              <ContactMamanBlues scoreLevel={scoreLevel} />
            ) : null}
          </div>
        )
        break
      case "no":
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
      <b>Ce résultat semble-t-il être proche de la réalité ?</b>
      {!displayItemSelected && (
        <div className="buttons-bloc">
          <ToggleButtonGroup type="radio" name="radio-reality">
            {beCloseToRealityResponses.map((item, index) => (
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

const AskForDetailsQuestion = ({ scoreLevel, displayMamanBlues = true }) => {
  const [askForDetails, setAskForDetails] = useState("")
  const [displayMore, setDisplayMore] = useState()
  const [displayItemSelected, setDisplayItemSelected] = useState(false)

  // TODO: envoyer le contenu de la zone de texte
  useEffect(() => {
    switch (askForDetails.value) {
      case "bad":
        setDisplayItemSelected(true)
        setDisplayMore(
          <div>
            <div className="measure-label-selected">{askForDetails.label}</div>
            {askForDetails.contentResponse}
            {displayMamanBlues ? (
              <ContactMamanBlues scoreLevel={scoreLevel} />
            ) : null}
          </div>
        )
        break
      case "other":
        setDisplayItemSelected(true)
        setDisplayMore(
          <div>
            <div className="measure-label-selected">{askForDetails.label}</div>
            {askForDetails.contentResponse}
            <input
              aria-label="textValueOther"
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
      {!displayItemSelected && (
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
      )}
      {displayMore}
    </div>
  )
}
