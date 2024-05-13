export const STORAGE_LABELS = "labels"
export const STORAGE_LOCALE = "locale"
export const STORAGE_SOURCE = "source"

export const STORAGE_TEST_ABC = "testABC"
export const STORAGE_TEST_VERS_QUI_SE_TOURNER = "testVersQuiSeTourner"
export const STORAGE_TEST_DEMOGRAPHIC_ID = "testDemographicId"
export const STORAGE_TEST_DEMOGRAPHIC_DPT_CODE = "testDemographicDptCode"
export const STORAGE_TEST_DEMOGRAPHIC_DPT_LIBELLE = "testDemographicDptLibelle"

export const STORAGE_SCORE = "score"
export const STORAGE_SCORE_LEVEL_MACARON = "scoreLevelForMacaron"
export const STORAGE_SCORE_LEVEL_MOOD = "scoreLevelForMood"
export const STORAGE_SCORE_LEVEL_TEXTS = "scoreLevelForTexts"
export const STORAGE_SCORE_QUESTION_DIX = "scoreQuestionDix"
export const STORAGE_RESULTS_BOARD = "resultsBoard"
export const STORAGE_RESULTS_ID = "resultsBoardId"
export const STORAGE_IS_BACK_RESULTS = "isBackFromConfirmed"
export const STORAGE_CONTACT_TYPE = "contactType"
export const STORAGE_CONTACT_HOURS = "contactHours"

export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const CALENDLY_LINK = process.env.NEXT_PUBLIC_CALENDLY_LINK
export const EPDS_SOURCE = "SitePartenaire"
export const DEFAULT_LOCAL = "FR"
export const OPEN_CONTACT_FROM_EMAIL = "fromEmail"

export const PATTERN_EMAIL = "[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"

export const URL_CHAT_WHATSAPP = "https://wa.me/message/ZMCTRIQWA7OKD1"

export const RequestContact = {
  type: {
    sms: "sms",
    rendezvous: "rendezvous",
    whatsapp: "whatsapp",
  },
  hours: {
    morning: "matin",
    noon: "midi",
    afternoon: "après-midi",
  },
}

export const EpdsGender = {
  masculin: {
    key: "gender.masculin",
    strapiLibelle: "Masculin",
  },
  feminin: {
    key: "gender.feminin",
    strapiLibelle: "Feminin",
  },
  nonBinaire: {
    key: "gender.nonbinaire",
    strapiLibelle: "Nonbinaire",
  },
  inconnu: {
    key: "gender.inconnu",
    strapiLibelle: "Inconnu",
  },
}

export const moderateTestimonyList = [
  "« J’ai peur de ne pas bien faire les choses, de ne pas être à la hauteur. » (Héléne, 32 ans)",
  "« J’accumule beaucoup de fatigue. » (Ludivine, 30 ans)",
  "« Je ne sais pas vraiment ce qu’il se passe. » (Ali, 28 ans)",
]

export const highTestimonyList = [
  "« J’ai du mal à dormir. » (David, 29 ans)",
  "« Je me sens très seule. » (Véronique, 26 ans)",
  "« Je n’arrive pas à contrôler mes émotions. Je pleure souvent et/ou m’énerve très facilement. » (Sarah, 33 ans)",
]

export const veryHighTestimonyList = [
  "« Je me sens très mal. » (Aurélie, 28 ans)",
  "« J'ai l'impression de ne plus sentir d'émotions. » (Pierre, 33 ans)",
  "« J’ai peur qu’il arrive quelque chose à mon enfant. » (Clara, 27 ans)",
]
