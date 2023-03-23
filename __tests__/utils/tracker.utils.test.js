import { STORAGE_CONTACT_TYPE } from "../../src/constants/constants"
import * as TrackerUtils from "../../src/utils/tracker.utils"

describe("Trackers utils", () => {
  describe("Should return tracker for every category", () => {
    let trackerSpy

    beforeEach(() => {
      trackerSpy = jest.spyOn(TrackerUtils, "track")
    })

    test("Should return tracker with demographic category", () => {
      TrackerUtils.track(
        TrackerUtils.CATEG.demography,
        TrackerUtils.ACTION.end_demo
      )
      expect(trackerSpy).toHaveBeenCalledWith(
        "Démographie",
        "Terminer le formulaire démographique"
      )
    })
    test("Should return tracker with survey category", () => {
      TrackerUtils.track(
        TrackerUtils.CATEG.survey,
        TrackerUtils.ACTION.end_survey
      )
      expect(trackerSpy).toHaveBeenCalledWith(
        "Questionnaire",
        "Terminer le questionnaire"
      )
    })
    test("Should return tracker with results category", () => {
      const score = 11
      TrackerUtils.track(
        TrackerUtils.CATEG.results,
        TrackerUtils.seuilScore(score)
      )
      expect(trackerSpy).toHaveBeenCalledWith("Résultat", "score >= 11")
    })
    test("Should return tracker with intentions category", () => {
      TrackerUtils.track(
        TrackerUtils.CATEG.intentions,
        TrackerUtils.ACTION.download
      )
      expect(trackerSpy).toHaveBeenCalledWith(
        "Intentions",
        "Télécharger mes réponses"
      )
    })
    test("Should return tracker with contacts category", () => {
      localStorage.setItem(STORAGE_CONTACT_TYPE, "sms")
      const typeContact = localStorage.getItem(STORAGE_CONTACT_TYPE)
      TrackerUtils.track(TrackerUtils.CATEG.contact, `Choix ${typeContact}`)
      expect(trackerSpy).toHaveBeenCalledWith("Contact", "Choix sms")
    })
  })
  describe("Should return good value for seuil score", () => {
    test("Should return score < 9 if score from EPDS is <9", () => {
      const score = 4
      const score2 = 9
      expect(TrackerUtils.seuilScore(score)).toEqual("score < 9")
      expect(TrackerUtils.seuilScore(score2)).toEqual("9 >= score < 11")
    })
    test("Should return 9 >= score < 11 if score from EPDS is between 9 & 11", () => {
      const score = 9
      const score2 = 11
      expect(TrackerUtils.seuilScore(score)).toEqual("9 >= score < 11")
      expect(TrackerUtils.seuilScore(score2)).toEqual("score >= 11")
    })
    test("Should return score >= 11 if score from EPDS is >11", () => {
      const score = 26
      expect(TrackerUtils.seuilScore(score)).toEqual("score >= 11")
    })
  })
})
