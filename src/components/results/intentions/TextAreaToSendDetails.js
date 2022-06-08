import { gql, useMutation } from "@apollo/client"
import { EPDS_SAVE_COMMENTS } from "@socialgouv/nos1000jours-lib"
import { useEffect, useState } from "react"
import { client } from "../../../../apollo-client"
import { STORAGE_SCORE } from "../../../constants/constants"
import { getInLocalStorage, LoaderFoButton } from "../../../utils/main.utils"
import { cestUneBonneEtape } from "../../../utils/measuring-intentions.utils"
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
    }
  }, [sendDetails])

  return (
    <div>
      <input
        aria-label="textValueOther"
        type="textarea"
        name="textValue"
        className="fr-input measure-textearea"
        onChange={(e) => setTextValue(e.target.value)}
        disabled={isLoading || sendSuccessful}
      />
      <button
        className="fr-btn"
        onClick={handleSendDetails}
        disabled={isLoading || sendSuccessful}
      >
        Valider
        {isLoading && <LoaderFoButton />}
      </button>

      {sendSuccessful && (
        <span className="margin-start-10">
          Votre commentaire bien été envoyé
        </span>
      )}

      {displayMamanBlues && (
        <div>
          {cestUneBonneEtape}
          <ContactMamanBlues scoreLevel={scoreLevel} />
        </div>
      )}
    </div>
  )
}
