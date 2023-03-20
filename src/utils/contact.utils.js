import * as TrackerUtils from "./tracker.utils"
import * as StorageUtils from "./storage.utils"
import {
  RequestContact,
  STORAGE_RESULTS_ID,
  STORAGE_SOURCE,
} from "../constants/constants"

/**
 * @param {RequestContact.type} contactType
 */
export const sendTrackerContactConfirmed = (contactType) => {
  TrackerUtils.genericTracker(
    TrackerUtils.CATEG.contact,
    TrackerUtils.NAME.contact_confirm_sent
  )
  if (contactType) {
    TrackerUtils.track(
      TrackerUtils.CATEG.contact,
      TrackerUtils.ACTION.contact_confirm_sent,
      trackerContactName(contactType)
    )
  }
}

/**
 * @param {RequestContact.type} contactType
 */
export const sendTrackerContactType = (contactType) => {
  TrackerUtils.genericTracker(
    TrackerUtils.CATEG.contact,
    TrackerUtils.NAME.contact_type
  )
  if (contactType) {
    TrackerUtils.track(
      TrackerUtils.CATEG.contact,
      TrackerUtils.ACTION.contact_type,
      contactType
    )
  }
}

const trackerContactName = (contactType) => {
  switch (contactType) {
    case RequestContact.type.email:
      return TrackerUtils.CONTACT_SENT.mail
    case RequestContact.type.sms:
      return TrackerUtils.CONTACT_SENT.sms
    case RequestContact.type.chat:
      return TrackerUtils.CONTACT_SENT.chat
    case RequestContact.type.rendezvous:
      return TrackerUtils.CONTACT_SENT.rendezvous
  }
}

/**
 * Enregistrer la demande de contact avec l'id du questionnaire EPDS
 * @param {RequestContact.type} contactType
 * @param {*} sendContactQuery Query SAVE_DEMANDE_DE_CONTACT
 */
export const saveContactRequest = async (contactType, sendContactQuery) => {
  const epdsTestID = StorageUtils.getInLocalStorage(STORAGE_RESULTS_ID)
  const source = StorageUtils.getInLocalStorage(STORAGE_SOURCE)
  await sendContactQuery({
    variables: {
      reponsesEpds: epdsTestID,
      typeDeContact: contactType,
      widgetEpdsSource: source,
    },
  })
}

/**
 * Les horaires de dispo de MamanBlues (lun-vend 9h-17h30)
 * @returns Boolean
 */
export const isMamanBluesAvailableHours = () => {
  const date = new Date()

  // Days
  if (date.getDay() == 0 || date.getDay() == 6) return false
  // Hours
  else if (date.getHours() >= 9 && date.getHours() < 12) return true
  else if (date.getHours() >= 13 && date.getHours() < 17) return true
  else if (date.getHours() == 17 && date.getMinutes() <= 30) return true
  else return false
}
