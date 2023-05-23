import React from "react"
import { trackerForResults, ACTION } from "../../utils/tracker.utils"
import { AlertTile } from "./AlertTile"
import { ContactTile } from "./ContactTile"

export function BeBetter({ score, linkActive }) {
  return (
    <>
      <h5 className="padding-top-h5">Je ne suis pas seul.e</h5>
      <p>
        Chaque situation est différente et pourtant il existe une seule même
        maladie,{" "}
        {linkActive && (
          <a
            className="text-color text-underline"
            href="/article-dpp"
            onClick={() => {
              trackerForResults(ACTION.article)
            }}
          >
            la dépression post-partum
          </a>
        )}
        {!linkActive && <>la dépression post-partum</>}
        . C'est une maladie qu'il est facile de guérir tant que l'on sait la
        détecter. Parler de ma situation m'aidera à m'en sortir.
        <br />
        <br />
        <span className="text-bold">
          Je veux être aidé.e dans ma démarche en tout anonymat et
          confidentialité des échanges :
        </span>
      </p>
      {score > 15 && (
        <>
          <AlertTile isArticle={linkActive} />
          <ContactTile isArticle={linkActive} />
        </>
      )}

      {score <= 15 && (
        <>
          <ContactTile isArticle={linkActive} />
          <AlertTile isArticle={linkActive} />
        </>
      )}
    </>
  )
}
