import { ProgressBar } from "react-bootstrap"
import React from "react"

export function SurveyProgressBar({ indexNow, size }) {
  return (
    <div style={{ margin: "20px 0px 30px 0px" }}>
      Question {indexNow} sur {size}
      <ProgressBar
        max={size}
        now={indexNow}
        className="survey-progressbar"
        style={{ marginTop: 10 }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>1</span>
        <span>{size}</span>
      </div>
    </div>
  )
}
