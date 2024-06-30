import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Loader from './Loader';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 22.5726, // Default latitude for Kolkata
  lng: 88.3639, // Default longitude for Kolkata
};

function Nearby() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.MAPS_API_KEY,
    libraries: ['geometry', 'drawing'],
  });

  const [placeName, setPlaceName] = useState('');
  const [places, setPlaces] = useState({
    supermarkets: null,
    hospitals: null,
    restaurants: null,
    schools: null,
    parking: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        const navLocation = () => {
          return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
        };

        const { coords } = await navLocation();
        const { latitude, longitude } = coords;

        const response = await axios.post('http://localhost:3001/getgeolocation', {
          latlong: { lat: latitude, long: longitude },
        });

        const { location } = response.data;
        setAddress(location);
        setPlaceName(location);
      } catch (error) {
        console.error('Error fetching geolocation:', error);
      }
    };

    fetchGeolocation();
  }, []);

  const handleSearch = async () => {
    setLoading(true); // Set loading to true before starting the search
    try {
      const response = await axios.post('http://localhost:3001/nearest-places', { placeName });
      setPlaces(response.data);
      setError('');
      // Geocode the placeName to get the latitude and longitude
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: placeName }, (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          setMapCenter({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          setError('Error fetching map location');
        }
      });
    } catch (err) {
      setPlaces({
        supermarkets: null,
        hospitals: null,
        restaurants: null,
        schools: null,
        parking: null,
      });
      setError('Error fetching nearby places. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after the search is complete
    }
  };

  const renderPlaces = (data, title, url) => (
    <div className="mt-8 sm:w-[400px] sm:h-[480px] card">
      <div className="w-full h-full">
        {data && data.features && data.features.length > 0 ? (
          <div className="w-full h-full p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-center text-transparent bg-gradient-to-t from-gray-700 to-gray-900 dark:bg-gradient-to-t dark:from-gray-400 dark:to-white bg-clip-text">
              {title}
            </h2>
            <img src={url} alt="Placeholder" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              {data.features.slice(0, 2).map((feature, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
                    {feature.properties.name}
                  </h3>
                  <p>
                    <strong className="text-transparent bg-gradient-to-t from-gray-600 to-gray-900 dark:bg-gradient-to-t dark:from-gray-400 dark:to-white bg-clip-text">
                      Address:
                    </strong>{' '}
                    {feature.properties.street}
                  </p>
                  <p>
                    <strong className="text-transparent bg-gradient-to-t from-gray-600 to-gray-900 dark:bg-gradient-to-t dark:from-gray-400 dark:to-white bg-clip-text">
                      Pin code:
                    </strong>{' '}
                    {feature.properties.postcode}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-full p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-xl flex items-center justify-center">
            <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-300">
              No data to show
            </h2>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center p-4 back poppins-regular">
      <div className="flex w-[80vw] shadow-xl dark:shadow-gray-800 shadow-gray-700 bg-gradient-to-r from-blue-200 to-slate-300 dark:bg-gradient-to-r dark:from-blue-950 dark:to-slate-950 justify-center items-center p-8 rounded-2xl box-cont">
        <div className="flex flex-col">
          <h1 className="text-4xl py-8 md:text-5xl font-bold text-center text-transparent bg-gradient-to-b from-gray-600 to-gray-900 dark:bg-gradient-to-b dark:from-gray-500 dark:to-white bg-clip-text">
            Find Nearby Places
          </h1>
          <div className="w-full">
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                placeholder="Enter place name"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-700 dark:bg-gray-800"
              />
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-t from-blue-900 to to-blue-700 text-white p-3 rounded-lg shadow hover:bg-gradient-to-t hover:from-blue-600 to hover:to-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {error && alert(error)}
        {loading ? (
          <div className="mt-8 w-1/2 mx-auto">
            <Loader />
          </div>
        ) : (
          <div className="mt-8 w-full sm:w-1/2 mx-auto">
            {isLoaded && (
              <div className="relative map-container">
                <div className="aspect-w-16 aspect-h-9 sm:aspect-w-16 sm:aspect-h-9">
                  <GoogleMap mapContainerClassName="absolute inset-0" center={mapCenter} zoom={12}>
                    <Marker position={mapCenter} />
                  </GoogleMap>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 mt-8 mb-2">
        {renderPlaces(
          places.supermarkets,
          'Nearest Supermarkets',
          'https://cdn.britannica.com/86/124786-004-1F7D6700/Supermarket-Jamnagar-Gujarat-India.jpg'
        )}
        {renderPlaces(
          places.hospitals,
          'Nearest Hospitals',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt-YdgCgQY4oiyHme5sBtc-U31O2iXRnSuKA&s'
        )}
        {renderPlaces(
          places.restaurants,
          'Nearest Restaurants',
          'https://assets.architecturaldigest.in/photos/61bf5698964e7236ae515700/1:1/w_4480,h_4480,c_limit/(1).jpg'
        )}
        {renderPlaces(
          places.schools,
          'Nearest Schools',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPOtAmKGfzCffrQ8MCOpw5z-kxhoD332KrwQ&s'
        )}
        {renderPlaces(
          places.parking,
          'Nearest Parking',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwBNZ-0Er67v7E09N8WUcYcpQ8URJugp9SmQ&s'
        )}
      </div>
    </div>
  );
}

export default Nearby;
