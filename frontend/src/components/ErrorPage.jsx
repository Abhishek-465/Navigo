import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import { GiCat, GiElephant, GiSquirrel } from 'react-icons/gi';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-6">
      <FaExclamationTriangle className="text-red-600 text-8xl mb-4" />
      <h2 className="text-8xl font-extrabold text-black-600 mb-4">404</h2>
      <h2 className="text-4xl font-semibold text-gray-800 mb-4">Oops! Page Not Found.</h2>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, the page you are looking for does not exist! 
      </p>
      <div className="flex space-x-4 mb-8">
        <GiCat className="text-5xl text-black-700" />
        <GiElephant className="text-5xl text-black-700" />
        <GiSquirrel className="text-5xl text-black-700" />
      </div>
      <Link
        to="/"
        className="flex items-center px-6 py-3 bg-blue-500 text-white font-semibold text-1xl rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
      >
        <FaHome className="mr-2" /> Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
