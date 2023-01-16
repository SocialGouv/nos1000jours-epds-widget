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
  TrackerUtils.track(
    TrackerUtils.CATEG.contact,
    TrackerUtils.ACTION.contact_confirm_sent,
    trackerContactName(contactType)
  )
}

const trackerContactName = (contactType) => {
  switch (contactType) {
    case RequestContact.type.email:
      return TrackerUtils.CONTACT_SENT.mail
    case RequestContact.type.sms:
      return TrackerUtils.CONTACT_SENT.sms
    case RequestContact.type.chat:
      return TrackerUtils.CONTACT_SENT.chat
  }
}

/**
 * Enregistrer la demande de contact avec l'id du questionnaire EPDS
 * @param {RequestContact.type} contactType
 * @param {*} sendContactQuery Query SAVE_DEMANDE_DE_CONTACT
 */
export const saveContactRequest = async (contactType, sendContactQuery) => {
  const epdsTestID = await StorageUtils.getInLocalStorage(STORAGE_RESULTS_ID)
  const source = await StorageUtils.getInLocalStorage(STORAGE_SOURCE)

  await sendContactQuery({
    variables: {
      reponsesEpds: epdsTestID,
      typeDeContact: contactType,
      widgetEpdsSource: source,
    },
  })
}
