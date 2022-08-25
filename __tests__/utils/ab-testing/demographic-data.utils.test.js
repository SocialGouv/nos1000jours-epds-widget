import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { act } from "react-dom/test-utils"
import BeforeSurvey from "../../../pages/survey/before-survey"
import { STORAGE_TEST_ABC } from "../../../src/constants/constants"
import {
  convertArraySituationsToString,
  uiAdaptationForInfoDemographic,
} from "../../../src/utils/ab-testing/demographic-data.utils"
import { useRouter } from "next/router"
import DemographicDataSurvey from "../../../pages/ab-testing/demographic-data-survey"

describe("Utils", () => {
  const mockJest = jest.fn()

  const mockLocalStorageForTest = (testID) => {
    const localStorageMock = {
      getItem: mockJest.mockImplementation((key) => {
        if (key === STORAGE_TEST_ABC) return testID
        return null
      }),
    }
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    })
  }

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

  describe("Les nouvelles valeurs pour le Tests B/C", () => {
    test("N'est pas le test B => null", () => {
      expect(uiAdaptationForInfoDemographic()).toBeNull()
    })
    test("Est le test B : avant le test EPDS => les nouveaux labels", () => {
      mockLocalStorageForTest("B")

      const expected = {
        isBeforeEpds: true,
        buttonLabelInBeforeSurvey: "Suivant",
        buttonLabelInInfoDemographicSurvey:
          "Envoyer et commencer le questionnaire",
      }
      expect(uiAdaptationForInfoDemographic()).toEqual(expected)
    })
    test("Est le test C : après le test EPDS => les nouveaux labels", () => {
      mockLocalStorageForTest("C")

      const expected = {
        isAfterEpds: true,
        buttonLabelInInfoDemographicSurvey:
          "Envoyer et afficher le résultat du questionnaire",
      }
      expect(uiAdaptationForInfoDemographic()).toEqual(expected)
    })
  })

  describe("UI pour l'affichage de questionnaire démographique", () => {
    const router = useRouter()

    const epdsSurveyPath = "/survey/epds-survey"
    const resultsPath = "/results"
    const demographicSurveyPath = "/ab-testing/demographic-data-survey"

    describe("Ecran pré questionnaire EPDS", () => {
      test("Test A", async () => {
        mockLocalStorageForTest("A")
        await act(async () => render(<BeforeSurvey />))

        const nextButton = screen.getByRole("button", {
          name: "Commencer le questionnaire",
        })

        expect(nextButton).toBeInTheDocument()
        fireEvent.click(nextButton)
        expect(router.push).toHaveBeenCalledWith({
          pathname: epdsSurveyPath,
        })
      })

      describe("Test B", () => {

        beforeAll(() => mockLocalStorageForTest("B"))

        test("Rentrer dans le questionnaire", async () => {
          await act(async () => render(<BeforeSurvey />))

          const nextButton = screen.getByRole("button", { name: "Suivant" })

          expect(nextButton).toBeInTheDocument()
          fireEvent.click(nextButton)
          expect(router.push).toHaveBeenCalledWith({
            pathname: demographicSurveyPath,
          })
        })
        test("Sortir du questionnaire", async () => {
          await act(async () => render(<DemographicDataSurvey />))

          const nextButton = screen.getByRole("button", {
            name: "Envoyer et commencer le questionnaire",
          })

          expect(nextButton).toBeInTheDocument()
          fireEvent.click(nextButton)
          expect(router.push).toHaveBeenCalledWith({
            pathname: epdsSurveyPath,
          })
        })
      })

      test("Test C", async () => {
        mockLocalStorageForTest("C")
        await act(async () => render(<BeforeSurvey />))

        const nextButton = screen.getByRole("button", {
          name: "Commencer le questionnaire",
        })

        expect(nextButton).toBeInTheDocument()
        fireEvent.click(nextButton)
        expect(router.push).toHaveBeenCalledWith({
          pathname: epdsSurveyPath,
        })
      })
    })

    describe("Ecran post questionnaire EPDS", () => {
      test("Test C", async () => {
        mockLocalStorageForTest("C")
        await act(async () => render(<DemographicDataSurvey />))

        const nextButton = screen.getByRole("button", {
          name: "Envoyer et afficher le résultat du questionnaire",
        })

        expect(nextButton).toBeInTheDocument()
        fireEvent.click(nextButton)
        // expect(router.push).toHaveBeenCalledWith({
        //   pathname: resultsPath,
        // })
      })
    })
  })
})
