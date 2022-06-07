import { useState } from "react"
import { ChooseEpdsLocale } from "./ChooseEpdsLocale"
import { API_URL } from "../constants/constants"

/**
 * @param {Boolean} hasText Affichage du texte : Changer la langue
 * @param {*} locale la langue
 * @param {*} setLocaleSelected doit être renseigné pour permettre l'ouverture de la modal, il va permettre la mise à jour de la langue
 * @returns Bouton indiquant et permettant le changement de la langue
 */
export function LocaleButton({ hasText, locale, setLocaleSelected }) {
  const [showSelectLocal, setShowSelectLocal] = useState(false)

  return (
    <div className="header-flag">
      <button
        className="fr-btn fr-btn--secondary"
        disabled={!hasText}
        onClick={() => (locale ? setShowSelectLocal(true) : null)}
      >
        {locale?.drapeau.url && (
          <img
            alt="Drapeau de la langue"
            src={`${API_URL}${locale?.drapeau.url}`}
            height={20}
            width={20}
          />
        )}

        {hasText && "Changer la langue"}
      </button>

      <ChooseEpdsLocale
        show={showSelectLocal}
        setShow={setShowSelectLocal}
        setLocaleSelected={setLocaleSelected}
      />
    </div>
  )
}
