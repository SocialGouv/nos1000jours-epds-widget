import { useRouter } from "next/router"
import React from "react"
import { ContentLayout } from "../../src/components/Layout"
import {
  RequestContact,
  STORAGE_CONTACT_TYPE,
} from "../../src/constants/constants"
import { getInLocalStorage } from "../../src/utils/utils"
import { } from "@dataesr/react-dsfr"

export default function ContactConfirmed() {
  const router = useRouter()

  const contactType = getInLocalStorage(STORAGE_CONTACT_TYPE)

  const confirmedImage = (contactType) => (
    <img
      alt=""
      src={
        contactType == RequestContact.type.email
          ? "../img/contact/email-sent.svg"
          : "../img/contact/sms-sent.svg"
      }
      height={100}
    />
  )

  return (
    <ContentLayout>
      <h5 className="title-ddp">être contacté(e)</h5>
      <div className="contact-confirmed">
        {confirmedImage(contactType)}
        <p className="contact-confirmed-title">Demande envoyée</p>
        <p>
          <b>Votre demande de contact a bien été prise en compte.</b>
        </p>
        <p>
          {contactType == RequestContact.type.email
            ? "Vous devriez recevoir un email d’Elise dans les 48h. Pensez bien à vérifier dans vos spams."
            : "Vous devriez recevoir un SMS d’Elise dans les 48h en fonction des disponibilités sélectionnées."}
        </p>
      </div>
    </ContentLayout>
  )
}