import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'

export default function MainLayout({children}) {
  return (
    <div>
        <Navbar/>
        <div>
            {children}
        </div>
        <Footer/>
    </div>
  )
}
