import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { displayComponentsByTest } from "../../../src/components/results/intentions/MeasuringIntentions"

describe("MeasuringIntentions", () => {
  describe("Reponse EPDS : Je vais bien", () => {
    test("Test A => aucun retour", async () => {
      expect(displayComponentsByTest({ testId: "A", scoreLevel: 1 })).toBeNull()
    })

    describe("Test B", () => {
      let yesButton, noButton, maybeButton

      beforeEach(() => {
        render(displayComponentsByTest({ testId: "B", scoreLevel: 1 }))

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
        expect(yesButton).not.toBeInTheDocument()
        expect(await screen.findByText("Oui")).toBeVisible()
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
        expect(maybeButton).not.toBeInTheDocument()
        expect(await screen.findByText("Je ne suis pas sûr(e)")).toBeVisible()
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

      describe("Réponse : Non", () => {
        test("Affichage de la nouvelle question", async () => {
          // Buttons
          expect(yesButton).toBeInTheDocument()
          expect(noButton).toBeInTheDocument()
          expect(maybeButton).toBeInTheDocument()

          // Action
          fireEvent.click(noButton)

          // Phrase spécifique
          expect(noButton).not.toBeInTheDocument()
          expect(await screen.findByText("Non")).toBeVisible()
          expect(
            await screen.findByText(
              "Précisez nous ce qui rapprocherait le plus de la réalité"
            )
          ).toBeVisible()
          expect(
            await screen.getByRole("button", {
              name: "Malgré le résultat, je n'ai pas l'impression d'aller bien",
            })
          ).toBeInTheDocument()
          expect(
            await screen.getByRole("button", {
              name: "Autre chose : nous le dire",
            })
          ).toBeInTheDocument()

          // Bloc Elise
          expect(
            screen.queryByRole("img", { name: "Portrait d'Elise" })
          ).toBeNull()
        })

        test("Réponse : je ne vais pas bien => affichage du portrait", async () => {
          fireEvent.click(noButton)

          // Nouvelle question
          const badButton = screen.getByRole("button", {
            name: "Malgré le résultat, je n'ai pas l'impression d'aller bien",
          })
          const otherButton = screen.getByRole("button", {
            name: "Autre chose : nous le dire",
          })
          expect(badButton).toBeInTheDocument()
          expect(otherButton).toBeInTheDocument()

          // Action
          fireEvent.click(badButton)

          // Phrase spécifique
          expect(badButton).not.toBeInTheDocument()
          expect(
            await screen.findByText(
              "Malgré le résultat, je n'ai pas l'impression d'aller bien"
            )
          ).toBeVisible()
          expect(
            await screen.findByText(
              "Nous vous conseillons de vous entretenir avec Elise. Elle saura vous apporter conseil."
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

        test("Réponse : autre chose => affichage textarea", async () => {
          fireEvent.click(noButton)

          // Nouvelle question
          const badButton = screen.getByRole("button", {
            name: "Malgré le résultat, je n'ai pas l'impression d'aller bien",
          })
          const otherButton = screen.getByRole("button", {
            name: "Autre chose : nous le dire",
          })
          expect(badButton).toBeInTheDocument()
          expect(otherButton).toBeInTheDocument()

          // Action
          fireEvent.click(otherButton)

          // Phrase spécifique
          expect(otherButton).not.toBeInTheDocument()
          expect(
            await screen.findByText("Autre chose : nous le dire")
          ).toBeVisible()
          expect(
            await screen.findByText(
              "Expliquez-nous pourquoi vous êtes venu.es passer le test."
            )
          ).toBeVisible()
          expect(
            screen.getByRole("textbox", {
              name: "textValueOther",
            })
          ).toBeInTheDocument()

          // Bloc Elise
          expect(
            screen.queryByRole("img", { name: "Portrait d'Elise" })
          ).toBeNull()
        })
      })
    })

    describe("Test C", () => {
      let yesButton, noButton, maybeButton

      beforeEach(() => {
        render(displayComponentsByTest({ testId: "C", scoreLevel: 1 }))

        yesButton = screen.getByRole("button", { name: "Oui" })
        noButton = screen.getByRole("button", { name: "Non" })
        maybeButton = screen.getByRole("button", {
          name: "Je ne suis pas sûr(e)",
        })

        // Bloc Elise
        expect(
          screen.getByRole("img", { name: "Portrait d'Elise" })
        ).toBeInTheDocument()
        expect(
          screen.getByRole("button", { name: "être contacté(e)" })
        ).toBeInTheDocument()
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
      })

      describe("Réponse : Non", () => {
        test("Affichage de la nouvelle question", async () => {
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
          expect(
            await screen.getByRole("button", {
              name: "Malgré le résultat, je n'ai pas l'impression d'aller bien",
            })
          ).toBeInTheDocument()
          expect(
            await screen.getByRole("button", {
              name: "Autre chose : nous le dire",
            })
          ).toBeInTheDocument()
        })

        test("Réponse : je ne vais pas bien => affichage du portrait", async () => {
          fireEvent.click(noButton)

          // Nouvelle question
          const badButton = screen.getByRole("button", {
            name: "Malgré le résultat, je n'ai pas l'impression d'aller bien",
          })
          const otherButton = screen.getByRole("button", {
            name: "Autre chose : nous le dire",
          })
          expect(badButton).toBeInTheDocument()
          expect(otherButton).toBeInTheDocument()

          // Action
          fireEvent.click(badButton)

          // Phrase spécifique
          expect(
            await screen.findByText(
              "Nous vous conseillons de vous entretenir avec Elise. Elle saura vous apporter conseil."
            )
          ).toBeVisible()
        })

        test("Réponse : autre chose => affichage textarea", async () => {
          fireEvent.click(noButton)

          // Nouvelle question
          const badButton = screen.getByRole("button", {
            name: "Malgré le résultat, je n'ai pas l'impression d'aller bien",
          })
          const otherButton = screen.getByRole("button", {
            name: "Autre chose : nous le dire",
          })
          expect(badButton).toBeInTheDocument()
          expect(otherButton).toBeInTheDocument()

          // Action
          fireEvent.click(otherButton)

          // Phrase spécifique
          expect(
            await screen.findByText(
              "Expliquez-nous pourquoi vous êtes venu.es passer le test."
            )
          ).toBeVisible()
          expect(
            screen.getByRole("textbox", {
              name: "textValueOther",
            })
          ).toBeInTheDocument()
        })
      })
    })
  })
})
