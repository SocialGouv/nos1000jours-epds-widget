import React from "react"
import {
  ACTION,
  trackerForArticle,
  trackerForResults,
} from "../../utils/tracker.utils"
import { client, GET_ACTIVATION_TILE_STATUS } from "../../../apollo-client"
import { Icon } from "@dataesr/react-dsfr"
import { useQuery } from "@apollo/client"

const Tile = ({ title, desc, imageUrl, link, isBeContacted, isArticle }) => {
  return (
    <div className="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md card-text card-space card-bottom">
      <div className="fr-tile__img tile-image">
        <img src={imageUrl} className="fr-responsive-img" alt="" />
      </div>
      <div>
        <h4 className="fr-tile__title">
          <a
            className="fr-tile__link card-text tile-text-title"
            href={link}
            onClick={() => {
              if (isBeContacted) {
                if (isArticle) trackerForResults(ACTION.be_contacted)
                else trackerForArticle(ACTION.be_contacted)
              }
              if (!isBeContacted) {
                if (isArticle) trackerForResults(ACTION.find_pro)
                else trackerForArticle(ACTION.find_pro)
              }
            }}
          >
            {title}
          </a>
        </h4>
        <p className="fr-tile__desc tile-text-desc">{desc}</p>
      </div>
      <div className="icone-arrow">
        <Icon className="selected" name="ri-arrow-right-line" size="2x" />
      </div>
    </div>
  )
}

export function ContactTile({ isArticle }) {
  const { loading, error, data } = useQuery(GET_ACTIVATION_TILE_STATUS, {
    client: client,
  })

  if (loading) return <></>
  if (error) return <p>Error</p>
  const isTileContactActive = data.activationTile.activation_tile

  return (
    <>
      {isTileContactActive && (
        <Tile
          title="Je veux être accompagné.e"
          desc="Je choisis un créneau qui me convient avec Wanda, infirmière spécialisée en périnatalité, et ensemble nous trouvons une aide adaptée à ma situation."
          imageUrl="/img/image-wanda.png"
          link="/contact/to-be-contacted"
          isBeContacted={true}
          isArticle={isArticle}
        />
      )}
      <Tile
        title="Je prends rendez-vous avec un professionnel de santé."
        desc="Spécialisés dans la dépression post-partum, ces professionnels peuvent m'aider."
        imageUrl="/img/icone-calendrier.png"
        link="/contact/pro-list"
        isBeContacted={false}
        isArticle={isArticle}
      />
    </>
  )
}
