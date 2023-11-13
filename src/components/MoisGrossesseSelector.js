import { Form } from "react-bootstrap"
import _ from "lodash"

export function MoisGrossesseSelector({ situations, setMoisGrossesse }) {
  const selectLabel = "Sélectionner votre mois de grossesse"
  const situation = situations?.filter(
    (item) => item.id === "vousAttendez1Enfant" && item.isChecked
  )
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return situation.length > 0 ? (
    <fieldset>
      <legend className="bloc-name">
        À quel mois de grossesse êtes-vous (vous ou le co-parent) ?
      </legend>
      <Form.Select
        className="fr-select"
        id="select_mois_grossesse"
        name="select_mois_grossesse"
        aria-label={selectLabel}
        onChange={(e) => setMoisGrossesse(e.target.value)}
      >
        <option defaultValue hidden>
          {selectLabel}
        </option>
        {values.map((age) => (
          <option value={age} key={age}>
            {age === 0 ? `moins de 1 mois` : `${age} mois`}
          </option>
        ))}
      </Form.Select>
    </fieldset>
  ) : null
}
