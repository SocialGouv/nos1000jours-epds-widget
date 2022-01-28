import { ApolloClient, gql, InMemoryCache, HttpLink } from "@apollo/client"

import { API_URL } from "./src/constants/constants"
import fetch from "cross-fetch"

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: { "content-type": "application/json" },
  link: new HttpLink({ uri: `${API_URL}/graphql?nocache`, fetch }),
})

export const QUESTIONNAIRE_EPDS_TRADUCTION = gql`
  query QuestionnaireEpdsTraductions($locale: String) {
    questionnaireEpdsTraductions(where: { langue: { identifiant: $locale } }) {
      libelle
      ordre
      langue {
        identifiant
      }
      reponse_1_libelle
      reponse_1_points
      reponse_2_libelle
      reponse_2_points
      reponse_3_libelle
      reponse_3_points
      reponse_4_libelle
      reponse_4_points
    }
  }
`

export const GET_LOCALES = gql`
  query Locales {
    locales {
      id
      identifiant
      libelle_francais
      libelle_langue
      drapeau {
        url
      }
    }
  }
`

export const EPDS_SAVE_RESPONSE = gql`
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
