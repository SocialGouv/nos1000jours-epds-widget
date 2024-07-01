import React, { useState, useEffect } from "react"
import {
  RequestContact,
  STORAGE_SOURCE,
  STORAGE_ACTIVATION_CONTACT,
  STORAGE_TEST_DEMOGRAPHIC_DPT_CODE,
  STORAGE_TEST_DEMOGRAPHIC_DPT_LIBELLE,
  URL_CHAT_WHATSAPP,
} from "../../constants/constants"
import { Form } from "../../constants/specificLabels"
import { useMutation } from "@apollo/client"
import { Alert, Col } from "react-bootstrap"
import * as StorageUtils from "../../utils/storage.utils"
import * as TrackerUtils from "../../utils/tracker.utils"
import {
  client,
  EPDS_CONTACT_INFORMATION,
  SAVE_CONTACT,
  SAVE_DEMANDE_DE_CONTACT,
} from "../../../apollo-client"
import { Modal } from "react-bootstrap"
import * as ContactUtils from "../../utils/contact.utils"
import { phoneNumberFormatting, convertDateToISO } from "../../utils/main.utils"
import { useRouter } from "next/router"

export const ContactForm = ({
  contactType,
  setPropsPhoneValid,
  setPropsPhoneConfirmValid,
  canSend,
  contactHours,
}) => {
  const router = useRouter()
  const [isPhoneValid, setPhoneValid] = useState()
  const [inputPhoneValue, setInputPhoneValue] = useState()
  const [inputPhoneConfirmValue, setInputPhoneConfirmValue] = useState()
  const [isPhoneConfirmValid, setPhoneConfirmValid] = useState()
  const [isPhoneConfirmMatch, setPhoneConfirmMatch] = useState()
  const [showWhatsappRedirectMessage, setShowWhatsappRedirectMessage] =
    useState(false)

  const source = StorageUtils.getInLocalStorage(STORAGE_SOURCE)
  const requiredField = <p className="required-field">{Form.required}</p>
  const dptCode = StorageUtils.getInLocalStorage(
    STORAGE_TEST_DEMOGRAPHIC_DPT_CODE
  )
  const dptLibelle = StorageUtils.getInLocalStorage(
    STORAGE_TEST_DEMOGRAPHIC_DPT_LIBELLE
  )
  const activationContact = JSON.parse(
    StorageUtils.getInLocalStorage(STORAGE_ACTIVATION_CONTACT)
  )

  const cancel = () => {
    router.back()
  }

  useEffect(() => {
    setPropsPhoneConfirmValid(isPhoneConfirmValid && isPhoneConfirmMatch)
  }, [isPhoneConfirmValid, isPhoneConfirmMatch])

  const goToConfirmation = () => {
    router.push({
      pathname: "/contact/contact-confirmed",
    })
  }
  const [sendEmailContactQuery] = useMutation(EPDS_CONTACT_INFORMATION, {
    client: client,
    onCompleted: () => {
      ContactUtils.saveContactRequest(contactType, sendContactQuery)
      if (
        contactType === RequestContact.type.whatsapp &&
        activationContact?.whatsapp_redirect_message?.length > 0
      ) {
        setShowWhatsappRedirectMessage(true)
      } else {
        goToConfirmation()
      }
    },
    onError: (err) => {
      console.error(err)
    },
  })

  const [sendContactQuery] = useMutation(SAVE_DEMANDE_DE_CONTACT, {
    client: client,
    onError: (err) => {
      console.error(err)
    },
  })

  const [sendContactMamanBluesQuery] = useMutation(SAVE_CONTACT, {
    client: client,
    onError: (err) => {
      console.error(err)
    },
  })

  const sendContactRequest = async (inputs) => {
    if (!canSend) return
    const name = `${inputs.inputName.value} [${source}]`
    const phoneNumber = phoneNumberFormatting(inputs.inputPhone.value)
    const scoreQuestionDix = StorageUtils.getInLocalStorage("scoreQuestionDix")

    await sendEmailContactQuery({
      variables: {
        email: "",
        horaires: contactHours,
        moyen: contactType,
        prenom: name,
        scoreQuestionDix: scoreQuestionDix,
        telephone: phoneNumber,
        langue: StorageUtils.getLocaleInLocalStorage().libelle_francais,
      },
    })
  }

  const sendContactMamanBluesRequest = async (inputs) => {
    if (!canSend) return

    const phoneNumber = phoneNumberFormatting(inputs.inputPhone.value)

    await sendContactMamanBluesQuery({
      variables: {
        prenom: inputs.inputName.value,
        typeDeContact: contactType,
        departementCode: dptCode,
        departementLibelle: dptLibelle,
        datePriseContact: convertDateToISO(new Date()),
        personneAccompagnee: "nouveau",
        commentaire: "",
        widgetEpdsSource: source,
        email: "",
        numero_telephone: phoneNumber,
      },
    })
  }

  const sendForm = async (event) => {
    event.preventDefault()
    sendContactRequest(event.target)
    sendContactMamanBluesRequest(event.target)
  }

  const sendTrackerContactType = (typeContact) => {
    if (typeContact) {
      TrackerUtils.trackerForContact(TrackerUtils.ACTION.confirmation)
      TrackerUtils.trackerForContact(
        ContactUtils.trackerContactName(typeContact)
      )
    }
  }

  const phoneInput = (isRequired) => (
    <div
      className={`form-group fr-input-group ${
        isPhoneValid ? "fr-input-group--valid" : ""
      }`}
    >
      <label htmlFor="inputPhone">
        Votre numéro de téléphone {isRequired ? "*" : null} :
      </label>
      <input
        type="tel"
        className={`form-control fr-input ${
          isPhoneValid ? "custom-input-valid" : ""
        }`}
        id="inputPhone"
        name="inputPhone"
        pattern="[0-9]{10}"
        onChange={(e) => {
          setInputPhoneValue(e.target.value)
          setPhoneValid(e.target.validity.valid)
          setPropsPhoneValid(e.target.validity.valid)
          setPhoneConfirmMatch(inputPhoneConfirmValue === e.target.value)
        }}
        placeholder="Écrivez ici le numéro pour vous contacter"
        required={isRequired}
      />

      {isPhoneValid === false && (
        <InputError error="Le numéro de téléphone n'est pas au bon format" />
      )}
      {isRequired ? requiredField : null}
    </div>
  )

  const phoneConfirmInput = (isRequired) => (
    <div
      className={`form-group fr-input-group ${
        isPhoneConfirmValid ? "fr-input-group--valid" : ""
      }`}
    >
      <label htmlFor="inputPhoneConfirm">
        Confirmez votre numéro de téléphone {isRequired ? "*" : null} :
      </label>
      <input
        type="tel"
        className={`form-control fr-input ${
          isPhoneConfirmValid ? "custom-input-valid" : ""
        }`}
        id="inputPhoneConfirm"
        name="inputPhoneConfirm"
        pattern="[0-9]{10}"
        onChange={(e) => {
          setInputPhoneConfirmValue(e.target.value)
          setPhoneConfirmValid(e.target.validity.valid)
          setPhoneConfirmMatch(inputPhoneValue === e.target.value)
        }}
        placeholder="Confirmez ici le numéro pour vous contacter"
        required={isRequired}
      />

      {isPhoneConfirmValid === false && (
        <InputError error="Le numéro de téléphone n'est pas au bon format" />
      )}
      {isPhoneConfirmMatch === false && (
        <InputError error="Le numéro ne correspond pas à celui renseigné précédemment" />
      )}
      {isRequired ? requiredField : null}
    </div>
  )

  return (
    <>
      <Modal
        show={showWhatsappRedirectMessage}
        centered
        size="md"
        className="modal-info"
      >
        <Modal.Header className="fr-modal__header header-choose-modal">
          <b>Information</b>
        </Modal.Header>

        <Modal.Body style={{ textAlign: "center" }}>
          <div>{activationContact?.whatsapp_redirect_message} </div>
        </Modal.Body>

        <Modal.Footer
          style={{ alignSelf: "center", borderTop: "none", margin: 20 }}
        >
          <button
            className="fr-btn"
            onClick={() => {
              setShowWhatsappRedirectMessage(false)
              goToConfirmation()
              setTimeout(() => {
                window.open(URL_CHAT_WHATSAPP, "_blank")
              }, 500)
            }}
          >
            Ok
          </button>
        </Modal.Footer>
      </Modal>
      {(contactType === RequestContact.type.sms ||
        contactType === RequestContact.type.whatsapp) && (
        <form className="contact-form" onSubmit={sendForm}>
          <div className={`form-group fr-input-group`}>
            <label htmlFor="inputName">Votre prénom :</label>
            <input
              type="text"
              className={`form-control fr-input`}
              id="inputName"
              name="inputName"
              placeholder={Form.placeholder.name}
            />
          </div>

          {phoneInput(true)}
          {phoneConfirmInput(true)}
          <Col className="be-contacted-bottom-buttons">
            <button className="fr-btn fr-btn--secondary" onClick={cancel}>
              Annuler
            </button>
            <button
              className="fr-btn"
              type="submit"
              disabled={!canSend}
              onClick={() => {
                sendTrackerContactType(contactType)
              }}
            >
              Valider
            </button>
          </Col>
        </form>
      )}
    </>
  )
}

const InputError = ({ error }) => (
  <p id="text-input-error-desc-error" className="fr-error-text">
    {error}
  </p>
)
