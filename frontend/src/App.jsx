import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='bg-gray-200 dark:bg-gray-900 back'>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App