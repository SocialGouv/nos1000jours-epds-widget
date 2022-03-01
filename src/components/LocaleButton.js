import { useState } from "react"
import { ChooseEpdsLocale } from "./ChooseEpdsLocale"
import { API_URL } from "../constants/constants"

export function LocaleButton({ hasText, locale, setLocaleSelected }) {
  const [showSelectLocal, setShowSelectLocal] = useState(false)

  return (
    <div className="header-flag">
      <button
        className="fr-btn fr-btn--secondary"
        onClick={() => (locale ? setShowSelectLocal(true) : null)}
      >
        <img
          alt="Drapeau de la langue"
          src={`${API_URL}${locale?.drapeau.url}`}
          height={20}
          width={20}
        />
        Changer la langue
      </button>

      <ChooseEpdsLocale
        show={showSelectLocal}
        setShow={setShowSelectLocal}
        setLocaleSelected={setLocaleSelected}
      />
    </div>
  )
}
