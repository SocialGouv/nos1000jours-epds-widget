import { checkIsFormCompleted } from "../../../pages/ab-testing/demographic-data-survey"

describe("Questionnaire démographique", () => {
  describe("Vérification que toutes les questions sont remplies", () => {
    test("Les données sont `undefined` => false", () => {
      expect(
        checkIsFormCompleted(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        )
      ).toBeFalsy()
    })
    test("Aucune question remplie => false", () => {
      const genderValues = [
        {
          id: "femme",
          text: "Femme",
          isChecked: false,
        },
        {
          id: "homme",
          text: "Homme",
          isChecked: false,
        },
      ]

      const ageValues = [
        {
          id: "-18ans",
          text: "-18 ans",
          isChecked: false,
        },
        {
          id: "18-25ans",
          text: "18 - 25 ans",
          isChecked: false,
        },
      ]

      const situationValues = [
        {
          id: "attendez1Enfant",
          text: "Vous attendez un enfant",
          isChecked: false,
        },
        {
          id: "avezEnfantDeMoinsDe2ans",
          text: "Vous avez un enfant de moins de 2 ans",
          isChecked: false,
        },
      ]

      const entourageValues = [
        {
          id: "oui",
          text: "Oui",
          isChecked: false,
        },
        {
          id: "non",
          text: "Non",
          isChecked: false,
        },
      ]

      expect(
        checkIsFormCompleted(
          genderValues,
          ageValues,
          null, // TODO:
          situationValues,
          entourageValues
        )
      ).toBeFalsy()
    })
    test("une partie des questions seulement est complété => false", () => {
      const genderValues = [
        {
          id: "femme",
          text: "Femme",
          isChecked: true,
        },
        {
          id: "homme",
          text: "Homme",
          isChecked: false,
        },
      ]

      const ageValues = [
        {
          id: "-18ans",
          text: "-18 ans",
          isChecked: false,
        },
        {
          id: "18-25ans",
          text: "18 - 25 ans",
          isChecked: false,
        },
      ]

      const situationValues = [
        {
          id: "attendez1Enfant",
          text: "Vous attendez un enfant",
          isChecked: true,
        },
        {
          id: "avezEnfantDeMoinsDe2ans",
          text: "Vous avez un enfant de moins de 2 ans",
          isChecked: true,
        },
      ]

      const entourageValues = [
        {
          id: "oui",
          text: "Oui",
          isChecked: false,
        },
        {
          id: "non",
          text: "Non",
          isChecked: false,
        },
      ]

      expect(
        checkIsFormCompleted(
          genderValues,
          ageValues,
          null, // TODO:
          situationValues,
          entourageValues
        )
      ).toBeFalsy()
    })
    test("Genre + Age + CP + situation + entourage complétés => true", () => {
      const genderValues = [
        {
          id: "femme",
          text: "Femme",
          isChecked: true,
        },
        {
          id: "homme",
          text: "Homme",
          isChecked: false,
        },
      ]

      const ageValues = [
        {
          id: "-18ans",
          text: "-18 ans",
          isChecked: true,
        },
        {
          id: "18-25ans",
          text: "18 - 25 ans",
          isChecked: false,
        },
      ]

      const situationValues = [
        {
          id: "attendez1Enfant",
          text: "Vous attendez un enfant",
          isChecked: true,
        },
        {
          id: "avezEnfantDeMoinsDe2ans",
          text: "Vous avez un enfant de moins de 2 ans",
          isChecked: false,
        },
      ]

      const entourageValues = [
        {
          id: "oui",
          text: "Oui",
          isChecked: true,
        },
        {
          id: "non",
          text: "Non",
          isChecked: false,
        },
      ]

      expect(
        checkIsFormCompleted(
          genderValues,
          ageValues,
          null, // TODO:
          situationValues,
          entourageValues
        )
      ).toBeTruthy()
    })
  })
})
