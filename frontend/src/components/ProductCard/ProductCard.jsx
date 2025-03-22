import React from 'react';
import './ProductCard.css';

/**
 * ProductCard component for displaying product information
 * @param {Object} product - The product object to display
 * @returns {JSX.Element} - The rendered component
 */
const ProductCard = ({ product }) => {
  // Determine what specific details to show based on product type
  const renderSpecificDetails = () => {
    switch (product.type) {
      case 'hotel':
        return (
          <div className="product-details">
            <p className="product-location">
              <i className="location-icon">📍</i> {product.location}
            </p>
            <p className="product-rooms">Habitaciones: {product.rooms}</p>
            <p className="product-price">
              Precio por noche: ${product.pricePerNight}
            </p>
          </div>
        );
      case 'flight':
        return (
          <div className="product-details">
            <p className="product-airline">Aerolínea: {product.airline}</p>
            <p className="product-route">
              {product.origin} → {product.destination}
            </p>
            <p className="product-date">
              Salida: {product.departureDate} {product.departureTime}
            </p>
          </div>
        );
      case 'rental':
        return (
          <div className="product-details">
            <p className="product-vehicle">{product.vehicleType}</p>
            <p className="product-capacity">
              Capacidad: {product.capacity} personas
            </p>
            <p className="product-price">
              Precio por día: ${product.pricePerDay}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <div className="product-rating">
          <span className="rating-star">★</span> {product.rating}
        </div>
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        {renderSpecificDetails()}
        <div className="product-price-container">
          <span className="product-price-label">Desde</span>
          <span className="product-price-value">${product.price}</span>
        </div>
        <button className="product-button">Ver detalles</button>
      </div>
    </div>
  );
};

export default ProductCard;
