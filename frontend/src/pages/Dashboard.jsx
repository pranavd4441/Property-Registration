import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { getProperties } from '../services/api'
import { formatCurrency, formatDate, getApiErrorMessage } from '../utils/formatters'

function Dashboard() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getProperties()
      .then((response) => setProperties(response.data))
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false))
  }, [])

  const totalValue = properties.reduce(
    (sum, property) => sum + Number(property.price || 0),
    0,
  )
  const latestProperties = [...properties]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3)

  if (loading) return <Loading message="Loading dashboard..." />

  return (
    <section className="page">
      <div className="page-header dashboard-header">
        <div>
          <p className="eyebrow">Management Overview</p>
          <h1>Property Registration Management System</h1>
        </div>
        <div className="header-actions">
          <Link className="btn btn-primary" to="/properties/add">
            Add Property
          </Link>
          <Link className="btn btn-secondary" to="/properties">
            View Properties
          </Link>
        </div>
      </div>

      <ErrorMessage message={error} />

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Properties</span>
          <strong>{properties.length}</strong>
        </div>
        <div className="stat-card">
          <span>Total Property Value</span>
          <strong>{formatCurrency(totalValue)}</strong>
        </div>
      </div>

      <div className="section-heading">
        <h2>Latest Properties</h2>
        <Link to="/properties">See all</Link>
      </div>

      {latestProperties.length === 0 ? (
        <div className="empty-state">No properties registered yet.</div>
      ) : (
        <div className="latest-list">
          {latestProperties.map((property) => (
            <Link
              className="latest-item"
              key={property.id}
              to={`/properties/${property.id}`}
            >
              <div>
                <strong>{property.property_name}</strong>
                <span>
                  {property.city} - {property.owner_name}
                </span>
              </div>
              <span>{formatDate(property.created_at)}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default Dashboard
