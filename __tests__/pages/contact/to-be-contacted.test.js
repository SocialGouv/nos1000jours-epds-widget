import {
  convertHoursListInString,
  isValidButtonEnabled,
} from "../../../pages/contact/to-be-contacted"
import { RequestContact } from "../../../src/constants/constants"

describe("Demande de contact", () => {
  describe("Validité des choix seléctionnés", () => {
    test("Sélection du type RDV => choix valide", () => {
      const result = isValidButtonEnabled(
        RequestContact.type.rendezvous,
        undefined
      )
      expect(result).toEqual(true)
    })

    test("Sélection du type SMS sans horaire => choix invalide", () => {
      const result = isValidButtonEnabled(RequestContact.type.sms, undefined)
      expect(result).toEqual(false)
    })

    test("Sélection du type SMS avec tous les horaires décochés => choix invalide", () => {
      const contactHours = [
        {
          hours: "9h - 12h",
          icon: "../img/contact/soleil-matin.svg",
          iconSelected: "../img/contact/soleil-matin-selected.svg",
          id: RequestContact.hours.morning,
          isChecked: false,
          text: "En matinée",
        },
        {
          hours: "12h - 14h",
          icon: "../img/contact/soleil-midi.svg",
          iconSelected: "../img/contact/soleil-midi-selected.svg",
          id: RequestContact.hours.noon,
          isChecked: false,
          text: "Le midi",
        },
        {
          hours: "14h - 17h30",
          icon: "../img/contact/soleil-soir.svg",
          iconSelected: "../img/contact/soleil-soir-selected.svg",
          id: RequestContact.hours.afternoon,
          isChecked: false,
          text: "L'après-midi",
        },
      ]

      const result = isValidButtonEnabled(RequestContact.type.sms, contactHours)
      expect(result).toEqual(false)
    })
  })

  describe("Transformation du tableau d'heures en String", () => {
    test("Un seul horaire a été sélectionné", () => {
      const contactHours = [
        {
          hours: "9h - 12h",
          icon: "../img/contact/soleil-matin.svg",
          iconSelected: "../img/contact/soleil-matin-selected.svg",
          id: RequestContact.hours.morning,
          isChecked: true,
          text: "En matinée",
        },
        {
          hours: "12h - 14h",
          icon: "../img/contact/soleil-midi.svg",
          iconSelected: "../img/contact/soleil-midi-selected.svg",
          id: RequestContact.hours.noon,
          isChecked: false,
          text: "Le midi",
        },
        {
          hours: "14h - 17h30",
          icon: "../img/contact/soleil-soir.svg",
          iconSelected: "../img/contact/soleil-soir-selected.svg",
          id: RequestContact.hours.afternoon,
          isChecked: false,
          text: "L'après-midi",
        },
      ]

      expect(convertHoursListInString(contactHours)).toEqual(" matin")
    })

    test("Plusieurs horaires ont été sélectionnés", () => {
      const contactHours = [
        {
          hours: "9h - 12h",
          icon: "../img/contact/soleil-matin.svg",
          iconSelected: "../img/contact/soleil-matin-selected.svg",
          id: RequestContact.hours.morning,
          isChecked: true,
          text: "En matinée",
        },
        {
          hours: "12h - 14h",
          icon: "../img/contact/soleil-midi.svg",
          iconSelected: "../img/contact/soleil-midi-selected.svg",
          id: RequestContact.hours.noon,
          isChecked: false,
          text: "Le midi",
        },
        {
          hours: "14h - 17h30",
          icon: "../img/contact/soleil-soir.svg",
          iconSelected: "../img/contact/soleil-soir-selected.svg",
          id: RequestContact.hours.afternoon,
          isChecked: true,
          text: "L'après-midi",
        },
      ]

      expect(convertHoursListInString(contactHours)).toEqual(
        " matin après-midi"
      )
    })
  })
})
