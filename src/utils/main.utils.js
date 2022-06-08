import { Spinner } from "react-bootstrap"
import { STORAGE_LABELS, STORAGE_LOCALE } from "../constants/constants"
import { Labels } from "../constants/specificLabels"

/**
 * Permet de récupérer en une seule fois : couleur, texts et icone pour un mood
 * @param {*} scoreLevel Niveau obtenu avec la fonction scoreLevelForMood
 * @returns Les informations d'un mood (couleur, texts et icone) en fonction du niveau
 */
export const getColorIconAndTextByMood = (scoreLevel) => {
  let icon
  let text
  let color

  switch (scoreLevel) {
    case 1:
      icon = "icone-resultats-bien.svg"
      text = Labels.mood.good
      color = "good-mood"
      break
    case 2:
      icon = "icone-resultats-moyen.svg"
      text = Labels.mood.moderatelyGood
      color = "moderatelygood-mood"
      break
    case 3:
      icon = "icone-resultats-pasbien.svg"
      text = Labels.mood.notGood
      color = "bad-mood"
      break
    default:
      break
  }

  return {
    moodIcon: icon,
    moodText: text,
    moodColor: color,
  }
}

export function getInLocalStorage(key) {
  if (typeof window !== "undefined") return localStorage.getItem(key)
}

export function getLocaleInLocalStorage() {
  const storageLocale = getInLocalStorage(STORAGE_LOCALE)
  if (storageLocale) return JSON.parse(storageLocale)
}

export function getLabelsInLocalStorage() {
  const storageLabels = getInLocalStorage(STORAGE_LABELS)
  if (storageLabels) return JSON.parse(storageLabels)
}

export const stringIsNotNullNorEmpty = (str) =>
  str !== null && str !== undefined && str.length > 0

export function convertArrayLabelsToObject(data) {
  const labels = {}
  data?.forEach((item) => (labels[item.label.toLowerCase()] = item.texte))
  return labels
}

export const phoneNumberFormatting = (phoneNumber) => {
  return phoneNumber.replace(/(.{2})(?!$)/g, "$1 ")
}

export const LoaderFoButton = () => (
  <Spinner animation="border" size="sm" className="margin-start-10" />
)
