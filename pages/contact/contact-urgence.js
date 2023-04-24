import { ContentLayout } from "../../src/components/Layout"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import { EmergencyCard } from "../../src/components/contact/EmergencyCard"
import * as StorageUtils from "../../src/utils/storage.utils"

export default function ContactUrgence() {
  const localeSelected = StorageUtils.getLocaleInLocalStorage()

  return (
    <ContentLayout>
      <WidgetHeader title="Numéro d'urgence" locale={localeSelected} />

      <EmergencyCard
        emergencyText="Numéro national de prévention du suicide"
        emergencyPhone={3114}
      />
      <EmergencyCard
        emergencyText="Allô, Parents en crise"
        emergencyPhone={parseInt("0805382300")}
        schedule={
          "Du lundi au vendredi de 10h à 13h et de 14h à 20h. Le samedi de 10h à 13h"
        }
      />
    </ContentLayout>
  )
}
