import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaSearch, FaRobot, FaUsers } from 'react-icons/fa';
import './mode.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

 // Load the dark mode preference from local storage on component mount
 useEffect(() => {
  const savedMode = localStorage.getItem('darkMode') === 'true';
  setIsChecked(savedMode);
  document.documentElement.classList.toggle('dark', savedMode);
}, []);

// Save the dark mode preference to local storage whenever it changes
useEffect(() => {
  localStorage.setItem('darkMode', isChecked);
  if (isChecked) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [isChecked]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <nav className="bg-transparent  text-black dark:text-white p-4 poppins-regular">
      <div className="container mx-auto flex justify-end items-center">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-200 mr-auto hidden md:block">Navigo</div>
        <div className="md:hidden mr-auto" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </div>
        <ul className={`flex md:flex flex-row md:flex-row md:items-center md:mr-10 ${isOpen ? 'block' : 'hidden'}`}>
          <li className="md:ml-6 my-2 md:my-0">
            {isOpen ? (
              <Link to="/" className="hover:text-gray-400">
                <FaHome size={24} className='mx-4' />
              </Link>
            ) : (
              <Link to="/" className="hover:text-gray-400">Home</Link>
            )}
          </li>
          <li className="md:ml-6 my-2 md:my-0">
            {isOpen ? (
              <Link to="/find" className="hover:text-gray-400">
                <FaSearch size={24} className='mx-4' />
              </Link>
            ) : (
              <Link to="/find" className="hover:text-gray-400">Find</Link>
            )}
          </li>
          <li className="md:ml-6 my-2 md:my-0">
            {isOpen ? (
              <Link to="/ai" className="hover:text-gray-400">
                <FaRobot size={24} className='mx-4' />
              </Link>
            ) : (
              <Link to="/ai" className="hover:text-gray-400">AI</Link>
            )}
          </li>
          <li className="md:ml-6 my-2 md:my-0">
            {isOpen ? (
              <Link to="/community" className="hover:text-gray-400">
                <FaUsers size={24} className='mx-4' />
              </Link>
            ) : (
              <Link to="/community" className="hover:text-gray-400">Community</Link>
            )}
          </li>
        </ul>
        <button
          onClick={handleToggle}
          className="relative flex items-center justify-between w-20 h-10 bg-gray-300 shadow-gray-900 shadow-lg  dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full p-1 animate__animated animate__slow animate__delay-2s"
        >
          <span className={`absolute left-2 ${isChecked ? "opacity-100" : "opacity-100"} transition-opacity duration-300 sun`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 animate-rotate">
              <g fill="#ffd43b">
                <circle r="5" cy="12" cx="12"></circle>
                <path d="M21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1-.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-.75.29zm-12.02 12.02a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1-.7.24zm6.36-14.36a1 1 0 0 1-1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zm0 17a1 1 0 0 1-1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zm-5.66-14.66a1 1 0 0 1-.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.29zm12.02 12.02a1 1 0 0 1-.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.24z"></path>
              </g>
            </svg>
          </span>
          <span className={`absolute right-2 ${isChecked ? "opacity-100" : "opacity-100"} transition-opacity duration-300 moon`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill='#ffd43b' className="w-6 h-6">
              <path d="M223.5 32C100 32 0 132.3 0 256s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
            </svg>
          </span>
          <input
            type="checkbox"
            id="modeToggle"
            className="hidden"
            checked={isChecked}
            onChange={handleToggle}
          />
          <span className={`absolute top-1/2 left-1 transform -translate-y-1/2 transition-all duration-300 ${isChecked ? "translate-x-12" : ""}`}>
            <span className="block w-7 h-7 ml-[-2px] bg-gray-500 rounded-full slider-dot"></span>
          </span>
        </button>
      </div>
      
      <button
        id="myBtn"
        className={`fixed bottom-[75px] right-[25px] z-99 w-[40px] h-[40px]  rounded-full bg-blue-800 shadow-md transition-transform scale-125 m-2 ${isChecked ? "filter-invert-0" : "filter-invert"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </nav>
  );
}

export default Navbar;
