import { useEffect, useMemo, useState } from 'react'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import PropertyCard from '../components/PropertyCard'
import { deleteProperty, getProperties } from '../services/api'
import {
  getApiErrorMessage,
  propertyTypeOptions,
} from '../utils/formatters'

function PropertyList() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [propertyToDelete, setPropertyToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let isMounted = true

    getProperties()
      .then((response) => {
        if (isMounted) setProperties(response.data)
      })
      .catch((err) => {
        if (isMounted) setError(getApiErrorMessage(err))
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const filteredProperties = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return properties.filter((property) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          property.property_name,
          property.owner_name,
          property.city,
          property.survey_number,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedSearch))

      const matchesType = !typeFilter || property.property_type === typeFilter

      return matchesSearch && matchesType
    })
  }, [properties, searchTerm, typeFilter])

  const handleDelete = () => {
    if (!propertyToDelete) return

    setIsDeleting(true)
    deleteProperty(propertyToDelete.id)
      .then(() => {
        setProperties((current) =>
          current.filter((property) => property.id !== propertyToDelete.id),
        )
        setPropertyToDelete(null)
      })
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setIsDeleting(false))
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Property Records</p>
          <h1>Registered Properties</h1>
        </div>
      </div>

      <div className="filters">
        <label>
          Search
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Name, owner, city, survey number"
          />
        </label>
        <label>
          Property Type
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="">All types</option>
            {propertyTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <Loading message="Loading properties..." />
      ) : filteredProperties.length === 0 ? (
        <div className="empty-state">No properties match the current search.</div>
      ) : (
        <div className="property-grid">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDelete={setPropertyToDelete}
            />
          ))}
        </div>
      )}

      <ConfirmDeleteModal
        property={propertyToDelete}
        isDeleting={isDeleting}
        onCancel={() => setPropertyToDelete(null)}
        onConfirm={handleDelete}
      />
    </section>
  )
}

export default PropertyList
