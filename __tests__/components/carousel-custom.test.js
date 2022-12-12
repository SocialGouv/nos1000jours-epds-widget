import { replacePbyDiv } from "../../src/components/CarouselCustom"

describe("TU du component CarouselButton", () => {
  test("Remplacer les balises <p></p> par <div></div> (si présente une seule fois)", async () => {
    const result = replacePbyDiv(
      "<p>J'ai tout pour être heureuse,<strong> alors pourquoi suis-je dans cet état ?</strong></p>"
    )
    const expected =
      "<div>J'ai tout pour être heureuse,<strong> alors pourquoi suis-je dans cet état ?</strong></div>"

    expect(result).toEqual(expected)
  })

  test("Remplacer les balises <p></p> par <div></div> (si plusieurs <p> présent)", async () => {
    const result = replacePbyDiv("<p>Hello world</p><p>Je suis toto</p>")
    const expected = `<div className="text-multilign"><div>Hello world</div><div>Je suis toto</div></div>`

    expect(result).toEqual(expected)
  })
})
