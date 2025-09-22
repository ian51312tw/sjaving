import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import '../scss/Home.scss'
import Typewriter from '../component/Typewriter'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMenuItem, setActiveMenuItem] = useState('名詞釋義')

  const menuItems = [
    { name: '名詞釋義', path: '/definition' },
    { name: '程式種類', path: '/category' },
    { name: '程式練習', path: '/exercise' },
    { name: '關於我們', path: '/about' }
  ]

  useEffect(() => {
    // 頁面載入動畫
    const elements = document.querySelectorAll('.section')
    elements.forEach((el, index) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'

      setTimeout(() => {
        el.style.transition = 'all 0.6s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, index * 200)
    })
  }, [])

  const handleSearch = () => {
    const query = searchQuery.trim()
    if (query) {
      console.log(`搜尋查詢: ${query}`)
      // 實作搜尋邏輯
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleMenuClick = (item) => {
    setActiveMenuItem(item.name)
    console.log(`選擇了: ${item.name}`)
  }

  return (
    <div className="home-container">
      {/* 區塊1: 主要內容區域 */}
      <section className="section hero-section">
        <div className="main-content">
          <h1 className="main-title">Let's sJAVing!</h1>

          {/* 搜尋區域 */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="今天想學些什麼？"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="search-button" onClick={handleSearch}>
              開始搜尋
            </button>
          </div>
        </div>
        {/* 問候語區域 */}
        <div className="greeting-section">
          <div className='greeting'>
            <span className='htmlDec1'>＜p style="color:blue"＞</span>
            <p className="greeting-text">Hi！今天學什麼呢？</p>
            <p className="sub-text">下方點擊開始！</p>
            <span className='htmlDec2'>＜/p＞</span>
            <p className='cutie1'>（ ´ ▽ ` ）ﾉ</p>
          </div>
        </div>


        {/* 內容與導航區域 */}
        <div className="content-nav-section">
          {/* 左側內容區 */}
          <div className="content-area">
            <div className="title-block">
              <p className='cssDec'>.bigTitle ｛display: flex; flex-direction: column; justify-content: center; align-items: flex-start;｝</p>
              <h2 className="need-to">Need To</h2>
              <h2 className="recall-memory"><Typewriter /></h2>
              <h2 className="about-coding">About The Coding?</h2>
            </div>
          </div>

          {/* 右側終端機風格導航 */}
          <nav className="nav-terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
            </div>

            <div className="terminal-menu">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`menu-item ${activeMenuItem === item.name ? 'active' : ''}`}
                  onClick={() => handleMenuClick(item)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </section>

      {/* 區塊2: 定義區域 */}
      <section className="section definition-section">
        <div className="definition-content">
          <h2>名詞釋義</h2>
          <p>Definition</p>
          {/* 未來的定義內容 */}
        </div>
      </section>

      {/* 區塊3: 程式種類區域 */}
      <section className="section category-section">
        <div className="category-content">
          <h2>程式種類</h2>
          <p className="category-subtitle">Category</p>
          {/* 未來的程式種類內容 */}
        </div>
      </section>

      {/* 區塊4: 程式練習區域 */}
      <section className="section exercise-section">
        <div className="exercise-content">
          <h2>程式練習</h2>
          <p className="exercise-subtitle">Exercise</p>
          {/* 未來的程式練習內容 */}
        </div>
      </section>
    </div>
  )
}

export default Home