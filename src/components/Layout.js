import React, { useState, useEffect } from "react"
import { Container, Row } from "react-bootstrap"
import { STORAGE_SOURCE } from "../constants/constants"
import * as StorageUtils from "../utils/storage.utils"
export function Layout({ children }) {
  return (
    <React.Fragment>
      <Container>{children}</Container>
    </React.Fragment>
  )
}

export function ContentLayout({ children }) {
  const source = StorageUtils.getInLocalStorage(STORAGE_SOURCE)
  const [height, setHeight] = useState("0px")

  useEffect(() => {
    if (source === "doctolib") {
      setHeight("0px")
    } else {
      setHeight("80vh")
    }
  }, [height])

  return (
    <Layout>
      <Row
        style={{
          alignContent: "start",
          minHeight: height,
        }}
      >
        {children}
      </Row>
    </Layout>
  )
}
