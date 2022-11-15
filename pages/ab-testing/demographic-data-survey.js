import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { client, SAVE_INFORMATION_DEMOGRAPHIQUES } from "../../apollo-client"
import { AutoCompleteZipCode } from "../../src/components/AutoCompleteZipCode"
import { ContentLayout } from "../../src/components/Layout"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import {
  STORAGE_RESULTS_ID,
  STORAGE_TEST_DEMOGRAPHIC_ID,
} from "../../src/constants/constants"
import {
  ageValues,
  convertArraySituationsToString,
  entourageValues,
  genderValues,
  situationValues,
} from "../../src/utils/ab-testing/demographic-data.utils"
import {
  LoaderFoButton,
  updateRadioButtonSelectedInList,
} from "../../src/utils/main.utils"
import * as StorageUtils from "../../src/utils/storage.utils"
import * as DemographicDataUtils from "../../src/utils/ab-testing/demographic-data.utils"
import { JobSelector } from "../../src/components/JobSelector"

export default function DemographicDataSurvey() {
  const router = useRouter()

  const localeSelected = StorageUtils.getLocaleInLocalStorage()
  const [showDataDetails, setShowDataDetails] = useState(false)
  const [isValudateButtonEnabled, setValudateButtonEnabled] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const [isAutoCompleteZipCodeValid, setIsAutoCompleteZipCodeValid] =
    useState(false)

  const [genderItems, setGenderItems] = useState(genderValues)
  const [ageItems, setAgeItems] = useState(ageValues)
  const [situationItems, setSituationItems] = useState(situationValues)
  const [entourageItems, setEntourageItems] = useState(entourageValues)
  const [residenceValue, setResidenceValue] = useState()
  const [jobValue, setJobValue] = useState()

  const epdsTestID = StorageUtils.getInLocalStorage(STORAGE_RESULTS_ID)
  const demographicData = DemographicDataUtils.getDemographicBeforeEpds()

  useEffect(() => {
    const isCompleted = checkIsFormCompleted(
      genderItems,
      ageItems,
      jobValue,
      isAutoCompleteZipCodeValid,
      situationItems,
      entourageItems
    )
    setValudateButtonEnabled(isCompleted)
  }, [
    genderItems,
    ageItems,
    jobValue,
    situationItems,
    entourageItems,
    isAutoCompleteZipCodeValid,
  ])

  const RadioButtonGroup = ({ groupName, data, defaultData, setItems }) => (
    <ToggleButtonGroup type="radio" name={groupName}>
      {data.map((item) => (
        <ToggleButton
          key={item.id}
          className={`${item.isChecked ? "btn-checked" : ""}`}
          id={`radio-${item.id}`}
          value={item.value}
          onChange={() =>
            setItems(updateRadioButtonSelectedInList(defaultData, item))
          }
        >
          {item.text}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )

  const GenderBloc = () => {
    return (
      <fieldset>
        <legend className="bloc-name">Votre genre :</legend>
        <RadioButtonGroup
          groupName="radio-gender"
          data={genderItems}
          defaultData={genderValues}
          setItems={setGenderItems}
        />
      </fieldset>
    )
  }

  const AgeBloc = () => {
    return (
      <fieldset>
        <legend className="bloc-name">Votre tranche d’âge :</legend>
        <RadioButtonGroup
          groupName="radio-age"
          data={ageItems}
          defaultData={ageValues}
          setItems={setAgeItems}
        />
      </fieldset>
    )
  }

  const SituationBloc = () => {
    return (
      <fieldset>
        <legend className="bloc-name">
          Votre situation : (plusieurs choix possibles)
        </legend>
        <RadioButtonGroup
          groupName="radio-situation"
          data={situationItems}
          defaultData={situationItems}
          setItems={setSituationItems}
        />
      </fieldset>
    )
  }

  const EntourageBloc = () => {
    return (
      <fieldset>
        <legend className="bloc-name">
          Pouvez-vous compter sur une personne de votre entourage pour s'occuper
          de vous quoi qu'il arrive ?
        </legend>
        <RadioButtonGroup
          groupName="radio-entourage"
          data={entourageItems}
          defaultData={entourageValues}
          setItems={setEntourageItems}
        />
      </fieldset>
    )
  }

  const openDataDetail = () => {
    setShowDataDetails(!showDataDetails)
  }

  const goToEpdsSurvey = async () => {
    router.push({
      pathname: "/survey/epds-survey",
    })
  }

  const goToResults = async () => {
    router.push({
      pathname: "/results",
    })
  }

  const [sendInfosQuery] = useMutation(SAVE_INFORMATION_DEMOGRAPHIQUES, {
    client: client,
    onCompleted: (data) => {
      setLoading(false)

      const id =
        data.createInformationsDemographique.informationsDemographique.id
      if (!epdsTestID) localStorage.setItem(STORAGE_TEST_DEMOGRAPHIC_ID, id)

      if (demographicData?.isAfterEpds) goToResults()
      else goToEpdsSurvey()
    },
    onError: (err) => {
      console.error(err)
      setLoading(false)
    },
  })

  const sendData = async () => {
    const gender = genderItems?.find((item) => item.isChecked)
    const age = ageItems?.find((item) => item.isChecked)
    const situations = situationItems?.filter((item) => item.isChecked)
    const entourage = entourageItems?.find((item) => item.isChecked)

    setLoading(true)

    await sendInfosQuery({
      variables: {
        genre: gender.id,
        age: age.id,
        situation: convertArraySituationsToString(situations),
        entourageDispo: entourage.id,
        codePostal: residenceValue.zipcode,
        ville: residenceValue.city,
        departement: residenceValue.departmentNumber,
        departementLibelle: residenceValue.departmentName,
        region: residenceValue.region,
        reponsesEpds: epdsTestID,
        cspCode: jobValue.code,
        cspLibelle: jobValue.libelle,
      },
    })

    const trackerLabel = demographicData?.isAfterEpds
      ? demographicData?.buttonLabelInInfoDemographicSurvey
      : "Envoyer"
    DemographicDataUtils.trackerForDemographie(
      `Questionnaire démographique - ${trackerLabel}`
    )
  }

  return (
    <ContentLayout>
      <WidgetHeader locale={localeSelected} />
      <div className="demographic-data">
        <u>À quoi servent ces données ?</u>
        <img
          src="../img/icone-aide.svg"
          role="button"
          alt="Afficher l'explication du bloc : a quoi servent ces données"
          onClick={openDataDetail}
        />

        {showDataDetails && (
          <div className="data-details">
            <p>
              Les données récoltées sont <b>anonymes</b>. Elles permettront aux
              chercheurs qui accompagnent le programme des
              <b> 1 000 Premiers Jours</b> lancé par le Ministère des
              solidarités et de la santé d'initier une cartographie.
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
          <div className="bloc-name">
            Votre catégories socio-professionnelle :
          </div>
          <JobSelector setJobSelected={setJobValue} />
        </div>

        <div>
          <div className="bloc-name">Code postal de résidence :</div>
          <AutoCompleteZipCode
            setSelectedCity={setResidenceValue}
            setIsAutoCompleteZipCodeValid={setIsAutoCompleteZipCodeValid}
          />
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
            {demographicData?.buttonLabelInInfoDemographicSurvey ?? "Envoyer"}
          </button>
          {isLoading ? <LoaderFoButton /> : null}
        </div>
      </div>
    </ContentLayout>
  )
}

export const checkIsFormCompleted = (
  genderData,
  ageData,
  jobData,
  residenceData,
  situationData,
  entourageData
) => {
  const isGenderCompeleted = genderData?.find((item) => item.isChecked)
  const isAgeCompeleted = ageData?.find((item) => item.isChecked)
  const isJobSelected = jobData != undefined
  const isResidenceCompeleted = residenceData != undefined && residenceData
  const isSituationCompeleted = situationData?.find((item) => item.isChecked)
  const isEntourageCompeleted = entourageData?.find((item) => item.isChecked)

  return (
    isGenderCompeleted &&
    isAgeCompeleted &&
    isJobSelected &&
    isResidenceCompeleted &&
    isSituationCompeleted &&
    isEntourageCompeleted
  )
}

/**
 * MAJ de l'ID du questionnaire EPDS dans le questionnaire Démographique.
 * Important lorsque le quesitonnaire est réalisé avant l'EPDS.
 * @param {*} updateEpdsIdInInfosQuery query UPDATE_REPONSES_EPDS_ID_IN_INFORMATION_DEMOGRAPHIQUES
 * @param {String} reponsesEpdsID ID du questionnaire EPDS
 */
export const updateDemographicData = (
  updateEpdsIdInInfosQuery,
  reponsesEpdsID
) => {
  const infoDemographicID = StorageUtils.getInLocalStorage(
    STORAGE_TEST_DEMOGRAPHIC_ID
  )

  const updateId = async () => {
    await updateEpdsIdInInfosQuery({
      variables: {
        infoDemographiqueId: infoDemographicID,
        reponsesEpdsId: reponsesEpdsID,
      },
    })
  }

  localStorage.removeItem(STORAGE_RESULTS_ID)
  if (infoDemographicID) {
    updateId()
    localStorage.removeItem(STORAGE_TEST_DEMOGRAPHIC_ID)
  }
}
