import { useCart } from '../context/CartContext'
import './CartItem.css'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  const { id, title, price, image, quantity } = item

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={image} alt={title} />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">{title}</h3>
        <p className="cart-item-price">${price.toFixed(2)} each</p>
      </div>
      <div className="cart-item-controls">
        <div className="quantity-control">
          <button 
            className="btn-quantity" 
            onClick={() => updateQuantity(id, quantity - 1)}
          >
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button 
            className="btn-quantity" 
            onClick={() => updateQuantity(id, quantity + 1)}
          >
            +
          </button>
        </div>
        <p className="cart-item-total">${(price * quantity).toFixed(2)}</p>
        <button 
          className="btn btn-danger remove-btn" 
          onClick={() => removeFromCart(id)}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem
