import { Link } from 'react-router-dom'
import {
  formatCurrency,
  getPropertyTypeLabel,
} from '../utils/formatters'

function PropertyCard({ property, onDelete }) {
  return (
    <article className="property-card">
      <div className="property-image-wrap">
        {property.property_image ? (
          <img
            src={property.property_image}
            alt={property.property_name}
            className="property-image"
          />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}
      </div>
      <div className="property-card-body">
        <div className="card-title-row">
          <h2>{property.property_name}</h2>
          <span className="badge">{getPropertyTypeLabel(property.property_type)}</span>
        </div>
        <dl className="property-meta">
          <div>
            <dt>Owner</dt>
            <dd>{property.owner_name}</dd>
          </div>
          <div>
            <dt>City</dt>
            <dd>{property.city}</dd>
          </div>
          <div>
            <dt>Area</dt>
            <dd>{property.area}</dd>
          </div>
          <div>
            <dt>Price</dt>
            <dd>{formatCurrency(property.price)}</dd>
          </div>
        </dl>
        <div className="card-actions">
          <Link className="btn btn-secondary" to={`/properties/${property.id}`}>
            View
          </Link>
          <Link className="btn btn-primary" to={`/properties/${property.id}/edit`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => onDelete(property)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default PropertyCard
