/**
 * @param {*} score Score totale du questionnnaire
 * @param {*} scoreQ10 Score à la question 10
 * @returns Le niveau du score (1 : je vais bien / 2 : je vais moins bien / 3 : je ne vais pas bien)
 */
export const scoreLevel = (score, scoreQ10) => {
  if (score >= 13 || scoreQ10 == 3) return 3
  if (score >= 9 && score < 13) return 2
  if (score < 9) return 1

  return 0
}

export function getInLocalStorage(key) {
  if (typeof window !== "undefined") return localStorage.getItem(key)
}
