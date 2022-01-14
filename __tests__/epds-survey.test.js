import { checkQuestionsOrder } from "../pages/epds-survey"

describe("Questionnaire", () => {
  describe("Vérification de l'ordre des questions", () => {
    const questionsEpdsValid = [
      { ordre: 1 },
      { ordre: 2 },
      { ordre: 3 },
      { ordre: 4 },
      { ordre: 5 },
      { ordre: 6 },
      { ordre: 7 },
      { ordre: 8 },
      { ordre: 9 },
      { ordre: 10 },
    ]

    test("Les questions ne changent pas d'ordre", () => {
      const questionsEpds = [
        { ordre: 1 },
        { ordre: 2 },
        { ordre: 3 },
        { ordre: 4 },
        { ordre: 5 },
        { ordre: 6 },
        { ordre: 7 },
        { ordre: 8 },
        { ordre: 9 },
        { ordre: 10 },
      ]

      expect(checkQuestionsOrder(questionsEpds)).toEqual(questionsEpdsValid)
    })

    test("Les questions sont mises dans le bon ordre", () => {
      const questionsEpds = [
        { ordre: 1 },
        { ordre: 2 },
        { ordre: 7 },
        { ordre: 4 },
        { ordre: 6 },
        { ordre: 5 },
        { ordre: 3 },
        { ordre: 8 },
        { ordre: 10 },
        { ordre: 9 },
      ]

      expect(checkQuestionsOrder(questionsEpds)).toEqual(questionsEpdsValid)
    })
  })
})
