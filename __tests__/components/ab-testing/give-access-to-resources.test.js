import { fireEvent, render, screen } from "@testing-library/react"
import { GiveAccessToResources } from "../../../src/components/ab-testing/resources/GiveAccessToResources"
import { STORAGE_TEST_ABC } from "../../../src/constants/constants"
import * as AbTestingUtils from "../../../src/utils/ab-testing/ab-testing.utils"

describe("UI de GiveAccessToResources", () => {
  describe("TEST A/B/C/D", () => {
    const mailBtnText = "Je souhaite recevoir les ressources par mail"

    test("Should return modal with email when test is A", async () => {
      localStorage.setItem(STORAGE_TEST_ABC, AbTestingUtils.TEST.A)
      render(<GiveAccessToResources />)

      const button = screen.getByRole("button", { name: mailBtnText })
      expect(button).toBeInTheDocument()

      fireEvent.click(button)
      expect(await screen.queryByText("Fermer")).toBeInTheDocument()
    })

    test("Should return modal with email when test is B", async () => {
      localStorage.setItem(STORAGE_TEST_ABC, AbTestingUtils.TEST.B)
      render(<GiveAccessToResources />)

      const button = screen.getByRole("button", { name: mailBtnText })
      expect(button).toBeInTheDocument()

      fireEvent.click(button)
      expect(await screen.queryByText("Fermer")).toBeInTheDocument()
    })
  })
})
