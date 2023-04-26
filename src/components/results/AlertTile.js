import React from "react"
import {
  ACTION,
  trackerForResults,
  trackerForArticle,
} from "../../utils/tracker.utils"
import { Icon } from "@dataesr/react-dsfr"

export function AlertTile({ isArticle }) {
  return (
    <div
      className="fr-tile fr-tile--horizontal fr-tile--vertical-md"
      style={{
        backgroundColor: "#e6e6e6",
        marginBottom: "2rem",
      }}
    >
      <a
        href="/contact/contact-urgence"
        style={{
          display: "contents",
        }}
        onClick={() => {
          if (isArticle) trackerForResults(ACTION.emergency)
          else trackerForArticle(ACTION.emergency)
        }}
      >
        <div className="fr-tile__body">
          <h4 className="fr-tile__title">J'ai besoin d'aide en urgence</h4>
          <p className="fr-tile__desc text-black-color">
            Je suis en situation de crise et{" "}
            <span className="text-alert-color">
              j'ai besoin d'assistance immédiatement.
            </span>
          </p>
        </div>
        <div
          className="icone-arrow"
          style={{
            marginBottom: "1.5rem",
          }}
        >
          <Icon className="selected" name="ri-arrow-right-line" size="2x" />
        </div>
      </a>
    </div>
  )
}
