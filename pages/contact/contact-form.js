import React, { useState } from "react"
import { Col } from "react-bootstrap"
import { ContentLayout } from "../../src/components/Layout"
import { useCalendlyEventListener, InlineWidget } from "react-calendly"
import {} from "@dataesr/react-dsfr"

import {
  RequestContact,
  STORAGE_CONTACT_TYPE,
  CALENDLY_LINK,
} from "../../src/constants/constants"
import * as StorageUtils from "../../src/utils/storage.utils"
import { useRouter } from "next/router"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import * as ContactUtils from "../../src/utils/contact.utils"
import * as TrackerUtils from "../../src/utils/tracker.utils"

export default function ContactForm() {
  const router = useRouter()
  const [isCalendlyValide, setCalendlyValide] = useState(false)

  const contactType = StorageUtils.getInLocalStorage(STORAGE_CONTACT_TYPE)

  const localeSelected = StorageUtils.getLocaleInLocalStorage()

  const cancel = () => {
    router.back()
  }

  const goToConfirmation = () => {
    router.push({
      pathname: "/contact/contact-confirmed",
    })
  }

  const sendTrackerContactType = (typeContact) => {
    if (typeContact) {
      TrackerUtils.trackerForContact(TrackerUtils.ACTION.confirmation)
      TrackerUtils.trackerForContact(
        ContactUtils.trackerContactName(typeContact)
      )
    }
  }

  useCalendlyEventListener({
    onEventScheduled: (_e) => {
      sendTrackerContactType(contactType)
      setCalendlyValide(true)
    },
  })

  if (isCalendlyValide) {
    goToConfirmation()
  }

  return (
    <ContentLayout>
      <WidgetHeader title="Je veux être accompagné.e" locale={localeSelected} />
      {contactType === RequestContact.type.rendezvous && (
        <>
          <InlineWidget url={CALENDLY_LINK} />
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
