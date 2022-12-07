import { Image } from "react-bootstrap"
import { openUrl } from "../../utils/main.utils"


export function DownloadApp() {
  const QR_CODE_APPLE = "/../img/download-app/qr_apple.png"
  const STORE_APPLE = "/../img/download-app/store_apple.svg"
  const URL_APPLE =
    "itms-apps://itunes.com/app/1000-premiers-jours/id1573729958"

  const QR_CODE_GOOGLE = "/../img/download-app/qr_google.png"
  const STORE_GOOGLE = "/../img/download-app/store_google.svg"
  const URL_GOOGLE =
    "https://play.google.com/store/apps/details?id=com.fabrique.millejours"

  const QR_CODE_HEIGHT = 100
  const STORE_WIDTH = 120

  const StoreItem = ({ qrCodeImg, storeImg, storeUrl }) => {
    return (
      <div className="store-item" onClick={() => openUrl(storeUrl)}>
        <Image
          src={storeImg}
          alt="QR code pour télécharger l'application sur le store Apple"
          width={STORE_WIDTH}
        />
        <Image
          className="store-qr-code"
          src={qrCodeImg}
          alt="QR code pour télécharger l'application sur le store Apple"
          height={QR_CODE_HEIGHT}
          width={QR_CODE_HEIGHT}
        />
      </div>
    )
  }

  return (
    <div className="download-app">
      L'application 1000 premiers jours

      <br />
      <div className="store-content">
        <StoreItem
          qrCodeImg={QR_CODE_APPLE}
          storeImg={STORE_APPLE}
          storeUrl={URL_APPLE}
        />
        <StoreItem
          qrCodeImg={QR_CODE_GOOGLE}
          storeImg={STORE_GOOGLE}
          storeUrl={URL_GOOGLE}
        />
      </div>
    </div>
  )
}
