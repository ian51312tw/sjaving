import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import '../scss/Home.scss'
import Typewriter from '../component/Typewriter'
import LineChatScroller from '../component/lineChatScroller'


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMenuItem, setActiveMenuItem] = useState('名詞釋義')

  const menuItems = [
    { name: '名詞釋義', path: '/Definition' },
    { name: '程式種類', path: '/Category' },
    { name: '程式練習', path: '/Exercise' },
    { name: '關於我們', path: '/About' }
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

  const msgs = [
    "資料型別真的很多耶！有數字(Number)、字串(String)…",
    "這些型別全部都可以放入陣列(Array)中嗎？",
    "沒錯！陣列是非常靈活的容器～也能放函式(Function)…",
    "原來如此，那陣列也可以被看作容器呀！",
    "對的哦～程式設計知識百百種，在進行設計的時候一定要搞清楚每個專有名詞指的是什麼，這樣才能讓你迅速釐清狀況",
    "了解了，但是...那麼多東西，對我這種菜鳥來說真的很難記得耶QQ",
    "別擔心，現在開始使用sJAVing吧！這就是專門為我們這些程式新鮮人所設計的中文化入門網站哦！簡單的查詢系統跟生活化的程式語言說明，一定能幫到你！",
    "哇！真的有這麼方便的網站嗎？那我趕快來試用看看！"
  ];

  return (
    <div className="home-container">
      {/* 區塊1: 主要內容區域 */}
      <section className="section hero-section"
        data-badge-label="Home.jsx"
        data-badge-theme="light">

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
          <p className='cutie1'>（ ´ ▽ ` ）ﾉ</p>
          <div className='greeting'>
            <span className='htmlDec1'>＜p style="color:blue"＞</span>
            <p className="greeting-text">Hi！今天學什麼呢？</p>
            <p className="sub-text">下方點擊開始！</p>
            <span className='htmlDec2'>＜/p＞</span>
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
          <div className="nav-terminal">
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

          </div>
        </div>

        <div className='scrollDown'>
          <div className='scrollBlank'></div>
          <div className='scrollText'>Scroll＞</div>
        </div>
      </section>

      {/* 區塊2: 定義區域 */}
      <section className="section definition-section"
        data-badge-label="Definition.jsx"
        data-badge-theme="dark">
        <div className="definition-content">
          <div className='leftChatScroller'>
            {/* 左半部的對話區 */}
            <LineChatScroller
              messages={msgs}
              height={360}         // 依設計稿調
              pxPerSecond={40}     // 捲動速度
              pauseMsAtEnd={5000}  // 底部停 5 秒
            />
          </div>
          <div className='homeTitleArea'>
            <h2>名詞釋義</h2>
            <p>Definition</p>
          </div>
          <div className='rightTerminalArea'>
            <div className='sec2Terminal'>
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
              </div>

              <div className='terminal-textArea'>
                <div className='sec2TerminalTitle'>
                  <h2 className='titleUp'>變數（Variable）</h2>
                  <h2 className='titleDown'>v.s.　常數（Constant）</h2>
                  <div className='terminalText'>
                    <p>變數與常數用來儲存程式所需的資料
                    </p><br />
                    <p>變數儲存需進行「更新」的資訊，例如：使用者輸入、重複累加的數值...</p>
                    <p>透過var、let進行宣告或賦值</p><br />
                    <p>常數儲存須「鎖定不再更動」的資訊，例如：固定公式及函式、網址資訊...</p>
                    <p>常數透過const進行宣告並且同時賦值</p><br />
                  </div>
                  <div className='greenText'>
                    <p>// 就像裝資料的盒子</p>
                    <p>// 變數盒子可以隨時放入或拿出資料</p>
                    <p>// 常數盒子放入資料後就會鎖起來了！</p>
                  </div>
                  <div className='cutie2'>
                    <p>（ ˋ• ω  •́ ）</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='sec2BtnBox'>
              <div className='sec2BtnArrow'>＞＞＞</div>
              <div className='sec2StartBtn'>
                <div className='btnUp'>開始學習</div>
                <div className='btnDown'>Start</div>
              </div>
            </div>

          </div>
          {/* 未來的定義內容 */}
        </div>
      </section>

      {/* 區塊3: 程式種類區域 */}
      <section className="section category-section"
        data-badge-label="Category.jsx"
        data-badge-theme="light">
        <div className="category-content">
          <div className='homeTitleArea'>
            <h2>程式種類</h2>
            <p className="category-subtitle">Category</p>
            {/* 未來的程式種類內容 */}
          </div>
        </div>
      </section>

      {/* 區塊4: 程式練習區域 */}
      <section className="section exercise-section"
        data-badge-label="Exercise.jsx"
        data-badge-theme="dark">
        <div className="exercise-content">
          <div className='homeTitleArea'>
            <h2>程式練習</h2>
            <p className="exercise-subtitle">Exercise</p>
            {/* 未來的程式練習內容 */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home