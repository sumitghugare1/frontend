import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'
import Toast from '../components/Toast'
import './CartPage.css'

function CartPage() {
  const { cartItems, clearCart, getCartTotal } = useCart()
  const [orderSuccess, setOrderSuccess] = useState(false)
  
  const handleCheckout = () => {
    // Process the order
    clearCart()
    setOrderSuccess(true)
    
    // Reset success message after 4 seconds
    setTimeout(() => {
      setOrderSuccess(false)
    }, 4000)
  }
  
  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="empty-cart">
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/" className="btn">Continue Shopping</Link>
      </div>
    )
  }
  
  const total = getCartTotal()
  
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      
      {cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <button 
              className="btn checkout-btn" 
              onClick={handleCheckout}
            >
              Checkout
            </button>
            
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </>
      ) : (
        <div className="order-placed">
          <div className="success-icon">✓</div>
          <h2>Order placed successfully!</h2>
          <p>Your order has been received and is being processed.</p>
          <Link to="/" className="btn">Continue Shopping</Link>
        </div>
      )}
      
      {orderSuccess && (
        <Toast 
          message="Order placed successfully!" 
          type="success" 
          onClose={() => setOrderSuccess(false)} 
        />
      )}
    </div>
  )
}

export default CartPage
