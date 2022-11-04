import { Row } from "react-bootstrap"
import { LocaleButton } from "./LocaleButton"

/**
 * @param {Sting} title (Not required)
 * @param {*} locale (Not required)
 * @returns Header
 */
export function WidgetHeader({ title, locale }) {

  return (
    <div className="widget-header">
      <Row>
        <div className="header-block-icons">
          <img
            className="header-logo"
            src="/img/logo-1000j.svg"
            alt="Logo 1000 premiers jours"
          />
          <LocaleButton locale={locale} />
        </div>
        {title && <h5 className="title-ddp">{title}</h5>}
      </Row>
    </div>
  )
}
