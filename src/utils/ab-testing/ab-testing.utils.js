import * as TrackerUtils from "../../utils/tracker.utils"
import * as StorageUtils from "../../utils/storage.utils"
import * as MainUtils from "../../utils/main.utils"
import {
  STORAGE_TEST_ABC,
  STORAGE_TEST_ABC_CONTACT,
} from "../../constants/constants"

export const TEST = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
}

export const TEST_CONTACT = {
  A: "A",
  B: "B",
  C: "C",
}

/**
 * Génère aléatoirement A, B ou C
 * @returns A, B ou C
 */
export const generateRandomTestContact = () => {
  // expected output: 0, 1, 2 or 3
  switch (MainUtils.getRandomInt(3)) {
    case 0:
      return TEST.A
    case 1:
      return TEST.B
    case 2:
      return TEST.C
  }
}

/**
 * Génère aléatoirement A, B, C ou D
 * @returns A, B, C ou D
 */
export const generateRandomTest = () => {
  // expected output: 0, 1, 2 or 3
  switch (MainUtils.getRandomInt(4)) {
    case 0:
      return TEST.A
    case 1:
      return TEST.B
    case 2:
      return TEST.C
    case 3:
      return TEST.D
  }
}

export const trackerForAbTesting = (label) => {
  const id = StorageUtils.getInLocalStorage(STORAGE_TEST_ABC)
  if (id) {
    TrackerUtils.track(
      TrackerUtils.CATEG.test,
      `${TrackerUtils.ACTION.parcours}${id}`,
      label
    )
  }
}

export const contactTrackerForAbTesting = (label) => {
  const id = StorageUtils.getInLocalStorage(STORAGE_TEST_ABC_CONTACT)
  TrackerUtils.track(
    TrackerUtils.CATEG.test,
    `${TrackerUtils.ACTION.parcours}${id}`,
    label
  )
}
