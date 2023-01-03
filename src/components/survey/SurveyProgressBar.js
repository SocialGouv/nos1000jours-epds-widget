import React from "react"
import { Stepper } from "@codegouvfr/react-dsfr/Stepper"

export function SurveyProgressBar({ indexNow, size }) {
  // TODO: bug sur le composant : https://gouvfr.atlassian.net/servicedesk/customer/portal/1/DSFR-1125

  return (
    <div className="survey-progressbar">
      <Stepper
        currentStep={indexNow}
        stepCount={size}
        title={`Question ${indexNow}`}
      />
    </div>
  )
}
