import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { displayComponentsByTest } from "../../../src/components/results/intentions/MeasuringIntentions"
import {
  SCORE_LEVEL_BAD,
  SCORE_LEVEL_GOOD,
} from "../../../src/utils/score-level.utils"

describe("UI de MeasuringIntentions", () => {
  // Bloc Elise
  const mamanBluesBlocToBeInTheDocument = () => {
    expect(
      screen.getByRole("img", { name: "Portrait d'Elise" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "être contacté(e)" })
    ).toBeInTheDocument()
  }

  describe("Reponse EPDS : Je vais bien", () => {
    test("Test A => aucun retour", async () => {
      expect(
        displayComponentsByTest({ testId: "A", scoreLevel: SCORE_LEVEL_GOOD })
      ).toBeNull()

      expect(screen.queryByRole("button", { name: "Retour" })).toBeNull()
    })

    describe("Test B", () => {
      let yesButton, noButton, maybeButton

      beforeEach(() => {
        render(
          displayComponentsByTest({ testId: "B", scoreLevel: SCORE_LEVEL_GOOD })
        )

        yesButton = screen.getByRole("button", { name: "Oui" })
        noButton = screen.getByRole("button", { name: "Non" })
        maybeButton = screen.getByRole("button", {
          name: "Je ne suis pas sûr(e)",
        })

        // Buttons
        expect(yesButton).toBeInTheDocument()
        expect(noButton).toBeInTheDocument()
        expect(maybeButton).toBeInTheDocument()
        expect(
          screen.getByRole("button", { name: "Retour" })
        ).toBeInTheDocument()
      })

      test("Réponse : Oui => affichage du portrait", async () => {
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
        mamanBluesBlocToBeInTheDocument()
      })

      test("Réponse : Je ne suis pas sûr(e) => affichage du portrait", async () => {
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
        mamanBluesBlocToBeInTheDocument()
      })

      describe("Réponse : Non", () => {
        test("Affichage de la nouvelle question", async () => {
          // Action
          fireEvent.click(noButton)

          // Phrase spécifique
          expect(noButton).not.toBeInTheDocument()
          expect(await screen.findByText("Non")).toBeVisible()
          expect(
            await screen.findByText(
              "Précisez nous ce qui se rapprocherait le plus de la réalité"
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
          // Action
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
          mamanBluesBlocToBeInTheDocument()
        })

        test("Réponse : autre chose => affichage textarea", async () => {
          // Action
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
        render(
          displayComponentsByTest({ testId: "C", scoreLevel: SCORE_LEVEL_GOOD })
        )

        yesButton = screen.getByRole("button", { name: "Oui" })
        noButton = screen.getByRole("button", { name: "Non" })
        maybeButton = screen.getByRole("button", {
          name: "Je ne suis pas sûr(e)",
        })

        // Buttons
        expect(yesButton).toBeInTheDocument()
        expect(noButton).toBeInTheDocument()
        expect(maybeButton).toBeInTheDocument()
        expect(
          screen.getByRole("button", { name: "Retour" })
        ).toBeInTheDocument()
      })

      afterEach(() => {
        // Bloc Elise
        expect(
          screen.queryByRole("img", { name: "Portrait d'Elise" })
        ).toBeNull()
      })

      test("Réponse : Oui => affichage du portrait", async () => {
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
          // Action
          fireEvent.click(noButton)

          // Phrase spécifique
          expect(
            await screen.findByText(
              "Précisez nous ce qui se rapprocherait le plus de la réalité"
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
          // Action
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
          // Action
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

  describe("Reponse EPDS : Je ne vais pas bien", () => {
    test("Test A => affichage portrait", async () => {
      expect(
        displayComponentsByTest({ testId: "A", scoreLevel: SCORE_LEVEL_BAD })
      ).toBeNull()

      expect(screen.queryByRole("button", { name: "Retour" })).toBeNull()
      // On ne peut pas vérifier si le bloc de contact est présent car il est hors du bloc généré par `displayComponentsByTest`
    })

    describe("Test B", () => {
      let yesButton, noButton, maybeButton

      beforeEach(() => {
        render(
          displayComponentsByTest({
            testId: "B",
            scoreLevel: SCORE_LEVEL_BAD,
          })
        )

        yesButton = screen.getByRole("button", { name: "Oui" })
        noButton = screen.getByRole("button", { name: "Non" })
        maybeButton = screen.getByRole("button", {
          name: "Je ne suis pas sûr(e)",
        })

        // Buttons
        expect(yesButton).toBeInTheDocument()
        expect(noButton).toBeInTheDocument()
        expect(maybeButton).toBeInTheDocument()
        expect(
          screen.getByRole("button", { name: "Retour" })
        ).toBeInTheDocument()
      })

      describe("Réponse : Oui", () => {
        test("Affichage de la nouvelle question + réponses", async () => {
          // Action
          fireEvent.click(yesButton)

          // Phrase spécifique
          expect(yesButton).not.toBeInTheDocument()
          expect(await screen.findByText("Oui")).toBeVisible()

          expect(
            await screen.findByText(
              "Nous vous conseillons de prendre une de ces actions pour être accompagné(e). Qu'est-ce qui vous semble le plus adapté pour vous ?"
            )
          ).toBeVisible()

          // Nouveaux boutons
          expect(
            await screen.getByRole("button", {
              name: "Je sais qui joindre : je vais contacter mon professionnel de santé et parler du résultat du test",
            })
          ).toBeInTheDocument()
          expect(
            await screen.getByRole("button", {
              name: "Je sais quoi faire : je montre le résultat de ce test à mon entourage",
            })
          ).toBeInTheDocument()
          expect(
            await screen.getByRole("button", {
              name: "Je ne sais pas vers qui me tourner : je rentre en contact avec Elise",
            })
          ).toBeInTheDocument()
          expect(
            await screen.getByRole("button", {
              name: "Aucune des trois : je vous explique",
            })
          ).toBeInTheDocument()

          // Bloc Elise
          expect(
            screen.queryByRole("img", { name: "Portrait d'Elise" })
          ).toBeNull()
        })

        describe("Réponses spécifiques", () => {
          let quiJoindre, quoiFaire, seTourner, aucune

          beforeEach(() => {
            // Action
            fireEvent.click(yesButton)

            quiJoindre = screen.getByRole("button", {
              name: "Je sais qui joindre : je vais contacter mon professionnel de santé et parler du résultat du test",
            })
            quoiFaire = screen.getByRole("button", {
              name: "Je sais quoi faire : je montre le résultat de ce test à mon entourage",
            })
            seTourner = screen.getByRole("button", {
              name: "Je ne sais pas vers qui me tourner : je rentre en contact avec Elise",
            })
            aucune = screen.getByRole("button", {
              name: "Aucune des trois : je vous explique",
            })
          })

          afterEach(() => {
            // Bloc Elise
            mamanBluesBlocToBeInTheDocument()
          })

          test("Réponse : Je sais qui joindre => formulaire", async () => {
            // Action
            fireEvent.click(quiJoindre)

            // Phrases spécifiques
            expect(
              await screen.findByText(
                "Je sais qui joindre : je vais contacter mon professionnel de santé et parler du résultat du test"
              )
            ).toBeVisible()
            expect(
              await screen.findByText(
                "C'est une bonne étape, vous pouvez tout de même parler à Elise. Elle est présente pour vous écouter, vous conseiller, vous orienter."
              )
            ).toBeVisible()

            // Formaulaire
            expect(
              await screen.findByText(
                "Recevez votre résultat au questionnaire par mail pour le partager à votre professionnel de santé :"
              )
            ).toBeVisible()
            expect(
              screen.getByRole("form", {
                name: "formToSendMail",
              })
            ).toBeInTheDocument()
            expect(await screen.findByText("Votre mail * :")).toBeVisible()
          })

          test("Réponse : Je sais quoi faire => formulaire", async () => {
            // Action
            fireEvent.click(quoiFaire)

            // Phrases spécifiques
            expect(
              await screen.findByText(
                "Je sais quoi faire : je montre le résultat de ce test à mon entourage"
              )
            ).toBeVisible()
            expect(
              await screen.findByText(
                "C'est une bonne étape, vous pouvez tout de même parler à Elise. Elle est présente pour vous écouter, vous conseiller, vous orienter."
              )
            ).toBeVisible()

            // Formaulaire
            expect(
              await screen.queryByText(
                "Recevez votre résultat au questionnaire par mail pour le partager à votre professionnel de santé :"
              )
            ).toBeNull()
            expect(
              screen.getByRole("form", {
                name: "formToSendMail",
              })
            ).toBeInTheDocument()
            expect(
              await screen.findByText("L'email de votre proche * :")
            ).toBeVisible()
          })

          test("Réponse : Je ne sais pas vers qui me tourner => texte", async () => {
            // Action
            fireEvent.click(seTourner)

            expect(
              await screen.findByText(
                "Je ne sais pas vers qui me tourner : je rentre en contact avec Elise"
              )
            ).toBeVisible()
          })

          test("Réponse : Aucune des trois : je vous explique => textarea", async () => {
            // Action
            fireEvent.click(aucune)

            // Phrases spécifiques
            expect(
              await screen.findByText("Aucune des trois : je vous explique")
            ).toBeVisible()
            expect(
              await screen.findByText(
                "Avec vos mots expliquez-nous ce qui serait le plus adapté pour vous :"
              )
            ).toBeVisible()
            expect(
              await screen.findByText(
                "C'est une bonne étape, vous pouvez tout de même parler à Elise. Elle est présente pour vous écouter, vous conseiller, vous orienter."
              )
            ).toBeVisible()

            // Text Area
            expect(
              screen.getByRole("textbox", {
                name: "textValueOther",
              })
            ).toBeInTheDocument()
          })
        })
      })

      test("Réponse : Je ne suis pas sûr(e) => affichage du portrait", async () => {
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
        mamanBluesBlocToBeInTheDocument()
      })

      describe("Réponse : Non", () => {
        test("Affichage de la nouvelle question & réponses", async () => {
          // Action
          fireEvent.click(noButton)

          // Phrase spécifique
          expect(noButton).not.toBeInTheDocument()
          expect(await screen.findByText("Non")).toBeVisible()

          expect(
            await screen.findByText(
              "Précisez nous ce qui se rapprocherait le plus de la réalité"
            )
          ).toBeVisible()

          // Nouveaux boutons
          expect(
            await screen.getByRole("button", {
              name: "Malgré le résultat, je l'impression que tout va bien",
            })
          ).toBeInTheDocument()
          expect(
            await screen.getByRole("button", {
              name: "J'ai fait le test par curiosité",
            })
          ).toBeInTheDocument()
          expect(
            await screen.getByRole("button", {
              name: "Je suis professionnel de santé",
            })
          ).toBeInTheDocument()
          expect(
            await screen.getByRole("button", {
              name: "Aucune des trois : je vous explique",
            })
          ).toBeInTheDocument()

          //TODO: Bloc Elise
        })

        describe("Réponses spécifiques", () => {
          let bien, curiosite, proSante, aucune

          beforeEach(() => {
            // Action
            fireEvent.click(noButton)

            bien = screen.getByRole("button", {
              name: "Malgré le résultat, je l'impression que tout va bien",
            })
            curiosite = screen.getByRole("button", {
              name: "J'ai fait le test par curiosité",
            })
            proSante = screen.getByRole("button", {
              name: "Je suis professionnel de santé",
            })
            aucune = screen.getByRole("button", {
              name: "Aucune des trois : je vous explique",
            })
          })

          test("Réponse : Malgré le résultat, je l'impression que tout va bien => texte", async () => {
            // Action
            fireEvent.click(bien)

            expect(
              await screen.findByText(
                "Malgré le résultat, je l'impression que tout va bien"
              )
            ).toBeVisible()

            // Bloc Elise
            mamanBluesBlocToBeInTheDocument()
          })

          test("Réponse : J'ai fait le test par curiosité => texte", async () => {
            // Action
            fireEvent.click(curiosite)

            expect(
              await screen.findByText("J'ai fait le test par curiosité")
            ).toBeVisible()

            // Bloc Elise
            mamanBluesBlocToBeInTheDocument()
          })

          test("Réponse : Je suis professionnel de santé => texte", async () => {
            // Action
            fireEvent.click(proSante)

            expect(
              await screen.findByText("Je suis professionnel de santé")
            ).toBeVisible()

            // Bloc Elise
            expect(
              screen.queryByRole("img", { name: "Portrait d'Elise" })
            ).toBeNull()
          })

          test("Réponse : Aucune des trois => textarea", async () => {
            // Action
            fireEvent.click(aucune)

            // Phrases spécifiques
            expect(
              await screen.findByText("Aucune des trois : je vous explique")
            ).toBeVisible()
            expect(
              await screen.findByText(
                "C'est une bonne étape, vous pouvez tout de même parler à Elise. Elle est présente pour vous écouter, vous conseiller, vous orienter."
              )
            ).toBeVisible()

            // Text Area
            expect(
              screen.getByRole("textbox", {
                name: "textValueOther",
              })
            ).toBeInTheDocument()

            // Bloc Elise
            mamanBluesBlocToBeInTheDocument()
          })
        })
      })
    })

    describe("Test C", () => {
      let yesButton, noButton, maybeButton

      beforeEach(() => {
        render(
          displayComponentsByTest({
            testId: "C",
            scoreLevel: SCORE_LEVEL_BAD,
          })
        )

        yesButton = screen.getByRole("button", { name: "Oui" })
        noButton = screen.getByRole("button", { name: "Non" })
        maybeButton = screen.getByRole("button", {
          name: "Je ne suis pas sûr(e)",
        })

        // Buttons
        expect(yesButton).toBeInTheDocument()
        expect(noButton).toBeInTheDocument()
        expect(maybeButton).toBeInTheDocument()
        expect(
          screen.getByRole("button", { name: "Retour" })
        ).toBeInTheDocument()
      })

      afterEach(() => {
        // Bloc Elise
        expect(
          screen.queryByRole("img", { name: "Portrait d'Elise" })
        ).toBeNull()
      })

      describe("Réponse : Oui", () => {
        let quiJoindre, quoiFaire, seTourner, aucune

        beforeEach(() => {
          // Action
          fireEvent.click(yesButton)

          quiJoindre = screen.getByRole("button", {
            name: "Je sais qui joindre : je vais contacter mon professionnel de santé et parler du résultat du test",
          })
          quoiFaire = screen.getByRole("button", {
            name: "Je sais quoi faire : je montre le résultat de ce test à mon entourage",
          })
          seTourner = screen.getByRole("button", {
            name: "Je ne sais pas vers qui me tourner : je rentre en contact avec Elise",
          })
          aucune = screen.getByRole("button", {
            name: "Aucune des trois : je vous explique",
          })
        })

        test("Réponse : Je sais qui joindre => formulaire", async () => {
          // Action
          fireEvent.click(quiJoindre)
        })

        test("Réponse : Je sais quoi faire => formulaire", async () => {
          // Action
          fireEvent.click(quoiFaire)
        })

        test("Réponse : Je ne sais pas vers qui me tourner => texte", async () => {
          // Action
          fireEvent.click(seTourner)
        })

        test("Réponse : Aucune des trois : je vous explique => textarea", async () => {
          // Action
          fireEvent.click(aucune)
        })
      })

      test("Réponse : Je ne suis pas sûr(e)", async () => {
        // Action
        fireEvent.click(maybeButton)
      })

      describe("Réponse : Non", () => {
        let bien, curiosite, proSante, aucune

        beforeEach(() => {
          // Action
          fireEvent.click(noButton)

          bien = screen.getByRole("button", {
            name: "Malgré le résultat, je l'impression que tout va bien",
          })
          curiosite = screen.getByRole("button", {
            name: "J'ai fait le test par curiosité",
          })
          proSante = screen.getByRole("button", {
            name: "Je suis professionnel de santé",
          })
          aucune = screen.getByRole("button", {
            name: "Aucune des trois : je vous explique",
          })
        })

        test("Réponse : Malgré le résultat, je l'impression que tout va bien => texte", async () => {
          // Action
          fireEvent.click(bien)
        })

        test("Réponse : J'ai fait le test par curiosité => texte", async () => {
          // Action
          fireEvent.click(curiosite)
        })

        test("Réponse : Je suis professionnel de santé => texte", async () => {
          // Action
          fireEvent.click(proSante)
        })

        test("Réponse : Aucune des trois => textarea", async () => {
          // Action
          fireEvent.click(aucune)
        })
      })
    })
  })
})
