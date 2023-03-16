/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react"
import { Col } from "react-bootstrap"
import { ContentLayout } from "../../src/components/Layout"
import { useCalendlyEventListener, InlineWidget } from "react-calendly"
import { } from "@dataesr/react-dsfr"

import {
  PATTERN_EMAIL,
  RequestContact,
  STORAGE_CONTACT_HOURS,
  STORAGE_CONTACT_TYPE,
  STORAGE_SOURCE,
  STORAGE_TEST_DEMOGRAPHIC_DPT_CODE,
  STORAGE_TEST_DEMOGRAPHIC_DPT_LIBELLE,
} from "../../src/constants/constants"
import {
  stringIsNotNullNorEmpty,
  phoneNumberFormatting,
  convertDateToISO,
  LoaderFoButton,
} from "../../src/utils/main.utils"
import * as StorageUtils from "../../src/utils/storage.utils"
import { DatePickerLastChild } from "../../src/components/contact/DatePickerLastChild"
import { useMutation } from "@apollo/client"
import { client, EPDS_CONTACT_INFORMATION, SAVE_CONTACT, SAVE_DEMANDE_DE_CONTACT } from "../../apollo-client"
import { useRouter } from "next/router"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import { Form } from "../../src/constants/specificLabels"
import * as ContactUtils from "../../src/utils/contact.utils"
import * as TrackerUtils from "../../src/utils/tracker.utils"
import * as AbTestingUtils from "../../src/utils/ab-testing/ab-testing.utils"

