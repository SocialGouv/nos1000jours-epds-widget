import React, { useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import * as PdfUtils from "../../utils/pdf.utils"

export const Intentions = (epdsResults) => {
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

  const onToggleButon = (idQuestion, item) => {
    if (idQuestion == 1) setQuestion1Response(item)
    if (idQuestion == 2) setQuestion2Response(item)
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
        Télécharger mes réponses au quesitonnaire EPDS
      </button>
    )
  }

  const downloadEpdsResponses = () => {
    PdfUtils.generateEpdsResultsPdf()
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
    question: "A qui allez-vous parler de votre score ?",
    reponseA: "Mon professionnel de santé",
    reponseB: "Mon entourage",
    reponseC: "Je le garde pour moi",
  },
]
