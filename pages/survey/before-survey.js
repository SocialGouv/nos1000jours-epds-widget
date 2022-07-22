import { useRouter } from "next/router"
import { ContentLayout } from "../../src/components/Layout"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import { getLocaleInLocalStorage } from "../../src/utils/main.utils"

export default function BeforeSurvey() {
  const router = useRouter()

  const IMG_PRO = "../img/icone-pro-sante.svg"
  const IMG_PARENTS = "../img/icone-parent.svg"
  const IMG_ACCOMPAGNEMENT = "../img/icone-accompagnement.svg"

  const localeSelected = getLocaleInLocalStorage()

  const goToEpdseSurvey = async (event) => {
    router.push({
      pathname: "/survey/epds-survey",
    })
  }

  return (
    <ContentLayout>
      <WidgetHeader locale={localeSelected} />

      <div className="before-survey">
        <div>Quelques informations à propos du questionnaire :</div>

        <div className="item-information">
          <img src={IMG_PRO} alt="Icon profressionnel de santé" />
          <div>
            Ce questionnaire est utilisé par les <b>professionnels de santé.</b>
          </div>
        </div>

        <div className="item-information">
          <img src={IMG_PARENTS} alt="Icone parent" />
          <div>
            Depuis son lancement en juillet 2021, <b>plus de 2 000 parents</b> ont
            répondu aux 10 questions sur leur état émotionnel.
          </div>
        </div>

        <div className="item-information">
          <img src={IMG_ACCOMPAGNEMENT} alt="Icon accompagnement" />
          <div>
            Grâce à ce questionnaire,{" "}
            <b>41 personnes par mois sont accompagnées et orientées</b> vers les
            professionnels de santé formés.
          </div>
        </div>

        <div className="contact-maman-blues">
          <img alt="Portrait d'Elise" src="../img/portrait-elise.jpg" />
          <div className="mamanblues-description">
            En fonction du résultat à la fin du questionnaire,{" "}
            <b>vous pourrez contacter Elise de l’association Maman Blues.</b>{" "}
            C’est elle qui vous <b>orientera en toute bienveillance.</b>
          </div>
        </div>

        <div className="button-start-survey">
          <button className="fr-btn fr-btn--lg" onClick={goToEpdseSurvey}>
            Commencer le questionnaire
          </button>
        </div>
      </div>
    </ContentLayout>
  )
}
