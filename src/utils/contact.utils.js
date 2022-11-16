import * as TrackerUtils from "./tracker.utils"
import { RequestContact } from "../constants/constants"

/**
 * @param {RequestContact.type} contactType
 */
export const sendTrackerContactConfirmed = (contactType) => {
  let name
  switch (contactType) {
    case RequestContact.type.email:
      name = TrackerUtils.CONTACT_SENT.mail
      break
    case RequestContact.type.sms:
      name = TrackerUtils.CONTACT_SENT.sms
      break
    case RequestContact.type.chat:
      name = TrackerUtils.CONTACT_SENT.chat
      break
  }

  TrackerUtils.trackerClick(
    TrackerUtils.CATEG.contact,
    TrackerUtils.ACTION.contact_confirm_sent,
    name
  )
}
