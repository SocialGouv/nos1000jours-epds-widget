import React, { useEffect, useState } from "react"
import { TEST } from "../../../utils/measuring-intentions.utils"
import { ACTION, CATEG, trackerClick } from "../../../utils/tracker.utils"
import { ContactMamanBlues } from "../ContactMamanBlues"
import { BeCloseToRealityQuestion } from "./BeCloseToRealityQuestion"
import * as Icon from "react-bootstrap-icons"

const TEST_NUMBER_ENABLED = process.env.NEXT_PUBLIC_TEST_NUMBER_ENABLED

export function MeasuringIntentions({ scoreLevel }) {
  const testId = generateRandomTest()
  trackerClick(CATEG.contact, `${ACTION.contact_confirm_sent}${testId}`)

  const content = displayComponentsByTest({
    testId: testId,
    scoreLevel: scoreLevel,
  })

  const [component, setComponent] = useState(content)

  const onReset = () => {
    setComponent(undefined)
  }

  useEffect(() => {
    if (component == undefined) setComponent(content)
  }, [component])

  return (
    <div className="measure">
      {TEST_NUMBER_ENABLED === "true" ? <div>Test {testId}</div> : null}

      <div className="measure-card">
        <button
          className="fr-btn fr-btn--secondary margin-bottom-8"
          onClick={onReset}
        >
          <Icon.Reply className="margin-right-8" />
          Recommencer
        </button>

        {component}
      </div>
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
  if (testId == TEST.B)
    return <BeCloseToRealityQuestion scoreLevel={scoreLevel} />
  if (testId == TEST.C)
    return (
      <div>
        <BeCloseToRealityQuestion
          scoreLevel={scoreLevel}
          displayMamanBlues={false}
        />
        <ContactMamanBlues scoreLevel={scoreLevel} />
      </div>
    )
  return null
}
