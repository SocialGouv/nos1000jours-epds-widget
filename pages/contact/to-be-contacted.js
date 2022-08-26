import React, { useEffect, useState } from "react"
import { ContentLayout } from "../../src/components/Layout"
import { } from "@dataesr/react-dsfr"
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Modal,
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
} from "../../src/constants/constants"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import {
  readSourceInUrl,
  updateRadioButtonSelectedInList,
} from "../../src/utils/main.utils"
import * as StorageUtils from "../../src/utils/storage.utils"
import {
  ACTION,
  CATEG,
  CONTACT_SENT,
  trackerClick,
} from "../../src/utils/tracker.utils"
import {
  hideChatButton,
  zammadChatParameters,
} from "../../src/utils/chat.utils"

export default function ToBeContacted() {
  const router = useRouter()

  const localeSelected = StorageUtils.getLocaleInLocalStorage()
  const [chatButtonElement, setChatButtonElement] = useState()
  const [chatLoaded, setChatLoaded] = useState(false)

  const [contactHours, setContactHours] = useState(defaultContactHours)
  const [itemValueType, setItemValueType] = useState()
  const [isSmsSelected, setSmsSelected] = useState(false)

  const [websiteSource, setWebsiteSource] = useState(false)

  //const [showChatModal, setShowChatModal] = useState(false)
  //const handleCloseChatModal = () => setShowChatModal(false)
  //const handleShowChatModal = () => setShowChatModal(true)

  const [showEliseAbsentModal, setShowEliseAbsentModal] = useState(false)
  const handleCloseEliseAbsentModal = () => setShowEliseAbsentModal(false)
  const handleShowEliseAbsentModal = () => setShowEliseAbsentModal(true)

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
    trackerClick(CATEG.contact, ACTION.contact_type, itemValueType)

    if (itemValueType == RequestContact.type.chat) {
      const isChatInactive = chatButtonElement.classList.contains("is-inactive")
      isChatInactive ? handleShowEliseAbsentModal() : activeChat() //handleShowChatModal()
    } else goToContactForm()
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
        {/* Cacher le bouton Chat en attendant de résoudre le problème du chat
        Maintenant par :
        <Row>
          {defaultContactTypes.byNow.map((type) => (
            <Col key={type.id}>{customToggleButton(type)}</Col>
          ))}
        </Row>
        <br /> */}
        Selon mes disponibilités, par :
        <Row>
          {defaultContactTypes.byAvailabilities.map((type) => (
            <Col key={type.id}>{customToggleButton(type)}</Col>
          ))}
        </Row>
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

  const activeChat = () => {
    trackerClick(CATEG.contact, ACTION.contact_confirm_sent, CONTACT_SENT.chat)
    chatButtonElement.click()
    router.back()
  }

  const closeInactiveChat = () => {
    trackerClick(
      CATEG.contact,
      ACTION.contact_confirm_sent,
      CONTACT_SENT.no_chat
    )
    handleCloseEliseAbsentModal()
  }

  const Chat = () => {
    useEffect(() => {
      if (chatLoaded) return

      try {
        //@ts-ignore
        new ZammadChat(zammadChatParameters)
      } catch (e) {
        console.error(`Erreur ZammadChat : ${e}`)
      }

      setChatLoaded(true)
    }, [])

    return <></>
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

      <Chat />
      {hideChatButton(setChatButtonElement)}

      {/* Mis en commentaire pour démarrer le chat dès la validation du choix au lieux de passer par la modale de confirmation
      <Modal
        show={showChatModal}
        onHide={handleCloseChatModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Être contacté(e) par chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Vous pouvez converser avec Elise entre 09h et 17h30 du Lundi au
          Vendredi. Le chat va s'ouvrir une fois que vous validez votre choix.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChatModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={activeChat}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Modal
        show={showEliseAbsentModal}
        onHide={handleCloseEliseAbsentModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Être contacté(e) par chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Vous pouvez converser avec Elise entre 09h et 17h30 du Lundi au
          Vendredi. Elle n'est pas joignable en ce moment. Vous pouvez lui laisser un
          message par SMS ou par mail, elle vous répondra dès que possible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeInactiveChat}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
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
      text: "Par chat",
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

  return itemValueType == RequestContact.type.email ||
    itemValueType == RequestContact.type.chat ||
    (itemValueType == RequestContact.type.sms && isHoursSelected)
}
