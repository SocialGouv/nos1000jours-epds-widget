import { useRouter } from "next/router"
import React from "react"
import { ContentLayout } from "../../src/components/Layout"
import {
  OPEN_CONTACT_FROM_EMAIL,
  RequestContact,
  STORAGE_CONTACT_TYPE,
  STORAGE_SOURCE,
  STORAGE_IS_BACK_RESULTS,
  STORAGE_SCORE,
} from "../../src/constants/constants"
import {} from "@dataesr/react-dsfr"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import * as StorageUtils from "../../src/utils/storage.utils"
import * as TrackerUtils from "../../src/utils/tracker.utils"

export default function ContactConfirmed() {
  const router = useRouter()

  const contactType = StorageUtils.getInLocalStorage(STORAGE_CONTACT_TYPE)
  const score = StorageUtils.getInLocalStorage(STORAGE_SCORE)
  const isBackFromConfirmed = StorageUtils.getInLocalStorage(
    STORAGE_IS_BACK_RESULTS
  )
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
    localStorage.setItem(STORAGE_IS_BACK_RESULTS, true)

    if (TrackerUtils.seuilScore(score)) {
      TrackerUtils.trackerForResults(
        `${TrackerUtils.seuilScore(score)} (retour a mon résultat)`
      )
    }
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
          {contactType === RequestContact.type.email &&
            "Vous devriez recevoir un email d’Elise dans les 48h. Pensez bien à vérifier dans vos spams."}
          {contactType === RequestContact.type.sms &&
            "Vous devriez recevoir un SMS d’Elise dans les 48h en fonction des disponibilités sélectionnées."}
          {contactType === RequestContact.type.rendezvous &&
            "Vous serez contacté sur le numéro de téléphone que vous avez communiqué."}
        </p>

        {websiteSource !== OPEN_CONTACT_FROM_EMAIL && (
          <button className="fr-btn" onClick={goToResults}>
            Retour à mon résultat
          </button>
        )}
      </div>
    </ContentLayout>
  )
}
