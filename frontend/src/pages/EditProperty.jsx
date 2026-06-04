import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import PropertyForm from '../components/PropertyForm'
import { getProperty, updateProperty } from '../services/api'
import { getApiErrorMessage } from '../utils/formatters'

function EditProperty() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getProperty(id)
      .then((response) => setProperty(response.data))
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = (formData) => {
    setIsSubmitting(true)
    setError('')

    updateProperty(id, formData)
      .then(() => navigate(`/properties/${id}`))
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setIsSubmitting(false))
  }

  if (loading) return <Loading message="Loading property form..." />

  return (
    <section className="page narrow-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Update Record</p>
          <h1>Edit Property</h1>
        </div>
        <Link className="btn btn-secondary" to={`/properties/${id}`}>
          Back
        </Link>
      </div>

      <ErrorMessage message={error} />

      {property && (
        <PropertyForm
          initialData={property}
          onSubmit={handleSubmit}
          submitLabel="Update Property"
          isSubmitting={isSubmitting}
        />
      )}
    </section>
  )
}

export default EditProperty
