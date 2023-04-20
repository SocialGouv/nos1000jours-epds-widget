import { ProgressBar } from "react-bootstrap"
import React from "react"

export function ScoreProgressBar({ indexNow }) {
  return (
    <div className="score-progressbar">
      <ProgressBar aria-hidden now={indexNow} />
      <div className="progress-number" aria-hidden></div>
    </div>
  )
}
