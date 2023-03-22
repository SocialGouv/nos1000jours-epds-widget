import { useLazyQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { client, GET_RESUTLATS_COUNT } from "../../apollo-client"
import { ContentLayout } from "../../src/components/Layout"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import { STORAGE_SOURCE } from "../../src/constants/constants"
import * as DemographicDataUtils from "../../src/utils/ab-testing/demographic-data.utils"
import * as StorageUtils from "../../src/utils/storage.utils"
import * as TrackerUtils from "../../src/utils/tracker.utils"

export default function BeforeSurvey() {
  const router = useRouter()

  const IMG_PRO = "../img/icone-pro-sante.svg"
  const IMG_PARENTS = "../img/icone-parent.svg"
  const IMG_ACCOMPAGNEMENT = "../img/icone-accompagnement.svg"

  const TOTAL_RESULTS_COUNT_DEFAULT = 35000
  const [totalResultsCount, setTotalResultsCount] = useState(
    TOTAL_RESULTS_COUNT_DEFAULT
  )

  const localeSelected = StorageUtils.getLocaleInLocalStorage()
  const source = StorageUtils.getInLocalStorage(STORAGE_SOURCE)

  useEffect(() => {
    const resultatsCountQuery = async () => {
      await getResultatsCountInDatabase()
    }
    resultatsCountQuery()
  }, [])

  const goToEpdsSurvey = async () => {
    router.push({
      pathname: "/survey/epds-survey",
    })
  }

  const goToNextPage = async () => {
    TrackerUtils.track(
      TrackerUtils.CATEG.introduction,
      TrackerUtils.ACTION.end_intro
    )
    source === "1000-premiers-jours"
      ? await goToEpdsSurvey()
      : await goToDemographicSurvey()
  }

  const goToDemographicSurvey = async () => {
    DemographicDataUtils.goToDemographicSurvey(router)
  }

  const [getResultatsCountInDatabase] = useLazyQuery(GET_RESUTLATS_COUNT, {
    client: client,
    onCompleted: (data) => {
      const number = data.reponsesEpdsConnection.aggregate.count

      setTotalResultsCount(number)
    },
    onError: (err) => {
      console.warn(err)
    },
  })

  return (
    <ContentLayout>
      <WidgetHeader locale={localeSelected} />

      <div className="before-survey">
        <div>Quelques informations à propos du questionnaire :</div>

        <ul>
          <li className="item-information">
            <img src={IMG_PRO} alt="" />
            <div>
              Ce questionnaire est utilisé par les{" "}
              <b>professionnels de santé.</b>
            </div>
          </li>

          <li className="item-information">
            <img src={IMG_PARENTS} alt="" />
            <div>
              Depuis son lancement en juillet 2021, les parents ont complété
              <b> {totalResultsCount.toLocaleString()} questionnaires </b>sur
              leur état émotionnel.
            </div>
          </li>

          <li className="item-information">
            <img src={IMG_ACCOMPAGNEMENT} alt="" />
            <div>
              Grâce à ce questionnaire,
              <b> 41 personnes par mois sont accompagnées et orientées</b> vers
              les professionnels de santé formés.
            </div>
          </li>
        </ul>

        <div className="contact-maman-blues">
          <img alt="" src="../img/portrait-elise.jpg" />
          <div className="mamanblues-description">
            En fonction du résultat à la fin du questionnaire,{" "}
            <b>vous pourrez contacter Elise de l’association Maman Blues.</b>{" "}
            C’est elle qui vous <b>orientera en toute bienveillance.</b>
          </div>
        </div>

        <div className="button-start-survey">
          <button className="fr-btn fr-btn--lg" onClick={goToNextPage}>
            {source === "1000-premiers-jours"
              ? "Commencer le questionnaire"
              : "Suivant"}
          </button>
        </div>
      </div>
    </ContentLayout>
  )
}
