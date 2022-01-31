import { Labels } from "../constants/specificLabels"

/**
 * @param {*} score Score totale du questionnnaire
 * @param {*} scoreQ10 Score à la question 10
 * @returns Le niveau du score pour l'affichage de la jauge (1 : je vais bien / 2 : je vais moins bien / 3 : je ne vais pas bien)
 */
export const scoreLevelForMood = (score, scoreQ10) => {
  if (score >= 13 || scoreQ10 == 3) return 3
  if (score >= 9 && score < 13) return 2
  if (score < 9) return 1

  return 0
}

/**
 * @param {*} score Score totale du questionnnaire
 * @param {*} scoreQ10 Score à la question 10
 * @returns Le niveau du score pour pouvoir afficher le texte correspondant (1 : je vais bien / 2 : je vais moins bien / 3 : je ne vais pas bien)
 */
export const scoreLevelForTexts = (score, scoreQ10) => {
  if (score >= 11 || scoreQ10 == 3) return 3
  if (score >= 9 && score < 11) return 2
  if (score < 9) return 1

  return 0
}

/**
 * @param {*} score Score totale du questionnnaire
 * @param {*} scoreQ10 Score à la question 10
 * @returns Le niveau du score pour pouvoir afficher la macaron d'Elise (1 : je vais bien / 2 : je vais moins bien / 3 : je ne vais pas bien)
 */
export const scoreLevelForMacaron = (score, scoreQ10) => {
  if (score >= 13 || scoreQ10 == 3) return 3
  if (score >= 11 && score < 13) return 2
  if (score < 11) return 1

  return 0
}

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

export const stringIsNotNullNorEmpty = (str) =>
  str !== null && str !== undefined && str.length > 0
