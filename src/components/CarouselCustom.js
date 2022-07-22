import { Carousel } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"
import parse from "html-react-parser"

export function CarouselCustom({ data }) {
  const chevronPrevious = <Icon.ChevronLeft size={35} color="blue" />
  const chevronNext = <Icon.ChevronRight size={35} color="blue" />

  const isChiffreChoc = data[0].chiffre_choc

  const CaptionBloc = ({ item }) => (
    <Carousel.Caption>
      {parse(replacePbyDiv(item.texte))}
      {isChiffreChoc && <div className="source">{item.source}</div>}
    </Carousel.Caption>
  )

  return (
    <Carousel
      className="carousel-custom"
      prevIcon={chevronPrevious}
      nextIcon={chevronNext}
    >
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          {isChiffreChoc ? (
            <div className="blue-light-bloc">
              <CaptionBloc item={item} />
            </div>
          ) : (
            <>
              <div className="blue-dark-bloc">
                <div className="apostrophe-bloc">
                  <div>
                    <img src="../img/apostrophe.svg" />
                    <img src="../img/apostrophe.svg" />
                  </div>
                </div>
                <CaptionBloc item={item} />
              </div>
            </>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export const replacePbyDiv = (text) => {
  const regexP = /<\s*p[^>]*>/g
  const regexPEnd = /<\s*\/\s*p>/g
  const found = text.match(regexP)

  const newText = text.replace(regexP, "<div>").replace(regexPEnd, "</div>")
  if (found.length > 1)
    return `<div className="text-multilign">${newText}</div>`
  else return newText
}
