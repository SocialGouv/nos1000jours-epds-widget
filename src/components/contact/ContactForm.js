import React, { useState } from "react"
import {
  RequestContact,
  STORAGE_SOURCE,
  STORAGE_TEST_DEMOGRAPHIC_DPT_CODE,
  STORAGE_TEST_DEMOGRAPHIC_DPT_LIBELLE,
} from "../../constants/constants"
import { Form } from "../../constants/specificLabels"
import { useMutation } from "@apollo/client"
import { Col } from "react-bootstrap"
import * as StorageUtils from "../../utils/storage.utils"
import * as TrackerUtils from "../../utils/tracker.utils"
import {
  client,
  EPDS_CONTACT_INFORMATION,
  SAVE_CONTACT,
  SAVE_DEMANDE_DE_CONTACT,
} from "../../../apollo-client"
import * as ContactUtils from "../../utils/contact.utils"
import { phoneNumberFormatting, convertDateToISO } from "../../utils/main.utils"
import { useRouter } from "next/router"

export const ContactForm = ({
  contactType,
  setPropsPhoneValid,
  canSend,
  contactHours,
}) => {
  const router = useRouter()
  const [isPhoneValid, setPhoneValid] = useState()
  const source = StorageUtils.getInLocalStorage(STORAGE_SOURCE)
  const requiredField = <p className="required-field">{Form.required}</p>
  const dptCode = StorageUtils.getInLocalStorage(
    STORAGE_TEST_DEMOGRAPHIC_DPT_CODE
  )
  const dptLibelle = StorageUtils.getInLocalStorage(
    STORAGE_TEST_DEMOGRAPHIC_DPT_LIBELLE
  )
  const cancel = () => {
    router.back()
  }

  const goToConfirmation = () => {
    router.push({
      pathname: "/contact/contact-confirmed",
    })
  }
  const [sendEmailContactQuery] = useMutation(EPDS_CONTACT_INFORMATION, {
    client: client,
    onCompleted: () => {
      ContactUtils.saveContactRequest(contactType, sendContactQuery)

      goToConfirmation()
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
        // naissanceDernierEnfant: "",
        nombreEnfants: 0,
        prenom: name,
        scoreQuestionDix: scoreQuestionDix,
        telephone: phoneNumber,
      },
    })
  }

  const sendContactMamanBluesRequest = async (inputs) => {
    if (!canSend) return

    const phoneNumber = phoneNumberFormatting(inputs.inputPhone.value)

    await sendContactMamanBluesQuery({
      variables: {
        prenom: inputs.inputName.value,
        nombreEnfants: 1,
        // naissanceDernierEnfant: "",
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
          setPhoneValid(e.target.validity.valid)
          setPropsPhoneValid(e.target.validity.valid)
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

  return (
    <>
      {contactType === RequestContact.type.sms && (
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
          <Col className="be-contacted-bottom-buttons">
            <button className="fr-btn fr-btn--secondary" onClick={cancel}>
              Annuler
            </button>
            <button
              className="fr-btn"
              type="submit"
              disabled={!canSend}
              onClick={() => sendTrackerContactType(contactType)}
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
