import { Col } from "react-bootstrap"

export function WidgetHeader({ title }) {
  return (
    <Col style={{ display: "flex", alignItems: "center", marginBlock: 25 }}>
      <img
        src="/img/logo-1000j.svg"
        height={40}
        style={{ marginInline: 20 }}
        alt="Logo 1000 premiers jours"
      />
      <h5 className="title-ddp" style={{ flexGrow: 1 }}>
        {title}
      </h5>
    </Col>
  )
}
