import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Home from './pages/Home'
import PageBadge from "./component/PageBadge";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


export default function App() {
  return (
    <div className='wrap'>
      <Navbar />
      <PageBadge navHeight={80}
        insetX={80}
        offsetY={60}
        zIndex={900}
        icon="/images/LOGO.png" />
      <div className='first'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
