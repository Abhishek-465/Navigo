import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [placeName, setPlaceName] = useState('');
  const [places, setPlaces] = useState({
    supermarkets: null,
    hospitals: null,
    restaurants: null,
    schools: null,
    parking: null,
  });
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3001/nearest-places', { placeName });
      setPlaces(response.data);
      setError('');
    } catch (err) {
      setPlaces({
        supermarkets: null,
        hospitals: null,
        restaurants: null,
        schools: null,
        parking: null,
      });
      setError('Error fetching nearby places');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderPlaces = (data, title) => (
    <div className="mt-8 w-[100vw]">
      
      <div className="flex flex-row  justify-center">
        {data && data.features && (
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
            <img src="https://via.placeholder.com/300x150" alt="Placeholder" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              {data.features.slice(0, 2).map((feature, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold">{feature.properties.name}</h3>
                  <p><strong>Address:</strong> {feature.properties.street}</p>
                  <p><strong>Pin code:</strong> {feature.properties.postcode}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center p-4">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded-full"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h1 className="text-3xl md:text-5xl font-bold my-8 text-center shadow-inner-lg">
        Find Nearby Places
      </h1>
      <div className="w-full ">
        <div className='max-w-md mx-auto'>
        <input
          type="text"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          placeholder="Enter place name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-700 dark:bg-gray-800"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white p-3 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Search
        </button>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <div className="flex flex-wrap justify-center items-center flex-row">
          {renderPlaces(places.supermarkets, 'Nearest Supermarkets')}
          {renderPlaces(places.hospitals, 'Nearest Hospitals')}
          {renderPlaces(places.restaurants, 'Nearest Restaurants')}
          {renderPlaces(places.schools, 'Nearest Schools')}
          {renderPlaces(places.parking, 'Nearest Parking')}
        </div>
      </div>
    </div>
  );
}

export default App;