import { RequestContact, STORAGE_SOURCE } from "../../src/constants/constants"
import * as ContactUtils from "../../src/utils/contact.utils"
import * as TrackerUtils from "../../src/utils/tracker.utils"

/**
 * @param {RequestContact.type} contactType
 * @param {*} label
 */
const sendTrackerContactConfirmed = (contactType) => {
  if (contactType === "chat") {
    TrackerUtils.trackerForContact(`Ouverture ${contactType}`)
  } else {
    TrackerUtils.trackerForContact(`Confirmation ${contactType}`)
  }
}

describe("Contact Utils", () => {
  describe("trackerContactName", () => {
    test("Should return confirmation mail if email type is selected", () => {
      expect(ContactUtils.trackerContactName("email")).toEqual(
        "Confirmation email"
      )
    })
    test("Should return confirmation mail if chat type is selected", () => {
      expect(ContactUtils.trackerContactName("chat")).toEqual("Ouverture chat")
    })
    test("Should return confirmation mail if rendezvous type is selected", () => {
      expect(ContactUtils.trackerContactName("rendezvous")).toEqual(
        "Confirmation rendezvous"
      )
    })
  })
  describe("sendTrackerContactConfirmed", () => {
    let trackerSpy
    localStorage.setItem(STORAGE_SOURCE, "1000-premiers-jours")
    beforeEach(() => {
      trackerSpy = jest.spyOn(TrackerUtils, "trackerForContact")
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    test("Should send tracker with email confirmation", () => {
      sendTrackerContactConfirmed(RequestContact.type.email)
      expect(trackerSpy).toHaveBeenCalledWith("Confirmation email")
    })

    test("Should send tracker with sms confirmation", () => {
      sendTrackerContactConfirmed(RequestContact.type.sms)
      expect(trackerSpy).toHaveBeenCalledWith(`Confirmation sms`)
    })

    test("Should send tracker with chat opening", () => {
      sendTrackerContactConfirmed(RequestContact.type.chat)
      expect(trackerSpy).toHaveBeenCalled()
      expect(trackerSpy).toHaveBeenCalledWith("Ouverture chat")
    })
  })

  describe("isMamanBluesAvailableHours", () => {
    test("Should return true with 9h", () => {
      const date = new Date("2023-02-13 09:50:05")
      jest.useFakeTimers().setSystemTime(date)

      expect(ContactUtils.isMamanBluesAvailableHours()).toBeTruthy()
    })

    test("Should return false with 12h00", () => {
      const date = new Date("2023-02-13 12:00:05")
      jest.useFakeTimers().setSystemTime(date)

      expect(ContactUtils.isMamanBluesAvailableHours()).toBeFalsy()
    })

    test("Should return true with 13h00", () => {
      const date = new Date("2023-02-13 13:00:05")
      jest.useFakeTimers().setSystemTime(date)

      expect(ContactUtils.isMamanBluesAvailableHours()).toBeTruthy()
    })

    test("Should return true with 17h30", () => {
      const date = new Date("2023-02-13 17:30:05")
      jest.useFakeTimers().setSystemTime(date)

      expect(ContactUtils.isMamanBluesAvailableHours()).toBeTruthy()
    })

    test("Should return false with 17h55", () => {
      const date = new Date("2023-02-13 17:55:05")
      jest.useFakeTimers().setSystemTime(date)

      expect(ContactUtils.isMamanBluesAvailableHours()).toBeFalsy()
    })

    test("Should return false with sunday", () => {
      const date = new Date("2023-02-12 14:00:05")
      jest.useFakeTimers().setSystemTime(date)

      expect(ContactUtils.isMamanBluesAvailableHours()).toBeFalsy()
    })
  })
})
