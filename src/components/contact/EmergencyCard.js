import React from "react"
import { Icon } from "@dataesr/react-dsfr"
import { Col } from "react-bootstrap"

export function EmergencyCard({ emergencyText, emergencyPhone, schedule }) {
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
            {schedule && (
              <div
                style={{
                  display: "flex",
                  marginTop: "2rem",
                }}
              >
                <Icon name="ri-time-line" size="xl" />
                <p>{schedule}</p>
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
