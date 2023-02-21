import { push } from "@socialgouv/matomo-next"

export const EVENT_CLICK = "Click"

export const CATEG = {
  contact: "Contact",
  home: "Home",
  survey: "Questionnaire",
  test: "Test",
  intentions: "Intentions",
  demography: "Démographie",
  recruit: "Recrutement",
  results: "Résultats",
}

export const ACTION_GENERIQUE = "Générique"
export const ACTION = {
  contact_confirm_sent: "Confirmation d'envoi de la demande de contact",
  contact_type: "Choix du type de prise de contact",
  parcours: "Parcours",
  generic: ACTION_GENERIQUE,
}

export const NAME = {
  start: "Commencer",
  end: "Terminer",
  contact_confirm_sent: "Confirmation d'envoi de la demande de contact",
}

export const CONTACT_SENT = {
  chat: "ouverture_chat",
  no_chat: "chat_non_disponible",
  mail: "confirmation_mail",
  sms: "confirmation_sms",
  rendezvous: "prise_rdv_calendly",
}

export const track = (categ, action, name) => {
  if (process.env.NEXT_PUBLIC_MATOMO_ENABLED === "true")
    push(["trackEvent", categ, action, name])
}

/**
 * Tracker générique (action "generique") pour pouvoir utiliser faciliter les stats sans information précise (test, source)
 * @param {CATEG} categ
 * @param {*} name
 */
export const genericTracker = (categ, name) => {
  track(categ, ACTION.generic, name)
}
