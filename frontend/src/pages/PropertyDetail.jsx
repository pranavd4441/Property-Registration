import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { getProperty } from '../services/api'
import {
  formatCurrency,
  formatDate,
  getApiErrorMessage,
  getPropertyTypeLabel,
} from '../utils/formatters'

function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getProperty(id)
      .then((response) => setProperty(response.data))
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loading message="Loading property details..." />

  if (error) {
    return (
      <section className="page">
        <ErrorMessage message={error} />
        <Link className="btn btn-secondary" to="/properties">
          Back to Properties
        </Link>
      </section>
    )
  }

  if (!property) return null

  const detailRows = [
    ['Property Name', property.property_name],
    ['Survey Number', property.survey_number],
    ['Property Type', getPropertyTypeLabel(property.property_type)],
    ['Area', property.area],
    ['Price', formatCurrency(property.price)],
    ['Owner Name', property.owner_name],
    ['City', property.city],
    ['Created At', formatDate(property.created_at)],
  ]

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Property Detail</p>
          <h1>{property.property_name}</h1>
        </div>
        <div className="header-actions">
          <Link className="btn btn-primary" to={`/properties/${property.id}/edit`}>
            Edit
          </Link>
          <Link className="btn btn-secondary" to="/properties">
            Back
          </Link>
        </div>
      </div>

      <div className="detail-layout">
        <div className="detail-image-wrap">
          {property.property_image ? (
            <img src={property.property_image} alt={property.property_name} />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
        </div>
        <div className="detail-panel">
          <dl className="detail-list">
            {detailRows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value || 'Not available'}</dd>
              </div>
            ))}
          </dl>

          <div className="pdf-actions">
            {property.registration_pdf ? (
              <>
                <a
                  className="btn btn-primary"
                  href={property.registration_pdf}
                  target="_blank"
                  rel="noreferrer"
                >
                  View PDF
                </a>
                <a
                  className="btn btn-secondary"
                  href={property.registration_pdf}
                  download
                >
                  Download PDF
                </a>
              </>
            ) : (
              <span>No registration PDF uploaded.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyDetail
