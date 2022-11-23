import * as TrackerUtils from "./tracker.utils"
import { RequestContact } from "../constants/constants"

/**
 * @param {RequestContact.type} contactType
 */
export const sendTrackerContactConfirmed = (contactType) => {
  TrackerUtils.trackerClick(
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
