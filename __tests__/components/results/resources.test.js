import { getResourcesByScore } from "../../../src/components/results/Resources"

describe("Component Resources", () => {
  describe("Renvoie les ressources en fonction d'un score", () => {
    test("Aucune ressource => undefined", () => {
      const ressources_configs = []
      expect(getResourcesByScore(ressources_configs, 10)).toEqual(undefined)
    })

    test("Aucune des ressources ne correspond au score => undefined", () => {
      const ressources_configs = [
        {
          texte_1: "<p>Vous allez bien</p>",
          texte_2: null,
          score_min: 0,
          score_max: 10,
          ressources: [
            {
              type: "tels",
              titre: "Les ressources téléphoniques",
              contenu: "<h1>Hello world</h1>",
            },
          ],
        },
      ]
      expect(getResourcesByScore(ressources_configs, 12)).toEqual(undefined)
    })

    test("Pas de score_min/max dans la config des ressources => renvoie la ressource", () => {
      const ressources_configs = [
        {
          texte_1: "<p>test</p>",
          texte_2: null,
          score_min: null,
          score_max: null,
          ressources: [
            {
              type: "tels",
              titre: "Les ressources téléphoniques",
              contenu: "<h1>Hello world</h1>",
            },
          ],
        },
      ]

      const result = {
        texte_1: "<p>test</p>",
        texte_2: null,
        score_min: null,
        score_max: null,
        ressources: [
          {
            type: "tels",
            titre: "Les ressources téléphoniques",
            contenu: "<h1>Hello world</h1>",
          },
        ],
      }

      expect(getResourcesByScore(ressources_configs, 10)).toEqual(result)
    })

    test("Le score_min est null et le score est < score_max dans la config des ressources => renvoie la ressource", () => {
      const ressources_configs = [
        {
          texte_1: "<p>test</p>",
          texte_2: null,
          score_min: null,
          score_max: 10,
          ressources: [
            {
              type: "tels",
              titre: "Les ressources téléphoniques",
              contenu: "<h1>Hello world</h1>",
            },
          ],
        },
      ]

      const result = {
        texte_1: "<p>test</p>",
        texte_2: null,
        score_min: null,
        score_max: 10,
        ressources: [
          {
            type: "tels",
            titre: "Les ressources téléphoniques",
            contenu: "<h1>Hello world</h1>",
          },
        ],
      }

      expect(getResourcesByScore(ressources_configs, 5)).toEqual(result)
    })

    test("Le score_min est null et le score est > score_max dans la config des ressources => undefined", () => {
      const ressources_configs = [
        {
          texte_1: "<p>test</p>",
          texte_2: null,
          score_min: null,
          score_max: 10,
          ressources: [
            {
              type: "tels",
              titre: "Les ressources téléphoniques",
              contenu: "<h1>Hello world</h1>",
            },
          ],
        },
      ]

      expect(getResourcesByScore(ressources_configs, 15)).toEqual(undefined)
    })

    test("Plusieurs ressources dont une correspondant au score => renvoie la ressource", () => {
      const ressources_configs = [
        {
          texte_1: "<p>Vous allez bien</p>",
          texte_2: null,
          score_min: 0,
          score_max: 10,
          ressources: [
            {
              type: "tels",
              titre: "Les ressources téléphoniques",
              contenu: "<h1>Hello world</h1>",
            },
          ],
        },
        {
          texte_1: "<p>test</p>",
          texte_2: null,
          score_min: 11,
          score_max: 15,
          ressources: [],
        },
      ]

      const result = {
        texte_1: "<p>test</p>",
        texte_2: null,
        score_min: 11,
        score_max: 15,
        ressources: [],
      }

      expect(getResourcesByScore(ressources_configs, 12)).toEqual(result)
    })

    test("Plusieurs ressources pour un score => prend la 1ère ressource de la liste", () => {
      const ressources_configs = [
        {
          texte_1: "<p>Vous allez bien</p>",
          texte_2: null,
          score_min: 0,
          score_max: 10,
          ressources: [
            {
              type: "tels",
              titre: "Les ressources téléphoniques",
              contenu: "<h1>Hello world</h1>",
            },
          ],
        },
        {
          texte_1: "<p>test</p>",
          texte_2: null,
          score_min: 8,
          score_max: 15,
          ressources: [],
        },
      ]

      const result = {
        texte_1: "<p>Vous allez bien</p>",
        texte_2: null,
        score_min: 0,
        score_max: 10,
        ressources: [
          {
            type: "tels",
            titre: "Les ressources téléphoniques",
            contenu: "<h1>Hello world</h1>",
          },
        ],
      }

      expect(getResourcesByScore(ressources_configs, 9)).toEqual(result)
    })
  })
})
