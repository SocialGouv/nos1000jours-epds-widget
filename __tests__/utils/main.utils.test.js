import {
  getColorIconAndTextByMood,
  phoneNumberFormatting,
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
})
