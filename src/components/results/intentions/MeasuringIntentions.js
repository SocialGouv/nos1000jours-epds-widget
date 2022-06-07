import React, { useEffect, useState } from "react"
import { TEST } from "../../../utils/measuring-intentions.utils"
import { ACTION, CATEG, trackerClick } from "../../../utils/tracker.utils"
import { BeCloseToRealityQuestion } from "./BeCloseToRealityQuestion"
import * as Icon from "react-bootstrap-icons"
import { STORAGE_TEST_INTENTIONS } from "../../../constants/constants"
import { getInLocalStorage } from "../../../utils/main.utils"

const TEST_NUMBER_ENABLED = process.env.NEXT_PUBLIC_TEST_NUMBER_ENABLED

export const MeasuringIntentions = ({ scoreLevel, setTestId }) => {
  const [test, setTest] = useState()
  const [component, setComponent] = useState()

  useEffect(() => {
    const id =
      getInLocalStorage(STORAGE_TEST_INTENTIONS) ?? generateRandomTest()
    setTestId(id)
    setTest(id)
    localStorage.setItem(STORAGE_TEST_INTENTIONS, id)

    trackerClick(CATEG.contact, `${ACTION.contact_confirm_sent}${id}`)
  }, [])

  useEffect(() => {
    if (test != undefined && component == undefined) {
      const content = displayComponentsByTest({
        testId: test,
        scoreLevel: scoreLevel,
        onReset,
      })

      setComponent(content)
    }
  }, [test, component])

  const onReset = () => {
    setComponent(undefined)
  }

  return (
    <div className="measure">
      {TEST_NUMBER_ENABLED === "true" ? <div>Test {test}</div> : null}
      {component}
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

export const displayComponentsByTest = ({ testId, scoreLevel, onReset }) => {
  if (testId == TEST.B) {
    const contentTestB = <BeCloseToRealityQuestion scoreLevel={scoreLevel} />
    return cardComponentAndRetryButton(contentTestB, onReset)
  }

  if (testId == TEST.C) {
    const contentTestC = (
      <BeCloseToRealityQuestion
        scoreLevel={scoreLevel}
        displayMamanBlues={false}
      />
    )
    return cardComponentAndRetryButton(contentTestC, onReset)
  }

  return null
}

const cardComponentAndRetryButton = (content, onReset) => (
  <div className="measure-card">
    <button
      className="fr-btn fr-btn--tertiary-no-outline margin-bottom-8 measure-button-back"
      onClick={onReset}
    >
      <Icon.ChevronLeft className="margin-right-8" />
      Retour
    </button>
    {content}
  </div>
)
