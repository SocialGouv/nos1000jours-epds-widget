import { STORAGE_TEST_VERS_QUI_SE_TOURNER } from "../../constants/constants"
import {
  SCORE_LEVEL_BAD,
  SCORE_LEVEL_GOOD,
  SCORE_LEVEL_MEDIUM,
} from "../score-level.utils"
import { TEST } from "./ab-testing.utils"

export const contacterAToutMoment =
  "Sachez que vous pouvez nous contacter à tout moment."

const elisePeutVousAider =
  "Même si vous n’avez pas la sensation de traverser une difficulté maternelle, sachez que vous pouvez nous contacter à tout moment. Pour rappel, la dépression post-partum touche 100 000 femmes et 75 000 hommes chaque année en France. Elle tue une femme par mois."
export const seRapprocheDeLaRealite =
  "Précisez nous ce qui se rapprocherait le plus de ce que vous vivez"
const aucune = "Autre. Je précise"
export const nePasSavoir =
  "Ne pas savoir est tout à fait normal. Nous sommes à votre écoute pour vous aider à comprendre ce que vous ressentez."
const versQuiSeTourner = "Je ne sais pas vers qui me tourner"

export const demandeDeDetails = {
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
      mal: "Nous vous conseillons de vous entretenir avec une membre de notre équipe. Elle saura vous apporter conseil.",
      autre: "Expliquez-nous pourquoi vous êtes venu.es passer le test.",
    },
  },
  lvl3: {
    question: seRapprocheDeLaRealite,
    reponses: [
      {
        value: "bien",
        label: "Malgré le résultat, j'ai l'impression que tout va bien",
      },
      {
        value: "curiosite",
        label: "J'ai fait le test par curiosité",
      },
      {
        value: "proSante",
        label: "Je suis professionnel de santé",
      },
    ],
    commentaires: {
      bien: elisePeutVousAider,
      curiosite: elisePeutVousAider,
      proSante:
        "Merci pour l'intérêt que vous portez à notre solution. Si vous avez des commentaires, des suggestions, n'hésitez pas à nous en faire part à l'adresse suivante : 1000joursblues@fabrique.social.gouv.fr",
      aucune: "",
    },
  },
}

export const estLePlusAdapte = {
  question: "Que vais-je faire ? Prenez une des actions suivantes.",
  reponses: [
    {
      value: "quiJoindre",
      label: "Je montre le résultat à mon professionnel de santé",
    },
    {
      value: "quoiFaire",
      label: "Je partage le résultat de ce test à mon entourage",
    },
    {
      value: "seTourner",
      label: versQuiSeTourner,
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
    aucune: "Avec vos mots, expliquez-nous ce que vous comptez faire.",
  },
}

export const estProcheDeLaRealite = {
  question: "Ce résultat semble-t-il proche de ce que vous vivez ?",
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
      oui: "Vous allez bien, n'hésitez pas à revenir plus tard et vous questionner régulièrement. Sachez que nous pouvons répondre à vos questions si vous en avez besoin.",
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

export const saveIsIntentionVersQuiSeTourner = (label) => {
  localStorage.setItem(
    STORAGE_TEST_VERS_QUI_SE_TOURNER,
    label === versQuiSeTourner
  )
}

export const clearIntentionsData = () => {
  localStorage.removeItem(STORAGE_TEST_VERS_QUI_SE_TOURNER)
}

export const showContactMamanBlues = (scoreLevel, testId) => {
  return (scoreLevel != 1 && testId !== TEST.B) || testId === TEST.C
}
