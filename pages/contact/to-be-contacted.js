import React, { useEffect, useState } from "react"
import { ContentLayout } from "../../src/components/Layout"
import { } from "@dataesr/react-dsfr"
import {
  ButtonGroup,
  Col,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap"
import { useRouter } from "next/router"
import {
  RequestContact,
  STORAGE_CONTACT_HOURS,
  STORAGE_CONTACT_TYPE,
} from "../../src/constants/constants"
import { WidgetHeader } from "../../src/components/WidgetHeader"

export default function ToBeContacted() {
  const router = useRouter()

  const [contactHours, setContactHours] = useState(defaultContactHours)
  const [itemValueType, setItemValueType] = useState()
  const [isSmsSelected, setSmsSelected] = useState(false)

  useEffect(() => {
    setSmsSelected(itemValueType == RequestContact.type.sms)

    if (itemValueType == RequestContact.type.email)
      setContactHours(defaultContactHours)
  }, [itemValueType])

  const cancel = () => {
    router.back()
  }

  const goToContactForm = async (event) => {
    localStorage.setItem(STORAGE_CONTACT_TYPE, itemValueType)
    localStorage.setItem(
      STORAGE_CONTACT_HOURS,
      convertHoursListInString(contactHours)
    )

    router.push({
      pathname: "/contact/contact-form",
    })
  }

  const ButtonGroupType = () => (
    <ButtonGroup className="be-contacted-button-group">
      {defaultContactTypes.map((type, idx) => (
        <ToggleButton
          className="contact-card"
          key={idx}
          id={`radio-type-${idx}`}
          type="radio"
          name="radio-type"
          value={type.id}
          checked={itemValueType === type.id}
          onChange={(e) => setItemValueType(e.currentTarget.value)}
        >
          <Row className="card-center-img">
            <img
              alt=""
              src={itemValueType === type.id ? type.iconSelected : type.icon}
              height={50}
            />
            {type.text}
          </Row>
        </ToggleButton>
      ))}
    </ButtonGroup>
  )

  const updateItemSelected = (list, itemSelected) =>
    list.map((item) => {
      if (item.id === itemSelected.id)
        return { ...item, isChecked: !itemSelected.isChecked }

      return item
    })

  const buttonGroupHours = () => (
    <ToggleButtonGroup
      type="checkbox"
      className="be-contacted-button-group-checkbox"
    >
      {contactHours.map((type, idx) => (
        <ToggleButton
          className="contact-card"
          key={idx}
          id={`checkbox-hours-${idx}`}
          type="checkbox"
          name="checkbox-hours"
          value={type.id}
          onChange={(e) =>
            setContactHours(updateItemSelected(contactHours, type))
          }
        >
          <Row className="card-center-img">
            <img
              alt=""
              src={type.isChecked ? type.iconSelected : type.icon}
              height={50}
            />
            {type.text}
          </Row>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )

  return (
    <ContentLayout>
      <WidgetHeader title="être contacté(e)" />
      <p>
        Se rendre disponible en tant que parent n'est pas toujours simple. Nous
        vous proposons de choisir le créneau et le type de prise de contact qui
        vous conviennent.
      </p>
      <p>Par quel moyen préférez-vous être contacté(e) ?</p>
      <ButtonGroupType />

      {isSmsSelected ? (
        <>
          <p>
            Quelles sont vos disponibilités pour être contacté(e) ? (du lundi au vendredi)
          </p>
          {buttonGroupHours()}
        </>
      ) : null}

      <Col className="be-contacted-bottom-buttons">
        <button className="fr-btn fr-btn--secondary" onClick={cancel}>
          Annuler
        </button>
        <button
          className="fr-btn"
          disabled={!isValidButtonEnabled(itemValueType, contactHours)}
          onClick={goToContactForm}
        >
          Valider
        </button>
      </Col>
    </ContentLayout>
  )
}

const defaultContactTypes = [
  {
    icon: "../img/contact/sms.svg",
    iconSelected: "../img/contact/sms-selected.svg",
    id: RequestContact.type.sms,
    isChecked: false,
    text: "Par SMS",
  },
  {
    icon: "../img/contact/email-contact.svg",
    iconSelected: "../img/contact/email-contact-selected.svg",
    id: RequestContact.type.email,
    isChecked: false,
    text: "Par email",
  },
]

const defaultContactHours = [
  {
    hours: "9h - 12h",
    icon: "../img/contact/soleil-matin.svg",
    iconSelected: "../img/contact/soleil-matin-selected.svg",
    id: RequestContact.hours.morning,
    isChecked: false,
    text: "En matinée",
  },
  {
    hours: "12h - 14h",
    icon: "../img/contact/soleil-midi.svg",
    iconSelected: "../img/contact/soleil-midi-selected.svg",
    id: RequestContact.hours.noon,
    isChecked: false,
    text: "Le midi",
  },
  {
    hours: "14h - 17h30",
    icon: "../img/contact/soleil-soir.svg",
    iconSelected: "../img/contact/soleil-soir-selected.svg",
    id: RequestContact.hours.afternoon,
    isChecked: false,
    text: "L'après-midi",
  },
]

/**
 * @param {Array} hours Tableau des heures
 * @returns La liste des heures au format String
 */
export const convertHoursListInString = (hours) =>
  hours.reduce(
    (hoursString, hour) =>
      hour.isChecked ? `${hoursString} ${hour.id}` : hoursString,
    ""
  )

/**
 * @param {RequestContact.type} itemValueType Type du mode de contact sélectionné (Email/ SMS)
 * @param {Array} contactHours Tableau des heures
 * @returns boolean de la validité des choix seléctionnés
 */
export const isValidButtonEnabled = (itemValueType, contactHours) => {
  const isHoursSelected =
    contactHours?.find((item) => item.isChecked) != undefined

  return itemValueType == RequestContact.type.email ||
    (itemValueType == RequestContact.type.sms && isHoursSelected)
}
