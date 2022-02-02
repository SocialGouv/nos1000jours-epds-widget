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
