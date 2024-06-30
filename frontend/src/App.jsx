import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';

const App = () => {
  return (
    <div className=' bg-blue-50 dark:bg-gray-900 back overflow-hidden'>
      <Navbar/>
   
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App