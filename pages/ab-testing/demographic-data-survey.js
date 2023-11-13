import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { client, SAVE_INFORMATION_DEMOGRAPHIQUES } from "../../apollo-client"
import { ContentLayout } from "../../src/components/Layout"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import {
  STORAGE_RESULTS_ID,
  STORAGE_TEST_DEMOGRAPHIC_DPT_CODE,
  STORAGE_TEST_DEMOGRAPHIC_DPT_LIBELLE,
  STORAGE_TEST_DEMOGRAPHIC_ID,
} from "../../src/constants/constants"
import {
  ageValues,
  convertArraySituationsToString,
  availableRelativesValues,
  genderValues,
  situationValues,
} from "../../src/utils/ab-testing/demographic-data.utils"
import {
  LoaderFoButton,
  updateRadioButtonSelectedInList,
} from "../../src/utils/main.utils"
import * as StorageUtils from "../../src/utils/storage.utils"
import * as TrackerUtils from "../../src/utils/tracker.utils"
import * as DemographicDataUtils from "../../src/utils/ab-testing/demographic-data.utils"
import { JobSelector } from "../../src/components/JobSelector"
import { DepartmentCodeSelector } from "../../src/components/DepartmentCodeSelector"
import { LastChildAgeSelector } from "../../src/components/LastChildAgeSelector"
import { MoisGrossesseSelector } from "../../src/components/MoisGrossesseSelector"

export default function DemographicDataSurvey() {
  const router = useRouter()

  const localeSelected = StorageUtils.getLocaleInLocalStorage()
  const [showDataDetails, setShowDataDetails] = useState(false)
  const [isValidateButtonEnabled, setValidateButtonEnabled] = useState(true)
  const [isLoading, setLoading] = useState(false)

  const [genderItems, setGenderItems] = useState(genderValues)
  const [ageItems, setAgeItems] = useState(ageValues)
  const [situationItems, setSituationItems] = useState(situationValues)
  const [entourageItems, setEntourageItems] = useState(availableRelativesValues)
  const [residenceValue, setResidenceValue] = useState()
  const [jobValue, setJobValue] = useState()
  const [lastChildAge, setLastChildAge] = useState()
  const [moisGrossesse, setMoisGrossesse] = useState()

  const epdsTestID = StorageUtils.getInLocalStorage(STORAGE_RESULTS_ID)
  const demographicData = DemographicDataUtils.getDemographicBeforeEpds()

  useEffect(() => {
    const isCompleted = checkIsFormCompleted(
      genderItems,
      ageItems,
      jobValue,
      residenceValue,
      situationItems,
      entourageItems,
      lastChildAge,
      moisGrossesse
    )
    setValidateButtonEnabled(isCompleted)
  }, [
    genderItems,
    ageItems,
    jobValue,
    residenceValue,
    situationItems,
    entourageItems,
    lastChildAge,
    moisGrossesse,
  ])

  const RadioButtonGroup = ({ groupName, data, defaultData, setItems }) => {
    const situationStyle =
      groupName === "radio-situation" ? { maxWidth: "410px" } : {}
    return (
      <ToggleButtonGroup type="radio" name={groupName}>
        {data.map((item) => (
          <ToggleButton
            key={item.id}
            style={situationStyle}
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
  }

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
          defaultData={availableRelativesValues}
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

    let lastChildAgeInt = null
    let moisGrossesseInt = null
    situationItems?.filter((item) => {
      if (item.id === "vousAttendez1Enfant" && item.isChecked) {
        moisGrossesseInt = parseInt(moisGrossesse)
        moisGrossesseInt = isNaN(moisGrossesseInt) ? null : moisGrossesseInt
      }
      if (item.id === "vousAvezEnfantDeMoinsDe1an" && item.isChecked) {
        lastChildAgeInt = parseInt(lastChildAge)
        lastChildAgeInt = isNaN(lastChildAgeInt) ? null : lastChildAgeInt
      }
    })

    localStorage.setItem(STORAGE_TEST_DEMOGRAPHIC_DPT_CODE, residenceValue.code)
    localStorage.setItem(
      STORAGE_TEST_DEMOGRAPHIC_DPT_LIBELLE,
      residenceValue.nom
    )

    setLoading(true)

    await sendInfosQuery({
      variables: {
        genre: gender.id,
        age: age.id,
        situation: convertArraySituationsToString(situations),
        lastChildAge: lastChildAgeInt,
        moisGrossesse: moisGrossesseInt,
        entourageDispo: entourage.id,
        departement: residenceValue.code,
        departementLibelle: residenceValue.nom,
        region: residenceValue.nomRegion,
        reponsesEpds: epdsTestID,
        cspCode: jobValue.code,
        cspLibelle: jobValue.libelle,
      },
    })
    TrackerUtils.track(
      TrackerUtils.CATEG.demography,
      TrackerUtils.ACTION.end_demo
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
            Votre catégorie socio-professionnelle :
          </div>
          <JobSelector setJobSelected={setJobValue} />
        </div>

        <div>
          <div className="bloc-name">Votre département de résidence :</div>
          <DepartmentCodeSelector setSelectedDepartment={setResidenceValue} />
        </div>

        <SituationBloc />
        <MoisGrossesseSelector
          situations={situationItems}
          setMoisGrossesse={setMoisGrossesse}
        />
        <LastChildAgeSelector
          situations={situationItems}
          setLastChildAge={setLastChildAge}
        />

        <EntourageBloc />

        <i className="required-field">Tous les champs sont obligatoires</i>
        <div className="button-validation">
          <button
            className="fr-btn fr-btn--lg"
            disabled={!isValidateButtonEnabled}
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
  entourageData,
  lastChildAge,
  moisGrossesse
) => {
  const isGenderCompeleted = !!genderData?.find((item) => item.isChecked)
  const isAgeCompeleted = !!ageData?.find((item) => item.isChecked)
  const isJobSelected = jobData != undefined
  const isResidenceSelected = residenceData != undefined
  const isSituationCompeleted = !!situationData?.find((item) => item.isChecked)
  const isEntourageCompeleted = !!entourageData?.find((item) => item.isChecked)
  const isLastChildAgeSelected = lastChildAge != undefined
  const isMoisGrossesseSelected = moisGrossesse != undefined

  const checkpoints = [
    isGenderCompeleted,
    isAgeCompeleted,
    isJobSelected,
    isResidenceSelected,
    isSituationCompeleted,
    isEntourageCompeleted,
  ]

  // Add optionnal checkpoints
  situationData?.forEach((item) => {
    if (item.id === "vousAvezEnfantDeMoinsDe1an" && item.isChecked)
      checkpoints.push(isLastChildAgeSelected)
    if (item.id === "vousAttendez1Enfant" && item.isChecked)
      checkpoints.push(isMoisGrossesseSelected)
  })

  const isCompleted = checkpoints.every((v) => v === true)

  return isCompleted
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

  if (infoDemographicID) {
    updateId()
    localStorage.removeItem(STORAGE_TEST_DEMOGRAPHIC_ID)
  }
}
