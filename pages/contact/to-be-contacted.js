import React, { useEffect, useState } from "react"
import {} from "@dataesr/react-dsfr"
import { useRouter } from "next/router"
import { Crisp } from "crisp-sdk-web"
import { useCalendlyEventListener, PopupModal } from "react-calendly"
import { useMutation } from "@apollo/client"
import {
  ButtonGroup,
  Col,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap"

import { ContentLayout } from "../../src/components/Layout"
import {
  CRISP_CHAT_ID,
  OPEN_CONTACT_FROM_EMAIL,
  RequestContact,
  STORAGE_CONTACT_HOURS,
  STORAGE_CONTACT_TYPE,
  STORAGE_SOURCE,
  STORAGE_TEST_ABC,
  URL_CHAT_WHATSAPP,
} from "../../src/constants/constants"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import {
  readSourceInUrl,
  updateRadioButtonSelectedInList,
} from "../../src/utils/main.utils"
import { client, SAVE_DEMANDE_DE_CONTACT } from "../../apollo-client"
import * as StorageUtils from "../../src/utils/storage.utils"
import * as ContactUtils from "../../src/utils/contact.utils"
import * as TrackerUtils from "../../src/utils/tracker.utils"
import * as AbTestingUtils from "../../src/utils/ab-testing/ab-testing.utils.js"

const CHAT_TYPE = {
  whatsapp: "Whats App",
  crisp: "Crisp",
}

// A modifier lorsque l'on veut modifier le chat utilisé (crisp, whats app)
const chatNameUsed = CHAT_TYPE.crisp

export default function ToBeContacted() {
  const router = useRouter()

  const localeSelected = StorageUtils.getLocaleInLocalStorage()
  const test = StorageUtils.getInLocalStorage(STORAGE_TEST_ABC)

  const [contactHours, setContactHours] = useState(defaultContactHours)
  const [itemValueType, setItemValueType] = useState()
  const [isSmsSelected, setSmsSelected] = useState(false)

  const [websiteSource, setWebsiteSource] = useState(false)
  const [isChatEnabled, setChatEnabled] = useState()
  const [isCalendlyValide, setCalendlyValide] = useState(false)
  const [isCalendlyModalOpen, setCalendlyModalOpen] = useState(false)

  useEffect(() => {
    const source = readSourceInUrl()
    if (source) {
      localStorage.setItem(STORAGE_SOURCE, source)
      setWebsiteSource(source)
    }
    initChat()
  }, [])

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      trackerForAbTestingContact()
      setCalendlyValide(true)
    },
  })
  const trackerForAbTesting = (label, confirmation) => {
    TrackerUtils.track(TrackerUtils.CATEG.test, confirmation, label)
  }

  const trackerForAbTestingContact = () => {
    const contactType = StorageUtils.getInLocalStorage(STORAGE_CONTACT_TYPE)
    ContactUtils.sendTrackerContactConfirmed(contactType)
  }

  useEffect(() => {
    switch (test) {
      case AbTestingUtils.TEST.A:
      case AbTestingUtils.TEST.D:
        trackerForAbTesting("Chat", TrackerUtils.CONTACT_SENT.chat)
        trackerForAbTesting("SMS", TrackerUtils.CONTACT_SENT.sms)
        trackerForAbTesting("Email", TrackerUtils.CONTACT_SENT.mail)
        trackerForAbTestingContact()
        break
      case AbTestingUtils.TEST.B:
        trackerForAbTesting("Chat", TrackerUtils.CONTACT_SENT.chat)
        trackerForAbTesting(
          "Entretien téléphonique",
          TrackerUtils.CONTACT_SENT.rendezvous
        )
        trackerForAbTestingContact()
        break
      case AbTestingUtils.TEST.C:
        trackerForAbTesting("SMS", TrackerUtils.CONTACT_SENT.sms)
        trackerForAbTesting("Email", TrackerUtils.CONTACT_SENT.mail)
        trackerForAbTesting(
          "Entretien téléphonique",
          TrackerUtils.CONTACT_SENT.rendezvous
        )
        trackerForAbTestingContact()
        break
      default:
        break
    }
  })

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
  if (isCalendlyValide) {
    router.push({
      pathname: "/contact/contact-confirmed",
    })
  }

  const CustomToggleButton = (type) => (
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
        <img
          alt=""
          src={itemValueType === type.id ? type.iconSelected : type.icon}
          height={50}
        />
        {type.text}
      </Row>
    </ToggleButton>
  )
  const CustomCalendlyButton = (type) => (
    <div>
      <ToggleButton
        className="contact-card"
        key={type.id}
        id={`radio-type-${type.id}`}
        type="radio"
        name="radio-type"
        value={type.id}
        checked={itemValueType === type.id}
        onClick={() => {
          setCalendlyModalOpen(true)
          localStorage.setItem(STORAGE_CONTACT_TYPE, "rendez-vous")
        }}
      >
        <Row className="card-center-img">
          <img alt="" src={type.icon} height={50} />
          {type.text}
        </Row>
      </ToggleButton>
      <PopupModal
        url="https://calendly.com/rdv-nos1000jours/30min"
        onModalClose={() => setCalendlyModalOpen(false)}
        open={isCalendlyModalOpen}
        rootElement={document.documentElement}
      />
    </div>
  )

  const ButtonGroupType = () => (
    <ButtonGroup className="be-contacted-button-group">
      {(test === "A" || test === "D") && (
        <Col>
          <ChatComponent />
          <legend>Selon mes disponibilités, par :</legend>
          <MailAndSmsComponent isChat={true} />
        </Col>
      )}
      {test === "B" && (
        <Col>
          <legend>Selon mes disponibilités, par :</legend>
          <CalendlyComponent isChat={false} />
          <ChatComponent />
        </Col>
      )}
      {test === "C" && (
        <Col>
          <legend>Selon mes disponibilités, par :</legend>
          <CalendlyComponent isChat={false} />
          <MailAndSmsComponent isChat={false} />
        </Col>
      )}
    </ButtonGroup>
  )

  const ChatComponent = () => {
    return (
      <>
        {isChatEnabled && (
          <>
            Maintenant par :
            <Row>
              {defaultContactTypes.byNow.map((type) => (
                <Col key={type.id}>{CustomToggleButton(type)}</Col>
              ))}
            </Row>
            <br />
          </>
        )}
      </>
    )
  }

  const MailAndSmsComponent = () => (
    <fieldset>
      <Row>
        {defaultContactTypes.byAvailabilities.map((type) => (
          <Col key={type.id}>{CustomToggleButton(type)}</Col>
        ))}
      </Row>
    </fieldset>
  )

  const CalendlyComponent = () => {
    return (
      <>
        <Row>
          {defaultContactTypes.byAppointment.map((type) => (
            <Col key={type.id}>{CustomCalendlyButton(type)}</Col>
          ))}
        </Row>
      </>
    )
  }
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

  const initChat = () => {
    if (chatNameUsed === CHAT_TYPE.crisp) {
      Crisp.configure(CRISP_CHAT_ID)
      Crisp.chat.hide()
      setChatEnabled(ContactUtils.isMamanBluesAvailableHours())
    }
  }

  const activateChat = () => {
    if (chatNameUsed === CHAT_TYPE.whatsapp) openWhatsapp()
    if (chatNameUsed === CHAT_TYPE.crisp) openCrisp()
  }

  const openWhatsapp = async () => {
    ContactUtils.saveContactRequest(RequestContact.type.chat, sendContactQuery)
    ContactUtils.sendTrackerContactConfirmed(RequestContact.type.chat)
    window.open(URL_CHAT_WHATSAPP, "_blank")
  }

  const openCrisp = () => {
    Crisp.chat.show()
    Crisp.chat.open()
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
            Quelles sont vos disponibilités pour être contacté(e) ? (du lundi au
            vendredi)
          </div>
          {buttonGroupHours()}
        </>
      ) : null}

      <Col className="be-contacted-bottom-buttons">
        {websiteSource !== OPEN_CONTACT_FROM_EMAIL && (
          <button className="fr-btn fr-btn--secondary" onClick={cancel}>
            Annuler
          </button>
        )}
        <button
          className="fr-btn"
          disabled={!isValidButtonEnabled(itemValueType, contactHours)}
          onClick={onValidate}
        >
          Valider
        </button>
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
      text: `Chat`,
    },
  ],
  byAvailabilities: [
    {
      icon: "../img/contact/sms.svg",
      iconSelected: "../img/contact/sms-selected.svg",
      id: RequestContact.type.sms,
      isChecked: false,
      text: "SMS",
    },
    {
      icon: "../img/contact/email-contact.svg",
      iconSelected: "../img/contact/email-contact-selected.svg",
      id: RequestContact.type.email,
      isChecked: false,
      text: "Email",
    },
  ],
  byAppointment: [
    {
      icon: "../img/contact/icone-appel.svg",
      id: RequestContact.type.rendezvous,
      text: "Entretien téléphonique",
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
    itemValueType == RequestContact.type.rendezvous ||
    (itemValueType == RequestContact.type.sms && isHoursSelected)
  )
}
