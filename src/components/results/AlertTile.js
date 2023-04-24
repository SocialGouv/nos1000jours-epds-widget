import React from "react"

export function AlertTile() {
  return (
    <div
      className="fr-tile fr-tile--horizontal"
      style={{
        backgroundColor: "#e6e6e6",
        marginBottom: "5%",
      }}
    >
      <a
        href="/contact/contact-urgence"
        style={{
          display: "contents",
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
      </a>
    </div>
  )
}
