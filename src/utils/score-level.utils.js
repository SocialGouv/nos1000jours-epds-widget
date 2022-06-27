export const SCORE_LEVEL_GOOD = 1
export const SCORE_LEVEL_MEDIUM = 2
export const SCORE_LEVEL_BAD = 3

/**
 * @param {*} score Score totale du questionnnaire
 * @param {*} scoreQ10 Score à la question 10
 * @returns Le niveau du score pour l'affichage de la jauge (1 : je vais bien / 2 : je vais moins bien / 3 : je ne vais pas bien)
 */
export const scoreLevelForMood = (score, scoreQ10) => {
  if (score >= 13 || scoreQ10 == 3) return SCORE_LEVEL_BAD
  if (score >= 9 && score < 13) return SCORE_LEVEL_MEDIUM
  if (score < 9) return SCORE_LEVEL_GOOD

  return 0
}

/**
 * @param {*} score Score totale du questionnnaire
 * @param {*} scoreQ10 Score à la question 10
 * @returns Le niveau du score pour pouvoir afficher le texte correspondant (1 : je vais bien / 2 : je vais moins bien / 3 : je ne vais pas bien)
 */
export const scoreLevelForTexts = (score, scoreQ10) => {
  if (score >= 11 || scoreQ10 == 3) return SCORE_LEVEL_BAD
  if (score >= 9 && score < 11) return SCORE_LEVEL_MEDIUM
  if (score < 9) return SCORE_LEVEL_GOOD

  return 0
}

/**
 * @param {*} score Score totale du questionnnaire
 * @param {*} scoreQ10 Score à la question 10
 * @returns Le niveau du score pour pouvoir afficher la macaron d'Elise (1 : je vais bien / 2 : je vais moins bien / 3 : je ne vais pas bien)
 */
export const scoreLevelForMacaron = (score, scoreQ10) => {
  if (score >= 13 || scoreQ10 == 3) return SCORE_LEVEL_BAD
  if (score >= 11 && score < 13) return SCORE_LEVEL_MEDIUM
  if (score < 11) return SCORE_LEVEL_GOOD

  return 0
}
