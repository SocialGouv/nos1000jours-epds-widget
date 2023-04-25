import React from "react"
import { Icon } from "@dataesr/react-dsfr"
import { Col } from "react-bootstrap"

export function EmergencyCard({
  emergencyText,
  emergencyPhone,
  schedule,
  isSOS,
}) {
  return (
    <div className="demographic-data">
      <Col className="be-contacted-bottom-buttons">
        <div className="button-validation">
          <div className="box">
            <div className="personnalInfo">
              <Icon className="userIcon" name="ri-phone-fill" size="2x" />
              <div>
                <span>{emergencyText.toUpperCase()}</span>
              </div>
            </div>
            {schedule && !isSOS && (
              <div className="logo-appel-margin">
                <Icon name="ri-time-line" size="xl" />
                <span>{schedule}</span>
              </div>
            )}
            {isSOS && (
              <div className="logo-appel-margin">
                <Icon name="ri-time-line" size="xl" />
                <span>En semaine de 10h à 13h et de 14h à 20h</span>
                <br />
                <span>Le samedi de 10h à 13h</span>
              </div>
            )}

            <div className="horizontalSeparator" />
            <button
              className="fr-btn"
              onClick={() => {
                window.location.href = `tel:${emergencyPhone}`
              }}
            >
              <Icon name="ri-phone-fill" size="xl" />
              {`Appeler le ${emergencyPhone}`}
            </button>
          </div>
        </div>
      </Col>
    </div>
  )
}