export default function ContactForm() {
  const router = useRouter()

  const [canSend, setCanSend] = useState(false)
  const [isEmailValid, setEmailValid] = useState()
  const [isPhoneValid, setPhoneValid] = useState()
  const [childBirthDate, setChildBirthDate] = useState("")
  const [numberOfChildren, setNumberOfChildren] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [isCalendlyValide, setCalendlyValide] = useState(false)

  const contactType = StorageUtils.getInLocalStorage(STORAGE_CONTACT_TYPE)
  const contactHours = StorageUtils.getInLocalStorage(STORAGE_CONTACT_HOURS)
  const websiteSource = StorageUtils.getInLocalStorage(STORAGE_SOURCE)
  const dptCode = StorageUtils.getInLocalStorage(STORAGE_TEST_DEMOGRAPHIC_DPT_CODE)
  const dptLibelle = StorageUtils.getInLocalStorage(STORAGE_TEST_DEMOGRAPHIC_DPT_LIBELLE)
  const localeSelected = StorageUtils.getLocaleInLocalStorage()

  const requiredField = <p className="required-field">{Form.required}</p>

  const [sendEmailContactQuery] = useMutation(EPDS_CONTACT_INFORMATION, {
    client: client,
    onCompleted: () => {
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

  const [sendContactMamanBluesQuery] = useMutation(SAVE_CONTACT, {
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

  const getChildBirthDateInString = () => {
    let dateAsString = null
    if (stringIsNotNullNorEmpty(childBirthDate)) {
      const date = new Date(childBirthDate)
      dateAsString = convertDateToISO(date)
    }
    return dateAsString
  }

  const sendContactRequest = async (inputs) => {
    if (!canSend) return

    const name = `${inputs.inputName.value} [${websiteSource}]`
    const phoneNumber = phoneNumberFormatting(inputs.inputPhone.value)
    setLoading(true)
    await sendEmailContactQuery({
      variables: {
        prenom: name,
        email: inputs.inputEmail.value,
        telephone: phoneNumber,
        nombreEnfants: numberOfChildren,
        naissanceDernierEnfant: getChildBirthDateInString(),
        moyen: contactType,
        horaires: contactHours,
      },
    })
  }

  const sendContactMamanBluesRequest = async (inputs) => {
    if (!canSend) return

    const phoneNumber = phoneNumberFormatting(inputs.inputPhone.value)
    const email = inputs.inputEmail.value

    await sendContactMamanBluesQuery({
      variables: {
        prenom: inputs.inputName.value,
        nombreEnfants: numberOfChildren,
        naissanceDernierEnfant: getChildBirthDateInString(),
        typeDeContact: contactType,
        departementCode: dptCode,
        departementLibelle: dptLibelle,
        datePriseContact: convertDateToISO(new Date()),
        personneAccompagnee: "nouveau",
        commentaire: "",
        widgetEpdsSource: websiteSource,
        email: email,
        numero_telephone: phoneNumber
      },
    })
  }

  const sendForm = async (event) => {
    event.preventDefault()
    sendContactRequest(event.target)
    sendContactMamanBluesRequest(event.target)
  }

  const cancel = () => {
    router.back()
  }

  const goToConfirmation = () => {
    router.push({
      pathname: "/contact/contact-confirmed",
    })
  }

  const trackerContactName = (typeContact) => {
    switch (typeContact) {
      case RequestContact.type.email:
        return TrackerUtils.CONTACT_SENT.mail
      case RequestContact.type.sms:
        return TrackerUtils.CONTACT_SENT.sms
      case RequestContact.type.chat:
        return TrackerUtils.CONTACT_SENT.chat
      case RequestContact.type.rendezvous:
        return TrackerUtils.CONTACT_SENT.rendezvous
    }
  }

  const sendTrackerContactType = (typeContact) => {
    TrackerUtils.genericTracker(
      TrackerUtils.CATEG.contact,
      TrackerUtils.NAME.contact_confirm_sent
    )
    if (typeContact) {
      TrackerUtils.track(
        TrackerUtils.CATEG.contact,
        TrackerUtils.ACTION.contact_confirm_sent,
        trackerContactName(typeContact)
      )
      AbTestingUtils.trackerForAbTesting(trackerContactName(typeContact))
    }
  }

  useCalendlyEventListener({
    onEventScheduled: (_e) => {
      sendTrackerContactType(contactType)
      setCalendlyValide(true)
    },
  })


  const emailInput = (isRequired) => (
    <div
      className={`form-group fr-input-group ${isEmailValid ? "fr-input-group--valid" : ""
        }`}
    >
      <label htmlFor="inputEmail">Votre email {isRequired ? "*" : null} :</label>
      <input
        type="email"
        className={`form-control fr-input ${isEmailValid ? "custom-input-valid" : ""
          }`}
        id="inputEmail"
        name="inputEmail"
        pattern={PATTERN_EMAIL}
        onChange={(e) => setEmailValid(e.target.validity.valid)}
        placeholder={Form.placeholder.email}
        required={isRequired}
      />

      {isEmailValid === false && <InputError error={Form.error.email} />}
      {isRequired && requiredField}
    </div>
  )

  const phoneInput = (isRequired) => (
    <div
      className={`form-group fr-input-group ${isPhoneValid ? "fr-input-group--valid" : ""
        }`}
    >
      <label htmlFor="inputPhone">Votre numéro de téléphone {isRequired ? "*" : null} :</label>
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

      {isPhoneValid === false && (
        <InputError error="Le numéro de téléphone n'est pas au bon format" />
      )}
      {isRequired ? requiredField : null}
    </div>
  )

  if (isCalendlyValide) {
    goToConfirmation()
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
      {contactType !== RequestContact.type.rendezvous && (
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
            onClick={()=>sendTrackerContactType(contactType)}
            >
            Valider
            {isLoading ? <LoaderFoButton /> : null}
          </button>
        </Col>
      </form>
        )
      }
      {contactType === RequestContact.type.rendezvous && (
        <>
          <InlineWidget
            url="https://calendly.com/rdv-nos1000jours/30min"
          />
          <Col className="be-contacted-bottom-buttons">
            <button className="fr-btn fr-btn--secondary" onClick={cancel}>
              Annuler
            </button>
          </Col>
        </>
      )}
    </ContentLayout>
  )
}

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
