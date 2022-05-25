import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ContactMamanBlues } from "../../../src/components/results/ContactMamanBlues"

describe("UI du ContactMamanBlues", () => {
  test("le score est 1 et le bloc de contact est vide", async () => {
    const { container } = render(
      <ContactMamanBlues scoreLevel={1} hideContact={true} />
    )

    expect(screen).not.toBeNull()
    expect(container.firstChild.firstChild).toBeNull()
  })

  test("le score est 2 et className doit avoir moderatelygood-mood", async () => {
    const { container } = render(<ContactMamanBlues scoreLevel={2} />)

    expect(screen.getByRole("button")).toBeInTheDocument()
    // Comme la div n'a pas de rôle particulier, il faut passer par un container
    expect(container.firstChild.firstChild).toHaveClass(
      "contact-content moderatelygood-mood"
    )
  })

  test("le score est 3 et className doit avoir bad-mood", async () => {
    const { container } = render(<ContactMamanBlues scoreLevel={3} />)

    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(container.firstChild.firstChild).toHaveClass(
      "contact-content bad-mood"
    )
  })
})
