import { Button } from "@dataesr/react-dsfr"
import { useState } from "react"
import { Modal } from "react-bootstrap"
import * as TrackerUtils from "../../utils/tracker.utils"

export function RecruitParents() {
  const [show, setShow] = useState()

  const INDIVIDUAL_URL = "https://calendly.com/1000-jours-blues/30min"
  const GROUP_URL = undefined

  const openModal = () => setShow(true)
  const closeModal = () => setShow(false)

  const onClickParticipate = (url, label) => {
    window.open(url, "_blank")
    TrackerUtils.track(
      TrackerUtils.CATEG.recruit,
      TrackerUtils.EVENT_CLICK,
      label
    )
  }

  return (
    <div className="recruit-parents">
      <div>
        Participez à l'amélioration de cet outil afin que le plus grand nombre
        de parents soient aidés
      </div>
      <Button className="participate-btn" onClick={openModal}>
        Je participe
      </Button>

      <Modal show={show} centered size="lg">
        <Modal.Header className="fr-modal__header">
          <button
            className="fr-btn--close fr-btn"
            aria-controls="fr-modal-2"
            onClick={closeModal}
          >
            Fermer
          </button>
        </Modal.Header>

        <Modal.Body>
          Merci pour votre soutien. <br />
          Comment souhaitez-vous participer ?
        </Modal.Body>

        <Modal.Footer>
          {GROUP_URL && (
            <div className="recruit-modale-response">
              En groupe, avec d'autres parents
              <Button
                className="participate-modal-btn"
                onClick={() =>
                  onClickParticipate(GROUP_URL, "Voir l'évènement")
                }
              >
                Voir l'évènement
              </Button>
            </div>
          )}
          <div className="recruit-modale-response">
            En individuel, avec un membre de l'équipe
            <Button
              className="participate-modal-btn"
              onClick={() =>
                onClickParticipate(INDIVIDUAL_URL, "Choisir un créneau")
              }
            >
              Choisir un créneau
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
