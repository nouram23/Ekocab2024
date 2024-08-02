import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer';
import SecondNavbar from './SecondNavbar'

const Layout = ({ children }) => {
    return (
        <div className=''>
        {/* <Navbar /> */}
        <SecondNavbar />
        {children}
        <Footer/>
        </div>
  )
}

export default Layout