import React, { useEffect, useState } from "react"
import { getColorIconAndTextByMood } from "../../utils/main.utils"

export function ResultsMood({ scoreLevel }) {
  const [moodInfos, setMoodInfos] = useState()

  useEffect(() => {
    if (moodInfos == undefined)
      setMoodInfos(getColorIconAndTextByMood(scoreLevel))
  }, [])

  return (
    <div className="results-mood">
      <img alt="" src={`../img/${moodInfos?.moodIcon}`} />
      <div className={`${moodInfos?.moodColor}`}>{moodInfos?.moodText}</div>
    </div>
  )
}
