import axios from 'axios'

const API_URL = 'https://fakestoreapi.com'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
})

// Add request interceptor to include token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password })
    return response.data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

export const getProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    console.error('Get products error:', error)
    throw error
  }
}

export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  } catch (error) {
    console.error('Get products by category error:', error)
    throw error
  }
}

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Get product by id error:', error)
    throw error
  }
}

export const getCategories = async () => {
  try {
    const response = await api.get('/products/categories')
    return response.data
  } catch (error) {
    console.error('Get categories error:', error)
    throw error
  }
}

export default api
