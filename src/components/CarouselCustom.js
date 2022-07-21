import { Carousel } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"
import parse from "html-react-parser"

export function CarouselCustom({ data }) {
  const chevronPrevious = <Icon.ChevronLeft size={35} color="blue" />
  const chevronNext = <Icon.ChevronRight size={35} color="blue" />

  return (
    <Carousel
      className="carousel-custom"
      prevIcon={chevronPrevious}
      nextIcon={chevronNext}
    >
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <img src="../img/bulle-bleue.svg" alt="First slide" />
          <Carousel.Caption>
            {parse(replacePbyDiv(item.texte))}
          </Carousel.Caption>
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
