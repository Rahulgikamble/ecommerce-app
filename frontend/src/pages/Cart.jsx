import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../api/axios';

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, fetchCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      await api.post('/orders');
      alert('Order placed successfully!');
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.message || 'Checkout failed');
    }
  };

  if (!cart.length) return <p className="empty-cart">Your cart is empty.</p>;

  return (
    <div className="cart">
      {cart.map((item) => (
        <div key={item.product._id} className="cart-item">
          <img src={item.product.image} alt={item.product.name} />
          <span className="cart-item-name">{item.product.name}</span>
          <div className="qty-selector">
            <button onClick={() => decreaseQty(item.product._id, item.quantity)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(item.product._id, item.quantity)}>+</button>
          </div>
          <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          <button className="remove-btn" onClick={() => removeFromCart(item.product._id)}>
            Remove
          </button>
        </div>
      ))}
      <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
      <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
