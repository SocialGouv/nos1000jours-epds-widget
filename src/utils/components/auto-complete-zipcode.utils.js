/**
 * Converti ce que renvoi l'API en un objet contenant que les informations necessaires
 * @returns Code postal, Ville, Nom du département, Numéro du département, Région, Label avec diverses information
 */
export const cityInformation = (properties) => {
  const contextArray = properties.context.split(", ")

  return {
    zipcode: properties.postcode,
    city: properties.city,
    departmentName: contextArray[1],
    departmentNumber: contextArray[0],
    region: contextArray[2],
    label1Bold: properties.label,
    label2: properties.context,
  }
}
