import { ContentLayout } from "../../src/components/Layout"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import { EmergencyCard } from "../../src/components/contact/EmergencyCard"
import * as StorageUtils from "../../src/utils/storage.utils"
import { ACTION } from "../../src/utils/tracker.utils"

export default function ContactUrgence() {
  const localeSelected = StorageUtils.getLocaleInLocalStorage()
  return (
    <ContentLayout>
      <WidgetHeader title="Numéro d'urgence" locale={localeSelected} />

      <EmergencyCard
        emergencyText="Allô, Parents en crise"
        emergencyPhone={"0805382300"}
        isSOS={true}
        action={ACTION.number_sos}
      />
      <EmergencyCard
        emergencyText="Numéro national de prévention du suicide."
        emergencyPhone={3114}
        schedule="Disponible 24/7"
        isSOS={false}
        action={ACTION.number_suicide}
      />
    </ContentLayout>
  )
}
