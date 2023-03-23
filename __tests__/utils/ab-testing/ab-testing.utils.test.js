import { STORAGE_TEST_ABC } from "../../../src/constants/constants"
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

    test("Should return tracker with test A for test A", () => {
      localStorage.setItem(STORAGE_TEST_ABC, "A")

      AbTestingUtils.trackerForAbTesting("test A")
      expect(trackerSpy).toHaveBeenCalledWith("Test_A", "test A")
    })
    test("Should return tracker with B test for test B", () => {
      localStorage.setItem(STORAGE_TEST_ABC, "B")

      AbTestingUtils.trackerForAbTesting("B test")
      expect(trackerSpy).toHaveBeenCalledWith("Test_B", "B test")
    })
    test("Should return tracker with C super test for test C", () => {
      localStorage.setItem(STORAGE_TEST_ABC, "C")

      AbTestingUtils.trackerForAbTesting("C super test")
      expect(trackerSpy).toHaveBeenCalledWith("Test_C", "C super test")
    })
  })
})
