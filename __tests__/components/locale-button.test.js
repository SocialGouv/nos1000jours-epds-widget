import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { act } from "react-dom/test-utils"
import { LocaleButton } from "../../src/components/LocaleButton"

describe("UI du component LocaleButton", () => {
  test("Bloc avec le changement de langue activée => Bouton activé, texte affiché", async () => {
    // Le `await act` est là pour pouvoir tester la modal
    await act(async () => render(<LocaleButton hasText={true} />))

    expect(screen.getAllByRole("button")[0]).toBeEnabled()
    expect(screen.getAllByRole("button")[0]).toHaveTextContent(
      "Changer la langue"
    )
  })

  test("Bloc avec seulement l'affichage du drapeau => Bouton désactivé, pas de texte", async () => {
    await act(async () => render(<LocaleButton />))

    expect(screen.getAllByRole("button")[0]).toBeDisabled()
    expect(screen.getAllByRole("button")[0]).not.toHaveTextContent(
      "Changer la langue"
    )
  })
})
