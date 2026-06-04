export const propertyTypeOptions = [
  { value: 'plot', label: 'Plot' },
  { value: 'flat', label: 'Flat' },
  { value: 'house', label: 'House' },
  { value: 'shop', label: 'Shop' },
  { value: 'land', label: 'Land' },
]

export const formatCurrency = (value) => {
  const numberValue = Number(value || 0)

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(numberValue)
}

export const formatDate = (value) => {
  if (!value) return 'Not available'

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export const getPropertyTypeLabel = (value) =>
  propertyTypeOptions.find((option) => option.value === value)?.label || value

export const getApiErrorMessage = (error) => {
  const data = error?.response?.data

  if (!data) {
    return 'Unable to connect to the server. Please check that the backend is running.'
  }

  if (typeof data === 'string') return data
  if (data.detail) return data.detail

  const firstField = Object.keys(data)[0]
  const firstMessage = Array.isArray(data[firstField])
    ? data[firstField][0]
    : data[firstField]

  return firstMessage
    ? `${firstField}: ${firstMessage}`
    : 'Something went wrong. Please try again.'
}
