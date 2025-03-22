import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [productType, setProductType] = useState('hotel');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    // Campos comunes para todos los tipos de productos
  });

  // Estado para campos específicos según el tipo de producto
  const [hotelData, setHotelData] = useState({
    rooms: '',
    services: '',
    location: '',
  });

  const [flightData, setFlightData] = useState({
    airline: '',
    origin: '',
    destination: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
  });

  const [rentalData, setRentalData] = useState({
    vehicleType: '',
    capacity: '',
    startDate: '',
    endDate: '',
    location: '',
  });

  // Estado para manejar las imágenes
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Estado para mensajes de error y éxito
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Manejador para cambios en los campos comunes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error específico cuando el usuario corrige el campo
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  // Manejador para cambios en los campos específicos según el tipo
  const handleSpecificDataChange = (e) => {
    const { name, value } = e.target;

    if (productType === 'hotel') {
      setHotelData({
        ...hotelData,
        [name]: value,
      });
    } else if (productType === 'flight') {
      setFlightData({
        ...flightData,
        [name]: value,
      });
    } else if (productType === 'rental') {
      setRentalData({
        ...rentalData,
        [name]: value,
      });
    }

    // Limpiar error específico
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  // Manejador para cambio de tipo de producto
  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
    // Resetear mensajes
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Manejador para subida de imágenes
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Crear previsualizaciones
    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);
        setPreviewImages([...previews]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Validación del formulario
  const validateForm = () => {
    const errors = {};

    // Validar campos comunes
    if (!formData.name.trim()) {
      errors.name = 'El nombre del producto es obligatorio';
    }

    if (!formData.description.trim()) {
      errors.description = 'La descripción es obligatoria';
    }

    // Validar campos específicos según el tipo
    if (productType === 'hotel') {
      if (!hotelData.rooms)
        errors.rooms = 'El número de habitaciones es obligatorio';
      if (!hotelData.location.trim())
        errors.location = 'La ubicación es obligatoria';
    } else if (productType === 'flight') {
      if (!flightData.airline.trim())
        errors.airline = 'La aerolínea es obligatoria';
      if (!flightData.origin.trim()) errors.origin = 'El origen es obligatorio';
      if (!flightData.destination.trim())
        errors.destination = 'El destino es obligatorio';
      if (!flightData.departureDate)
        errors.departureDate = 'La fecha de salida es obligatoria';
    } else if (productType === 'rental') {
      if (!rentalData.vehicleType.trim())
        errors.vehicleType = 'El tipo de vehículo es obligatorio';
      if (!rentalData.capacity) errors.capacity = 'La capacidad es obligatoria';
      if (!rentalData.location.trim())
        errors.location = 'La ubicación es obligatoria';
    }

    // Validar que haya al menos una imagen
    if (images.length === 0) {
      errors.images = 'Debe subir al menos una imagen';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    if (!validateForm()) {
      setErrorMessage('Por favor, corrija los errores en el formulario');
      return;
    }

    // Preparar datos para enviar al backend
    let productData = {
      ...formData,
      type: productType,
    };

    // Agregar datos específicos según el tipo
    if (productType === 'hotel') {
      productData = { ...productData, ...hotelData };
    } else if (productType === 'flight') {
      productData = { ...productData, ...flightData };
    } else if (productType === 'rental') {
      productData = { ...productData, ...rentalData };
    }

    // Crear FormData para enviar archivos
    const formDataToSend = new FormData();

    // Agregar datos del producto como JSON
    formDataToSend.append('productData', JSON.stringify(productData));

    // Agregar imágenes
    images.forEach((image, index) => {
      formDataToSend.append(`image${index}`, image);
    });

    try {
      // Simulación de envío al backend (en un proyecto real, aquí iría la llamada a la API)
      // const response = await fetch('http://localhost:8080/api/products', {
      //   method: 'POST',
      //   body: formDataToSend
      // });

      // Simulación de respuesta exitosa
      // if (response.ok) {
      //   const data = await response.json();
      setSuccessMessage('Producto guardado exitosamente');

      // Resetear formulario después de 2 segundos y redirigir
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
      // } else {
      //   // Manejar errores del servidor
      //   const errorData = await response.json();
      //   if (errorData.error === 'DUPLICATE_NAME') {
      //     setErrorMessage('Ya existe un producto con ese nombre');
      //   } else {
      //     setErrorMessage('Error al guardar el producto: ' + errorData.message);
      //   }
      // }
    } catch (error) {
      setErrorMessage('Error de conexión: ' + error.message);
    }
  };

  // Renderizado de campos específicos según el tipo de producto
  const renderSpecificFields = () => {
    switch (productType) {
      case 'hotel':
        return (
          <div className="specific-fields">
            <div className="form-group">
              <label htmlFor="rooms">Número de habitaciones:</label>
              <input
                type="number"
                id="rooms"
                name="rooms"
                value={hotelData.rooms}
                onChange={handleSpecificDataChange}
                min="1"
              />
              {formErrors.rooms && (
                <span className="error">{formErrors.rooms}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="services">Servicios:</label>
              <textarea
                id="services"
                name="services"
                value={hotelData.services}
                onChange={handleSpecificDataChange}
                placeholder="WiFi, Desayuno, Piscina, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Ubicación:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={hotelData.location}
                onChange={handleSpecificDataChange}
              />
              {formErrors.location && (
                <span className="error">{formErrors.location}</span>
              )}
            </div>
          </div>
        );

      case 'flight':
        return (
          <div className="specific-fields">
            <div className="form-group">
              <label htmlFor="airline">Aerolínea:</label>
              <input
                type="text"
                id="airline"
                name="airline"
                value={flightData.airline}
                onChange={handleSpecificDataChange}
              />
              {formErrors.airline && (
                <span className="error">{formErrors.airline}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="origin">Origen:</label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={flightData.origin}
                onChange={handleSpecificDataChange}
              />
              {formErrors.origin && (
                <span className="error">{formErrors.origin}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="destination">Destino:</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={flightData.destination}
                onChange={handleSpecificDataChange}
              />
              {formErrors.destination && (
                <span className="error">{formErrors.destination}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="departureDate">Fecha de salida:</label>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  value={flightData.departureDate}
                  onChange={handleSpecificDataChange}
                />
                {formErrors.departureDate && (
                  <span className="error">{formErrors.departureDate}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="departureTime">Hora de salida:</label>
                <input
                  type="time"
                  id="departureTime"
                  name="departureTime"
                  value={flightData.departureTime}
                  onChange={handleSpecificDataChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="returnDate">Fecha de regreso:</label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={flightData.returnDate}
                  onChange={handleSpecificDataChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="returnTime">Hora de regreso:</label>
                <input
                  type="time"
                  id="returnTime"
                  name="returnTime"
                  value={flightData.returnTime}
                  onChange={handleSpecificDataChange}
                />
              </div>
            </div>
          </div>
        );

      case 'rental':
        return (
          <div className="specific-fields">
            <div className="form-group">
              <label htmlFor="vehicleType">Tipo de vehículo:</label>
              <input
                type="text"
                id="vehicleType"
                name="vehicleType"
                value={rentalData.vehicleType}
                onChange={handleSpecificDataChange}
              />
              {formErrors.vehicleType && (
                <span className="error">{formErrors.vehicleType}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacidad:</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={rentalData.capacity}
                onChange={handleSpecificDataChange}
                min="1"
              />
              {formErrors.capacity && (
                <span className="error">{formErrors.capacity}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Fecha de inicio:</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={rentalData.startDate}
                  onChange={handleSpecificDataChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">Fecha de fin:</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={rentalData.endDate}
                  onChange={handleSpecificDataChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Ubicación:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={rentalData.location}
                onChange={handleSpecificDataChange}
              />
              {formErrors.location && (
                <span className="error">{formErrors.location}</span>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-container">
        <h1>Agregar Producto</h1>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="product-type-selector">
            <label>Tipo de producto:</label>
            <select value={productType} onChange={handleProductTypeChange}>
              <option value="hotel">Hotel</option>
              <option value="flight">Vuelo</option>
              <option value="rental">Alquiler</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={`Nombre del ${
                productType === 'hotel'
                  ? 'hotel'
                  : productType === 'flight'
                  ? 'vuelo'
                  : 'vehículo'
              }`}
            />
            {formErrors.name && (
              <span className="error">{formErrors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={`Descripción del ${
                productType === 'hotel'
                  ? 'hotel'
                  : productType === 'flight'
                  ? 'vuelo'
                  : 'vehículo'
              }`}
            />
            {formErrors.description && (
              <span className="error">{formErrors.description}</span>
            )}
          </div>

          {renderSpecificFields()}

          <div className="form-group image-upload-container">
            <label htmlFor="images">Imágenes:</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
            />
            {formErrors.images && (
              <span className="error">{formErrors.images}</span>
            )}

            {previewImages.length > 0 && (
              <div className="image-preview-container">
                {previewImages.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Vista previa ${index + 1}`}
                    className="image-preview"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <Link to="/admin" className="back-button">
              Cancelar
            </Link>
            <button type="submit" className="submit-button">
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
