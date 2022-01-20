import { scoreLevelForMood, scoreLevelForTexts } from "../src/utils/utils"

describe("Utils", () => {
  describe("Niveau en fonction du score total pour la jauge", () => {
    test("Le score < 9 et la question 10 = 2 donc le niveau doit être 1", () => {
      expect(scoreLevelForMood(8, 0)).toEqual(1)
    })
    test("Le score < 9 et la question 10 = 3 donc le niveau doit être 3", () => {
      expect(scoreLevelForMood(8, 3)).toEqual(3)
    })
    test("Le score = 9 et la question 10 = 2 donc le niveau doit être 2", () => {
      expect(scoreLevelForMood(9, 2)).toEqual(2)
    })
    test("Le score = 9 et la question 10 = 3 donc le niveau doit être 3", () => {
      expect(scoreLevelForMood(9, 3)).toEqual(3)
    })
    test("Le score = 12 et la question 10 = 2 donc le niveau doit être 2", () => {
      expect(scoreLevelForMood(12, 2)).toEqual(2)
    })
    test("Le score = 13 et la question 10 = 2 donc le niveau doit être 3", () => {
      expect(scoreLevelForMood(13, 2)).toEqual(3)
    })
    test("Le score = 13 et la question 10 = 3 donc le niveau doit être 3", () => {
      expect(scoreLevelForMood(13, 3)).toEqual(3)
    })
  })

  describe("Niveau en fonction du score total pour le text", () => {
    test("Le score < 9 et la question 10 = 2 donc le niveau doit être 1", () => {
      expect(scoreLevelForTexts(8, 0)).toEqual(1)
    })
    test("Le score < 9 et la question 10 = 3 donc le niveau doit être 3", () => {
      expect(scoreLevelForTexts(8, 3)).toEqual(3)
    })
    test("Le score = 9 et la question 10 = 2 donc le niveau doit être 2", () => {
      expect(scoreLevelForTexts(9, 2)).toEqual(2)
    })
    test("Le score = 9 et la question 10 = 3 donc le niveau doit être 3", () => {
      expect(scoreLevelForTexts(9, 3)).toEqual(3)
    })
    test("Le score = 10 et la question 10 = 2 donc le niveau doit être 2", () => {
      expect(scoreLevelForTexts(10, 2)).toEqual(2)
    })
    test("Le score = 11 et la question 10 = 2 donc le niveau doit être 3", () => {
      expect(scoreLevelForTexts(13, 2)).toEqual(3)
    })
    test("Le score = 11 et la question 10 = 3 donc le niveau doit être 3", () => {
      expect(scoreLevelForTexts(13, 3)).toEqual(3)
    })
  })
})
