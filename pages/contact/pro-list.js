import { useEffect, useState } from "react"
import { ContentLayout } from "../../src/components/Layout"
import { WidgetHeader } from "../../src/components/WidgetHeader"
import * as StorageUtils from "../../src/utils/storage.utils"
import * as DistanceUtils from "../../src/utils/distance.utils"
import * as ContactUtils from "../../src/utils/contact.utils"
import { HealthProList } from "../../src/components/contact/HealthProList"
import { NoResultPsyTable } from "../../src/components/contact/NoResultsPro"
import { GET_INFORMATION_PRO_SANTE, client } from "../../apollo-client"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { Spinner, Col } from "react-bootstrap"
import { TextInput, Button, Alert } from "@dataesr/react-dsfr"

const AROUND_ME = "Autour de moi"

const geoStatusEnum = {
  UNSUPPORTED: -2,
  DENIED: -1,
  UNKNOWN: 0,
  GRANTED: 1,
}

export default function DemographicDataSurvey() {
  const router = useRouter()
  const query = router.query
  const searchParams = new URLSearchParams(query)
  const localeSelected = StorageUtils.getLocaleInLocalStorage()

  const [page, setPage] = useState(0)
  const [addressFilter, setAddressFilter] = useState("")
  const [coords, setCoords] = useState()
  const [pagination, setPagination] = useState(true)
  const [geoStatus, setGeoStatus] = useState(geoStatusEnum.UNKNOWN)
  const [geoLoading, setGeoLoading] = useState(true)

  const { loading, error, data } = useQuery(GET_INFORMATION_PRO_SANTE, {
    client: client,
  })
  const [filteredPsychologists, setFilteredPsychologists] = useState([])

  const checkGeolocationPermission = () => {
    if (!coords) {
      if (navigator.geolocation) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          getGeolocation(result.state)
        })
      } else {
        setGeoStatus(geoStatusEnum.UNSUPPORTED)
      }
    }
  }

  const success = (pos) => {
    const { longitude, latitude } = pos.coords
    setCoords({ longitude, latitude })
    setGeoStatus(geoStatusEnum.GRANTED)
    setGeoLoading(true)
  }

  const errors = () => {
    setGeoStatus(geoStatusEnum.DENIED)
  }

  const getGeolocation = (state) => {
    if (state === "granted") {
      setGeoLoading(false)
      navigator.geolocation.getCurrentPosition(success)
    } else if (state === "prompt") {
      setGeoLoading(false)
      navigator.geolocation.getCurrentPosition(success, errors)
    } else if (state === "denied") {
      setGeoStatus(geoStatusEnum.DENIED)
      setGeoLoading(true)
    }
  }

  useEffect(() => {
    if (page === 0) {
      setPage(searchParams.get("page") || 1)
    } else {
      setPage(1)
    }

    if (addressFilter === AROUND_ME) {
      checkGeolocationPermission()
    }
  }, [addressFilter])

  useEffect(() => {
    if (data) {
      const matchingFiltersPsychologists = annuaire.filter((psychologist) => {
        if (addressFilter === AROUND_ME) {
          return true
        }

        const departementFilter = +addressFilter
        const addressIsDepartment =
          departementFilter &&
          ((departementFilter > 0 && departementFilter < 96) ||
            (departementFilter > 970 && departementFilter < 977))
        if (addressIsDepartment) {
          if (
            addressFilter &&
            !ContactUtils.matchFilter(psychologist.code_postal, addressFilter)
          ) {
            return false
          }
        } else if (addressFilter) {
          if (
            addressFilter &&
            !ContactUtils.matchFilter(psychologist.ville, addressFilter)
          ) {
            return false
          }
        }
        return true
      })
      if (coords && addressFilter === AROUND_ME) {
        const start = (page - 1) * 10
        setFilteredPsychologists(
          matchingFiltersPsychologists
            .filter((psy) => psy.latitude && psy.longitude)
            .map((psy) => ({
              ...psy,
              distance: DistanceUtils.distanceKm(
                psy.latitude,
                psy.longitude,
                coords.latitude,
                coords.longitude
              ),
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(start, start + 10)
        )
        setPagination(false)
      } else {
        setPagination(true)
        setPage(1)
        setFilteredPsychologists(matchingFiltersPsychologists)
      }
    }
  }, [data, addressFilter, coords])

  if (loading) return <Spinner animation="border" />
  if (error) return <p>Error</p>

  const annuaire = data.annuaire1000JBlues

  return (
    <ContentLayout>
      <WidgetHeader
        title="Trouver un professionel de santé"
        locale={localeSelected}
      />
      <h5>
        Spécialisés dans la périnatalité et la dépression post-partum, ces
        professionnels peuvent m'aider.
      </h5>
      <TextInput
        value={addressFilter}
        onChange={(e) => setAddressFilter(e.target.value)}
        placeholder="Rechercher par ville ou département"
      />
      <Button
        className="fr-btn--secondary around-me-button"
        icon="ri-compass-3-line"
        onClick={() => setAddressFilter(AROUND_ME)}
      >
        Autour de moi
      </Button>
      {addressFilter === AROUND_ME && geoStatus === geoStatusEnum.DENIED && (
        <Alert
          className="fr-mt-2w"
          type="error"
          description="Veuillez autoriser la géolocalisation sur votre navigateur pour utiliser cette
                    fonctionnalité."
        />
      )}
      {addressFilter === AROUND_ME &&
        geoStatus === geoStatusEnum.UNSUPPORTED && (
          <Alert
            className="fr-mt-1w"
            type="error"
            description="Votre navigateur ne permet pas d'utiliser cette fonctionnalité."
          />
        )}

      <div className="demographic-data">
        <Col className="be-contacted-bottom-buttons">
          <div className="button-validation">
            {data && (
              <HealthProList
                proList={filteredPsychologists}
                page={page}
                setPage={setPage}
                geoLoading={geoLoading}
                activatePagination={pagination}
              />
            )}
            {filteredPsychologists.length === 0 && <NoResultPsyTable />}
          </div>
        </Col>
      </div>
    </ContentLayout>
  )
}
