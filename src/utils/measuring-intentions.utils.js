import { STORAGE_TEST_INTENTIONS } from "../constants/constants"
import { getColorIconAndTextByMood, getInLocalStorage } from "./main.utils"
import {
  SCORE_LEVEL_BAD,
  SCORE_LEVEL_GOOD,
  SCORE_LEVEL_MEDIUM,
} from "./score-level.utils"
import { ACTION, CATEG, trackerClick } from "./tracker.utils"

export const TEST = {
  A: "A",
  B: "B",
  C: "C",
}

export const cestUneBonneEtape =
  "C'est une bonne étape, vous pouvez tout de même parler à Elise. Elle est présente pour vous écouter, vous conseiller, vous orienter."

const elisePeutVousAider =
  "Si vous vous posez des questions, Elise peut vous aider à y voir plus clair. Le test est un outil de dépistage. Il aide les professionnels de santé à poser un diagnostique de cette maladie touchant XXX de parents."
const seRapprocheDeLaRealite =
  "Précisez nous ce qui se rapprocherait le plus de la réalité"
const aucune = "Aucune des trois : je vous explique"
const nePasSavoir =
  "Ne pas savoir est tout à fait normal. Elise peut vous écouter et vous aider à mieux comprendre ce qu'il se passe."

const demandeDeDetails = {
  lvl1: {
    question: seRapprocheDeLaRealite,
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
    commentaires: {
      mal: "Nous vous conseillons de vous entretenir avec Elise. Elle saura vous apporter conseil.",
      autre: "Expliquez-nous pourquoi vous êtes venu.es passer le test.",
    },
  },
  lvl3: {
    question: seRapprocheDeLaRealite,
    reponses: [
      {
        value: "bien",
        label: "Malgré le résultat, je l'impression que tout va bien",
      },
      {
        value: "curiosite",
        label: "J'ai fait le test par curiosité",
      },
      {
        value: "proSante",
        label: "Je suis professionnel de santé",
      },
      {
        value: "aucune",
        label: aucune,
      },
    ],
    commentaires: {
      bien: elisePeutVousAider,
      curiosite: elisePeutVousAider,
      proSante:
        "Merci pour l'intérêt que vous portez à notre solution. Si vous avez des commentaires, des suggestions, n'hésitez pas à nous en faire part à l'adresse suivante : contact.1000J@ ....",
      aucune: "",
    },
  },
}

export const estLePlusAdapte = {
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
        "Je ne sais pas vers qui me tourner : je rentre en contact avec Elise",
    },
    {
      value: "aucune",
      label: aucune,
    },
  ],
  commentaires: {
    quiJoindre: "",
    quoiFaire: "",
    seTourner: "",
    aucune:
      "Avec vos mots expliquez-nous ce qui serait le plus adapté pour vous :",
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
      peutetre: nePasSavoir,
      non: demandeDeDetails.lvl1,
    },
    lvl3: {
      oui: estLePlusAdapte,
      peutetre: nePasSavoir,
      non: demandeDeDetails.lvl3,
    },
  },
}

export const demandeDeDetailsByScoreLevel = (scoreLevel) => {
  switch (scoreLevel) {
    case SCORE_LEVEL_GOOD:
      return demandeDeDetails.lvl1
    case SCORE_LEVEL_MEDIUM:
    case SCORE_LEVEL_BAD:
      return demandeDeDetails.lvl3
  }
}

export const estProcheDeLaRealiteCommentaireByScoreLevel = (scoreLevel) => {
  switch (scoreLevel) {
    case SCORE_LEVEL_GOOD:
      return estProcheDeLaRealite.commentaires.lvl1
    case SCORE_LEVEL_MEDIUM:
    case SCORE_LEVEL_BAD:
      return estProcheDeLaRealite.commentaires.lvl3
  }
}

export const trackerForIntentions = (scoreLevel, label) => {
  const testId = getInLocalStorage(STORAGE_TEST_INTENTIONS)
  const moodLevel = getColorIconAndTextByMood(scoreLevel).moodText

  trackerClick(
    CATEG.test,
    `${ACTION.parcours}${testId}`,
    `${moodLevel} - ${label}`
  )
}
