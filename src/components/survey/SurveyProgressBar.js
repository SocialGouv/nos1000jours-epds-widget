import React from "react"

export function SurveyProgressBar({ indexNow, size }) {
  // TODO: bug sur le composant : https://gouvfr.atlassian.net/servicedesk/customer/portal/1/DSFR-1125

  return (
    <div className="survey-progressbar">
      <div className="fr-stepper">
        <h2 className="fr-stepper__title">
          <span claclassNamess="fr-stepper__state">
            Question {indexNow} sur {size}
          </span>
        </h2>
        <div
          className="fr-stepper__steps"
          data-fr-current-step={indexNow}
          data-fr-steps={size}
        ></div>
      </div>
    </div>
  )
}
