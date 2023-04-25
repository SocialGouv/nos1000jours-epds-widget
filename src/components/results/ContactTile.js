import React from "react"
import { Tile } from "@codegouvfr/react-dsfr/Tile"
import {
  ACTION,
  trackerForArticle,
  trackerForResults,
} from "../../utils/tracker.utils"

export function ContactTile({ isArticle }) {
  return (
    <>
      <Tile
        className="card-text card-space"
        desc="Je choisis un créneau qui me convient avec Wanda, infirmière spécialisée en périnatalité, et ensemble nous trouvons une aide adaptée à ma situation."
        enlargeLink
        horizontal
        imageUrl="/img/image-wanda.png"
        imageAlt=""
        linkProps={{
          href: "/contact/to-be-contacted",
          onClick: () => {
            if (isArticle) trackerForResults(ACTION.be_contacted)
            else trackerForArticle(ACTION.be_contacted)
          },
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
          onClick: () => {
            if (isArticle) trackerForResults(ACTION.find_pro)
            else trackerForArticle(ACTION.find_pro)
          },
        }}
        title="Je prends rendez-vous avec un professionnel de santé."
      />
    </>
  )
}
