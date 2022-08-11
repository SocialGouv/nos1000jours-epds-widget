import { cityInformation } from "../../../src/utils/components/auto-complete-zipcode.utils"

describe("AutoCompleteZipcode Utils", () => {
  describe("CityInformation", () => {
    const dataAPI = {
      type: "FeatureCollection",
      version: "draft",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-0.516449, 47.513445],
          },
          properties: {
            label: "Écouflant",
            score: 0.8513181818181818,
            id: "49129",
            type: "municipality",
            name: "Écouflant",
            postcode: "49000",
            citycode: "49129",
            x: 435424.71,
            y: 6718456.46,
            population: 4394,
            city: "Écouflant",
            context: "49, Maine-et-Loire, Pays de la Loire",
            importance: 0.3645,
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-0.528754, 47.46098],
          },
          properties: {
            label: "Rue Saint-Léonard 49000 Angers",
            score: 0.7104372727272726,
            id: "49007_7270",
            name: "Rue Saint-Léonard",
            postcode: "49000",
            citycode: "49007",
            x: 434239.13,
            y: 6712675.2,
            city: "Angers",
            context: "49, Maine-et-Loire, Pays de la Loire",
            type: "street",
            importance: 0.81481,
          },
        },
      ],
      attribution: "BAN",
      licence: "ETALAB-2.0",
      query: "49000",
      limit: 5,
    }

    test("Data avec minicipalités et rues", () => {
      const result = dataAPI.features.map((item) =>
        cityInformation(item.properties)
      )
      const expected = [
        {
          zipcode: "49000",
          city: "Écouflant",
          departmentName: "Maine-et-Loire",
          departmentNumber: "49",
          region: "Pays de la Loire",
          label1Bold: "Écouflant",
          label2: "49, Maine-et-Loire, Pays de la Loire",
        },
        {
          zipcode: "49000",
          city: "Angers",
          departmentName: "Maine-et-Loire",
          departmentNumber: "49",
          region: "Pays de la Loire",
          label1Bold: "Rue Saint-Léonard 49000 Angers",
          label2: "49, Maine-et-Loire, Pays de la Loire",
        },
      ]
      expect(result).toEqual(expected)
    })
  })
})
