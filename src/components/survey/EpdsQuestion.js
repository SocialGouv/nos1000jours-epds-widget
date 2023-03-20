import React from "react"

export function EpdsQuestion({
  question,
  resultsBoard,
  setEnabledNextButton,
  isRTL = false,
}) {
  const prefix = "q" + question.ordre
  const radio1Id = prefix + "-radio1"
  const radio2Id = prefix + "-radio2"
  const radio3Id = prefix + "-radio3"
  const radio4Id = prefix + "-radio4"

  const arrayResponses = [
    { libelle: question.reponse_1_libelle, points: question.reponse_1_points },
    { libelle: question.reponse_2_libelle, points: question.reponse_2_points },
    { libelle: question.reponse_3_libelle, points: question.reponse_3_points },
    { libelle: question.reponse_4_libelle, points: question.reponse_4_points },
  ]

  function handleChange(e) {
    const responseIndex = Number(e.target.id.split(prefix + "-radio")[1])

    resultsBoard[question.ordre - 1] = {
      order: question.ordre,
      points: arrayResponses[responseIndex - 1].points,
      question: question.libelle,
      response: arrayResponses[responseIndex - 1].libelle,
    }

    setEnabledNextButton(true)
  }

  const itemRadio = (radioId, libelle) => (
    <div className="fr-radio-group">
      <input type="radio" id={radioId} name="radio" />
      <label
        className={`fr-label ${isRTL ? "font-size-rtl" : "font-size-label"}`}
        htmlFor={radioId}
      >
        {libelle}
      </label>
    </div>
  )

  return (
    <div className="epds-question" dir={isRTL ? "rtl" : "ltr"}>
      <form className="fr-form-group">
        <fieldset className="fr-fieldset">
          <legend id="radio-legend">
            <div
              className="question-number"
              aria-label={`Question ${question.ordre}`}
            >
              {question.ordre}
            </div>
            <div className={`question ${isRTL ? "font-size-rtl" : ""}`}>
              {question.libelle}
            </div>
          </legend>
          <div
            className={`fr-fieldset__content epds-response ${
              isRTL ? "input-revert" : ""
            }`}
            onChange={handleChange}
          >
            {itemRadio(radio1Id, question.reponse_1_libelle)}
            {itemRadio(radio2Id, question.reponse_2_libelle)}
            {itemRadio(radio3Id, question.reponse_3_libelle)}
            {itemRadio(radio4Id, question.reponse_4_libelle)}
          </div>
        </fieldset>
      </form>
    </div>
  )
}
