import {
  getColorIconAndTextByMood,
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
})
