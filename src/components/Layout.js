import React from "react"
import { Container, Row } from "react-bootstrap"

export function Layout({ children }) {
  return (
    <React.Fragment>
      <Container>{children}</Container>
    </React.Fragment>
  )
}

export function ContentLayout({ children }) {
  return (
    <Layout>
      <Row style={{ alignContent: "start", minHeight: "80vh" }}>{children}</Row>
    </Layout>
  )
}
