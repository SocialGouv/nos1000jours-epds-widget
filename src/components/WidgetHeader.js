import { Col } from "react-bootstrap"
import Image from "next/image"
import { API_URL } from "../constants/constants"

export function WidgetHeader({ title, localeFlag }) {
  return (
    <Col className="widget-header">
      {title ? (
        <>
          <Image
            src="/img/logo-1000j.svg"
            alt="Logo 1000 premiers jours"
            height={40}
            width={40}
          />
          <h5 className="title-ddp">{title}</h5>
        </>
      ) : null}

      {localeFlag ? (
        <Image
          className="header-flag"
          alt="Drapeau de la langue"
          src={`${API_URL}${localeFlag}`}
          height={40}
          width={40}
        />
      ) : null}
    </Col>
  )
}
