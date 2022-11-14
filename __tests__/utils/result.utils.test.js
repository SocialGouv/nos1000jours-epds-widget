import {
  STORAGE_RESULTS_BOARD,
  STORAGE_SCORE_LEVEL_MOOD,
} from "../../src/constants/constants"
import { Labels } from "../../src/constants/specificLabels"
import {
  convertResultsInStorageToContentTable,
  getEpdsResultsAndMoodInStorage,
} from "../../src/utils/result.utils"

describe("Result Utils", () => {
  describe("getEpdsResultsAndMoodInStorage", () => {
    beforeAll(() => {
      global.localStorage = {
        setItem(key, item) {
          this.state[key] = item
        },
        getItem(key) {
          return this.state[key]
        },
      }
    })

    test("Should return null results when local storage is empty", () => {
      const expected = {
        detailQuestions: null,
        detailResponses: null,
        moodLabel: undefined,
      }
      expect(getEpdsResultsAndMoodInStorage()).toEqual(expected)
    })

    test("Should return matching questions, responses and mood label when mood and table are stored in local storage", () => {
      const resultsBoard = [
        {
          order: 1,
          points: 3,
          question: "J’ai pu rire et prendre les choses du bon côté",
          response: "Absolument pas",
        },
        {
          order: 2,
          points: 3,
          question:
            "Je me suis senti(e) confiant(e) et joyeux(se), en pensant à l’avenir",
          response: "Pratiquement pas",
        },
        {
          order: 3,
          points: 0,
          question:
            "Je me suis reproché(e), sans raisons, d’être responsable quand les choses allaient mal",
          response: "Non, jamais",
        },
        {
          order: 4,
          points: 2,
          question:
            "Je me suis senti(e) inquiet(e) ou soucieux(se) sans motifs",
          response: "Oui, parfois",
        },
        {
          order: 5,
          points: 0,
          question:
            "Je me suis senti(e) effrayé(e) ou paniqué(e) sans vraiment de raisons",
          response: "Non, pas du tout",
        },
        {
          order: 6,
          points: 3,
          question:
            "J’ai eu tendance à me sentir dépassé(e) par les évènements",
          response:
            "Oui, la plupart du temps, je me suis senti(e) incapable de faire face aux situations",
        },
        {
          order: 7,
          points: 3,
          question:
            "Je me suis senti(e) si malheureux(se) que j’ai eu des problèmes de sommeil",
          response: "Oui, la plupart du temps",
        },
        {
          order: 8,
          points: 1,
          question: "Je me suis senti(e) triste ou peu heureux (se)",
          response: "Pas très souvent",
        },
        {
          order: 9,
          points: 1,
          question: "Je me suis senti(e) si malheureux(se) que j’en ai pleuré",
          response: "Seulement de temps en temps",
        },
        {
          order: 10,
          points: 1,
          question: "Il m’est arrivé de penser à me faire du mal",
          response: "Presque jamais",
        },
      ]
      localStorage.setItem(STORAGE_RESULTS_BOARD, JSON.stringify(resultsBoard))
      localStorage.setItem(STORAGE_SCORE_LEVEL_MOOD, 3)

      const expected = {
        detailQuestions: [
          "J’ai pu rire et prendre les choses du bon côté",
          "Je me suis senti(e) confiant(e) et joyeux(se), en pensant à l’avenir",
          "Je me suis reproché(e), sans raisons, d’être responsable quand les choses allaient mal",
          "Je me suis senti(e) inquiet(e) ou soucieux(se) sans motifs",
          "Je me suis senti(e) effrayé(e) ou paniqué(e) sans vraiment de raisons",
          "J’ai eu tendance à me sentir dépassé(e) par les évènements",
          "Je me suis senti(e) si malheureux(se) que j’ai eu des problèmes de sommeil",
          "Je me suis senti(e) triste ou peu heureux (se)",
          "Je me suis senti(e) si malheureux(se) que j’en ai pleuré",
          "Il m’est arrivé de penser à me faire du mal",
        ],
        detailResponses: [
          "Absolument pas",
          "Pratiquement pas",
          "Non, jamais",
          "Oui, parfois",
          "Non, pas du tout",
          "Oui, la plupart du temps, je me suis senti(e) incapable de faire face aux situations",
          "Oui, la plupart du temps",
          "Pas très souvent",
          "Seulement de temps en temps",
          "Presque jamais",
        ],
        moodLabel: Labels.mood.notGood,
      }
      expect(getEpdsResultsAndMoodInStorage()).toEqual(expected)
    })
  })

  describe("convertResultsInStorageToContentTable", () => {
    test("Should map results to corresponding table", () => {
      const initalData = {
        detailQuestions: [
          "J’ai pu rire et prendre les choses du bon côté",
          "Je me suis senti(e) confiant(e) et joyeux(se), en pensant à l’avenir",
        ],
        detailResponses: ["Absolument pas", "Pratiquement pas"],
        moodLabel: null,
      }

      const expected = [
        {
          question: "J’ai pu rire et prendre les choses du bon côté",
          reponse: "Absolument pas",
        },
        {
          question:
            "Je me suis senti(e) confiant(e) et joyeux(se), en pensant à l’avenir",
          reponse: "Pratiquement pas",
        },
      ]

      expect(convertResultsInStorageToContentTable(initalData)).toEqual(
        expected
      )
    })
  })
})
