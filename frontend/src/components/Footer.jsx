import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-gray-400">
              We are a company dedicated to providing the best services and solutions to our customers. 
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="#" className="hover:underline">Home</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">About</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Services</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-400 mb-2">Email: info@example.com</p>
            <p className="text-gray-400 mb-2">Phone: +123 456 7890</p>
            <p className="text-gray-400">Address: 123 Main St, Anytown, USA</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          &copy; 2024 Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
