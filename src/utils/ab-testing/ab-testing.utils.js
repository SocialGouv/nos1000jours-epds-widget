export const TEST = {
  A: "A",
  B: "B",
  C: "C",
}

/**
 * Génère aléatoirement A, B ou C
 * @returns A, B ou C
 */
export const generateRandomTest = () => {
  // expected output: 0, 1 or 2
  switch (getRandomInt(3)) {
    case 0:
      return TEST.A
    case 1:
      return TEST.B
    case 2:
      return TEST.C
  }
}

const getRandomInt = (max) => {
  if (typeof window !== "undefined") {
    const randomArray = window.crypto.getRandomValues(new Uint16Array(1))
    const randomVal = randomArray[0]
    return randomVal % max
  }
}
