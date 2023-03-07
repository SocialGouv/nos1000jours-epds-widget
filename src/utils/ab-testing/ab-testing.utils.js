import * as TrackerUtils from "../../utils/tracker.utils"
import * as StorageUtils from "../../utils/storage.utils"
import * as MainUtils from "../../utils/main.utils"
import { STORAGE_TEST_ABC } from "../../constants/constants"

export const TEST = {
  A: "A",
  B: "B",
  C: "C",
}

/**
 * Génère aléatoirement A, B, C ou D
 * @returns A, B, C ou D
 */
export const generateRandomTest = () => {
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

export const trackerAbTestingContact = (action, label) => {
  const id = StorageUtils.getInLocalStorage(STORAGE_TEST_ABC)
  TrackerUtils.track(`${TrackerUtils.ACTION.parcours}${id}`, action, label)
}
