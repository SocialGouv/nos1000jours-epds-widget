import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"

export function DepartmentCodeSelector({ setSelectedDepartment }) {
  const API_DEPT_GOUV_URL = "https://geo.api.gouv.fr/departements"
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    const callAPI = async () => {
      const res = await fetch(API_DEPT_GOUV_URL)
      const data = await res.json()

      data.map((item) => {
        return { nom: item.nom, code: item.code }
      })
      setDepartments(data)
    }

    callAPI()
  }, [])

  const handleChangeDepartment = (event, depts) => {
    const departmentCode = event.target.value
    const selectedDepartment = depts.find(
      (item) => item.code === departmentCode
    )
    setSelectedDepartment(selectedDepartment)
  }

  return (
    <Form.Select
      className="fr-select"
      id="select_dept"
      name="select_dept"
      aria-label="Sélectionner votre département"
      onChange={(e) => handleChangeDepartment(e, departments)}
    >
      <option selected disabled hidden>
        Sélectionner votre département
      </option>
      {departments.map((item) => (
        <option value={item.code} key={item.code}>
          {item.code} - {item.nom}
        </option>
      ))}
    </Form.Select>
  )
}
