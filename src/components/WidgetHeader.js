import { Col } from "react-bootstrap"

export function WidgetHeader({ title }) {
  return (
    <Col className="widget-header">
      <img src="/img/logo-1000j.svg" alt="Logo 1000 premiers jours" />
      <h5 className="title-ddp">{title}</h5>
    </Col>
  )
}
