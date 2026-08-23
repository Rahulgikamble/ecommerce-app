import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    if (!user) return alert('Please login to add items to your cart');
    addToCart(product._id, qty);
    alert('Added to cart!');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <div className="details-info">
        <h2>{product.name}</h2>
        <p className="category">{product.category}</p>
        <p>{product.description}</p>
        <p className="price">${product.price}</p>
        <p>In stock: {product.stock}</p>
        <div className="qty-selector">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}>+</button>
        </div>
        <button className="add-btn" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
