
import { jsPDF } from "jspdf"
import { convertDateToString } from "./main.utils"
import {
  convertResultsInStorageToContentTable,
  getEpdsResultsAndMoodInStorage,
} from "./result.utils"

const MARGIN_10 = 10
const CELL_WIDTH = 120
const LOG_URL = "/img/logo-1000j.png"

export const generateEpdsResultsPdf = () => {
  const data = getEpdsResultsAndMoodInStorage()
  const doc = new jsPDF({ orientation: "portrait" })

  var img = new Image()
  img.src = LOG_URL
  doc.addImage(img, "png", MARGIN_10, MARGIN_10, 20, 20)
  doc.text("Résultats du test EPDS", MARGIN_10, 40)

  const today = convertDateToString(new Date(), "/")
  doc.text(`Fait le ${today}`, MARGIN_10, 50)
  doc.text(data.moodLabel, MARGIN_10, 64)

  const headers = [
    {
      name: "question",
      prompt: "Question",
      align: "left",
      padding: MARGIN_10,
      width: CELL_WIDTH,
    },
    {
      name: "reponse",
      prompt: "Réponse",
      align: "left",
      padding: MARGIN_10,
      width: CELL_WIDTH,
    },
  ]
  const contentTable = convertResultsInStorageToContentTable(data)
  doc.table(MARGIN_10, 68, contentTable, headers)

  doc.save(`resultats-epds-${today}.pdf`)
}
