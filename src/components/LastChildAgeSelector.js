import { Form } from "react-bootstrap"
import _ from "lodash"

export function LastChildAgeSelector({ situations, setLastChildAge }) {
  const selectLabel = "Sélectionner l'âge de votre dernier enfant"
  const situation = situations?.filter(
    (item) => item.id === "vousAvezEnfantDeMoinsDe1an" && item.isChecked
  )
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  return situation.length > 0 ? (
    <fieldset>
      <legend className="bloc-name">
        Précisez l'âge de votre dernier enfant :
      </legend>
      <Form.Select
        className="fr-select"
        id="select_last_child_age"
        name="select_last_child_age"
        aria-label={selectLabel}
        onChange={(e) => setLastChildAge(e.target.value)}
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
