import React from "react"
import { Carousel } from "react-bootstrap"
import { EpdsQuestion } from "./EpdsQuestion"

export function SurveyCarousel({
  questions,
  refForOnClick,
  resultsBoard,
  setEnabledNextButton,
}) {
  return (
    <Carousel
      interval={null}
      controls={false}
      indicators={false}
      ref={refForOnClick}
      touch={false}
    >
      {questions?.map((question) => {
        return (
          <Carousel.Item key={question.ordre}>
            <EpdsQuestion
              className="d-block w-100"
              question={question}
              resultsBoard={resultsBoard}
              setEnabledNextButton={setEnabledNextButton}
            />
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}
