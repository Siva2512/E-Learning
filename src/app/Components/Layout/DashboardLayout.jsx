import React from 'react'
import Topbar from '../Student/Topbar'
import Aside from '../Student/Aside'

export default function MainLayout({children}) {
  return (
    <div className="flex">
        <Aside/>
        <div>
            <Topbar/>
            {children}
        </div>
        
    </div>
  )
}
