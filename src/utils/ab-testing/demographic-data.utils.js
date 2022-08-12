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
    id: "non précisé",
    text: "Non précisé",
    isChecked: false,
  },
]

export const ageValues = [
  {
    id: "-18ans",
    text: "-18 ans",
    isChecked: false,
  },
  {
    id: "18-25ans",
    text: "18 - 25 ans",
    isChecked: false,
  },
  {
    id: "25-30ans",
    text: "25 - 30 ans",
    isChecked: false,
  },
  {
    id: "30-35ans",
    text: "30 - 35 ans",
    isChecked: false,
  },
  {
    id: "35-40ans",
    text: "35 - 40 ans",
    isChecked: false,
  },
  {
    id: "40-45ans",
    text: "40 - 45 ans",
    isChecked: false,
  },
  {
    id: "45ans+",
    text: "45 ans et +",
    isChecked: false,
  },
]

export const situationValues = [
  {
    id: "attendez1Enfant",
    text: "Vous attendez un enfant",
    isChecked: false,
  },
  {
    id: "avezEnfantDeMoinsDe2ans",
    text: "Vous avez un enfant de moins de 2 ans",
    isChecked: false,
  },
  {
    id: "avezDesEnfantsDePlusDe2ans",
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
