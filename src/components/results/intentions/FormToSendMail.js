/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { PATTERN_EMAIL } from "../../../constants/constants"
import { Form } from "../../../constants/specificLabels"
import { cestUneBonneEtape } from "../../../utils/measuring-intentions.utils"
import { ContactMamanBlues } from "../ContactMamanBlues"

/**
 * @param {number} scoreLevel Niveau du score (1, 2, 3) obtenu lors du passage de l'EPDS
 * @param {boolean} displayMamanBlues Afficher ou non le bloc de contact Maman Blues
 * @param {boolean} forHimself Si `true`, le mail est envoyé à la personne qui remplit le formulaire, si `false`, c'est envoyé à un proche
 * @returns Le formulaire pour envoyer le mail contenant les résultats du test EPDS
 */
export const FormToSendMail = ({ scoreLevel, displayMamanBlues = true, forHimself }) => {
  const [isEmailValid, setEmailValid] = useState()
  const [isNameValid, setNameValid] = useState()

  const [canSend, setCanSend] = useState(false)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setCanSend(isEmailValid && isNameValid)
  }, [isEmailValid, isNameValid])

  const sendForm = async (event) => {
    event.preventDefault()

    // TODO: send mail et générer les pdf
    setLoading(true)

    console.log(event.target.inputName.value)
    console.log(event.target.inputEmail.value)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      <div className="margin-bottom-12">{forHimself && "Recevez votre résultat au questionnaire par mail pour le partager à votre professionnel de santé :"}</div>
      <form
        className="contact-form margin-bottom-8"
        aria-label="formToSendMail"
        onSubmit={sendForm}
      >
        <div className={`form-group fr-input-group ${isNameValid && "fr-input-group--valid"}`}>
          <label>Votre prénom * :</label>
          <input
            type="text"
            className={`form-control fr-input ${isNameValid && "custom-input-valid"}`}
            id="inputName"
            name="inputName"
            placeholder={Form.placeholder.name}
            onChange={(e) => setNameValid(e.target.validity.valid)}
            required
          />
        </div>
        <div className={`form-group fr-input-group ${isEmailValid && "fr-input-group--valid"}`}>
          <label>{forHimself ? "Votre mail * :" : "L'email de votre proche * :"}</label>
          <input
            type="email"
            className={`form-control fr-input ${isEmailValid && "custom-input-valid"}`}
            id="inputEmail"
            name="inputEmail"
            pattern={PATTERN_EMAIL}
            placeholder={Form.placeholder.email}
            onChange={(e) => setEmailValid(e.target.validity.valid)}
            required
          />
        </div>
        <p className="required-field">{Form.required}</p>
        <button
          className="fr-btn"
          type="submit"
          disabled={!canSend || isLoading}
        >
          Valider
          {isLoading && <Loader />}
        </button>
      </form >
      <div>{cestUneBonneEtape}</div>
      {displayMamanBlues && <ContactMamanBlues scoreLevel={scoreLevel} />}
    </div >
  )
}

const Loader = () => (
  <Spinner animation="border" size="sm" className="margin-start-10" />
)
