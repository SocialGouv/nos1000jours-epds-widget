import { RequestContact, STORAGE_SOURCE } from "../../src/constants/constants"
import * as ContactUtils from "../../src/utils/contact.utils"
import * as TrackerUtils from "../../src/utils/tracker.utils"

describe("Contact Utils", () => {
  describe("sendTrackerContactConfirmed", () => {
    let trackerSpy
    localStorage.setItem(STORAGE_SOURCE, "1000-premiers-jours")
    const source = localStorage.getItem(STORAGE_SOURCE)
    beforeEach(() => {
      trackerSpy = jest.spyOn(TrackerUtils, "trackerForContact")
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    test("Should send tracker with email confirmation", () => {
      TrackerUtils.trackerForContact()
      ContactUtils.sendTrackerContactConfirmed(
        RequestContact.type.email,
        "Confirmation"
      )
      expect(trackerSpy).toHaveBeenCalledWith(
        `${TrackerUtils.CONTACT_SENT.mail}`
      )
    })

    test("Should send tracker with sms confirmation", () => {
      ContactUtils.sendTrackerContactConfirmed(
        RequestContact.type.sms,
        "Confirmation"
      )
      expect(trackerSpy).toHaveBeenCalledWith(
        `${TrackerUtils.CONTACT_SENT.sms}`
      )
    })

    test("Should send tracker with chat opening", () => {
      ContactUtils.sendTrackerContactConfirmed(
        RequestContact.type.chat,
        "Ouverture"
      )
      expect(trackerSpy).toHaveBeenCalled()
      expect(trackerSpy).toHaveBeenCalledWith(
        `${TrackerUtils.CONTACT_SENT.chat}`
      )
    })

    test("Should send tracker with rdv confirmation", () => {
      ContactUtils.sendTrackerContactConfirmed(
        RequestContact.type.rendezvous,
        "Confirmation"
      )
      expect(trackerSpy).toHaveBeenCalled()
      expect(trackerSpy).toHaveBeenCalledWith(
        `${TrackerUtils.CONTACT_SENT.rendezvous}`
      )
    })
  })

  describe("isMamanBluesAvailableHours", () => {
    test("Should return false with 8h", () => {
      const date = new Date("2023-02-13 08:50:05")
      jest.useFakeTimers().setSystemTime(date)

      expect(ContactUtils.isMamanBluesAvailableHours()).toBeFalsy()
    })

    test("Should return true with 9h", () => {
      const date = new Date("2023-02-13 09:50:05")
      jest.useFakeTimers().setSystemTime(date)

      expect(ContactUtils.isMamanBluesAvailableHours()).toBeTruthy()
    })

    test("Should return true with 10h", () => {
      const date = new Date("2023-02-13 10:50:05")
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

    test("Should return false with 12h55", () => {
      const date = new Date("2023-02-13 12:55:05")
      jest.useFakeTimers().setSystemTime(date)

      expect(ContactUtils.isMamanBluesAvailableHours()).toBeFalsy()
    })

    test("Should return true with 13h01", () => {
      const date = new Date("2023-02-13 13:01:05")
      jest.useFakeTimers().setSystemTime(date)

      expect(ContactUtils.isMamanBluesAvailableHours()).toBeTruthy()
    })

    test("Should return false with 18h00", () => {
      const date = new Date("2023-02-13 18:00:05")
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
