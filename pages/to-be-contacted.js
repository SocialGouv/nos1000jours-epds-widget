import React, { useEffect, useState } from "react"
import { ContentLayout } from "../src/components/Layout"
import { } from "@dataesr/react-dsfr"
import { ButtonGroup, Col, Row, ToggleButton } from "react-bootstrap"

const SMS = "sms"
const EMAIL = "email"

export default function ToBeContacted() {
  const [contactType, setContactType] = useState(defaultContactTypes)
  const [contactHours, setContactHours] = useState(defaultContactHours)

  const [itemValueType, setItemValueType] = useState()
  const [itemValueHours, setItemValueHours] = useState()
  const [isSmsSelected, setSmsSelected] = useState(false)

  const isValidButtonEnabled = () => (itemValueType == EMAIL || (itemValueType == SMS && itemValueHours))

  useEffect(() => {
    setSmsSelected(itemValueType == SMS)
  }, [itemValueType])

  const cancel = () => {
    // TODO: bouton annuler
    // retour à l'écran démarrer ?
  }

  return (
    <ContentLayout>
      <h5 className="title-ddp">être contacté(e)</h5>
      <p>
        Se rendre disponible en tant que parent n'est pas toujours simple. Nous
        vous proposons de choisir le créneau et le type de prise de contact qui
        vous conviennent.
      </p>
      <p>
        Par quel moyen préférez-vous être contacté(e) ?
      </p>
      <ButtonGroup>
        {contactType.map((type, idx) =>
          <ToggleButton
            className="contact-card"
            key={idx}
            id={`radio-type-${idx}`}
            type="radio"
            name="radio"
            value={type.id}
            checked={itemValueType === type.id}
            onChange={(e) => setItemValueType(e.currentTarget.value)}
          >
            <Row style={{ justifyContent: "center" }}>
              <img alt="" src={itemValueType === type.id ? type.iconSelected : type.icon} height={50} />
              {type.text}
            </Row>
          </ToggleButton>
        )}
      </ButtonGroup>

      {isSmsSelected ?
        <>
          <p>
            Quelles sont vos disponibilités pour être contacté(e) ? (du lundi au vendredi)
          </p>
          <ButtonGroup>
            {contactHours.map((type, idx) =>
              <ToggleButton
                className="contact-card"
                key={idx}
                id={`radio-hours-${idx}`}
                type="radio"
                name="radio"
                value={type.id}
                checked={itemValueHours === type.id}
                onChange={(e) => setItemValueHours(e.currentTarget.value)}
              >
                <Row style={{ justifyContent: "center" }}>
                  <img alt="" src={itemValueHours === type.id ? type.iconSelected : type.icon} height={50} />
                  {type.text}
                </Row>
              </ToggleButton>
            )}
          </ButtonGroup>
        </>
        : null}

      <Col className="be-contacted-bottom-buttons">
        <button className="fr-btn fr-btn--secondary" onClick={cancel()}>Annuler</button>
        <button className="fr-btn" disabled={!isValidButtonEnabled()}>Valider</button>
      </Col>
    </ContentLayout>
  )
}

const defaultContactTypes = [
  {
    icon: "../img/contact/sms.svg",
    iconSelected: "../img/contact/sms-selected.svg",
    id: SMS,
    isChecked: false,
    text: "Par SMS",
  },
  {
    icon: "../img/contact/email-contact.svg",
    iconSelected: "../img/contact/email-contact-selected.svg",
    id: EMAIL,
    isChecked: false,
    text: "Par email",
  },
];

const defaultContactHours = [
  {
    hours: "9h - 12h",
    icon: "../img/contact/soleil-matin.svg",
    iconSelected: "../img/contact/soleil-matin-selected.svg",
    id: "matin",
    isChecked: false,
    text: "En matinée",
  },
  {
    hours: "12h - 14h",
    icon: "../img/contact/soleil-midi.svg",
    iconSelected: "../img/contact/soleil-midi-selected.svg",
    id: "midi",
    isChecked: false,
    text: "Le midi",
  },
  {
    hours: "14h - 17h30",
    icon: "../img/contact/soleil-soir.svg",
    iconSelected: "../img/contact/soleil-soir-selected.svg",
    id: "soir",
    isChecked: false,
    text: "L'après-midi",
  },
];
