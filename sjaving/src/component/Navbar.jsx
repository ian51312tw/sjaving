import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../scss/_reset.scss'
import '../scss/Navbar.scss'

import React from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }



    return (
        <div id='topbar'>
            <div className='navDecorateBox'></div>
            <div className="logo"><Link to='/'>sJAVing</Link></div>
            <div className="navbar">
                <button
                    className={`hamburger ${isOpen ? 'is-active' : ''}`}
                    onClick={toggleMenu}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <nav className={`navigation ${isOpen ? 'show' : ''}`}>
                    <div className='menuBox'>
                        <span className='navDec1'>＜nav＞</span>
                        <ul className='menu'>
                            <li><Link to='/Definition'>＜名詞釋義＞</Link></li>
                            <li><Link to='/Category'>＜程式種類＞</Link></li>
                            <li><Link to='/Exercise'>＜程式練習＞</Link></li>
                            <li><Link to='/About'>＜關於我們＞</Link></li>
                        </ul>
                        <span className='navDec2'>＜/nav＞</span>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar