export const genderValues = [
  {
    id: "femme",
    text: "Femme",
    isChecked: false,
  },
  {
    id: "homme",
    text: "Homme",
    isChecked: false,
  },
  {
    id: "nonPrecise",
    text: "Non précisé",
    isChecked: false,
  },
]

export const ageValues = [
  {
    id: "moinsDe18ans",
    text: "-18 ans",
    isChecked: false,
  },
  {
    id: "entre18_25ans",
    text: "18 - 25 ans",
    isChecked: false,
  },
  {
    id: "entre25_30ans",
    text: "25 - 30 ans",
    isChecked: false,
  },
  {
    id: "entre30_35ans",
    text: "30 - 35 ans",
    isChecked: false,
  },
  {
    id: "entre35_40ans",
    text: "35 - 40 ans",
    isChecked: false,
  },
  {
    id: "entre40_45ans",
    text: "40 - 45 ans",
    isChecked: false,
  },
  {
    id: "plusDe45ans",
    text: "45 ans et +",
    isChecked: false,
  },
]

export const situationValues = [
  {
    id: "vousAttendez1Enfant",
    text: "Vous attendez un enfant",
    isChecked: false,
  },
  {
    id: "vousAvezEnfantDeMoinsDe2ans",
    text: "Vous avez un enfant de moins de 2 ans",
    isChecked: false,
  },
  {
    id: "vousAvezDesEnfantsDePlusDe2ans",
    text: "Vous avez un ou plusieurs enfant de plus de 2 ans",
    isChecked: false,
  },
]

export const entourageValues = [
  {
    id: "oui",
    text: "Oui",
    isChecked: false,
  },
  {
    id: "non",
    text: "Non",
    isChecked: false,
  },
  {
    id: "jeNeSaisPas",
    text: "Je ne sais pas",
    isChecked: false,
  },
]

export const convertArraySituationsToString = (situations) => {
  let situationsString = ""
  situations.forEach((element) => {
    situationsString += `${situationsString.length > 0 ? " / " : ""}${element.text}`
  })

  return situationsString
}
