function ConfirmDeleteModal({ property, isDeleting, onCancel, onConfirm }) {
  if (!property) return null

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal" role="dialog" aria-modal="true">
        <h2>Delete property?</h2>
        <p>
          This will permanently delete <strong>{property.property_name}</strong>.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal
