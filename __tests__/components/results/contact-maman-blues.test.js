import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ContactMamanBlues } from "../../../src/components/results/ContactMamanBlues"

describe("UI du ContactMamanBlues", () => {

  afterEach(() => {
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  test("le score est 1 et le bloc de contact est vide", async () => {
    const { container } = render(<ContactMamanBlues scoreLevel={1} />)

    expect(container.firstChild.firstChild).toHaveClass(
      "contact-content good-mood"
    )
  })

  test("le score est 2 et className doit avoir moderatelygood-mood", async () => {
    const { container } = render(<ContactMamanBlues scoreLevel={2} />)

    // Comme la div n'a pas de rôle particulier, il faut passer par un container
    expect(container.firstChild.firstChild).toHaveClass(
      "contact-content moderatelygood-mood"
    )
  })

  test("le score est 3 et className doit avoir bad-mood", async () => {
    const { container } = render(<ContactMamanBlues scoreLevel={3} />)

    expect(container.firstChild.firstChild).toHaveClass(
      "contact-content bad-mood"
    )
  })
})
