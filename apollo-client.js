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

export const EPDS_PARTAGE_RESULTS = gql`
  mutation (
    $email: String!
    $prenom: String
    $detail_questions: [String]
    $detail_reponses: [String]
    $url_test: String
    $date: String
    $mood_level: String
  ) {
    epdsPartagePourSoiMeme(
      email: $email
      prenom: $prenom
      detail_questions: $detail_questions
      detail_reponses: $detail_reponses
      url_test: $url_test
      date: $date
      mood_level: $mood_level
    )
  }
`

export const EPDS_PARTAGE_RESULTS_ENTOURAGE = gql`
  mutation (
    $email: String!
    $prenom: String
    $detail_questions: [String]
    $detail_reponses: [String]
    $url_test: String
    $date: String
    $mood_level: String
  ) {
    epdsPartageEntourage(
      email: $email
      prenom: $prenom
      detail_questions: $detail_questions
      detail_reponses: $detail_reponses
      url_test: $url_test
      date: $date
      mood_level: $mood_level
    )
  }
`
