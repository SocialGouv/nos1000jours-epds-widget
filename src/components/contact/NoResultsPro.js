import React from "react"
import { Icon } from "@dataesr/react-dsfr"
import classNames from "classnames"

export const NoResultPsyTable = () => (
  <div className={classNames("columnBox", "fr-my-2w")}>
    <div className="personnalInfo">
      <Icon className="userIcon" name="ri-search-line" size="2x" />
      <div>
        <h6>
          Aucun résultats trouvés, vous pouvez élargir votre champ de recherche
          en recherchant autour de vous.
        </h6>
      </div>
    </div>
  </div>
)
