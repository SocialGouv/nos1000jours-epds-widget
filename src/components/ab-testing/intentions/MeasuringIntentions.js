import React, { useEffect, useState } from "react"
import { clearIntentionsData } from "../../../utils/ab-testing/measuring-intentions.utils"
import { ACTION, CATEG, trackerClick } from "../../../utils/tracker.utils"
import { BeCloseToRealityQuestion } from "./BeCloseToRealityQuestion"
import * as Icon from "react-bootstrap-icons"
import { STORAGE_TEST_ABC } from "../../../constants/constants"
import {
  generateRandomTest,
  TEST,
} from "../../../utils/ab-testing/ab-testing.utils"
import * as StorageUtils from "../../../utils/storage.utils"

const TEST_NUMBER_ENABLED = process.env.NEXT_PUBLIC_TEST_NUMBER_ENABLED

export const MeasuringIntentions = ({ scoreLevel, setTestStarted }) => {
  // Test C visible par défaut si l'on utilise pas l'AB testing
  const [test, setTest] = useState(TEST.C)
  const [component, setComponent] = useState()
  const [showBackButton, setShowBackButton] = useState(false)

  // Utile uniquement lors de l'AB testing
  // useEffect(() => {
  //   const id = getInLocalStorage(STORAGE_TEST_ABC) ?? generateRandomTest()
  //   setTest(id)
  //   localStorage.setItem(STORAGE_TEST_ABC, id)
  //   trackerClick(CATEG.test, `${ACTION.parcours}${id}`)
  // }, [])

  useEffect(() => {
    clearIntentionsData()
    if (test != undefined && component == undefined) {
      updateComponent()
    }
  }, [test, component])

  useEffect(() => {
    setTestStarted(showBackButton)

    if (showBackButton) {
      updateComponent()
    }
  }, [showBackButton])

  const updateComponent = () => {
    const content = displayComponentsByTest({
      testId: test,
      scoreLevel: scoreLevel,
      onReset,
      showBackButton,
      setShowBackButton,
    })

    setComponent(content)
  }

  const onReset = () => {
    setComponent(undefined)
    setShowBackButton(false)
  }

  const showTestNumber = () =>
    TEST_NUMBER_ENABLED === "true" ? <div>Test {test}</div> : null

  return <div className="measure">{component}</div>
}

export const displayComponentsByTest = ({
  testId,
  scoreLevel,
  onReset,
  showBackButton,
  setShowBackButton,
}) => {
  if (testId == TEST.B) {
    const contentTestB = (
      <BeCloseToRealityQuestion
        scoreLevel={scoreLevel}
        setShowBackButton={setShowBackButton}
      />
    )
    return cardComponentAndRetryButton(contentTestB, onReset, showBackButton)
  }

  if (testId == TEST.C) {
    const contentTestC = (
      <BeCloseToRealityQuestion
        scoreLevel={scoreLevel}
        displayMamanBlues={false}
        setShowBackButton={setShowBackButton}
      />
    )
    return cardComponentAndRetryButton(contentTestC, onReset, showBackButton)
  }

  return null
}

const cardComponentAndRetryButton = (content, onReset, showBackButton) => (
  <div className="measure-card">
    {showBackButton && (
      <button
        className="fr-btn fr-btn--tertiary-no-outline margin-bottom-8 measure-button-back"
        onClick={onReset}
      >
        <Icon.ChevronLeft className="margin-right-8" />
        Retour
      </button>
    )}
    {content}
  </div>
)
