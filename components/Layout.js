'use client'

import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import SecondNavbar from './SecondNavbar'
import { usePathname } from 'next/navigation'

const Layout = ({ children }) => {
  const pathname = usePathname()

  return (
    <div>
      <Navbar />
      <SecondNavbar />
      {children}
      {pathname !== '/invoice' && <Footer />}
    </div>
  )
}

export default Layout
