import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import Footer from '../../components/educator/Footer'
import Sidebar1 from '../../components/educator/Sidebar1'

const Educator = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-def">
      <Navbar />
      <div className="flex">
        <Sidebar1 />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Educator
