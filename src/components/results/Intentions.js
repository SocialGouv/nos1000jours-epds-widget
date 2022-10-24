import { useRouter } from "next/router"
import React, { useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { trackerForIntentions } from "../../utils/ab-testing/measuring-intentions.utils"
import * as PdfUtils from "../../utils/pdf.utils"

/**
 * @param {number} moodLevel
 * @returns Bloc des intentions
 */
export const Intentions = ({ moodLevel }) => {
  const router = useRouter()

  const [question1Response, setQuestion1Response] = useState()
  const [question2Response, setQuestion2Response] = useState()

  const ToggleResponseBt = ({ response, idQuestion }) => (
    <ToggleButton
      className="measure-button"
      value={response}
      aria-label={response}
      onClick={() => onToggleButon(idQuestion, response)}
    >
      {response}
    </ToggleButton>
  )

  const openContact = (idQuestion, item) => {
    if (questions.find((q) => q.id == idQuestion).reponseA == item) {
      router.push({
        pathname: "/contact/to-be-contacted",
      })
    }
  }

  const onToggleButon = (idQuestion, item) => {
    if (idQuestion == 1) setQuestion1Response(item)
    if (idQuestion == 2) {
      setQuestion2Response(item)
      openContact(idQuestion, item)
    }

    trackerForIntentions(moodLevel, item)
  }

  const questionBloc = (questionValues) => {
    return (
      <div className="buttons-bloc">
        <div>
          <b>{questionValues.question}</b>
        </div>
        <ToggleButtonGroup type="radio" name="radio-reality">
          <ToggleResponseBt
            idQuestion={questionValues.id}
            response={questionValues.reponseA}
          />
          <ToggleResponseBt
            idQuestion={questionValues.id}
            response={questionValues.reponseB}
          />
          <ToggleResponseBt
            idQuestion={questionValues.id}
            response={questionValues.reponseC}
          />
          {questionValues.reponseD && (
            <ToggleResponseBt
              idQuestion={questionValues.id}
              response={questionValues.reponseD}
            />
          )}
        </ToggleButtonGroup>
      </div>
    )
  }

  const DownloadEpdsResponsesBt = () => {
    return (
      <button
        className="fr-btn margin-bottom-12"
        type="submit"
        onClick={downloadEpdsResponses}
      >
        Télécharger mes réponses au questionnaire EPDS
      </button>
    )
  }

  const downloadEpdsResponses = () => {
    PdfUtils.generateEpdsResultsPdf()
    trackerForIntentions(moodLevel, "Télécharger mes réponses")
  }

  const showQuestion1 = () => !question1Response
  const showQuestion2 = () => question1Response && !question2Response
  const showDownloadEpdsResponsesBt = () => question2Response

  return (
    <div className="measure toto">
      <div className="measure-card">
        {showQuestion1() && questionBloc(questions[0])}
        {showQuestion2() && questionBloc(questions[1])}
        {showDownloadEpdsResponsesBt() && <DownloadEpdsResponsesBt />}
      </div>
    </div>
  )
}

const questions = [
  {
    id: 1,
    question: "Pourquoi avez-vous passé ce test ?",
    reponseA: "Par curiosité",
    reponseB: "Parce que je me pose des questions",
    reponseC: "Parce que je me sens mal",
  },
  {
    id: 2,
    question: "À qui allez-vous parler de votre score ?",
    reponseA: "À Élise, présidente de l'association Maman Blues",
    reponseB: "Mon entourage",
    reponseC: "Mon professionnel de santé",
    reponseD: "Je le garde pour moi",
  },
]
