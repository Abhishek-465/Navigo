import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 dark:bg-black  text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">MyApp</div>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </div>
        <ul className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
          <li className="md:ml-6 my-2 md:my-0">
            <Link to="/" className="hover:text-gray-400">Home</Link>
          </li>
          <li className="md:ml-6 my-2 md:my-0">
            <Link to="/find" className="hover:text-gray-400">Find</Link>
          </li>
          <li className="md:ml-6 my-2 md:my-0">
            <Link to="/ai" className="hover:text-gray-400">AI</Link>
          </li>
          <li className="md:ml-6 my-2 md:my-0">
            <Link to="/community" className="hover:text-gray-400">Community</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
