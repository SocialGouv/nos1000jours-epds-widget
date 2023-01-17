/**
 * Renvoi unue valeur pour paramètre State du composant Input du DSFR
 * @param {Boolean} param is input value valid
 * @returns "success" | "error" | "default" | undefined
 */
export const getInputState = (param) => {
  if (param === false) return "error"
  if (param === true) return "default"
  else return "default"
}
