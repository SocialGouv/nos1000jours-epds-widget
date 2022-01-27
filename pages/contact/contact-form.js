import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { ContentLayout } from "../../src/components/Layout"
import { } from "@dataesr/react-dsfr"
import {
  PATTERN_EMAIL,
  RequestContact,
  STORAGE_CONTACT_HOURS,
  STORAGE_CONTACT_TYPE,
} from "../../src/constants/constants"
import { getInLocalStorage } from "../../src/utils/utils"

export default function ContactForm() {
  const [canSend, setCanSend] = useState(false)
  const [isEmailValid, setEmailValid] = useState(false)
  const [isPhoneValid, setPhoneValid] = useState(false)
  const [childBirthDate, setChildBirthDate] = useState("")
  const [numberOfChildren, setNumberOfChildren] = useState(0)

  const contactType = getInLocalStorage(STORAGE_CONTACT_TYPE)
  const contactHours = getInLocalStorage(STORAGE_CONTACT_HOURS)

  const requiredField = <p className="required-field">*Champs obligatoire</p>

  useEffect(() => {
    if (contactType == RequestContact.type.email) {
      setCanSend(isEmailValid)
    } else if (contactType == RequestContact.type.sms) {
      setCanSend(isPhoneValid)
    }
  }, [isEmailValid, isPhoneValid])

  const sendForm = async (event) => {
    event.preventDefault()
    console.log(event.target)
  }

  function handleChange(e) {
    switch (e.target.id) {
      case "input-email":
        setEmailValid(e.target.validity.valid)
        break
      case "input-phone":
        setPhoneValid(e.target.validity.valid)
        break
    }
  }

  const EmailInput = ({ isRequired }) => (
    <div
      className={`form-group fr-input-group ${isEmailValid ? "fr-input-group--valid" : ""
        }`}
    >
      <label>Votre email {isRequired ? "*" : null} :</label>
      <input
        type="email"
        className={`form-control fr-input ${isEmailValid ? "custom-input-valid" : ""
          }`}
        id="input-email"
        name="input-email"
        pattern={PATTERN_EMAIL}
        onChange={handleChange}
        placeholder="Écrivez ici l’adresse mail"
      />

      {isRequired ? requiredField : null}
    </div>
  )

  const PhoneInput = ({ isRequired }) => (
    <div
      className={`form-group fr-input-group ${isPhoneValid ? "fr-input-group--valid" : ""
        }`}
    >
      <label>Votre numéro de téléphone {isRequired ? "*" : null} :</label>
      <input
        type="tel"
        className={`form-control fr-input ${isPhoneValid ? "custom-input-valid" : ""
          }`}
        id="input-phone"
        name="input-phone"
        pattern="[0-9]{10}"
        onChange={handleChange}
        placeholder="Écrivez ici le numéro pour vous contacter"
      />

      {isRequired ? requiredField : null}
    </div>
  )

  const setOrderPhoneAndEmailInputs = () => {
    if (contactType == RequestContact.type.email) {
      return (
        <>
          <EmailInput isRequired={true} />
          <PhoneInput isRequired={false} />
        </>
      )
    } else if (contactType == RequestContact.type.sms) {
      return (
        <>
          <PhoneInput isRequired={true} />
          <EmailInput isRequired={false} />
        </>
      )
    }
    return null
  }

  return (
    <ContentLayout>
      <h5 className="title-ddp">être contacté(e)</h5>

      <form className="contact-form" onSubmit={sendForm}>
        <div className={`form-group fr-input-group`}>
          <label>Votre prénom :</label>
          <input
            type="text"
            className={`form-control fr-input`}
            id="input-name"
            name="input-name"
            onChange={handleChange}
            placeholder="Écrivez ici votre prénom"
          />
        </div>

        {setOrderPhoneAndEmailInputs()}

        <Col className="be-contacted-bottom-buttons">
          <button className="fr-btn fr-btn--secondary">
            Annuler</button>
          <button className="fr-btn" disabled={!canSend}>
            Valider
          </button>
        </Col>
      </form>
    </ContentLayout>
  )
}
