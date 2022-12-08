import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"

export function DeptCodeSelector({ setDeptSelected }) {
  const API_DEPT_GOUV_URL = "https://geo.api.gouv.fr/departements"
  const [depts, setDepts] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      const res = await fetch(API_DEPT_GOUV_URL)
      const data = await res.json()

      data.map((item) => {
        return { nom: item.nom, code: item.code }
      })
      setDepts(data)
    }

    callAPI()
  }, [])

  const handleChangeDept = (e, depts) => {
    const deptCode = e.target.value
    const deptSelected = depts.find((item) => item.code === deptCode)
    setDeptSelected(deptSelected)
  }

  return (
    <Form.Select
      className="fr-select"
      id="select_dept"
      name="select_dept"
      aria-label="Sélectionner votre département"
      onChange={(e) => handleChangeDept(e, depts)}
    >
      <option selected disabled hidden>
        Sélectionner votre département
      </option>
      {depts.map((item) => (
        <option value={item.code} key={item.code}>
          {item.code} - {item.nom}
        </option>
      ))}
    </Form.Select>
  )
}
