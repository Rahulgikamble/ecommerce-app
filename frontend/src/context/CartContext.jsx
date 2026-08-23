import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // cart is stored server-side on the User document, so it's remembered
  // across logins/devices. We (re)load it whenever the logged-in user changes.
  const fetchCart = async () => {
    if (!user) return setCart([]);
    const { data } = await api.get('/cart');
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await api.post('/cart', { productId, quantity });
    setCart(data);
  };

  const updateQuantity = async (productId, quantity) => {
    const { data } = await api.put(`/cart/${productId}`, { quantity });
    setCart(data);
  };

  const increaseQty = (productId, currentQty) => updateQuantity(productId, currentQty + 1);
  const decreaseQty = (productId, currentQty) => updateQuantity(productId, currentQty - 1);

  const removeFromCart = async (productId) => {
    const { data } = await api.delete(`/cart/${productId}`);
    setCart(data);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
