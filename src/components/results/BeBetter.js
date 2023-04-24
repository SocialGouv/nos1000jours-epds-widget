import React from "react"
import * as StorageUtils from "../../utils/storage.utils"
import { AlertTile } from "./AlertTile"
import { ContactTile } from "./ContactTile"

export function BeBetter({ score }) {
  return (
    <>
      <h5 className="padding-top-h5">Je ne suis pas seul.e</h5>
      <p>
        Chaque situation est différente et pourtant il existe une seule même
        maladie,{" "}
        <a className="text-color" target="_blank" href="/article-dpp">
          la dépression post-partum
        </a>
        . C'est une maladie qu'il est facile de guérir tant que l'on sait la
        détecter. Parler de ma situation m'aidera à m'en sortir.
        <br />
        <br />
        <span className="text-bold">
          Je veux être aidé.e dans ma démarche :
        </span>
      </p>
      {score > 11 && (
        <>
          <AlertTile />
          <ContactTile />
        </>
      )}

      {score <= 11 && (
        <>
          <ContactTile />
          <AlertTile />
        </>
      )}
    </>
  )
}
