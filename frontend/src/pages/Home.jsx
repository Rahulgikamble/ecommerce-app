import { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ search: '', category: 'all', sort: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products/categories').then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.category !== 'all') params.category = filters.category;
    if (filters.sort) params.sort = filters.sort;

    api.get('/products', { params }).then(({ data }) => {
      setProducts(data);
      setLoading(false);
    });
  }, [filters]);

  return (
    <div className="home">
      <Filter categories={categories} filters={filters} setFilters={setFilters} />
      {loading ? (
        <p>Loading...</p>
      ) : products.length ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Home;
