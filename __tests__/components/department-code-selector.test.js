import { completeDepartmentWithRegion } from "../../src/components/DepartmentCodeSelector"

describe("TU du component DepartmentCodeSelector", () => {
  describe("completeDepartmentWithRegion", () => {
    const regions = [
      { nom: "Île-de-France", code: "11" },
      { nom: "Centre-Val de Loire", code: "24" },
      { nom: "Bourgogne-Franche-Comté", code: "27" },
      { nom: "Normandie", code: "28" },
      { nom: "Hauts-de-France", code: "32" },
      { nom: "Grand Est", code: "44" },
      { nom: "Pays de la Loire", code: "52" },
      { nom: "Bretagne", code: "53" },
      { nom: "Nouvelle-Aquitaine", code: "75" },
      { nom: "Occitanie", code: "76" },
      { nom: "Auvergne-Rhône-Alpes", code: "84" },
      { nom: "Provence-Alpes-Côte d'Azur", code: "93" },
      { nom: "Corse", code: "94" },
      { nom: "Guadeloupe", code: "01" },
      { nom: "Martinique", code: "02" },
      { nom: "Guyane", code: "03" },
      { nom: "La Réunion", code: "04" },
      { nom: "Mayotte", code: "06" },
    ]

    test("Should return region name for department", () => {
      const department = {
        nom: "Loire-Atlantique",
        code: "44",
        codeRegion: "52",
      }
      const expected = {
        nom: "Loire-Atlantique",
        code: "44",
        codeRegion: "52",
        nomRegion: "Pays de la Loire",
      }

      expect(completeDepartmentWithRegion(department, regions)).toEqual(
        expected
      )
    })

    test("Should return region name for department with wrong codeRegion", () => {
      const department = {
        nom: "Loire-Atlantique",
        code: "44",
        codeRegion: "99",
      }
      const expected = {
        nom: "Loire-Atlantique",
        code: "44",
        codeRegion: "99",
        nomRegion: "",
      }

      expect(completeDepartmentWithRegion(department, regions)).toEqual(
        expected
      )
    })
  })
})
