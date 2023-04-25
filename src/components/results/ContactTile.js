import React from "react"
import { Tile } from "@codegouvfr/react-dsfr/Tile"

export function ContactTile() {
  return (
    <>
      <Tile
        className="card-text card-space"
        desc="Je choisis un créneau qui me convient avec Wanda infirmière spécialisée en périnatalité et ensemble nous trouvons une aide adaptée à ma situation."
        enlargeLink
        horizontal
        imageUrl="/img/image-wanda.png"
        imageAlt=""
        linkProps={{
          href: "/contact/to-be-contacted",
        }}
        title="Je veux être accompagné.e"
      />
      <Tile
        className="card-text card-bottom"
        enlargeLink
        horizontal
        desc="Spécialisés dans la dépression post-partum, ces professionnels peuvent m'aider."
        imageUrl="/img/icone-calendrier.png"
        imageAlt=""
        linkProps={{
          href: "/contact/pro-list",
        }}
        title="Je prends rendez-vous avec un professionnel de santé."
      />
    </>
  )
}
