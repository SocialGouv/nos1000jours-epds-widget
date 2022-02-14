import {
  conclusionByScoreLevel,
  descriptionByScoreLevel,
} from "../pages/results"
import { EpdsResultsComments } from "../src/constants/specificLabels"

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
})
