import { gql, useMutation } from "@apollo/client"
import { EPDS_SAVE_COMMENTS } from "@socialgouv/nos1000jours-lib"
import { useEffect, useState } from "react"
import { client } from "../../../../apollo-client"
import { STORAGE_SCORE } from "../../../constants/constants"
import { getInLocalStorage, LoaderFoButton } from "../../../utils/main.utils"
import {
  contacterAToutMoment,
  trackerForIntentions,
} from "../../../utils/measuring-intentions.utils"
import { ContactMamanBlues } from "../ContactMamanBlues"

export const TextAreaToSendDetails = ({
  scoreLevel,
  displayMamanBlues = true,
}) => {
  const [textValue, setTextValue] = useState("")
  const [sendDetails, setSendDetails] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [sendSuccessful, setSendSuccessful] = useState(false)

  const handleSendDetails = () => setSendDetails(true)

  const [sendCommentsQuery] = useMutation(gql(EPDS_SAVE_COMMENTS), {
    client: client,
    onCompleted: () => {
      setLoading(false)
      setSendSuccessful(true)
    },
    onError: (err) => {
      console.error(err)
      setLoading(false)
    },
  })

  const sendCommentsRequest = async () => {
    const score = parseInt(getInLocalStorage(STORAGE_SCORE))

    await sendCommentsQuery({
      variables: {
        score: score,
        commentaire: textValue,
      },
    })
  }

  useEffect(() => {
    if (sendDetails) {
      setLoading(true)
      sendCommentsRequest()

      trackerForIntentions(scoreLevel, "Envoi du commentaire")
    }
  }, [sendDetails])

  return (
    <div>
      <textarea
        aria-label="textValueOther"
        className="fr-input measure-textearea"
        onChange={(e) => setTextValue(e.target.value)}
        disabled={isLoading || sendSuccessful}
        rows="5"
      />
      <button
        className="fr-btn margin-bottom-12"
        onClick={handleSendDetails}
        disabled={isLoading || sendSuccessful}
      >
        Valider
        {isLoading && <LoaderFoButton />}
      </button>

      {sendSuccessful && (
        <div className="margin-bottom-12">
          Votre commentaire a bien été envoyé
        </div>
      )}

      {displayMamanBlues && (
        <div>
          {contacterAToutMoment}
          <ContactMamanBlues scoreLevel={scoreLevel} />
        </div>
      )}
    </div>
  )
}
