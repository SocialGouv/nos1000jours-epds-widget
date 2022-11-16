import { RequestContact } from "../../src/constants/constants"
import * as ContactUtils from "../../src/utils/contact.utils"
import * as TrackerUtils from "../../src/utils/tracker.utils"

describe("Contact Utils", () => {
  describe("sendTrackerContactConfirmed", () => {
    let trackerSpy

    beforeEach(() => {
      trackerSpy = jest.spyOn(TrackerUtils, "trackerClick")
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    test("Should send tracker with email confirmation", () => {
      ContactUtils.sendTrackerContactConfirmed(RequestContact.type.email)
      expect(trackerSpy).toHaveBeenCalledWith(
        TrackerUtils.CATEG.contact,
        TrackerUtils.ACTION.contact_confirm_sent,
        TrackerUtils.CONTACT_SENT.mail
      )
    })

    test("Should send tracker with sms confirmation", () => {
      ContactUtils.sendTrackerContactConfirmed(RequestContact.type.sms)
      expect(trackerSpy).toHaveBeenCalledWith(
        TrackerUtils.CATEG.contact,
        TrackerUtils.ACTION.contact_confirm_sent,
        TrackerUtils.CONTACT_SENT.sms
      )
    })

    test("Should send tracker with chat opening", () => {
      ContactUtils.sendTrackerContactConfirmed(RequestContact.type.chat)
      expect(trackerSpy).toHaveBeenCalled()
      expect(trackerSpy).toHaveBeenCalledWith(
        TrackerUtils.CATEG.contact,
        TrackerUtils.ACTION.contact_confirm_sent,
        TrackerUtils.CONTACT_SENT.chat
      )
    })
  })
})
