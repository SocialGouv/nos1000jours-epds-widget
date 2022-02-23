import { gql, useQuery } from "@apollo/client"
import { GET_LOCALES } from "@socialgouv/nos1000jours-lib"
import React, { useState } from "react"
import {
  ButtonGroup,
  Col,
  Modal,
  Row,
  Spinner,
  ToggleButton,
} from "react-bootstrap"
import { client } from "../../apollo-client"
import { API_URL, DEFAULT_LOCAL } from "../constants/constants"

export function ChooseEpdsLocale({ show, setShow, setLocaleSelected }) {
  let locales
  const [selected, setSelected] = useState()

  const getLocalesInDatabase = () => {
    const { loading, error, data } = useQuery(gql(GET_LOCALES), {
      client: client,
    })

    if (loading) return <Spinner animation="border" />
    if (error) return <p>Error</p>
    locales = data.locales

    return data.locales.map((locale, index) => (
      <Col key={index} md="6">
        <FlagButton locale={locale} />
      </Col>
    ))
  }

  const FlagButton = ({ locale }) => (
    <ToggleButton
      className="fr-btn fr-btn--secondary flag-button"
      value={locale.identifiant}
      name="radio"
      type="radio"
      id={locale.identifiant}
      checked={selected === locale.identifiant}
      onChange={(e) => handleClick(e.currentTarget.value)}
    >
      <img
        alt="Drapeau"
        src={API_URL + locale.drapeau.url}
        height={26}
        style={{ marginRight: 10, borderRadius: 5 }}
      />
      {locale.libelle_francais}
      {locale.identifiant != DEFAULT_LOCAL
        ? ` / ${locale.libelle_langue}`
        : null}
    </ToggleButton>
  )

  const handleClick = (value) => {
    setSelected(value)
  }

  const onCancel = () => {
    setShow(false)
    setSelected()
  }

  const onValidate = () => {
    const locale = locales.find((element) => element.identifiant === selected)
    setLocaleSelected(locale)

    setShow(false)
  }

  return (
    <>
      <Modal show={show} centered size="lg" className="modal-choose-locale">
        <Modal.Header className="fr-modal__header header-choose-modal">
          <b>Changer de langue</b>
        </Modal.Header>

        <Modal.Body style={{ textAlign: "center" }}>
          <div>Choisissez parmi cette liste la langue que vous souhaitez :</div>

          <ButtonGroup className="mb-2">
            <Row style={{ marginTop: 20 }}>{getLocalesInDatabase()}</Row>
          </ButtonGroup>
        </Modal.Body>

        <Modal.Footer
          style={{ alignSelf: "center", borderTop: "none", margin: 20 }}
        >
          <button className="fr-btn fr-btn--secondary" onClick={onCancel}>
            Annuler
          </button>
          <div style={{ width: 20 }} />
          <button className="fr-btn" onClick={onValidate}>
            Valider
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
