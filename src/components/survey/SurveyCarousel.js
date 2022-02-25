import React from "react"
import { Carousel } from "react-bootstrap"
import { EpdsQuestion } from "./EpdsQuestion"

export function SurveyCarousel({
  questions,
  refForOnClick,
  resultsBoard,
  setEnabledNextButton,
  isRTL = false,
}) {
  return (
    <Carousel
      interval={null}
      controls={false}
      indicators={false}
      ref={refForOnClick}
      touch={false}
      className="carousel"
    >
      {questions?.map((question) => (
        <Carousel.Item key={question.ordre}>
          <EpdsQuestion
            className="d-block w-100"
            question={question}
            resultsBoard={resultsBoard}
            setEnabledNextButton={setEnabledNextButton}
            isRTL={isRTL}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
