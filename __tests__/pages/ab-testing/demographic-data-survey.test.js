import { checkIsFormCompleted } from "../../../pages/ab-testing/demographic-data-survey"

describe("Questionnaire démographique", () => {
  describe("Should return all questions are completed", () => {
    const completedGenderValues = [
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

    const completedAgeValues = [
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

    const completedResidenceValue = {
      zipcode: "49000",
      city: "Écouflant",
      departmentName: "Maine-et-Loire",
      departmentNumber: "49",
      region: "Pays de la Loire",
      label1Bold: "Écouflant",
      label2: "49, Maine-et-Loire, Pays de la Loire",
    }

    const completedSituationValues = [
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

    const completedEntourageValues = [
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

    const completedJobValues = { code: "10", libelle: "job" }

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
          undefined,
          situationValues,
          entourageValues
        )
      ).toBeFalsy()
    })

    test("une partie des questions seulement est complété => false", () => {
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
          completedGenderValues,
          ageValues,
          undefined,
          situationValues,
          entourageValues
        )
      ).toBeFalsy()
    })

    test("Should return true when all form is completed and zip code is an object", () => {
      expect(
        checkIsFormCompleted(
          completedGenderValues,
          completedAgeValues,
          completedJobValues,
          completedResidenceValue,
          completedSituationValues,
          completedEntourageValues
        )
      ).toBeTruthy()
    })

    test("Should return true when all form is completed and zip code is true", () => {
      expect(
        checkIsFormCompleted(
          completedGenderValues,
          completedAgeValues,
          completedJobValues,
          true,
          completedSituationValues,
          completedEntourageValues
        )
      ).toBeTruthy()
    })

    test("Should return false when all form is completed and zip code is false", () => {
      expect(
        checkIsFormCompleted(
          completedGenderValues,
          completedAgeValues,
          completedJobValues,
          false,
          completedSituationValues,
          completedEntourageValues
        )
      ).toBeFalsy()
    })
  })
})
