import { ApolloClient, gql, InMemoryCache, HttpLink } from "@apollo/client"

import { API_URL } from "./src/constants/constants"
import fetch from "cross-fetch"

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: { "content-type": "application/json" },
  link: new HttpLink({ uri: `${API_URL}/graphql?nocache`, fetch }),
})

export const GET_INFORMATION_PRO_SANTE = gql`
  query annuaire1000JBlues {
    annuaire1000JBlues {
      prenom
      nom
      profession
      telephone
      mail
      site
      adresse
      ville
      code_postal
      region
      departement_code
      departement
      longitude
      latitude
      tarif
      conventionne_securite_sociale
    }
  }
`

export const GET_ACTIVATION_TILE_STATUS = gql`
  query activationTile {
    activationTile {
      activation_tile
    }
  }
`

export const EPDS_ADD_SURVEY_RESULTS = gql`
  mutation (
    $genre: ENUM_REPONSESEPDS_GENRE!
    $compteur: Int!
    $score: Int!
    $reponseNum1: Int!
    $reponseNum2: Int!
    $reponseNum3: Int!
    $reponseNum4: Int!
    $reponseNum5: Int!
    $reponseNum6: Int!
    $reponseNum7: Int!
    $reponseNum8: Int!
    $reponseNum9: Int!
    $reponseNum10: Int!
    $tempsSurvey: Int!
    $langue: ID
    $source: ENUM_REPONSESEPDS_SOURCE!
    $sourceWidgetNom: String!
  ) {
    createReponsesEpdsWidget(
      genre: $genre
      compteur: $compteur
      score: $score
      reponse_1: $reponseNum1
      reponse_2: $reponseNum2
      reponse_3: $reponseNum3
      reponse_4: $reponseNum4
      reponse_5: $reponseNum5
      reponse_6: $reponseNum6
      reponse_7: $reponseNum7
      reponse_8: $reponseNum8
      reponse_9: $reponseNum9
      reponse_10: $reponseNum10
      temps_survey: $tempsSurvey
      langue: $langue
      source: $source
      source_widget_nom: $sourceWidgetNom
    ) {
      id
      created_at
    }
  }
`

export const EPDS_CONTACT_INFORMATION = gql`
  mutation (
    $email: String
    $telephone: String
    $prenom: String
    $moyen: String
    $horaires: String
    $scoreQuestionDix: String
  ) {
    epdsContact(
      email: $email
      telephone: $telephone
      prenom: $prenom
      moyen: $moyen
      horaires: $horaires
      score_question_dix: $scoreQuestionDix
    )
  }
`

export const GET_TEMOIGNAGES_CHIFFRES = gql`
  query temoignages {
    temoignages {
      titre
      texte
      chiffre_choc
      source
    }
  }
`

/**
 * Nombre total de tests EPDS passés
 */
export const GET_RESUTLATS_COUNT = gql`
  query resultatsCount {
    reponsesEpdsConnection {
      aggregate {
        count
      }
    }
  }
`

export const SAVE_INFORMATION_DEMOGRAPHIQUES = gql`
  mutation (
    $genre: ENUM_INFORMATIONSDEMOGRAPHIQUES_GENRE
    $age: ENUM_INFORMATIONSDEMOGRAPHIQUES_AGE
    $entourageDispo: ENUM_INFORMATIONSDEMOGRAPHIQUES_ENTOURAGE_DISPO
    $situation: String
    $codePostal: String
    $ville: String
    $departement: String
    $departementLibelle: String
    $region: String
    $reponsesEpds: ID
    $cspCode: String
    $cspLibelle: String
  ) {
    createInformationsDemographique(
      input: {
        data: {
          genre: $genre
          age: $age
          entourage_dispo: $entourageDispo
          situation: $situation
          code_postal: $codePostal
          ville: $ville
          departement: $departement
          departement_libelle: $departementLibelle
          region: $region
          reponses_epds: $reponsesEpds
          csp_code: $cspCode
          csp_libelle: $cspLibelle
        }
      }
    ) {
      informationsDemographique {
        id
        created_at
      }
    }
  }
`

/**
 * MAJ de l'ID du résultats EPDS associé au formulaire des informationis démographiques
 * @param {ID} infoDemographiqueId ID du formulaire Informations Démographiques
 * @param {ID} reponsesEpdsId ID de la réponse EPDS
 */
export const UPDATE_REPONSES_EPDS_ID_IN_INFORMATION_DEMOGRAPHIQUES = gql`
  mutation ($infoDemographiqueId: ID!, $reponsesEpdsId: ID) {
    updateInformationsDemographique(
      input: {
        where: { id: $infoDemographiqueId }
        data: { reponses_epds: $reponsesEpdsId }
      }
    ) {
      informationsDemographique {
        id
        created_at
      }
    }
  }
`

/**
 * Enregistre la demande de contact dans la collection "Demande de contacts"
 * ENUM_DEMANDEDECONTACT_TYPE_DE_CONTACT { sms, email, chat, rendezvous }
 */
export const SAVE_DEMANDE_DE_CONTACT = gql`
  mutation (
    $typeDeContact: ENUM_DEMANDEDECONTACT_TYPE_DE_CONTACT
    $widgetEpdsSource: ID
    $reponsesEpds: ID
  ) {
    createDemandeDeContact(
      input: {
        data: {
          type_de_contact: $typeDeContact
          widget_epds_source: $widgetEpdsSource
          reponses_epds: $reponsesEpds
        }
      }
    ) {
      demandeDeContact {
        id
        created_at
      }
    }
  }
`

/**
 * Enregistre le contact dans la collection "Contacts"
 * ENUM_CONTACTS_TYPE_DE_CONTACT { sms, email, chat }
 * ENUM_CONTACTS_PERSONNE_ACCOMPAGNEE { orientee, aidee, echange_initial, non_accompagnee, nouveau }
 */
export const SAVE_CONTACT = gql`
  mutation (
    $prenom: String
    $departementCode: String
    $departementLibelle: String
    $datePriseContact: Date
    $typeDeContact: ENUM_CONTACTS_TYPE_DE_CONTACT
    $personneAccompagnee: ENUM_CONTACTS_PERSONNE_ACCOMPAGNEE
    $commentaire: String
    $widgetEpdsSource: ID
    $email: String
    $numero_telephone: String
  ) {
    createContact(
      input: {
        data: {
          prenom: $prenom
          departement_code: $departementCode
          departement_libelle: $departementLibelle
          date_prise_contact: $datePriseContact
          type_de_contact: $typeDeContact
          personne_accompagnee: $personneAccompagnee
          commentaire: $commentaire
          widget_epds_source: $widgetEpdsSource
          email: $email
          numero_telephone: $numero_telephone
        }
      }
    ) {
      contact {
        id
        prenom
      }
    }
  }
`

export const DEMANDE_RESSOURCES = gql`
  mutation ($email: String) {
    partageRessourcesParMail(email: $email)
  }
`
