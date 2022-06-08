export const STORAGE_LABELS = "labels"
export const STORAGE_LOCALE = "locale"
export const STORAGE_SOURCE = "source"
export const STORAGE_TEST_INTENTIONS = "testABC"

export const STORAGE_SCORE = "score"
export const STORAGE_SCORE_LEVEL_MACARON = "scoreLevelForMacaron"
export const STORAGE_SCORE_LEVEL_MOOD = "scoreLevelForMood"
export const STORAGE_SCORE_LEVEL_TEXTS = "scoreLevelForTexts"

export const STORAGE_CONTACT_TYPE = "contactType"
export const STORAGE_CONTACT_HOURS = "contactHours"

export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const EPDS_SOURCE = "SitePartenaire"
export const DEFAULT_LOCAL = "FR"

export const PATTERN_EMAIL = "[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"

export const RequestContact = {
  type: {
    sms: "sms",
    email: "email",
    chat: "chat",
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
