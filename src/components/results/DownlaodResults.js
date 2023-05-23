import { Button } from "@dataesr/react-dsfr"
import * as PdfUtils from "../../utils/pdf.utils"
import * as TrackerUtils from "../../utils/tracker.utils"

export function DownlaodResults() {
  const DownloadEpdsResponsesBtn = () => {
    return (
      <Button
        icon="ri-download-line"
        onClick={() => {
          downloadEpdsResponses()
        }}
      >
        Télécharger mes réponses
      </Button>
    )
  }

  const downloadEpdsResponses = () => {
    PdfUtils.generateEpdsResultsPdf()
    TrackerUtils.trackerForIntentions(TrackerUtils.ACTION.download)
  }

  return <DownloadEpdsResponsesBtn />
}
