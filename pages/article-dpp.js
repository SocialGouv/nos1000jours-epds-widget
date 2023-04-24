import { ContentLayout } from "../src/components/Layout"
import { WidgetHeader } from "../src/components/WidgetHeader"
import { Icon, MediaVideo } from "@dataesr/react-dsfr"
import * as StorageUtils from "../src/utils/storage.utils"

const Callout = ({ title, description, theme }) => {
  return (
    <div className={`fr-callout ${theme}`}>
      <div className="logo-with-title">
        <Icon className="userIcon" name="ri-information-line" size="xl" />
        <h6>{title}</h6>
      </div>
      <p className="fr-callout__text">{description}</p>
    </div>
  )
}

export default function ArticleDpp() {
  const localeSelected = StorageUtils.getLocaleInLocalStorage()

  return (
    <ContentLayout>
      <WidgetHeader
        title="Le baby blues et la dépression post-partum"
        locale={localeSelected}
      />
      <p className="text-bold">
        L’arrivée d’un bébé est un grand bouleversement dans la vie des parents,
        pour la mère et aussi pour le père. <br /> Parfois les émotions
        négatives prennent le dessus : fatigue, déprime, tristesse, voire
        anxiété, culpabilité… Il est important de mieux connaitre le baby blues
        et la dépression post-partum, pour savoir comment réagir.
      </p>
      <MediaVideo onTranscriptionClick={function noRefCheck() {}}>
        <iframe
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          className="fr-responsive-vid__player"
          frameBorder="0"
          src="/videos/EX2_AGIR_POUR_BEBE_LA_DEPRESSION_POST_PARTUM_DEF_MIX_STT_SD.mp4"
          title="La dépression post-partum"
        />
      </MediaVideo>
      <h5 className="text-color">Qu’est-ce que le baby-blues ?</h5>
      <p>
        Quelques jours après l’accouchement, la majorité des mamans traverse une
        période de déprime qu’on appelle " baby blues ".{" "}
        <span className="text-bold">
          C’est une réaction causée par tous les changements physiques,
          hormonaux et psychologiques liés à l’accouchement.
        </span>
        <br />
        <br />
        La maman peut alors :
      </p>
      <div className="container-list">
        <ul>
          <li>
            se mettre à pleurer "pour un rien", avoir des crises de larmes,
          </li>
          <li>
            avoir des sautes d'humeur, comme être tout d'un coup irritable,
          </li>
          <li>se sentir dépassée par les événements,</li>
          <li>perdre ses repères, sa confiance en elle.</li>
        </ul>
      </div>
      <p>
        Le baby blues peut durer quelques heures ou quelques jours. En général,
        les symptômes disparaissent tous seuls. Pour autant, le conjoint ou
        l’entourage peuvent apporter soutien et réconfort.{" "}
        <span className="text-bold">
          Si les symptômes durent plus de deux semaines, il faut en parler à un
          professionnel de santé,
        </span>{" "}
        comme son médecin ou sa sage-femme. C’est peut-être une dépression
        post-partum.
      </p>
      <div className="my-font">
        <Callout
          title="C'EST VOUS QUI LE DITES"
          description="« Après la naissance de Mia, ma femme a traversé quelques jours
        difficiles... C’était dur d’être impuissant face à toutes ses émotions.
        Alors en attendant que cela passe, j’ai tout fait pour la réconforter et
        la soulager en m’occupant de la maison et de la petite. » (Paul, 36 ans)"
          theme="fr-callout--brown-caramel"
        />
        <Callout
          title="FOCUS & BIEN-ÊTRE"
          description="Les promenades en extérieur, sortir prendre l’air, c’est bon pour se sentir mieux ! Cela détend et favorise le sommeil : ça peut faire du bien en cas de baby-blues aussi. Si on n’a pas envie de sortir, on peut trouver autre chose qui nous fait du bien !"
          theme="fr-callout--green-emeraude"
        />
      </div>
      <h5 className="text-color">Qu’est-ce que la dépression post-partum ?</h5>
      <p>
        <span className="text-bold">
          {" "}
          La dépression post-partum est une maladie
        </span>{" "}
        qui peut apparaître pendant les semaines et les mois suivant
        l’accouchement. Elle se manifeste en général progressivement avec un ou
        plusieurs symptômes comme :
      </p>
      <div className="container-list">
        <ul>
          <li>Une sensation de manque d’énergie.</li>
          <li>Des difficultés à s’occuper de son bébé.</li>
          <li>Une incapacité à réaliser les tâches du quotidien.</li>
          <li>Une perte de plaisir, parfois même dans sa vie sociale.</li>
          <li>Une profonde tristesse sans raisons apparente, des larmes.</li>
          <li>
            Des pensées négatives, comme de la culpabilité, ou un sentiment
            d’incompétence.
          </li>
          <li>
            Des difficultés à dormir, souvent à cause de l’anxiété ou du stress.
          </li>
          <li>Un changement d’appétit.</li>
        </ul>
      </div>
      <p>
        La dépression post-partum, qu’on appelle aussi dépression{" "}
        <span className="text-bold">post-natale</span> ou périnatale, peut durer
        des mois, et parfois même se prolonger au-delà d’un an.
      </p>
      <p>
        <span className="text-bold">
          Près d’une mère sur cinq est touchée par une dépression post-partum
          dans les 4 semaines qui suivent l’accouchement.
        </span>{" "}
        Cette maladie peut toucher tout le monde. Il ne faut pas avoir honte de
        souffrir d’une dépression.
      </p>
      <Callout
        title="LE SAVIEZ-VOUS ?"
        description="Beaucoup de dépressions post-partum ne sont pas identifiées et les personnes touchées ne reçoivent pas de soins. Si on a des doutes pour un proche, on n’hésite pas à lui en parler.        "
        theme="fr-callout--beige-gris-galet"
      />
      <h5 className="text-color">
        Est-ce que les pères peuvent aussi faire une dépression post-partum ?
      </h5>
      <p className="container-list">
        <span className="text-bold">
          Près d’un père sur dix traverse une dépression pendant la grossesse ou
          peu après la naissance de son bébé.
        </span>{" "}
        C’est une période de changements qui peut être bouleversante pour les
        papas aussi. Les symptômes de la dépression post-partum chez les pères
        peuvent être :
      </p>
      <div className="container-list">
        <ul>
          <li>Des doutes.</li>
          <li>De la perte de confiance en soi.</li>
          <li>Une absence d’envie de s’occuper ou s’intéresser au bébé.</li>
          <li>Une envie de s’absenter du domicile.</li>
          <li>La peur d’être jugé.</li>
          <li>Un sentiment de ne pas trouver sa place.</li>
        </ul>
      </div>
      <Callout
        title="ON EN PARLE"
        description="La dépression post-partum chez les pères peut s’accompagner d’anxiété, de consommation de drogues/d’alcool, de troubles du sommeil, de conflits conjugaux…"
        theme="fr-callout--orange-terre-battue"
      />
      <h5 className="text-color">
        Que faire quand on présente des symptômes de dépression ?
      </h5>
      <p className="container-list">
        La dépression post-partum est une maladie qui se soigne.{" "}
        <span className="text-bold">
          Et comme pour la plupart des maladies, on ne la soigne pas seul.
        </span>{" "}
        Alors si on reconnaît un ou plusieurs symptômes, mieux vaut en parler
        rapidement à un professionnel de santé. On peut se tourner vers :
      </p>
      <div className="container-list">
        <ul>
          <li>sa sage-femme,</li>
          <li>son médecin traitant,</li>
          <li>le centre de PMI,</li>
          <li>un psychologue,</li>
          <li>
            voire l’hôpital dans une consultation de pédopsychiatrie périnatale.
          </li>
        </ul>
      </div>
      <p>
        On pourra recevoir une aide, du soutien, des soins. Un traitement sera
        probablement nécessaire. Plus la dépression du post-partum est soignée
        tôt, plus les conséquences pourront être évitées. On peut aussi avoir
        envie d’en parler avec d’autres parents, par exemple dans un lieu
        d’accueil parent-enfant ou un groupe de parents.
      </p>
      <Callout
        title="C'EST VOUS QUI LE DITES"
        description="« Ma cousine n’avait pas envie de s’occuper de son bébé, et son homme ne comprenait pas, il était exaspéré. Je lui ai dit qu’elle devait faire une dépression et qu’il fallait qu’il la soutienne sans la juger. A nous deux on a réussi à la convaincre de se faire aider et maintenant c’est une vraie mère-poule. » (Léa, 29 ans)"
        theme="fr-callout--brown-caramel"
      />
      <h5 className="text-color">
        Pourquoi est-ce important de se faire aider en cas de dépression
        post-partum ?
      </h5>
      <p>
        La dépression post-partum a évidemment un impact sur la qualité de vie
        de la personne qui en souffre, et souvent sur sa relation de couple.
        Elle peut même parfois amener à une perte de goût à la vie, et dans les
        cas les plus extrêmes, à des pensées suicidaires. Quand on soigne une
        dépression post-partum, le parent va mieux, et ainsi a moins de
        difficultés à prendre soin de son enfant.
      </p>
      <h5 className="text-color">Je ne suis pas seul.e</h5>
      <p>
        Chaque situation est différente et pourtant il existe une seule même
        maladie, la dépression post-partum. C'est une maladie qu'il est facile
        de guérir tant que l'on sait la détecter. Parler de ma situation
        m'aidera à m'en sortir.
      </p>
    </ContentLayout>
  )
}
