import { STORAGE_TEST_ABC } from "../../../src/constants/constants"
import { getContactButtonLabelByTest } from "../../../src/utils/ab-testing/contact-button-label.utils"

describe("Contact button label Utils", () => {
  describe("getContactButtonLabelByTest", () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test("Should return `être contacté(e)` when test is undefined", () => {
      expect(getContactButtonLabelByTest()).toEqual("être contacté(e)")
    })

    test("Should return `être contacté(e)` when it's test A", () => {
      localStorage.setItem(STORAGE_TEST_ABC, "A")
      expect(getContactButtonLabelByTest()).toEqual("être contacté(e)")
    })

    test("Should return `Je veux être accompagné(e)` when it's test B", () => {
      localStorage.setItem(STORAGE_TEST_ABC, "B")
      expect(getContactButtonLabelByTest()).toEqual(
        "Je veux être accompagné(e)"
      )
    })

    test("Should return `Parler à Élise` when it's test C", () => {
      localStorage.setItem(STORAGE_TEST_ABC, "C")
      expect(getContactButtonLabelByTest()).toEqual("Parler à Élise")
    })
  })
})
