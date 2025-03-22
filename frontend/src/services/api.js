// API service for making requests to the backend

/**
 * Fetches random products from the backend
 * @param {number} limit - Maximum number of products to fetch (default: 10)
 * @returns {Promise<Array>} - Array of product objects
 */
export const fetchRandomProducts = async (limit = 10) => {
  try {
    // In a real implementation, this would be an actual API endpoint
    // For now, we'll use a mock endpoint
    const response = await fetch(
      `http://localhost:8080/api/products/random?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching random products:', error);
    // Return mock data for development purposes
    return generateMockProducts(limit);
  }
};

/**
 * Generates mock product data for development purposes
 * @param {number} count - Number of mock products to generate
 * @returns {Array} - Array of mock product objects
 */
const generateMockProducts = (count) => {
  const productTypes = ['hotel', 'flight', 'rental'];
  const mockProducts = [];

  for (let i = 0; i < count; i++) {
    const type = productTypes[Math.floor(Math.random() * productTypes.length)];

    const baseProduct = {
      id: i + 1,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`,
      description: `This is a sample ${type} description. It provides all the necessary information about this ${type}.`,
      imageUrl: `https://source.unsplash.com/random/300x200?${type}`,
      price: Math.floor(Math.random() * 900) + 100,
      rating: (Math.random() * 5).toFixed(1),
      type,
    };

    let specificData = {};

    if (type === 'hotel') {
      specificData = {
        location: 'Sample City, Country',
        rooms: Math.floor(Math.random() * 3) + 1,
        services: 'WiFi, Breakfast, Pool',
        pricePerNight: Math.floor(Math.random() * 200) + 50,
      };
    } else if (type === 'flight') {
      specificData = {
        airline: 'Sample Airlines',
        origin: 'Origin City',
        destination: 'Destination City',
        departureDate: '2023-12-01',
        departureTime: '10:00 AM',
        returnDate: '2023-12-10',
        returnTime: '2:00 PM',
      };
    } else if (type === 'rental') {
      specificData = {
        vehicleType: 'Car',
        capacity: Math.floor(Math.random() * 6) + 2,
        location: 'Rental Location',
        pricePerDay: Math.floor(Math.random() * 100) + 30,
      };
    }

    mockProducts.push({
      ...baseProduct,
      ...specificData,
    });
  }

  return mockProducts;
};
