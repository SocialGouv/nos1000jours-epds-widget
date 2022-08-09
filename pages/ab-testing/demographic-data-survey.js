import { useRouter } from "next/router"
import { useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { ContentLayout } from "../../src/components/Layout"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import {
  ageValues,
  entourageValues,
  genderValues,
  situationValues,
} from "../../src/utils/ab-testing/demographic-data.utils"
import {
  getLocaleInLocalStorage,
  updateRadioButtonSelectedInList as updateButtonSelectedInList,
} from "../../src/utils/main.utils"

export default function DemographicDataSurvey() {
  const router = useRouter()

  const localeSelected = getLocaleInLocalStorage()

  const [genderItems, setGenderItems] = useState(genderValues)
  const [ageItems, setAgeItems] = useState(ageValues)
  const [situationItems, setSituationItems] = useState(situationValues)
  const [entourageItems, setEntourageItems] = useState(entourageValues)

  const RadioButtonGroup = ({ groupName, data, defaultData, setItems }) => (
    <ToggleButtonGroup type="radio" name={groupName}>
      {data.map((item) => (
        <ToggleButton
          key={item.id}
          className={`${item.isChecked ? "btn-checked" : ""}`}
          id={`radio-${item.id}`}
          value={item.value}
          onChange={(e) =>
            setItems(updateButtonSelectedInList(defaultData, item))
          }
        >
          {item.text}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )

  const GenderBloc = () => {
    return (
      <div>
        <div className="bloc-name">Votre genre :</div>
        <RadioButtonGroup
          groupName="radio-gender"
          data={genderItems}
          defaultData={genderValues}
          setItems={setGenderItems}
        />
      </div>
    )
  }

  const AgeBloc = () => {
    return (
      <div>
        <div className="bloc-name">Votre tranche d’âge :</div>
        <RadioButtonGroup
          groupName="radio-age"
          data={ageItems}
          defaultData={ageValues}
          setItems={setAgeItems}
        />
      </div>
    )
  }

  const ResidenceBloc = () => {
    return <div className="bloc-name">Code postal de résidence :</div>
  }

  const SituationBloc = () => {
    return (
      <div>
        <div className="bloc-name">Votre situation :</div>
        <RadioButtonGroup
          groupName="radio-situation"
          data={situationItems}
          defaultData={situationValues}
          setItems={setSituationItems}
        />
      </div>
    )
  }

  const EntourageBloc = () => {
    return (
      <div>
        <div className="bloc-name">
          Pouvez-vous compter sur une personne de votre entourage pour s'occuper
          de vous quoi qu'il arrive ?
        </div>
        <RadioButtonGroup
          groupName="radio-entourage"
          data={entourageItems}
          defaultData={entourageValues}
          setItems={setEntourageItems}
        />
      </div>
    )
  }

  return (
    <ContentLayout>
      <WidgetHeader locale={localeSelected} />
      <div className="demographic-data">
        <u>À quoi servent ces données ?</u>

        <GenderBloc />
        <AgeBloc />
        <ResidenceBloc />
        <SituationBloc />
        <EntourageBloc />

        <i className="required-field">Tous les champs sont obligatoires</i>
        <div className="button-validation">
          <button className="fr-btn fr-btn--lg">Envoyer</button>
        </div>
      </div>
    </ContentLayout>
  )
}
