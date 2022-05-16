import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { displayComponentsByTest } from "../../../src/components/results/MeasuringIntentions"

describe("MeasuringIntentions", () => {
  describe("Reponse EPDS : Je vais bien", () => {
    test("Test A => aucun retour", async () => {
      expect(displayComponentsByTest({ testId: "A", scoreLevel: 3 })).toBeNull()
    })

    describe("Test B", () => {
      let yesButton, noButton, maybeButton

      beforeEach(() => {
        render(displayComponentsByTest({ testId: "B", scoreLevel: 3 }))

        yesButton = screen.getByRole("button", { name: "Oui" })
        noButton = screen.getByRole("button", { name: "Non" })
        maybeButton = screen.getByRole("button", {
          name: "Je ne suis pas sûr(e)",
        })
      })

      test("Réponse : Oui => affichage du portrait", async () => {
        // Buttons
        expect(yesButton).toBeInTheDocument()
        expect(noButton).toBeInTheDocument()
        expect(maybeButton).toBeInTheDocument()

        // Action
        fireEvent.click(yesButton)

        // Phrase spécifique
        expect(
          await screen.findByText(
            "Vous allez bien, n'hésitez pas à revenir plus tard et vous questionner régulièrement. Sachez qu'Elise peut répondre à vos questions si vous en avez besoin."
          )
        ).toBeVisible()
        // Bloc Elise
        expect(
          screen.getByRole("img", { name: "Portrait d'Elise" })
        ).toBeInTheDocument()
        expect(
          screen.getByRole("button", { name: "être contacté(e)" })
        ).toBeInTheDocument()
      })

      test("Réponse : Je ne suis pas sûr(e) => affichage du portrait", async () => {
        // Buttons
        expect(yesButton).toBeInTheDocument()
        expect(noButton).toBeInTheDocument()
        expect(maybeButton).toBeInTheDocument()

        // Action
        fireEvent.click(maybeButton)

        // Phrase spécifique
        expect(
          await screen.findByText(
            "Ne pas savoir est tout à fait normal. Elise peut vous écouter et vous aider à mieux comprendre ce qu'il se passe."
          )
        ).toBeVisible()
        // Bloc Elise
        expect(
          screen.getByRole("img", { name: "Portrait d'Elise" })
        ).toBeInTheDocument()
        expect(
          screen.getByRole("button", { name: "être contacté(e)" })
        ).toBeInTheDocument()
      })

      test("Réponse : Non => ", async () => {
        // Buttons
        expect(yesButton).toBeInTheDocument()
        expect(noButton).toBeInTheDocument()
        expect(maybeButton).toBeInTheDocument()

        // Action
        fireEvent.click(noButton)

        // Phrase spécifique
        expect(
          await screen.findByText(
            "Précisez nous ce qui rapprocherait le plus de la réalité"
          )
        ).toBeVisible()
        // Bloc Elise
        expect(
          screen.queryByRole("img", { name: "Portrait d'Elise" })
        ).toBeNull()
      })
    })

    test("Test C => ", async () => {
      expect(
        displayComponentsByTest({ testId: "C", scoreLevel: 3 })
      ).not.toBeNull()
    })
  })
})
