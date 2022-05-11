export const TEST_A = "A"
export const TEST_B = "B"
export const TEST_C = "C"

export const beCloseToRealityResponses = [
  {
    value: "yes",
    label: "Oui",
    contentResponse:
      "Vous allez bien, n'hésitez pas à revenir plus tard et vous questionner régulièrement. Sachez qu'Elise peut répondre à vos questions si vous en avez besoin.",
  },
  {
    value: "maybe",
    label: "Je ne suis pas sûr(e)",
    contentResponse:
      "Ne pas savoir est tout à fait normal. Elise peut vous écouter et vous aider à mieux comprendre ce qu'il se passe.",
  },
  {
    value: "no",
    label: "Non",
    contentResponse: "Précisez nous ce qui rapprocherait le plus de la réalité",
  },
]

export const askForDetailsResponses = [
  {
    value: "bad",
    label: "Malgré le résultat, je n'ai pas l'impression d'aller bien",
    contentResponse:
      "Nous vous conseillons de vous entretenir avec Elise. Elle saura vous apporter conseil.",
  },
  {
    value: "other",
    label: "Autre chose : nous le dire",
    contentResponse:
      "Expliquez-nous pourquoi vous êtes venu.es passer le test.",
  },
]
