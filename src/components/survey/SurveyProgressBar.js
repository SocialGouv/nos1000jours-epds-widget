import { ProgressBar } from "react-bootstrap"
import React from "react"

export function SurveyProgressBar({ indexNow, size }) {
  const progress = `Question ${indexNow} sur ${size}`
  return (
    <div className="survey-progressbar">
      {progress}
      <ProgressBar aria-hidden max={size} now={indexNow} />
      <div className="progress-number" aria-hidden>
        <span>1</span>
        <span>{size}</span>
      </div>
    </div>
  )
}
