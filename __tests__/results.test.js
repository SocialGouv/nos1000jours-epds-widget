import {
  conclusionByScoreLevel,
  descriptionByScoreLevel,
  showContactMamanBlues,
} from "../pages/results"
import { EpdsResultsComments } from "../src/constants/specificLabels"
import { TEST } from "../src/utils/measuring-intentions.utils"
import {
  SCORE_LEVEL_BAD,
  SCORE_LEVEL_GOOD,
  SCORE_LEVEL_MEDIUM,
} from "../src/utils/score-level.utils"

describe("Résultats", () => {
  describe("Description en fonction du level", () => {
    test("Description level 1", () => {
      expect(descriptionByScoreLevel(1)).toEqual(
        EpdsResultsComments.level1.description
      )
    })
    test("Description level 2", () => {
      expect(descriptionByScoreLevel(2)).toEqual(
        EpdsResultsComments.level2.description
      )
    })
    test("Description level 3", () => {
      expect(descriptionByScoreLevel(3)).toEqual(
        EpdsResultsComments.level3.description
      )
    })
  })

  describe("Conclusion ption en fonction du level", () => {
    test("Conclusion level 1", () => {
      expect(conclusionByScoreLevel(1)).toEqual(
        "Nous vous invitons à vous questionner de nouveau dans les 14 jours."
      )
    })
    test("Conclusion level 2", () => {
      expect(conclusionByScoreLevel(2)).toEqual("")
    })
    test("Conclusion level 3", () => {
      expect(conclusionByScoreLevel(3)).toEqual("")
    })
  })

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
