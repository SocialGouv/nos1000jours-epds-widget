import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { client, INFORMATION_DEMOGRAPHIQUES } from "../../apollo-client"
import { AutoCompleteZipCode } from "../../src/components/AutoCompleteZipCode"
import { ContentLayout } from "../../src/components/Layout"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import {
  ageValues,
  convertArraySituationsToString,
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
  const [showDataDetails, setShowDataDetails] = useState(false)
  const [isValudateButtonEnabled, setValudateButtonEnabled] = useState(true)

  const [genderItems, setGenderItems] = useState(genderValues)
  const [ageItems, setAgeItems] = useState(ageValues)
  const [situationItems, setSituationItems] = useState(situationValues)
  const [entourageItems, setEntourageItems] = useState(entourageValues)
  const [residenceValue, setResidenceValue] = useState()

  useEffect(() => {
    const isCompleted = checkIsFormCompleted(
      genderItems,
      ageItems,
      residenceValue,
      situationItems,
      entourageItems
    )
    setValudateButtonEnabled(isCompleted)
  }, [genderItems, ageItems, situationItems, entourageItems, residenceValue])

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

  const SituationBloc = () => {
    return (
      <div>
        <div className="bloc-name">Votre situation :</div>
        <RadioButtonGroup
          groupName="radio-situation"
          data={situationItems}
          defaultData={situationItems}
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

  const openDataDetail = () => {
    setShowDataDetails(!showDataDetails)
  }

  const [sendInfosQuery] = useMutation(INFORMATION_DEMOGRAPHIQUES, {
    client: client,
    onCompleted: () => {
      console.log("OK") // TODO:
    },
    onError: (err) => {
      console.error(err)
    },
  })

  const sendData = async () => {
    const gender = genderItems?.find((item) => item.isChecked)
    const age = ageItems?.find((item) => item.isChecked)
    const situations = situationItems?.filter((item) => item.isChecked)
    const entourage = entourageItems?.find((item) => item.isChecked)

    await sendInfosQuery({
      variables: {
        genre: gender.text,
        age: age.text,
        situation: convertArraySituationsToString(situations),
        entourageDispo: entourage.text,
        codePostal: parseInt(residenceValue.zipcode),
        ville: residenceValue.city,
        departement: parseInt(residenceValue.departmentNumber),
        region: residenceValue.region,
        //reponsesEpds: 1,
      },
    })
  }

  return (
    <ContentLayout>
      <WidgetHeader locale={localeSelected} />
      <div className="demographic-data">
        <u>À quoi servent ces données ?</u>
        <img src="../img/icone-aide.svg" onClick={openDataDetail} />

        {showDataDetails && (
          <div className="data-details">
            <p>
              Les données récoltées sont <b>anonymes</b>. Elles permettront aux
              chercheurs qui accompagnent le programme des
              <b> 1 000 Premiers Jours</b> lancé par le Ministère des
              solidarités et de la santé d'initier une cartigraphie.
            </p>
            <p>
              <i>
                A ce jour, il n'existe aucune donnée démographique permettant
                aux chercheurs de mieux comprendre la dépression post-partum
                <b> touchant pourtant +16% des parents.</b>
              </i>
            </p>
          </div>
        )}

        <GenderBloc />
        <AgeBloc />

        <div>
          <div className="bloc-name">Code postal de résidence :</div>
          <AutoCompleteZipCode setCitySelected={setResidenceValue} />
        </div>

        <SituationBloc />
        <EntourageBloc />

        <i className="required-field">Tous les champs sont obligatoires</i>
        <div className="button-validation">
          <button
            className="fr-btn fr-btn--lg"
            disabled={!isValudateButtonEnabled}
            onClick={sendData}
          >
            Envoyer
          </button>
        </div>
      </div>
    </ContentLayout>
  )
}

export const checkIsFormCompleted = (
  genderData,
  ageData,
  residenceData,
  situationData,
  entourageData
) => {
  const isGenderCompeleted = genderData?.find((item) => item.isChecked)
  const isAgeCompeleted = ageData?.find((item) => item.isChecked)
  const isResidenceCompeleted = residenceData != undefined
  const isSituationCompeleted = situationData?.find((item) => item.isChecked)
  const isEntourageCompeleted = entourageData?.find((item) => item.isChecked)

  return (
    isGenderCompeleted &&
    isAgeCompeleted &&
    isResidenceCompeleted &&
    isSituationCompeleted &&
    isEntourageCompeleted
  )
}
