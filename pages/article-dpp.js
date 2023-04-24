import { ContentLayout } from "../src/components/Layout"
import { WidgetHeader } from "../src/components/WidgetHeader"
import * as StorageUtils from "../src/utils/storage.utils"

export default function ContactUrgence() {
  const localeSelected = StorageUtils.getLocaleInLocalStorage()

  return (
    <ContentLayout>
      <WidgetHeader
        title="Qu'est ce que la dépression post-partum"
        locale={localeSelected}
      />
      Article
    </ContentLayout>
  )
}
