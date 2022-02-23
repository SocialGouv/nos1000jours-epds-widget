import { useState } from "react"
import { Col } from "react-bootstrap"
import { API_URL } from "../constants/constants"
import { ChooseEpdsLocale } from "./ChooseEpdsLocale"

/**
 * 
 * @param {Sting} title (Not required)
 * @param {*} locale (Not required)
 * @param {*} setLocaleSelected (Not required) doit être renseigné pour permettre l'ouverture de la modal
 * @returns Header
 */
export function WidgetHeader({ title, locale, setLocaleSelected }) {
  const [showSelectLocal, setShowSelectLocal] = useState(false)

  return (
    <Col className="widget-header">
      {title ? (
        <>
          <img
            src="/img/logo-1000j.svg"
            alt="Logo 1000 premiers jours"
            height={40}
            width={40}
          />
          <h5 className="title-ddp">{title}</h5>
        </>
      ) : null}

      {locale?.drapeau?.url ? (
        <img
          className="header-flag"
          alt="Drapeau de la langue"
          src={`${API_URL}${locale.drapeau.url}`}
          height={40}
          width={40}
          style={{ cursor: setLocaleSelected ? "pointer" : "auto" }}
          onClick={() => (setLocaleSelected ? setShowSelectLocal(true) : null)}
        />
      ) : null}

      <ChooseEpdsLocale
        show={showSelectLocal}
        setShow={setShowSelectLocal}
        setLocaleSelected={setLocaleSelected}
      />
    </Col>
  )
}
