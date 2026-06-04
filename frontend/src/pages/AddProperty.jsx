import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import PropertyForm from '../components/PropertyForm'
import { createProperty } from '../services/api'
import { getApiErrorMessage } from '../utils/formatters'

function AddProperty() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (formData) => {
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    createProperty(formData)
      .then(() => {
        setSuccess('Property created successfully.')
        navigate('/properties')
      })
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setIsSubmitting(false))
  }

  return (
    <section className="page narrow-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">New Record</p>
          <h1>Add Property</h1>
        </div>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      <ErrorMessage message={error} />

      <PropertyForm
        onSubmit={handleSubmit}
        submitLabel="Create Property"
        isSubmitting={isSubmitting}
      />
    </section>
  )
}

export default AddProperty
