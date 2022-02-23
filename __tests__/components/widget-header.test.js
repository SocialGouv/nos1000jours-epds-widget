import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { WidgetHeader } from "../../src/components/WidgetHeader"

describe("UI du WidgetHeader", () => {
  test("Header sans titre, ni drapeau", async () => {
    render(<WidgetHeader />)

    expect(screen).not.toBeNull()
    expect(() => screen.getByAltText("Logo 1000 premiers jours")).toThrow()
    expect(() => screen.getByAltText("Drapeau de la langue")).toThrow()
  })

  test("Header avec titre seulement", async () => {
    render(<WidgetHeader title="titre" />)

    expect(screen.getByRole("heading")).toHaveTextContent("titre")
    expect(screen.getByAltText("Logo 1000 premiers jours")).toBeInTheDocument()
    expect(() => screen.getByAltText("Drapeau de la langue")).toThrow()
  })
})
