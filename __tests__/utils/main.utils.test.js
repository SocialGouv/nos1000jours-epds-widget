import { STORAGE_SOURCE } from "../../src/constants/constants"
import {
  getColorIconAndTextByMood,
  isUiForApp,
  phoneNumberFormatting,
  updateRadioButtonSelectedInList,
} from "../../src/utils/main.utils"

describe("Utils", () => {
  describe("Retourner les bonnes informations en fonction du mood", () => {
    test("Mood level = 1 donc il va bien", () => {
      const result = {
        moodIcon: "icone-resultats-bien.svg",
        moodText: "Je vais bien",
        moodColor: "good-mood",
      }
      expect(getColorIconAndTextByMood(1)).toEqual(result)
    })
    test("Mood level = 2 donc il va moyennement bien", () => {
      const result = {
        moodIcon: "icone-resultats-moyen.svg",
        moodText: "Je vais moins bien",
        moodColor: "moderatelygood-mood",
      }
      expect(getColorIconAndTextByMood(2)).toEqual(result)
    })
    test("Mood level = 3 donc il ne va pas bien", () => {
      const result = {
        moodIcon: "icone-resultats-pasbien.svg",
        moodText: "Je ne vais pas bien",
        moodColor: "bad-mood",
      }
      expect(getColorIconAndTextByMood(3)).toEqual(result)
    })
  })

  describe("Formatage du numéro de téléphone", () => {
    test("Numéro à 10 chiffres => xx xx xx xx xx", () => {
      expect(phoneNumberFormatting("0123456789")).toEqual("01 23 45 67 89")
    })
  })

  describe("Mise à jour la valeur `isChecked` de l'item sélectionné dans une liste de radioButton", () => {
    test("Toute la liste est à false -> passage de l'item à true", () => {
      const list = [
        {
          id: "1",
          isChecked: false,
        },
        {
          id: "2",
          isChecked: false,
        },
      ]
      const expected = [
        {
          id: "1",
          isChecked: true,
        },
        {
          id: "2",
          isChecked: false,
        },
      ]
      const result = updateRadioButtonSelectedInList(list, list[0])
      expect(result).toEqual(expected)
    })
    test("Un item est à true -> passage de l'item à false", () => {
      const list = [
        {
          id: "1",
          isChecked: true,
        },
        {
          id: "2",
          isChecked: false,
        },
      ]
      const expected = [
        {
          id: "1",
          isChecked: false,
        },
        {
          id: "2",
          isChecked: false,
        },
      ]
      const result = updateRadioButtonSelectedInList(list, list[0])
      expect(result).toEqual(expected)
    })
    test("Un item est à true -> passage d'une autre item à true", () => {
      const list = [
        {
          id: "1",
          isChecked: false,
        },
        {
          id: "2",
          isChecked: true,
        },
      ]
      const expected = [
        {
          id: "1",
          isChecked: true,
        },
        {
          id: "2",
          isChecked: true,
        },
      ]
      const result = updateRadioButtonSelectedInList(list, list[0])
      expect(result).toEqual(expected)
    })
  })

  describe("Retourne si le widget est intégré dans l'application 1000jours en particulier ou non", () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test("Retourne True avec la source en paramètre est `1000j-application`", () => {
      expect(isUiForApp("1000j-application")).toBeTruthy()
    })

    test("Retourne False avec la source en paramètre est `1000jblues-integration`", () => {
      expect(isUiForApp("1000jblues-integration")).toBeFalsy()
    })

    test("Retourne False avec aucune source en paramètre et dans le localStorage", () => {
      expect(isUiForApp()).toBeFalsy()
    })

    test("Retourne True avec la source `1000j-application` dans le localStorage", () => {
      localStorage.setItem(STORAGE_SOURCE, "1000j-application")
      expect(isUiForApp()).toBeTruthy()
    })

    test("Retourne False avec la source `1000jblues-integration` dans le localStorage", () => {
      localStorage.setItem(STORAGE_SOURCE, "1000jblues-integration")
      expect(isUiForApp()).toBeFalsy()
    })
  })
})
