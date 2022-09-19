export const EVENT_CLICK = "Click"

export const CATEG = {
  contact: "Contact",
  home: "Home",
  survey: "Questionnaire",
  test: "Test",
  intentions: "Intentions",
}

export const ACTION = {
  contact_confirm_sent: "Confirmation d'envoi de la demande de contact",
  contact_type: "Choix du type de prise de contact",
  parcours: "Parcours",
}

export const CONTACT_SENT = {
  chat: "ouverture_chat",
  no_chat: "chat_non_disponible",
  mail: "confirmation_mail",
  sms: "confirmation_sms",
}

export const trackerClick = (categ, action, name) => {
  if (process.env.NEXT_PUBLIC_MATOMO_ENABLED === "true")
    _paq.push(["trackEvent", categ, action, name])
}
