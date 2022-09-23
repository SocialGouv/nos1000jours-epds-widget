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
  ) {
    epdsContact(
      email: $email
      telephone: $telephone
      prenom: $prenom
      nombre_enfants: $nombreEnfants
      naissance_dernier_enfant: $naissanceDernierEnfant
      moyen: $moyen
      horaires: $horaires
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
