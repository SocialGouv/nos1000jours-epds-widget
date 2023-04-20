import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@codegouvfr/react-dsfr/Button"
import { Icon, Pagination } from "@dataesr/react-dsfr"
import { Spinner } from "react-bootstrap"
export function HealthProList({
  proList,
  page,
  setPage,
  geoLoading,
  activatePagination,
}) {
  const table = useRef(null)
  const [surrendingPages, setSurrendingPages] = useState(0)

  const pagedProfessional = useMemo(() => {
    const start = (page - 1) * 10
    return proList.slice(start, start + 10)
  }, [proList, page])
  const pageCount = Math.ceil(proList.length / 10)
  const currentPage = Math.min(page, pageCount)

  const updateSurrendingPages = () => {
    if (table.current) {
      const { width } = table.current.getBoundingClientRect()
      if (width > 700) {
        setSurrendingPages(3)
      } else if (width > 550) {
        setSurrendingPages(2)
      } else if (width > 500) {
        setSurrendingPages(1)
      } else {
        setSurrendingPages(0)
      }
    }
  }

  useEffect(() => {
    updateSurrendingPages()
  }, [table])

  useEffect(() => {
    window.addEventListener("resize", updateSurrendingPages)
    return () => window.removeEventListener("resize", updateSurrendingPages)
  }, [])

  return (
    <div ref={table}>
      {geoLoading && pagedProfessional.length > 0 && (
        <div className="tables" data-test-id="psy-table">
          {pagedProfessional.map((psychologist, index) => (
            <div className="box" key={index} data-test-id="psy-row">
              <div className="personnalInfo">
                <Icon className="userIcon" name="ri-user-line" size="2x" />
                <div>
                  <h6>
                    {psychologist.nom.toUpperCase()} {psychologist.prenom}
                  </h6>
                  <div className="addressInfo">
                    <div>
                      <Icon
                        className="fr-mr-1w"
                        name="ri-map-pin-2-fill"
                        size="lg"
                      />
                      {psychologist.adresse && psychologist.code_postal && (
                        <span>
                          {psychologist.adresse}
                          <br />
                          {psychologist.ville} • {psychologist.code_postal}
                        </span>
                      )}
                      {(!psychologist.adresse || !psychologist.code_postal) && (
                        <span>{psychologist.ville}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="horizontalSeparator" />
              <div className="contactInfo">
                <div
                  onClick={() => {
                    window.location.href = `tel:${psychologist.telephone1}`
                  }}
                >
                  <Icon name="ri-phone-fill" size="2x" />
                </div>
                <div className="bigSeparator" />
                <Button onClick={() => console.log("coucou")}>
                  Plus d&lsquo;infos
                </Button>
              </div>
            </div>
          ))}
          {activatePagination && (
            <div className="pagination-size">
              <Pagination
                currentPage={currentPage}
                surrendingPages={surrendingPages}
                pageCount={pageCount}
                onClick={setPage}
              />
            </div>
          )}
        </div>
      )}
      {!geoLoading && <Spinner animation="border" />}
    </div>
  )
}
