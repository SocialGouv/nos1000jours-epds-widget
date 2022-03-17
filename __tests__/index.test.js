import { getSlogan, getStartButtonText } from "../pages"

describe("Page d'accueil", () => {
  describe("Affichage du slogan", () => {
    const defaultSlogan =
      "Futurs parents, parents, évaluez votre bien-être émotionnel en quelques minutes"

    test("Aucun slogan renseigné pour une langue ou une source donnée => slogan par défaut", () => {
      const source = undefined
      const labels = undefined

      expect(getSlogan(source, labels)).toBe(defaultSlogan)
    })
    test("Slogan pour une langue donnée uniquement mais sans de slogan par defaut pour la langue => slogan par défaut", () => {
      const source = undefined
      const labels = {}

      expect(getSlogan(source, labels)).toBe(defaultSlogan)
    })
    test("Slogan pour une langue donnée uniquement => texte de la clé slogan", () => {
      const source = undefined
      const labels = { slogan: "Slogan de la langue par défaut" }

      expect(getSlogan(source, labels)).toBe("Slogan de la langue par défaut")
    })
    test("Slogan pour une source mais pas labels vide => slogan par défaut", () => {
      const source = "test"
      const labels = {}

      expect(getSlogan(source, labels)).toBe(defaultSlogan)
    })
    test("Slogan pour une langue donnée et une source, mais le slogan_masource n'existe pas => texte de la clé slogan", () => {
      const source = "test"
      const labels = {
        slogan: "Slogan de la langue par défaut",
      }

      expect(getSlogan(source, labels)).toBe("Slogan de la langue par défaut")
    })
    test("Slogan pour une langue donnée et une source => texte de la clé slogan_masource", () => {
      const source = "test"
      const labels = {
        slogan: "Slogan de la langue par défaut",
        slogan_test: "Slogan du widget avec la source : test",
      }

      expect(getSlogan(source, labels)).toBe(
        "Slogan du widget avec la source : test"
      )
    })
    test("Slogan pour une langue donnée et une source comprenant des majuscules => texte de la clé slogan_masource", () => {
      const source = "MonSiteWeb"
      const labels = {
        slogan: "Slogan de la langue par défaut",
        slogan_monsiteweb: "Slogan du widget avec la source : MonSiteWeb",
      }

      expect(getSlogan(source, labels)).toBe(
        "Slogan du widget avec la source : MonSiteWeb"
      )
    })
  })

  describe("Texte du boutton Commencer", () => {
    const defaultText = "Commencer"

    test("La traduction est vide => texte par défaut", () => {
      const labels = undefined
      expect(getStartButtonText(labels)).toBe(defaultText)
    })
    test("La traduction ne contient pas le champs bouton_commencer => texte par défaut", () => {
      const labels = {}
      expect(getStartButtonText(labels)).toBe(defaultText)
    })
    test("La traduction contient le champs bouton_commencer => texte", () => {
      const labels = {
        bouton_commencer: "Cliquer ici",
      }
      expect(getStartButtonText(labels)).toBe("Cliquer ici")
    })
  })
})
