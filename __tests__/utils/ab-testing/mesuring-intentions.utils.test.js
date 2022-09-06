import { TEST } from "../../../src/utils/ab-testing/ab-testing.utils"
import { showContactMamanBlues } from "../../../src/utils/ab-testing/measuring-intentions.utils"
import {
  SCORE_LEVEL_BAD,
  SCORE_LEVEL_GOOD,
  SCORE_LEVEL_MEDIUM,
} from "../../../src/utils/score-level.utils"

describe("Utils", () => {
  describe("Affichage du bloc de contact Maman Blues", () => {
    test("SCORE_LEVEL_GOOD et TEST.A => non visible", () => {
      const result = showContactMamanBlues(SCORE_LEVEL_GOOD, TEST.A)
      expect(result).toEqual(false)
    })
    test("SCORE_LEVEL_GOOD et TEST.B => non visible", () => {
      const result = showContactMamanBlues(SCORE_LEVEL_GOOD, TEST.B)
      expect(result).toEqual(false)
    })
    test("SCORE_LEVEL_GOOD et TEST.C => visible", () => {
      const result = showContactMamanBlues(SCORE_LEVEL_GOOD, TEST.C)
      expect(result).toEqual(true)
    })
    test("SCORE_LEVEL_MEDIUM et TEST.A => visible", () => {
      const result = showContactMamanBlues(SCORE_LEVEL_MEDIUM, TEST.A)
      expect(result).toEqual(true)
    })
    test("SCORE_LEVEL_MEDIUM et TEST.B => non visible", () => {
      const result = showContactMamanBlues(SCORE_LEVEL_MEDIUM, TEST.B)
      expect(result).toEqual(false)
    })
    test("SCORE_LEVEL_MEDIUM et TEST.C => visible", () => {
      const result = showContactMamanBlues(SCORE_LEVEL_MEDIUM, TEST.C)
      expect(result).toEqual(true)
    })
    test("SCORE_LEVEL_BAD et TEST.A => visible", () => {
      const result = showContactMamanBlues(SCORE_LEVEL_BAD, TEST.A)
      expect(result).toEqual(true)
    })
    test("SCORE_LEVEL_BAD et TEST.B => non visible", () => {
      const result = showContactMamanBlues(SCORE_LEVEL_BAD, TEST.B)
      expect(result).toEqual(false)
    })
    test("SCORE_LEVEL_BAD et TEST.C => visible", () => {
      const result = showContactMamanBlues(SCORE_LEVEL_BAD, TEST.C)
      expect(result).toEqual(true)
    })
  })
})
