import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './NavBar'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.css';

// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Boilerplate = () => {
  return (
    <>
      <div className="d-flex flex-column vh-100">
          <Navbar />
        <main className="container mt-5">
          <Outlet />
        </main>
         <Footer/>
      </div>
    </>
    
  )
}

export default Boilerplate