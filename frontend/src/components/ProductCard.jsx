import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <Link to={`/product/${product._id}`}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name.length > 40 ? product.name.slice(0, 40) + '...' : product.name}</h3>
      <p className="price">${product.price}</p>
    </Link>
  </div>
);

export default ProductCard;
