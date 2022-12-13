import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import useSWR from "swr"
import Papa from "papaparse"

/**
 * Departments selector component
 * @param {void} setSelectedDepartment => {nom, code, codeRegion, nomRegion}
 * @returns DepartmentCodeSelector
 */
export function DepartmentCodeSelector({ setSelectedDepartment }) {
  const API_DEPT_GOUV_URL = "https://geo.api.gouv.fr/departements"
  const API_REGION_GOUV_URL = "https://geo.api.gouv.fr/regions"

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR("/api/staticDepartmentComData", fetcher)
  if (error) console.warn(error)

  const [departments, setDepartments] = useState([])
  const [departmentsCom, setDepartmentsCom] = useState([])
  const [regions, setRegions] = useState([])

  useEffect(() => {
    callDepartmentsAPI()
    callRegionsAPI()
  }, [])

  useEffect(() => {
    callDepartmentsComCsv()
  }, [data])

  useEffect(() => {
    if (departments && departments.length < 105) {
      const departmentsWithCom = departmentsCom.forEach((item) =>
        departments.push(item)
      )
      if (departmentsWithCom) setDepartments(departmentsWithCom)
    }
  }, [departments])

  const callDepartmentsAPI = async () => {
    const res = await fetch(API_DEPT_GOUV_URL)
    const dataDepartments = await res.json()

    dataDepartments.map((item) => {
      return { nom: item.nom, code: item.code, codeRegion: item.codeRegion }
    })
    setDepartments(dataDepartments)
  }

  const callDepartmentsComCsv = () => {
    if (data) {
      let com = []
      Papa.parse(data, {
        header: true,
        complete: (results) => {
          com = results.data
        },
      })
      setDepartmentsCom(com)
    }
  }

  const callRegionsAPI = async () => {
    const res = await fetch(API_REGION_GOUV_URL)
    const dataRegions = await res.json()

    dataRegions.map((item) => {
      return { nom: item.nom, code: item.code }
    })
    setRegions(dataRegions)
  }

  const handleChangeDepartment = (event, depts) => {
    const departmentCode = event.target.value
    const selectedDepartment = depts.find(
      (item) => item.code === departmentCode
    )
    const departmentWithRegion = completeDepartmentWithRegion(
      selectedDepartment,
      regions
    )
    setSelectedDepartment(departmentWithRegion)
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

/**
 * @param {*} department
 * @param {*} regions
 * @returns department with region name
 */
export const completeDepartmentWithRegion = (department, regions) => {
  const regionName = regions.find((item) => item.code == department.codeRegion)
  department.nomRegion = regionName ? regionName.nom : ""
  return department
}
