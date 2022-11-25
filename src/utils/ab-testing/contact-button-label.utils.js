import { STORAGE_TEST_ABC } from "../../constants/constants"
import { TEST } from "./ab-testing.utils"
import * as StorageUtils from "../storage.utils"

export const getContactButtonLabelByTest = () => {
  const test = StorageUtils.getInLocalStorage(STORAGE_TEST_ABC)
  switch (test) {
    case TEST.B:
      return "Je veux être accompagné(e)"
    case TEST.C:
      return "Parler à Élise"
    case TEST.D:
      return "Obtenir de l'aide"
    case TEST.A:
    default:
      return "être contacté(e)"
  }
}
