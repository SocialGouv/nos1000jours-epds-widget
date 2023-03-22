import { push } from "@socialgouv/matomo-next"
import * as StorageUtils from "../utils/storage.utils"
import { STORAGE_SOURCE } from "../constants/constants"
export const EVENT_CLICK = "Click"

export const CATEG = {
  home: "Home",
  introduction: "Introduction",
  demography: "Démographie",
  survey: "Questionnaire",
  results: "Résultat",
  intentions: "Intentions",
  contact: "Contact",
  test: "Test",
}

export const ACTION = {
  start: "Démarrer",
  end_intro: "Terminer l’introduction",
  end_demo: "Terminer le formulaire démographique",
  start_survey: "Commencer le questionnaire",
  end_survey: "Terminer le questionnaire",
  be_contacted: "Demander à être contacté",
  ressource: "Recevoir les ressources par mail",
  ressource_mail: "Confirmer recevoir les ressources par mail",

  download: "Télécharger mes réponses",

  opinion: "Donner son avis",
  recruit: "Faire un entretien utilisateur",

  confirmation: "Confirmation effectuée",
}

export const CONTACT_SENT = {
  chat: "Ouverture chat",
  no_chat: "Chat non disponible",
  mail: "Confirmation email",
  sms: "Confirmation sms",
  rendezvous: "Confirmation rendezvous",
}

const tracker = (categ, action, name) => {
  if (process.env.NEXT_PUBLIC_MATOMO_ENABLED === "true")
    push(["trackEvent", categ, action, name])
}

export const track = (categ, action) => {
  const source = StorageUtils.getInLocalStorage(STORAGE_SOURCE)
  if (source) {
    tracker(categ, action, source)
  }
}

export const trackerForSurvey = (action) => {
  track(CATEG.survey, action)
}

export const trackerForResults = (action) => {
  track(CATEG.results, action)
}

export const trackerForIntentions = (action) => {
  track(CATEG.intentions, action)
}

export const trackerForContact = (action) => {
  track(CATEG.contact, action)
}
