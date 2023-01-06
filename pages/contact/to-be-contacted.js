import React, { useEffect, useState } from "react"
import { ContentLayout } from "../../src/components/Layout"
import {
  Badge,
  ButtonGroup,
  Col,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap"
import { useRouter } from "next/router"
import {
  OPEN_CONTACT_FROM_EMAIL,
  RequestContact,
  STORAGE_CONTACT_HOURS,
  STORAGE_CONTACT_TYPE,
  STORAGE_SOURCE,
  URL_CHAT_WHATSAPP,
} from "../../src/constants/constants"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import {
  readSourceInUrl,
  updateRadioButtonSelectedInList,
} from "../../src/utils/main.utils"

import { useMutation } from "@apollo/client"
import { client, SAVE_DEMANDE_DE_CONTACT } from "../../apollo-client"
import * as StorageUtils from "../../src/utils/storage.utils"
import * as ContactUtils from "../../src/utils/contact.utils"
import * as TrackerUtils from "../../src/utils/tracker.utils"
import * as MainUtils from "../../src/utils/main.utils"
import Button from "@codegouvfr/react-dsfr/Button"

export default function ToBeContacted() {
  const router = useRouter()

  // Mettre à true pour rendre visible le bloc du chat
  const IS_CHAT_ENABLED = false

  const localeSelected = StorageUtils.getLocaleInLocalStorage()

  const [contactHours, setContactHours] = useState(defaultContactHours)
  const [itemValueType, setItemValueType] = useState()
  const [isSmsSelected, setSmsSelected] = useState(false)

  const [websiteSource, setWebsiteSource] = useState(false)

  useEffect(() => {
    const source = readSourceInUrl()
    if (source) {
      localStorage.setItem(STORAGE_SOURCE, source)
      setWebsiteSource(source)
    }
  }, [])

  useEffect(() => {
    setSmsSelected(itemValueType == RequestContact.type.sms)

    if (itemValueType == RequestContact.type.email)
      setContactHours(defaultContactHours)
  }, [itemValueType])

  const cancel = () => {
    router.back()
  }

  const goToContactForm = () => {
    localStorage.setItem(STORAGE_CONTACT_TYPE, itemValueType)
    localStorage.setItem(
      STORAGE_CONTACT_HOURS,
      convertHoursListInString(contactHours)
    )

    router.push({
      pathname: "/contact/contact-form",
    })
  }

  const onValidate = async (event) => {
    TrackerUtils.track(
      TrackerUtils.CATEG.contact,
      TrackerUtils.ACTION.contact_type,
      itemValueType
    )

    if (itemValueType == RequestContact.type.chat) activateChat()
    else goToContactForm()
  }

  const customToggleButton = (type) => (
    <ToggleButton
      className="contact-card"
      key={type.id}
      id={`radio-type-${type.id}`}
      type="radio"
      name="radio-type"
      value={type.id}
      checked={itemValueType === type.id}
      onChange={(e) => setItemValueType(e.currentTarget.value)}
    >
      <Row className="card-center-img">
        {type.badge}
        <img
          alt=""
          src={itemValueType === type.id ? type.iconSelected : type.icon}
          height={50}
        />
        {type.text}
      </Row>
    </ToggleButton>
  )

  const ButtonGroupType = () => (
    <ButtonGroup className="be-contacted-button-group">
      <Col>
        {IS_CHAT_ENABLED && (
          <>
            Maintenant par :
            <Row>
              {defaultContactTypes.byNow.map((type) => (
                <Col key={type.id}>{customToggleButton(type)}</Col>
              ))}
            </Row>
            <br />
          </>
        )}
        <fieldset>
          <legend>Selon mes disponibilités, par :</legend>
          <Row>
            {defaultContactTypes.byAvailabilities.map((type) => (
              <Col key={type.id}>{customToggleButton(type)}</Col>
            ))}
          </Row>
        </fieldset>
      </Col>
    </ButtonGroup>
  )

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
            setContactHours(updateRadioButtonSelectedInList(contactHours, type))
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

  const [sendContactQuery] = useMutation(SAVE_DEMANDE_DE_CONTACT, {
    client: client,
    onError: (err) => {
      console.error(err)
    },
  })

  const activateChat = async () => {
    ContactUtils.saveContactRequest(RequestContact.type.chat, sendContactQuery)
    ContactUtils.sendTrackerContactConfirmed(RequestContact.type.chat)
    MainUtils.openUrl(URL_CHAT_WHATSAPP)
  }

  return (
    <ContentLayout>
      <WidgetHeader title="être contacté(e)" locale={localeSelected} />
      <p>
        Se rendre disponible en tant que parent n'est pas toujours simple. Nous
        vous proposons de choisir le créneau et le type de prise de contact qui
        vous conviennent.
      </p>
      <p>Par quel moyen préférez-vous être contacté(e) ?</p>
      <ButtonGroupType />

      {isSmsSelected ? (
        <>
          <div className="margin-bottom-8">
            Quelles sont vos disponibilités pour être contacté(e) ? (du lundi au vendredi)
          </div>
          {buttonGroupHours()}
        </>
      ) : null}

      <Col className="be-contacted-bottom-buttons">
        {websiteSource !== OPEN_CONTACT_FROM_EMAIL && (
          <Button priority="secondary" onClick={cancel}>
            Annuler
          </Button>
        )}
        <Button
          disabled={!isValidButtonEnabled(itemValueType, contactHours)}
          onClick={onValidate}
        >
          Valider
        </Button>
      </Col>
    </ContentLayout>
  )
}

const defaultContactTypes = {
  byNow: [
    {
      icon: "../img/contact/chat.svg",
      iconSelected: "../img/contact/chat-selected.svg",
      id: RequestContact.type.chat,
      isChecked: false,
      text: "Par chat (sur WhatsApp)",
      badge: (
        <Badge pill bg="primary">
          MAINTENANT DISPONIBLE
        </Badge>
      ),
    },
  ],
  byAvailabilities: [
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
  ],
}

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

  return (
    itemValueType == RequestContact.type.email ||
    itemValueType == RequestContact.type.chat ||
    (itemValueType == RequestContact.type.sms && isHoursSelected)
  )
}
