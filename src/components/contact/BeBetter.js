import React from "react"
import * as StorageUtils from "../../utils/storage.utils"
import { Tile } from "@codegouvfr/react-dsfr/Tile"

export function BeBetter() {
  const localeSelected = StorageUtils.getLocaleInLocalStorage()

  return (
    <>
      <Tile
        className="card-text card-space"
        desc="Avec une infirmière psychiatrique, en journée et week-end"
        enlargeLink
        horizontal
        imageUrl="/img/image-wanda.png"
        imageAlt=""
        linkProps={{
          href: "/contact/to-be-contacted",
        }}
        title="J'ai besoin d'aide immédiatement"
      />
      <Tile
        className="card-text card-bottom"
        enlargeLink
        horizontal
        imageUrl="/img/icone-calendrier.png"
        imageAlt=""
        linkProps={{
          href: "/contact/demo-form-contact",
        }}
        title="Trouver un professionel de santé spécialisé en dépression post-partum proche de chez vous"
      />
    </>
  )
}
