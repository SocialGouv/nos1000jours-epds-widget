import { ApolloClient, gql, InMemoryCache, HttpLink } from "@apollo/client"

import { API_URL } from "./src/constants/constants"
import fetch from "cross-fetch"

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: { "content-type": "application/json" },
  link: new HttpLink({ uri: `${API_URL}/graphql?nocache`, fetch }),
})

export const EPDS_CONTACT_INFORMATION = gql`
  mutation (
    $email: String
    $telephone: String
    $prenom: String
    $nombreEnfants: Int
    $naissanceDernierEnfant: String
    $moyen: String
    $horaires: String
    $score_question_dix: Int
  ) {
    epdsContact(
      email: $email
      telephone: $telephone
      prenom: $prenom
      nombre_enfants: $nombreEnfants
      naissance_dernier_enfant: $naissanceDernierEnfant
      moyen: $moyen
      horaires: $horaires
      score_question_dix: $score_question_dix
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
 * ENUM_DEMANDEDECONTACT_TYPE_DE_CONTACT { sms, email, chat }
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
    $nombreEnfants: Int
    $naissanceDernierEnfant: Date
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
          nombre_enfants: $nombreEnfants
          date_naissance_dernier_enfant: $naissanceDernierEnfant
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
