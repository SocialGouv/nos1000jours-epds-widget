import useSWR from "swr"
import Papa from "papaparse"
import { Form } from "react-bootstrap"

export function JobSelector({ setJobSelected }) {
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR("/api/staticCspData", fetcher)
  if (error) console.warn(error)

  const handleChangeJob = (e, jobs) => {
    const jobCode = e.target.value
    const jobSelected = jobs.find((item) => item.code === jobCode)
    setJobSelected(jobSelected)
  }

  if (data) {
    let jobs = []
    Papa.parse(data, {
      header: true,
      complete: (results) => {
        jobs = results.data
      },
    })

    return (
      <Form.Select
        className="fr-select"
        id="select_job"
        name="select_job"
        aria-label="Sélectionner votre catégories socio-professionnelle"
        onChange={(e) => handleChangeJob(e, jobs)}
      >
        <option selected disabled hidden>
          Sélectionner votre catégories socio-professionnelle
        </option>
        {jobs.map((item) => (
          <option value={item.code} key={item.code}>
            {item.code} - {item.libelle}
          </option>
        ))}
      </Form.Select>
    )
  } else return null
}
