import axios from 'axios'

const api = axios.create({
  baseURL: 'import.meta.env.VITE_API_BASE_URL',
})

const multipartConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

export const getProperties = () => api.get('properties/')

export const getProperty = (id) => api.get(`properties/${id}/`)

export const createProperty = (formData) =>
  api.post('properties/', formData, multipartConfig)

export const updateProperty = (id, formData) =>
  api.patch(`properties/${id}/`, formData, multipartConfig)

export const deleteProperty = (id) => api.delete(`properties/${id}/`)

export default api
