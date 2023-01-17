/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react"
import { Col } from "react-bootstrap"
import { ContentLayout } from "../../src/components/Layout"
import {
  PATTERN_EMAIL,
  RequestContact,
  STORAGE_CONTACT_HOURS,
  STORAGE_CONTACT_TYPE,
  STORAGE_SOURCE,
} from "../../src/constants/constants"
import {
  stringIsNotNullNorEmpty,
  phoneNumberFormatting,
  convertDateToString,
  LoaderFoButton,
} from "../../src/utils/main.utils"
import * as StorageUtils from "../../src/utils/storage.utils"
import { DatePickerLastChild } from "../../src/components/contact/DatePickerLastChild"
import { useMutation } from "@apollo/client"
import { client, EPDS_CONTACT_INFORMATION, SAVE_DEMANDE_DE_CONTACT } from "../../apollo-client"
import { useRouter } from "next/router"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import { Form } from "../../src/constants/specificLabels"
import * as ContactUtils from "../../src/utils/contact.utils"
import * as DsfrUtils from "../../src/utils/dsfr-components.utils"
import Button from "@codegouvfr/react-dsfr/Button"
import Input from "@codegouvfr/react-dsfr/Input"

export default function ContactForm() {
  const router = useRouter()

  const [canSend, setCanSend] = useState(false)
  const [isEmailValid, setEmailValid] = useState()
  const [isPhoneValid, setPhoneValid] = useState()
  const [childBirthDate, setChildBirthDate] = useState("")
  const [numberOfChildren, setNumberOfChildren] = useState(0)
  const [isLoading, setLoading] = useState(false)

  const contactType = StorageUtils.getInLocalStorage(STORAGE_CONTACT_TYPE)
  const contactHours = StorageUtils.getInLocalStorage(STORAGE_CONTACT_HOURS)
  const websiteSource = StorageUtils.getInLocalStorage(STORAGE_SOURCE)
  const localeSelected = StorageUtils.getLocaleInLocalStorage()

  const requiredField = <p className="required-field">{Form.required}</p>

  const [sendEmailContactQuery] = useMutation(EPDS_CONTACT_INFORMATION, {
    client: client,
    onCompleted: () => {
      ContactUtils.sendTrackerContactConfirmed(contactType)
      ContactUtils.saveContactRequest(contactType, sendContactQuery)
      setLoading(false)
      goToConfirmation()
    },
    onError: (err) => {
      console.error(err)
      setLoading(false)
    },
  })

  const [sendContactQuery] = useMutation(SAVE_DEMANDE_DE_CONTACT, {
    client: client,
    onError: (err) => {
      console.error(err)
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
    const phoneNumber = phoneNumberFormatting(inputs.inputPhone.value)

    let dateAsString = null
    if (stringIsNotNullNorEmpty(childBirthDate)) {
      const date = new Date(childBirthDate)
      dateAsString = convertDateToString(date, "-")
    }

    setLoading(true)
    await sendEmailContactQuery({
      variables: {
        prenom: name,
        email: inputs.inputEmail.value,
        telephone: phoneNumber,
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
    router.back()
  }

  const goToConfirmation = () => {
    router.push({
      pathname: "/contact/contact-confirmed",
    })
  }

  const emailInput = (isRequired) => {
    const emailLabel = `Votre email ${isRequired ? "*" : ""} :`
    const emailState = DsfrUtils.getInputState(isEmailValid)
    const emailStateMsg = isEmailValid === false ? Form.error.email : ""

    return (
      <div style={{ marginBottom: "1.5rem" }}>
        <Input
          label={emailLabel}
          hintText={isRequired ? requiredField : ""}
          state={emailState}
          stateRelatedMessage={emailStateMsg}
          onChange={(e) => setEmailValid(e.target.validity.valid)}
          nativeInputProps={{
            placeholder: Form.placeholder.email,
            type: "email",
            required: isRequired,
            pattern: PATTERN_EMAIL,
          }}
        />
      </div>
    )
  }

  const phoneInput = (isRequired) => {
    const phoneLabel = `Votre numéro de téléphone ${isRequired ? "*" : ""} :`
    const phoneState = DsfrUtils.getInputState(isPhoneValid)
    const phoneStateMsg = isPhoneValid === false ? Form.error.phone : ""

    return (
      <div style={{ marginBottom: "1.5rem" }}>
        <Input
          label={phoneLabel}
          hintText={isRequired ? requiredField : ""}
          state={phoneState}
          stateRelatedMessage={phoneStateMsg}
          onChange={(e) => setPhoneValid(e.target.validity.valid)}
          nativeInputProps={{
            placeholder: Form.placeholder.phone,
            type: "tel",
            isRequired: isRequired,
            pattern: "[0-9]{10}",
          }}
        />
      </div>
    )
  }

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
          aria-label="enlever 1"
          aria-controls="number_children"
          onClick={() => {
            setNumberOfChildren(numberOfChildren - 1)
          }}
          disabled={numberOfChildren == 0}
        >
          -
        </button>
        <span id="number_children" aria-live="polite">{numberOfChildren}</span>
        <button
          className="counter-sign"
          aria-label="ajouter 1"
          aria-controls="number_children"
          onClick={() => setNumberOfChildren(numberOfChildren + 1)}
        >
          +
        </button>
      </div>
    </div>
  )

  return (
    <ContentLayout>
      <WidgetHeader title="être contacté(e)" locale={localeSelected} />

      <form className="contact-form" onSubmit={sendForm}>
        <Input
          label="Votre prénom :"
          nativeInputProps={{
            placeholder: Form.placeholder.name
          }}
        />

        {setOrderPhoneAndEmailInputs()}
        <ChildCounter />
        {numberOfChildren > 0 ? (
          <DatePickerLastChild onChange={(date) => setChildBirthDate(date)} />
        ) : null}

        <Col className="be-contacted-bottom-buttons">
          <Button priority="secondary" onClick={cancel}>
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={!canSend || isLoading}
          >
            Valider
            {isLoading ? <LoaderFoButton /> : null}
          </Button>
        </Col>
      </form>
    </ContentLayout>
  )
}

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
