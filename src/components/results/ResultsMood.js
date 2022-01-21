import React, { useEffect, useState } from "react"
import { getColorIconAndTextByMood } from "../../utils/utils"

export function ResultsMood({ scoreLevel }) {
  const [moodInfos, setQuestionsEpds] = useState()

  useEffect(() => {
    if (moodInfos == undefined)
      setQuestionsEpds(getColorIconAndTextByMood(scoreLevel))
  }, [])

  return (
    <div style={{ display: "flex", marginBlock: 20 }}>
      <img
        alt=""
        src={`../img/${moodInfos?.moodIcon}`}
        height={50}
        style={{ marginRight: 10 }}
      />
      <div
        className={`${moodInfos?.moodColor}`}
        style={{ alignSelf: "center" }}
      >
        {moodInfos?.moodText}
      </div>
    </div>
  )
}
