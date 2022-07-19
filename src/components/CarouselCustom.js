import { Carousel } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"

export function CarouselCustom({ }) {

  const chevronPrevious = <Icon.ChevronLeft size={35} color="blue" />
  const chevronNext = <Icon.ChevronRight size={35} color="blue" />

  const data = [
    { text: "hello wold 1" },
    { text: "hello wold 2" },
    { text: "hello wold 3" },
    { text: "hello wold 4" },
  ]

  return (
    <Carousel
      variant="dark"
      className="carousel-custom"
      prevIcon={chevronPrevious}
      nextIcon={chevronNext}
    >
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <img src="../img/bulle-bleue.svg" alt="First slide" />
          <Carousel.Caption>{item.text}</Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
