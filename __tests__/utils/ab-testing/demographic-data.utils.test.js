import { STORAGE_TEST_ABC } from "../../../src/constants/constants"
import {
  convertArraySituationsToString,
  infoDemographicSurveyForBeforeEpds,
} from "../../../src/utils/ab-testing/demographic-data.utils"

describe("Utils", () => {
  const mockJest = jest.fn()

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

  describe("Les nouvelles valeur pour le Test B : avant le test EPDS", () => {
    test("N'est pas le test B => null", () => {
      expect(infoDemographicSurveyForBeforeEpds()).toBeNull()
    })
    test("Est le test B => les nouveaux labels", () => {
      const localStorageMock = {
        getItem: mockJest.mockImplementation((key) => {
          if (key === STORAGE_TEST_ABC) return "B"
          return null
        }),
      }
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      })

      const expected = {
        buttonLabelInBeforeSurvey: "Suivant",
        buttonLabelInInforDemigraphicSurvey:
          "Envoyer et commencer le questionnaire",
      }
      expect(infoDemographicSurveyForBeforeEpds()).toEqual(expected)
    })
  })

  describe("Les nouvelles valeur pour le Test C : après le test EPDS", () => {
  })
})
