import React from "react"
import { TEST } from "../../../utils/measuring-intentions.utils"
import {
  SCORE_LEVEL_BAD,
  SCORE_LEVEL_GOOD,
  SCORE_LEVEL_MEDIUM,
} from "../../../utils/score-level.utils"
import { ACTION, CATEG, trackerClick } from "../../../utils/tracker.utils"
import { ContactMamanBlues } from "../ContactMamanBlues"
import { BeCloseToRealityQuestion } from "./BeCloseToRealityQuestion"

const TEST_NUMBER_ENABLED = process.env.NEXT_PUBLIC_TEST_NUMBER_ENABLED

export function MeasuringIntentions({ scoreLevel }) {
  const testId = generateRandomTest()
  trackerClick(CATEG.contact, `${ACTION.contact_confirm_sent}${testId}`)

  // TODO: forcé pour le moment pour avoir le bloc d'Elise orange, à revoir
  return (
    <div className="measure">
      {TEST_NUMBER_ENABLED === "true" ? <div>Test {testId}</div> : null}

      {/* {scoreLevel == SCORE_LEVEL_GOOD
        ? displayComponentsByTest({ testId: testId, scoreLevel: scoreLevel })
        : null} */}
      {displayComponentsByTest({
        testId: testId,
        scoreLevel: SCORE_LEVEL_GOOD,
      })}
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
      return TEST.A
    case 1:
      return TEST.B
    case 2:
      return TEST.C
  }
}

export const displayComponentsByTest = ({ testId, scoreLevel }) => {
  if (scoreLevel == SCORE_LEVEL_GOOD) {
    switch (testId) {
      case TEST.B:
        return <BeCloseToRealityQuestion scoreLevel={scoreLevel} />
      case TEST.C:
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
}
