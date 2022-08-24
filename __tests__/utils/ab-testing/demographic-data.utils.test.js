import { STORAGE_TEST_ABC } from "../../../src/constants/constants"
import {
  convertArraySituationsToString,
  uiAdaptationForInfoDemographic,
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

  describe("Les nouvelles valeur pour le Tests B/C", () => {
    test("N'est pas le test B => null", () => {
      expect(uiAdaptationForInfoDemographic()).toBeNull()
    })
    test("Est le test B : avant le test EPDS => les nouveaux labels", () => {
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
        isBeforeEpds: true,
        buttonLabelInBeforeSurvey: "Suivant",
        buttonLabelInInfoDemographicSurvey:
          "Envoyer et commencer le questionnaire",
      }
      expect(uiAdaptationForInfoDemographic()).toEqual(expected)
    })
    test("Est le test C : après le test EPDS => les nouveaux labels", () => {
      const localStorageMock = {
        getItem: mockJest.mockImplementation((key) => {
          if (key === STORAGE_TEST_ABC) return "C"
          return null
        }),
      }
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      })

      const expected = {
        isAfterEpds: true,
        buttonLabelInInfoDemographicSurvey:
          "Envoyer et afficher le résultat du questionnaire",
      }
      expect(uiAdaptationForInfoDemographic()).toEqual(expected)
    })
  })
})
