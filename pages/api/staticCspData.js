import path from "path"
import { promises as fs } from "fs"

export default async function handler(req, res) {
  //Find the absolute path of the csv directory
  const jsonDirectory = path.join(process.cwd(), "csv")

  //Read the csv data file data.csv
  const fileContents = await fs.readFile(
    jsonDirectory + "/csp_2020.csv",
    "utf8"
  )

  //Return the content of the data file in json format
  res.status(200).json(fileContents)
}
