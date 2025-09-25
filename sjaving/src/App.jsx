import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Home from './pages/Home'
import Definition from './pages/Definition'
import Category from './pages/Category'
import Exercise from './pages/Exercise'
import About from './pages/About'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


export default function App() {
  return (
    <div className='wrap'>
      <Navbar />
      
      <div className='first'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Definition' element={<Definition />}></Route>
          <Route path='/Category' element={<Category />}></Route>
          <Route path='/Exercise' element={<Exercise />}></Route>
          <Route path='/About' element={<About />}></Route>

        </Routes>
      </div>
      <Footer />
    </div>
  )
}
