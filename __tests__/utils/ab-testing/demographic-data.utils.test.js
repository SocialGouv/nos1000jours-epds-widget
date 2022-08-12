import { convertArraySituationsToString } from "../../../src/utils/ab-testing/demographic-data.utils"

describe("Utils", () => {
  describe("Convertir unu array de situation en String", () => {
    test("Plusieurs réponses de séléctionnées", () => {
      const situations = [
        {
          id: "avezEnfantDeMoinsDe2ans",
          text: "Vous avez un enfant de moins de 2 ans",
          isChecked: true,
        },
        {
          id: "avezDesEnfantsDePlusDe2ans",
          text: "Vous avez un ou plusieurs enfant de plus de 2 ans",
          isChecked: true,
        },
      ]
      const expected =
        "Vous avez un enfant de moins de 2 ans / Vous avez un ou plusieurs enfant de plus de 2 ans"

      expect(convertArraySituationsToString(situations)).toEqual(expected)
    })
    test("Une réponse de séléctionnée", () => {
      const situations = [
        {
          id: "avezEnfantDeMoinsDe2ans",
          text: "Vous avez un enfant de moins de 2 ans",
          isChecked: true,
        },
      ]
      const expected = "Vous avez un enfant de moins de 2 ans"

      expect(convertArraySituationsToString(situations)).toEqual(expected)
    })
  })
})
