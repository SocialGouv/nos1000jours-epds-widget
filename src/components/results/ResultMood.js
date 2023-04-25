import React from "react"

export function ResultMood({ scoreText, testimonyList }) {
  return (
    <>
      <div
        className="fr-tile fr-tile--horizontal remove-box-shadow"
        style={{
          backgroundColor: "#E3E3FD",
          marginBottom: "5%",
        }}
      >
        <div className="fr-tile__body text-color text-margin">
          <p className="fr-tile__desc text-bold">{`Mon score est ${scoreText}`}</p>
        </div>
        <div className="fr-tile__img image-score">
          <img
            src="/img/icone-score.svg"
            className="fr-responsive-img"
            alt="icone-score"
          />
        </div>
      </div>
      <div className="margin-bottom-8">
        <h5>Ce que disent les parents ayant obtenu le même score que moi</h5>
        <figure className="fr-quote height-tile horizontal-line-testimony">
          <blockquote>
            {testimonyList.map((testimony, index) => (
              <p key={index} className="size-font">
                {testimony}
              </p>
            ))}
          </blockquote>
        </figure>
      </div>
    </>
  )
}
