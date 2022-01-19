import { scoreLevel } from "../src/utils/utils"

describe("Utils", () => {
  describe("Niveau en fonction du score total", () => {
    test("Le score < 9 et la question 10 = 2 donc le niveau doit être 1", () => {
      expect(scoreLevel(8, 0)).toEqual(1)
    })
    test("Le score < 9 et la question 10 = 3 donc le niveau doit être 3", () => {
      expect(scoreLevel(8, 3)).toEqual(3)
    })
    test("Le score = 9 et la question 10 = 2 donc le niveau doit être 2", () => {
      expect(scoreLevel(9, 2)).toEqual(2)
    })
    test("Le score = 9 et la question 10 = 3 donc le niveau doit être 3", () => {
      expect(scoreLevel(9, 3)).toEqual(3)
    })
    test("Le score = 12 et la question 10 = 2 donc le niveau doit être 2", () => {
      expect(scoreLevel(12, 2)).toEqual(2)
    })
    test("Le score = 13 et la question 10 = 2 donc le niveau doit être 3", () => {
      expect(scoreLevel(13, 2)).toEqual(3)
    })
    test("Le score = 13 et la question 10 = 3 donc le niveau doit être 3", () => {
      expect(scoreLevel(13, 3)).toEqual(3)
    })
  })
})
