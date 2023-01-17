import { useRouter } from "next/router"
import React from "react"
import { ContentLayout } from "../../src/components/Layout"
import {
  OPEN_CONTACT_FROM_EMAIL,
  RequestContact,
  STORAGE_CONTACT_TYPE,
  STORAGE_SOURCE,
} from "../../src/constants/constants"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import * as StorageUtils from "../../src/utils/storage.utils"
import Button from "@codegouvfr/react-dsfr/Button"

export default function ContactConfirmed() {
  const router = useRouter()

  const contactType = StorageUtils.getInLocalStorage(STORAGE_CONTACT_TYPE)
  const websiteSource = StorageUtils.getInLocalStorage(STORAGE_SOURCE)
  const localeSelected = StorageUtils.getLocaleInLocalStorage()

  const confirmedImage = (contactTypeConfirmed) => (
    <img
      alt=""
      src={
        contactTypeConfirmed == RequestContact.type.email
          ? "../img/contact/email-sent.svg"
          : "../img/contact/sms-sent.svg"
      }
      height={100}
    />
  )

  const goToResults = () => {
    router.push({
      pathname: "/results",
    })
  }

  return (
    <ContentLayout>
      <WidgetHeader title="être contacté(e)" locale={localeSelected} />
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

        {websiteSource !== OPEN_CONTACT_FROM_EMAIL && (
          <Button onClick={goToResults}>Retour à mon résultat</Button>
        )}
      </div>
    </ContentLayout>
  )
}
