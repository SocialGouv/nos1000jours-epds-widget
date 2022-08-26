import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { ContentLayout } from "../../src/components/Layout"
import {
  OPEN_CONTACT_FROM_EMAIL,
  RequestContact,
  STORAGE_CONTACT_TYPE,
  STORAGE_SOURCE,
} from "../../src/constants/constants"
import { } from "@dataesr/react-dsfr"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import * as StorageUtils from "../../src/utils/storage.utils"
import * as TrackerUtils from "../../src/utils/tracker.utils"
import * as DemographicDataUtils from "../../src/utils/ab-testing/demographic-data.utils"

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

  useEffect(() => {
    let name
    switch (contactType) {
      case RequestContact.type.email:
        name = TrackerUtils.CONTACT_SENT.mail
        break
      case RequestContact.type.sms:
        name = TrackerUtils.CONTACT_SENT.sms
        break
    }

    TrackerUtils.trackerClick(
      TrackerUtils.CATEG.contact,
      TrackerUtils.ACTION.contact_confirm_sent,
      name
    )
    DemographicDataUtils.trackerForDemographie(
      `${TrackerUtils.ACTION.contact_confirm_sent} par ${name}`
    )
  }, [])

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
          <button className="fr-btn" onClick={goToResults}>
            Retour à mon résultat
          </button>
        )}
      </div>
    </ContentLayout>
  )
}
