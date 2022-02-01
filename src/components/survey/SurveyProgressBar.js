import { ProgressBar } from "react-bootstrap"
import React from "react"

export function SurveyProgressBar({ indexNow, size }) {
  return (
    <div className="survey-progressbar">
      Question {indexNow} sur {size}
      <ProgressBar max={size} now={indexNow} />
      <div className="progress-number">
        <span>1</span>
        <span>{size}</span>
      </div>
    </div>
  )
}
