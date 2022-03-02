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

export const GET_RESOURCES_BY_PLATFORM = gql`
  query RessourcesEpds($plateforme: String) {
    ressourcesEpds(where: { plateforme: $plateforme }) {
      plateforme
      ressources_configs {
        texte_1
        texte_2
        ressources {
          type
          titre
          contenu
        }
      }
    }
  }
`
