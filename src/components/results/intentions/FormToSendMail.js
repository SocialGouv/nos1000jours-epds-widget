import { gql, useMutation } from "@apollo/client"
import {
  EPDS_SEND_MAIL_ENTOURAGE,
  EPDS_SEND_MAIL_HIMSELF,
} from "@socialgouv/nos1000jours-lib"
import { useEffect, useState } from "react"
import { client } from "../../../../apollo-client"
import {
  PATTERN_EMAIL,
  STORAGE_RESULTS_BOARD,
} from "../../../constants/constants"
import { Form } from "../../../constants/specificLabels"
import {
  convertDateToString,
  getColorIconAndTextByMood,
  getInLocalStorage,
  jsonParse,
  LoaderFoButton,
} from "../../../utils/main.utils"
import { contacterAToutMoment } from "../../../utils/measuring-intentions.utils"
import { ContactMamanBlues } from "../ContactMamanBlues"

/**
 * @param {number} scoreLevel Niveau du score (1, 2, 3) obtenu lors du passage de l'EPDS
 * @param {boolean} displayMamanBlues Afficher ou non le bloc de contact Maman Blues
 * @param {boolean} forHimself Si `true`, le mail est envoyé à la personne qui remplit le formulaire, si `false`, c'est envoyé à un proche
 * @returns Le formulaire pour envoyer le mail contenant les résultats du test EPDS
 */
export const FormToSendMail = ({
  scoreLevel,
  displayMamanBlues = true,
  forHimself,
}) => {
  const [isEmailValid, setEmailValid] = useState()
  const [isNameValid, setNameValid] = useState()

  const [canSend, setCanSend] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [queryShareResponses, setQueryShareResponses] = useState()

  const resultsBoard = jsonParse(getInLocalStorage(STORAGE_RESULTS_BOARD))
  const queryForPartage = forHimself
    ? EPDS_SEND_MAIL_HIMSELF
    : EPDS_SEND_MAIL_ENTOURAGE

  useEffect(() => {
    setCanSend(isEmailValid && isNameValid)
  }, [isEmailValid, isNameValid])

  const [sendEmailReponseQuery] = useMutation(gql(queryForPartage), {
    client: client,
    onCompleted: () => {
      setQueryShareResponses("Le mail a été envoyé")
      setLoading(false)
    },
    onError: (err) => {
      console.warn(err)
      setQueryShareResponses(err.toString())
      setLoading(false)
    },
  })

  const sendForm = async (event) => {
    event.preventDefault()
    setLoading(true)

    if (canSend) {
      const inputs = event.target
      const dateAsString = convertDateToString(new Date(), "/")

      await sendEmailReponseQuery({
        variables: {
          detail_questions: resultsBoard.map((data) => data.question),
          detail_reponses: resultsBoard.map((data) => data.response),
          email: inputs.inputEmail.value,
          prenom: inputs.inputName.value,
          date: dateAsString,
          mood_level: getColorIconAndTextByMood(scoreLevel).moodText,
        },
      })
    }
  }

  /* eslint-disable prettier/prettier */
  return (
    <div>
      <div className="margin-bottom-12">
        {forHimself &&
          "Recevez votre résultat au questionnaire par mail pour le partager à votre professionnel de santé :"}
      </div>
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
          <label>
            {forHimself ? "Votre mail * :" : "L'email de votre proche * :"}
          </label>
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
          className="fr-btn margin-bottom-12"
          type="submit"
          disabled={!canSend || isLoading}
        >
          Valider
          {isLoading && <LoaderFoButton />}
        </button>

        <div className="margin-bottom-12">{queryShareResponses}</div>
      </form>
      <div>{contacterAToutMoment}</div>
      {displayMamanBlues && <ContactMamanBlues scoreLevel={scoreLevel} />}
    </div>
  )
}
