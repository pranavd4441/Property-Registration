import { useState } from 'react'
import { propertyTypeOptions } from '../utils/formatters'

const emptyForm = {
  property_name: '',
  survey_number: '',
  property_type: 'plot',
  area: '',
  price: '',
  owner_name: '',
  city: '',
}

function PropertyForm({ initialData, onSubmit, submitLabel, isSubmitting }) {
  const [formValues, setFormValues] = useState({
    ...emptyForm,
    ...initialData,
  })
  const [propertyImage, setPropertyImage] = useState(null)
  const [registrationPdf, setRegistrationPdf] = useState(null)
  const [validationError, setValidationError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({ ...current, [name]: value }))
  }

  const handleFileChange = (event) => {
    const { name, files } = event.target
    const file = files?.[0] || null

    if (name === 'property_image') setPropertyImage(file)
    if (name === 'registration_pdf') setRegistrationPdf(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValidationError('')

    const requiredFields = [
      'property_name',
      'survey_number',
      'property_type',
      'area',
      'price',
      'owner_name',
      'city',
    ]
    const missingField = requiredFields.find((field) => !String(formValues[field]).trim())

    if (missingField) {
      setValidationError('Please fill in all required fields.')
      return
    }

    if (!initialData && (!propertyImage || !registrationPdf)) {
      setValidationError('Please upload both property image and registration PDF.')
      return
    }

    const formData = new FormData()
    requiredFields.forEach((field) => formData.append(field, formValues[field]))

    if (propertyImage) formData.append('property_image', propertyImage)
    if (registrationPdf) formData.append('registration_pdf', registrationPdf)

    onSubmit(formData)
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      {validationError && <div className="alert alert-error">{validationError}</div>}

      <div className="form-grid">
        <label>
          Property Name
          <input
            name="property_name"
            value={formValues.property_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Survey Number
          <input
            name="survey_number"
            value={formValues.survey_number}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Property Type
          <select
            name="property_type"
            value={formValues.property_type}
            onChange={handleChange}
            required
          >
            {propertyTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Area
          <input
            name="area"
            type="number"
            step="0.01"
            min="0"
            value={formValues.area}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formValues.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Owner Name
          <input
            name="owner_name"
            value={formValues.owner_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City
          <input name="city" value={formValues.city} onChange={handleChange} required />
        </label>
        <label>
          Property Image
          <input
            name="property_image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required={!initialData}
          />
          {initialData?.property_image && <span>Current image is already uploaded.</span>}
        </label>
        <label>
          Registration PDF
          <input
            name="registration_pdf"
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileChange}
            required={!initialData}
          />
          {initialData?.registration_pdf && <span>Current PDF is already uploaded.</span>}
        </label>
      </div>

      <button className="btn btn-primary form-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}

export default PropertyForm
