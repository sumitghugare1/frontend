import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/api'
import { useCart } from '../context/CartContext'
import Toast from '../components/Toast'
import './ProductDetailPage.css'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(id)
        setProduct(data)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    if (value > 0) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setNotification('Product added to cart!')
    }
  }

  if (loading) {
    return <div className="loading">Loading product details...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  if (!product) {
    return <div className="error-message">Product not found</div>
  }

  return (
    <div className="product-detail">
      <button className="btn-back" onClick={() => navigate(-1)}>
        &larr; Back to Products
      </button>
      
      <div className="product-detail-container">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-detail-image" />
        </div>
        
        <div className="product-info-container">
          <h1 className="product-title">{product.title}</h1>
          
          <div className="product-meta">
            <span className="product-category">{product.category}</span>
            <span className="product-rating">
              ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
            </span>
          </div>
          
          <p className="product-price">${product.price.toFixed(2)}</p>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input 
                type="number" 
                id="quantity" 
                min="1" 
                value={quantity} 
                onChange={handleQuantityChange} 
              />
            </div>
            
            <button className="btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      {notification && (
        <Toast 
          message={notification} 
          type="success" 
          onClose={() => setNotification('')} 
        />
      )}
    </div>
  )
}

export default ProductDetailPage
