import { Button } from "@dataesr/react-dsfr"
import { useState } from "react"
import { Modal } from "react-bootstrap"
import { client, DEMANDE_RESSOURCES } from "../../../../apollo-client"
import { useMutation } from "@apollo/client"
import { LoaderFoButton } from "../../../utils/main.utils"

export const GiveAccessToResources = () => {
  const [show, setShow] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [mailValue, setMailValue] = useState()

  const handleChange = (event) => setMailValue(event.target.value)
  const openModal = () => setShow(true)
  const closeModal = () => setShow(false)

  const [sendResourcesQuery] = useMutation(DEMANDE_RESSOURCES, {
    client: client,
    onCompleted: () => {
      setLoading(false)
      closeModal()
    },
    onError: (err) => {
      console.error(err)
      setLoading(false)
    },
  })

  const sendMail = async () => {
    setLoading(false)
    setLoading(true)
    AbTestingUtils.trackerForAbTesting(
      "Je souhaite recevoir les ressources par mail - Envoie du mail"
    )
    await sendResourcesQuery({
      variables: {
        email: mailValue,
      },
    })
  }

  const componentToSendMail = () => {
    return (
      <div>
        <Button
          className="fr-btn--secondary"
          onClick={() => {
            openModal()
          }}
        >
          Je souhaite recevoir les ressources par mail
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
            <div className="fr-input-group">
              <label className="fr-label" htmlFor="email-resources">
                Recevez nos ressources orientées sur les difficultés maternelles
                dans votre boite mail
                <span className="fr-hint-text">
                  Format attendu : nom@domaine.fr
                </span>
              </label>
              <input
                className="fr-input"
                name="email"
                autoComplete="email"
                id="email-resources"
                type="email"
                onChange={handleChange}
                value={mailValue}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => sendMail()} disabled={isLoading}>
              Envoyer
              {isLoading ? <LoaderFoButton /> : null}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  return <div>{componentToSendMail()}</div>
}
