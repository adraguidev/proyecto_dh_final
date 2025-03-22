import React, { useState, useEffect } from 'react';
import './Main.css';
import ProductCard from '../ProductCard/ProductCard';
import { fetchRandomProducts } from '../../services/api';

const Main = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Categorías de productos
  const categories = [
    { id: 'hotel', name: 'Hoteles', icon: '🏨' },
    { id: 'flight', name: 'Vuelos', icon: '✈️' },
    { id: 'rental', name: 'Alquileres', icon: '🚗' },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchRandomProducts(6);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(
          'Error al cargar los productos. Por favor, intente nuevamente.'
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <main className="main">
      <div className="container">
        <section className="search-container">
          <h2>Busca tu próxima reserva</h2>
          {/* Aquí irá el buscador en futuras implementaciones */}
        </section>

        <section className="categories-container">
          <h2>Categorías</h2>
          <div className="categories-list">
            {categories.map((category) => (
              <div key={category.id} className="category-item">
                <div className="category-icon">{category.icon}</div>
                <div className="category-name">{category.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="recommendations-container">
          <h2>Recomendaciones</h2>
          {loading ? (
            <div className="loading-container">
              <p>Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>{error}</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Main;
