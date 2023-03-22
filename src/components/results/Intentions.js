import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { ButtonGroup, ToggleButton } from "react-bootstrap"
import {
  STORAGE_IS_BACK_RESULTS,
  STORAGE_SCORE,
} from "../../constants/constants"

import * as TrackerUtils from "../../utils/tracker.utils"
import * as StorageUtils from "../../utils/storage.utils"
import * as PdfUtils from "../../utils/pdf.utils"

/**
 * @param {number} moodLevel
 * @returns Bloc des intentions
 */
export const Intentions = () => {
  const router = useRouter()

  const [radioValue, setRadioValue] = useState()
  const [itemSelected, setItemSelected] = useState(false)
  const isBackFromConfirmed = StorageUtils.getInLocalStorage(
    STORAGE_IS_BACK_RESULTS
  )
  const scoreValue = StorageUtils.getInLocalStorage(STORAGE_SCORE)

  const questionAboutScore = {
    question: "À qui allez-vous parler de votre score ?",
    responses: [
      { name: "À Élise, présidente de l'association Maman Blues", id: 1 },
      { name: "Mon entourage", id: 2 },
      { name: "Mon professionnel de santé", id: 3 },
      { name: "Je le garde pour moi", id: 4 },
    ],
  }
  const DISPLAY_IMAGE_FOR_RESPONSE_ID = 1

  useEffect(() => {
    const seuilScore = () => {
      let seuil
      if (scoreValue < 9) {
        seuil = "score < 9"
      } else if (scoreValue >= 9 && scoreValue < 11) {
        seuil = "9 >= score < 11"
      } else if (scoreValue >= 11) {
        seuil = "score >= 11"
      }
      return seuil
    }
    if (seuilScore() && isBackFromConfirmed === "false") {
      TrackerUtils.trackerForResults(seuilScore())
    }
  }, [isBackFromConfirmed, scoreValue])

  useEffect(() => {
    const itemToElise = questionAboutScore.responses.find(
      (item) => item.id == DISPLAY_IMAGE_FOR_RESPONSE_ID
    )
    if (itemToElise.name === radioValue)
      router.push({ pathname: "/contact/to-be-contacted" })
  }, [radioValue])

  const onToggleButon = (value) => {
    setRadioValue(value)
    setItemSelected(true)
    TrackerUtils.trackerForIntentions(value)
  }

  const questionBlock = (question) => {
    return (
      <div className="buttons-block">
        <div>
          <b>{question.question}</b>
        </div>
        <ButtonGroup>
          {question.responses.map((radio) => (
            <ToggleButton
              className="intentions-button fr-btn--tertiary"
              key={radio.id}
              id={`radio-${radio.id}`}
              type="radio"
              name="radio"
              value={radio.name}
              checked={radioValue === radio.name}
              onChange={(event) => onToggleButon(event.currentTarget.value)}
              disabled={itemSelected}
            >
              {radio.name}
              {radio.id == 1 && <img alt="" src="../img/portrait-elise.jpg" />}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <div>{itemSelected && "Merci pour votre réponse"}</div>
      </div>
    )
  }

  const DownloadEpdsResponsesBtn = () => {
    return (
      <div
        className="fr-download intention-download"
        onClick={downloadEpdsResponses}
      >
        <span className="fr-download__link">
          <u>Télécharger mes réponses au questionnaire EPDS</u>
        </span>
        <span className="fr-download__detail">PDF</span>
      </div>
    )
  }

  const downloadEpdsResponses = () => {
    PdfUtils.generateEpdsResultsPdf()
    TrackerUtils.trackerForIntentions(TrackerUtils.ACTION.download)
  }

  return (
    <div className="intentions">
      <div className="intentions-card">
        {questionBlock(questionAboutScore)}
        <DownloadEpdsResponsesBtn />
      </div>
    </div>
  )
}
