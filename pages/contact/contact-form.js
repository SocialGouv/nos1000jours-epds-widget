import React, { useEffect, useState } from "react"
import { Col, Spinner } from "react-bootstrap"
import { ContentLayout } from "../../src/components/Layout"
import { } from "@dataesr/react-dsfr"
import {
  PATTERN_EMAIL,
  RequestContact,
  STORAGE_CONTACT_HOURS,
  STORAGE_CONTACT_TYPE,
  STORAGE_SOURCE,
} from "../../src/constants/constants"
import {
  getInLocalStorage,
  stringIsNotNullNorEmpty,
} from "../../src/utils/main.utils"
import { DatePickerLastChild } from "../../src/components/contact/DatePickerLastChild"
import { useMutation } from "@apollo/client"
import { client, EPDS_CONTACT_INFORMATION } from "../../apollo-client"
import { useRouter } from "next/router"
import Moment from "moment"
import "moment/locale/fr"
import { WidgetHeader } from "../../src/components/WidgetHeader"

export default function ContactForm() {
  const router = useRouter()

  const [canSend, setCanSend] = useState(false)
  const [isEmailValid, setEmailValid] = useState()
  const [isPhoneValid, setPhoneValid] = useState()
  const [childBirthDate, setChildBirthDate] = useState("")
  const [numberOfChildren, setNumberOfChildren] = useState(0)
  const [isLoading, setLoading] = useState(false)

  const contactType = getInLocalStorage(STORAGE_CONTACT_TYPE)
  const contactHours = getInLocalStorage(STORAGE_CONTACT_HOURS)
  const websiteSource = getInLocalStorage(STORAGE_SOURCE)

  const requiredField = <p className="required-field">*Champs obligatoire</p>

  const [sendEmailContactQuery] = useMutation(EPDS_CONTACT_INFORMATION, {
    client: client,
    onCompleted: () => {
      setLoading(false)
      goToConfirmation()
    },
    onError: (err) => {
      console.error(err)
      setLoading(false)
    },
  })

  useEffect(() => {
    if (numberOfChildren == 0) setChildBirthDate("")
    setCanSend(
      isValidForm(
        contactType,
        isEmailValid,
        isPhoneValid,
        numberOfChildren,
        childBirthDate
      )
    )
  }, [isEmailValid, isPhoneValid, numberOfChildren, childBirthDate])

  const sendContactRequest = async (inputs) => {
    if (!canSend) return

    const name = `${inputs.inputName.value} [${websiteSource}]`

    let dateAsString = null
    if (stringIsNotNullNorEmpty(childBirthDate)) {
      const date = new Date(childBirthDate)
      dateAsString = Moment(date).locale("fr").format("L").replace(/\//g, "-")
    }

    setLoading(true)
    await sendEmailContactQuery({
      variables: {
        prenom: name,
        email: inputs.inputEmail.value,
        telephone: inputs.inputPhone.value,
        nombreEnfants: numberOfChildren,
        naissanceDernierEnfant: dateAsString,
        moyen: contactType,
        horaires: contactHours,
      },
    })
  }

  const sendForm = async (event) => {
    event.preventDefault()
    sendContactRequest(event.target)
  }

  const cancel = () => {
    router.push({
      pathname: "/results",
    })
  }

  const goToConfirmation = () => {
    router.push({
      pathname: "/contact/contact-confirmed",
    })
  }

  const emailInput = (isRequired) => (
    <div
      className={`form-group fr-input-group ${isEmailValid ? "fr-input-group--valid" : ""
        }`}
    >
      <label>Votre email {isRequired ? "*" : null} :</label>
      <input
        type="email"
        className={`form-control fr-input ${isEmailValid ? "custom-input-valid" : ""
          }`}
        id="inputEmail"
        name="inputEmail"
        pattern={PATTERN_EMAIL}
        onChange={(e) => setEmailValid(e.target.validity.valid)}
        placeholder="Écrivez ici l’adresse mail"
        required={isRequired}
      />

      {!isEmailValid && isEmailValid != undefined ? (
        <InputError error="L'adresse mail n'est pas au bon format" />
      ) : null}
      {isRequired ? requiredField : null}
    </div>
  )

  const phoneInput = (isRequired) => (
    <div
      className={`form-group fr-input-group ${isPhoneValid ? "fr-input-group--valid" : ""
        }`}
    >
      <label>Votre numéro de téléphone {isRequired ? "*" : null} :</label>
      <input
        type="tel"
        className={`form-control fr-input ${isPhoneValid ? "custom-input-valid" : ""
          }`}
        id="inputPhone"
        name="inputPhone"
        pattern="[0-9]{10}"
        onChange={(e) => setPhoneValid(e.target.validity.valid)}
        placeholder="Écrivez ici le numéro pour vous contacter"
        required={isRequired}
      />

      {!isPhoneValid && isPhoneValid != undefined ? (
        <InputError error="Le numéro de téléphone n'est pas au bon format" />
      ) : null}
      {isRequired ? requiredField : null}
    </div>
  )

  const setOrderPhoneAndEmailInputs = () => {
    if (contactType == RequestContact.type.email) {
      return (
        <>
          {emailInput(true)}
          {phoneInput(false)}
        </>
      )
    }
    if (contactType == RequestContact.type.sms) {
      return (
        <>
          {phoneInput(true)}
          {emailInput(false)}
        </>
      )
    }

    return null
  }

  const ChildCounter = () => (
    <div className="form-group fr-input-group counter">
      <label>Nombre d'enfant(s) :</label>
      <div className="margin-start-10">
        <button
          className="counter-sign"
          onClick={() => {
            setNumberOfChildren(numberOfChildren - 1)
          }}
          disabled={numberOfChildren == 0}
        >
          -
        </button>
        {numberOfChildren}
        <button
          className="counter-sign"
          onClick={() => setNumberOfChildren(numberOfChildren + 1)}
        >
          +
        </button>
      </div>
    </div>
  )

  return (
    <ContentLayout>
      <WidgetHeader title="être contacté(e)" />

      <form className="contact-form" onSubmit={sendForm}>
        <div className={`form-group fr-input-group`}>
          <label>Votre prénom :</label>
          <input
            type="text"
            className={`form-control fr-input`}
            id="inputName"
            name="inputName"
            placeholder="Écrivez ici votre prénom"
          />
        </div>

        {setOrderPhoneAndEmailInputs()}
        <ChildCounter />
        {numberOfChildren > 0 ? (
          <DatePickerLastChild onChange={(date) => setChildBirthDate(date)} />
        ) : null}

        <Col className="be-contacted-bottom-buttons">
          <button className="fr-btn fr-btn--secondary" onClick={cancel}>
            Annuler
          </button>
          <button
            className="fr-btn"
            type="submit"
            disabled={!canSend || isLoading}
          >
            Valider
            {isLoading ? <Loader /> : null}
          </button>
        </Col>
      </form>
    </ContentLayout>
  )
}

const Loader = () => (
  <Spinner animation="border" size="sm" className="margin-start-10" />
)

const InputError = ({ error }) => (
  <p id="text-input-error-desc-error" className="fr-error-text">
    {error}
  </p>
)

/**
 * Vérifie la validité du formulaire en fonction des informations complétées
 * @param {RequestContact.type} contactType Le type de contact
 * @param {boolean} isEmailValid La validité de l'email saisi
 * @param {boolean} isPhoneValid La validité du numéro de téléphone saisi
 * @param {number} numberOfChildren Le nombre d'enfant
 * @param {String} childBirthDate La date de naissance du plus jeune enfant (yyyy-mm-dd)
 * @returns boolean
 */
export const isValidForm = (
  contactType,
  isEmailValid,
  isPhoneValid,
  numberOfChildren,
  childBirthDate
) => {
  const birth =
    (numberOfChildren > 0 && childBirthDate !== "") || numberOfChildren == 0

  if (contactType == RequestContact.type.email) {
    return isEmailValid && birth
  }
  if (contactType == RequestContact.type.sms) {
    return isPhoneValid && birth
  }

  return false
}
