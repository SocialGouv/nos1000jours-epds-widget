import { useEffect, useState } from "react"
import {
  cityInformation,
  isValidZipcode,
} from "../utils/components/auto-complete-zipcode.utils"
import { LoaderFoButton } from "../utils/main.utils"

/**
 * @param {void} setSelectedCity
 * @param {void} setIsAutoCompleteZipCodeValid
 * @returns zipCode (ex : "44000") or object (city, departmentName, departmentNumber, label1Bold, label2, region, zipcode)
 */
export function AutoCompleteZipCode({
  setSelectedCity,
  setIsAutoCompleteZipCodeValid,
}) {
  const API_ADRESSE_GOUV_URL = "https://api-adresse.data.gouv.fr"

  const [citySuggestions, setCitySuggestions] = useState([])
  const [isLoading, setLoading] = useState(false)

  const [active, setActive] = useState(0)
  const [filtered, setFiltered] = useState([])
  const [isShown, setIsShown] = useState(false)
  const [input, setInput] = useState("")

  const callAPI = async (zipCode) => {
    try {
      setLoading(true)

      const res = await fetch(`${API_ADRESSE_GOUV_URL}/search/?q=${zipCode}`)
      const data = await res.json()

      const cities = data.features.map((item) => {
        return cityInformation(item.properties)
      })

      setCitySuggestions(cities)
    } catch (err) {
      console.warn(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (citySuggestions?.length > 0) {
      setActive(0)
      setFiltered(citySuggestions)
    } else {
      console.warn("Aucune donnée correspondante")

      const isValidZipcodeValid = isValidZipcode(input)
      setIsAutoCompleteZipCodeValid(isValidZipcodeValid)
      if (isValidZipcodeValid) setSelectedCity({ zipcode: input })
    }

    setIsShown(citySuggestions?.length > 0)
  }, [citySuggestions])

  const onChange = (e) => {
    const inputValue = e.currentTarget.value
    if (inputValue.length >= 5) callAPI(inputValue)
    else setIsAutoCompleteZipCodeValid(false)
    setInput(inputValue)
  }

  const onClick = (e) => {
    const clickValue = e.currentTarget.attributes["value"].value
    const itemSelected = filtered.find((item) => item.label1Bold === clickValue)
    setSelectedCity(itemSelected)
    setIsAutoCompleteZipCodeValid(true)

    setActive(0)
    setFiltered([])
    setIsShown(false)
    setInput(e.currentTarget.innerText)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      // enter key
      setActive(0)
      setIsShown(false)
      setInput(filtered[active])
    } else if (e.keyCode === 38) {
      // up arrow
      return active === 0 ? null : setActive(active - 1)
    } else if (e.keyCode === 40) {
      // down arrow
      return active - 1 === filtered.length ? null : setActive(active + 1)
    }
  }

  const renderAutocomplete = () => {
    if (isShown && input) {
      if (filtered.length) {
        return (
          <ul className="autocomplete">
            {filtered.map((suggestion, index) => {
              return (
                <li
                  className={`${index === active ? "active" : ""}`}
                  key={index}
                  onClick={onClick}
                  value={suggestion.label1Bold}
                >
                  <b>{suggestion.label1Bold}</b>, {suggestion.label2}
                </li>
              )
            })}
          </ul>
        )
      } else {
        return (
          <div className="no-autocomplete">
            <em>Not found</em>
          </div>
        )
      }
    }
    return <></>
  }

  return (
    <div className="auto-complete-zipcode">
      <input
        type="text"
        inputMode="numeric"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {isLoading ? <LoaderFoButton /> : null}
      {renderAutocomplete()}
    </div>
  )
}
