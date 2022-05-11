import React from "react"

const TEST_A = "A"
const TEST_B = "B"
const TEST_C = "C"

export function MeasuringIntentions({ scoreLevel }) {
  const testId = generateRandomTest()

  // TODO: ne pas afficher en prod
  return (
    <div>
      Test {testId}
    </div>
  )
}

const getRandomInt = (max) => Math.floor(Math.random() * max)

const generateRandomTest = () => {
  // expected output: 0, 1 or 2
  switch (getRandomInt(3)) {
    case 0:
      return TEST_A
    case 1:
      return TEST_B
    case 2:
      return TEST_C
  }
}
