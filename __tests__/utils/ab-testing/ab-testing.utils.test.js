import {
  STORAGE_SOURCE,
  STORAGE_TEST_ABC,
} from "../../../src/constants/constants"
import * as AbTestingUtils from "../../../src/utils/ab-testing/ab-testing.utils"
import * as TrackerUtils from "../../../src/utils/tracker.utils"

describe("Utils", () => {
  const mockJest = jest.fn()

  describe("Générer un numéro de test A/B/C", () => {
    test("Générer un A ou B ou C", () => {
      const mGetRandomValues = mockJest.mockReturnValueOnce(new Uint16Array(1))
      Object.defineProperty(window, "crypto", {
        value: { getRandomValues: mGetRandomValues },
      })

      expect(["A", "B", "C"]).toContain(AbTestingUtils.generateRandomTest())
      expect(mGetRandomValues).toBeCalledWith(new Uint16Array(1))
    })
  })

  describe("trackerForAbTesting", () => {
    let trackerSpy

    beforeEach(() => {
      trackerSpy = jest.spyOn(TrackerUtils, "track")
    })

    test("Should return tracker with CATEG.test, course name and label", () => {
      localStorage.setItem(STORAGE_TEST_ABC, "A")
      localStorage.setItem(STORAGE_SOURCE, "1000-premiers-jours")

      AbTestingUtils.trackerForAbTesting("my label")
      expect(trackerSpy).toHaveBeenCalledWith(
        TrackerUtils.CATEG.test,
        `${TrackerUtils.ACTION.parcours}A`,
        "my label - 1000-premiers-jours"
      )
    })
  })
})
