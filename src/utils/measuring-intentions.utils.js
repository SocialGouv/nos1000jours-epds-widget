export const TEST = {
  A: "A",
  B: "B",
  C: "C",
}

const demandeDeDetails = {
  lvl1: {
    question: "Précisez nous ce qui rapprocherait le plus de la réalité",
    reponses: [
      {
        value: "mal",
        label: "Malgré le résultat, je n'ai pas l'impression d'aller bien",
      },
      {
        value: "autre",
        label: "Autre chose : nous le dire",
      },
    ],
    commentaires: { // TODO: tableau
      mal: "Nous vous conseillons de vous entretenir avec Elise. Elle saura vous apporter conseil.",
      autre: "Expliquez-nous pourquoi vous êtes venu.es passer le test.",
    },
  },
  lvl3: {
    question: "Précisez nous ce qui rapprocherait le plus de la réalité",
    reponses: { // TODO: tableau
      bien: "Malgré le résultat, je l'impression que tout va bien",
      curiosite: "J'ai fait le test par curiosité",
      proSante: "Je suis professionnel de santé",
      aucune: "Aucune des trois : je vous explique",
    },
    commentaires: { // TODO: tableau
      bien: "", //TODO: commentaire
      curiosite: "", //TODO: commentaire
      proSante: "", //TODO: commentaire + inscriptioni webinaire ?
      aucune: "", //TODO: texteArea + commentaire
    },
  },
}

const estLePlusAdapte = {
  question:
    "Nous vous conseillons de prendre une de ces actions pour être accompagné(e). Qu'est-ce qui vous semble le plus adapté pour vous ?",
  reponses: [
    {
      value: "quiJoindre",
      label:
        "Je sais qui joindre : je vais contacter mon professionnel de santé et parler du résultat du test",
    },
    {
      value: "quoiFaire",
      label:
        "Je sais quoi faire : je montre le résultat de ce test à mon entourage",
    },
    {
      value: "seTourner",
      label:
        "Je en sais pas vers qui me tourner : je rentre en contact avec Elise",
    },
    {
      value: "aucune",
      label: "Aucune des proposition / Je ne sais pas quoi faire",
    },
  ],
  commentaires: { // TODO: tableau
    quiJoindre: "", //TODO: formulaire + commentaire + mail
    quoiFaire: "", //TODO: formulaire + commentaire + mail
    seTourner: "", // TODO: rien
    aucune: "", //TODO: TextArea + commentaire
  },
}

export const estProcheDeLaRealite = {
  question: "Ce résultat semble-t-il être proche de la réalité ?",
  reponses: [
    {
      value: "oui",
      label: "Oui",
    },
    {
      value: "peutetre",
      label: "Je ne suis pas sûr(e)",
    },
    {
      value: "non",
      label: "Non",
    },
  ],
  commentaires: {
    lvl1: {
      oui: "Vous allez bien, n'hésitez pas à revenir plus tard et vous questionner régulièrement. Sachez qu'Elise peut répondre à vos questions si vous en avez besoin.",
      peutetre:
        "Ne pas savoir est tout à fait normal. Elise peut vous écouter et vous aider à mieux comprendre ce qu'il se passe.",
      non: demandeDeDetails.lvl1,
    },
    lvl2: {
      oui: "",
      peutetre: "",
      non: "",
    },
    lvl3: {
      oui: estLePlusAdapte,
      peutetre:
        "C'est une bonne étape, vous pouvez tout de même parler à Elise. Elle est présente pour vous écouter, vous conseiller, vous orienter.",
      non: demandeDeDetails.lvl3,
    },
  },
}

export const demandeDeDetailsByScoreLevel = (scoreLevel) => {
  switch (scoreLevel) {
    case 1:
      return demandeDeDetails.lvl1
    case 2:
      return demandeDeDetails.lvl2
    case 3:
      return demandeDeDetails.lvl3
  }
}

export const estProcheDeLaRealiteCommentaireByScoreLevel = (scoreLevel) => {
  switch (scoreLevel) {
    case 1:
      return estProcheDeLaRealite.commentaires.lvl1
    case 2:
      return estProcheDeLaRealite.commentaires.lvl2
    case 3:
      return estProcheDeLaRealite.commentaires.lvl3
  }
}

export const questionByTest = (testId, scoreLevel) => {
  switch (testId) {
    case TEST.B:
      break
    case TEST.C:
      break
  }
}
