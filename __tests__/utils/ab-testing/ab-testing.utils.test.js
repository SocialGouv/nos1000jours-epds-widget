import { generateRandomTest } from "../../../src/utils/ab-testing/ab-testing.utils"

describe("Utils", () => {
  const mockJest = jest.fn()

  describe("Générer un numéro de test A/B/C", () => {
    test("Générer un A ou B ou C", () => {
      const mGetRandomValues = mockJest.mockReturnValueOnce(new Uint16Array(1))
      Object.defineProperty(window, "crypto", {
        value: { getRandomValues: mGetRandomValues },
      })

      expect(["A", "B", "C"]).toContain(generateRandomTest())
      expect(mGetRandomValues).toBeCalledWith(new Uint16Array(1))
    })
  })
})
