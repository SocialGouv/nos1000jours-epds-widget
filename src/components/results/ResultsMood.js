import React, { useEffect, useState } from "react"
import { getColorIconAndTextByMood } from "../../utils/main.utils"
import {
  STORAGE_SCORE,
  STORAGE_IS_BACK_RESULTS,
} from "../../constants/constants"
import * as StorageUtils from "../../utils/storage.utils"
import * as TrackerUtils from "../../utils/tracker.utils"

export function ResultsMood({ scoreLevel }) {
  const scoreValue = StorageUtils.getInLocalStorage(STORAGE_SCORE)
  const isBackFromConfirmed = StorageUtils.getInLocalStorage(
    STORAGE_IS_BACK_RESULTS
  )
  const [moodInfos, setMoodInfos] = useState()

  const seuilScore = () => {
    let seuil
    if (scoreValue < 9) {
      seuil = "score < 9"
    } else if (scoreValue >= 9 && scoreValue < 11) {
      seuil = "9 >= score < 11"
    } else if (scoreValue >= 11) {
      seuil = "score >= 11"
    }
    return seuil
  }

  useEffect(() => {
    if (moodInfos == undefined)
      setMoodInfos(getColorIconAndTextByMood(scoreLevel))
    if (seuilScore() && !isBackFromConfirmed) {
      TrackerUtils.trackerForResults(seuilScore())
    }
  }, [])

  return (
    <div className="results-mood">
      <img alt="" src={`../img/${moodInfos?.moodIcon}`} />
      <div
        className={`${moodInfos?.moodColor}`}
        aria-label={`Résultat : ${moodInfos?.moodText}`}
      >
        {moodInfos?.moodText}
      </div>
    </div>
  )
}
