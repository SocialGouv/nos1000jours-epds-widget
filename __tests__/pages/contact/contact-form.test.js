import { isValidForm } from "../../../pages/contact/contact-form"
import { RequestContact } from "../../../src/constants/constants"

describe("Formulaire de contact", () => {
  describe("Validité du formulaire", () => {
    test("Demande par email avec un email invalide donc formulaire invalide", () => {
      const result = isValidForm(RequestContact.type.email, false, false, 0, "")
      expect(result).toEqual(false)
    })

    test("Demande par email avec un email valide donc formulaire valide", () => {
      const result = isValidForm(RequestContact.type.email, true, false, 0, "")
      expect(result).toEqual(true)
    })

    test("Demande par sms avec un numéro invalide donc formulaire invalide", () => {
      const result = isValidForm(RequestContact.type.sms, false, false, 0, "")
      expect(result).toEqual(false)
    })

    test("Demande par sms avec un numéro valide donc formulaire valide", () => {
      const result = isValidForm(RequestContact.type.sms, false, true, 0, "")
      expect(result).toEqual(true)
    })

    test("Demande avec 0 enfant donc formulaire valide", () => {
      const result = isValidForm(RequestContact.type.sms, true, true, 0, "")
      expect(result).toEqual(true)
    })

    test("Demande avec 1 enfant et pas de date donc formulaire invalide", () => {
      const result = isValidForm(RequestContact.type.sms, true, true, 1, "")
      expect(result).toEqual(false)
    })

    test("Demande avec 1 enfant et une date donc formulaire valide", () => {
      const result = isValidForm(
        RequestContact.type.sms,
        true,
        true,
        1,
        "2022-01-01"
      )
      expect(result).toEqual(true)
    })
  })
})
