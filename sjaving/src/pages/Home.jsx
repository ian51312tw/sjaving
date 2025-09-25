import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../scss/Home.scss'
import Typewriter from '../component/Typewriter'
import LineChatScroller from '../component/lineChatScroller'


const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const els = document.querySelectorAll('.section');

    // 重置為初始狀態（避免已是完成狀態）
    els.forEach(el => {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    });
    // 強制回流
    els.forEach(el => void el.offsetHeight);

    // 啟動動畫
    els.forEach((el, index) => {
      setTimeout(() => {
        el.style.transition = 'all 0.6s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });

    return () => {
      els.forEach(el => { el.style.transition = ''; });
    };
  }, [location.key]); // ← 切換路由就重跑

  const [searchQuery, setSearchQuery] = useState('')
  const [activeMenuItem, setActiveMenuItem] = useState('名詞釋義')
  const navigate = useNavigate()

  const menuItems = [
    { name: '名詞釋義', path: '/Definition' },
    { name: '程式種類', path: '/Category' },
    { name: '程式練習', path: '/Exercise' },
    { name: '關於我們', path: '/About' }
  ]

  // useEffect(() => {
  //   // 頁面載入動畫
  //   const elements = document.querySelectorAll('.section')
  //   elements.forEach((el, index) => {
  //     el.style.opacity = '0'
  //     el.style.transform = 'translateY(30px)'

  //     setTimeout(() => {
  //       el.style.transition = 'all 0.6s ease'
  //       el.style.opacity = '1'
  //       el.style.transform = 'translateY(0)'
  //     }, index * 200)
  //   })
  // }, [])

  const rawTopics = [
    '識別字', '變數', '常數', '資料型別', '運算子',
    '條件判斷', '迴圈', '跳出', '繼續',
    '函式', '方法', '參數', '引數',
  ]

  const categoryOfTopic = {
    '識別字': '基礎語法術語',
    '變數': '基礎語法術語',
    '常數': '基礎語法術語',
    '資料型別': '基礎語法術語',
    '運算子': '基礎語法術語',

    '條件判斷': '流程控制',
    '迴圈': '流程控制',
    '跳出': '流程控制',
    '繼續': '流程控制',

    '函式': '函式與參數',
    '方法': '函式與參數',
    '參數': '函式與參數',
    '引數': '函式與參數',
  }

  const knownCategories = Array.from(new Set(Object.values(categoryOfTopic))).concat(['其他'])

  const handleSearch = () => {
    const query = searchQuery.trim()
    if (!query) return

    // 完整比對（全字一致）
    const isTopic = rawTopics.includes(query)
    const isCategory = knownCategories.includes(query)

    if (isTopic) {
      // 導向 Definition，並預選該 topic
      navigate('/Definition', { state: { preselectTopic: query } })
      return
    }

    if (isCategory) {
      // 找到該類別的第一個 topic（依 rawTopics 原始順序）
      const firstOfCat = rawTopics.find(t => categoryOfTopic[t] === query) || null
      if (firstOfCat) {
        navigate('/Definition', { state: { preselectCategory: query } })
        return
      } else {
        // 類別存在但目前沒有項目（極少見），也視為查無可跳
        alert('無此分類，請重新輸入完整查詢內容')
        return
      }
    }

    // 都不是 → 提示
    alert('無此分類，請重新輸入完整查詢內容')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleMenuClick = (item) => {
    setActiveMenuItem(item.name)
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
    <div className="home-container"
      style={{ backgroundImage: 'url("images/indexarea1bg.png")' }}
    >
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
              onKeyDown={handleKeyDown}   // ← 改這裡
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
        data-badge-theme="dark"
        style={{ backgroundImage: 'url("images/indexarea2bg.png")' }}
      >
        <div className="definition-content">
          <div className='leftChatScroller'>
            {/* 左半部的對話區 */}
            <LineChatScroller
              messages={msgs}
              height={360}         // 依設計稿調
              pxPerSecond={40}     // 滾動速度
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
                    <p>常數儲存需「鎖定不再更動」的資訊，例如：固定公式及函式、網址資訊...</p>
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
            <Link to='/Definition'>
              <div className='sec2BtnBox'>
                <div className='sec2BtnArrow'>＞＞＞</div>
                <div className='sec2StartBtn'>
                  <div className='btnUp'>開始學習</div>
                  <div className='btnDown'>Start</div>
                </div>
              </div>
            </Link>

          </div>
          {/* 未來的定義內容 */}
        </div>
      </section>

      {/* 區塊3: 程式種類區域 */}
      <section className="section category-section"
        data-badge-label="Category.jsx"
        data-badge-theme="light"
        style={{ backgroundImage: 'url("images/indexarea3bg.png")' }}
      >
        <div className="category-content">
          <div className='homeTitleArea'>
            <h2>程式種類</h2>
            <p className="category-subtitle">Category</p>
          </div>
          <div className='mainCategorybox'>
            <div className='leftCategory'>
              {/* 第一個終端機 - 程式執行區 */}
              <div className='sec3LeftTerminal1 categoryTerminal program-terminal'>
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                </div>
                <div className='terminal-body'>
                  <div className='program-controls'>
                    <div className='control-item'>
                      <input type="checkbox" id="start" />
                      <label htmlFor="start">開始疊韓</label>
                    </div>
                    <div className='control-item'>
                      <input type="checkbox" id="process" />
                      <label htmlFor="process">處理克運</label>
                    </div>
                    <div className='control-item'>
                      <input type="checkbox" id="release" />
                      <label htmlFor="release">放大</label>
                    </div>
                  </div>
                  <div className='program-logo'>
                    <div className='logo-shape'>▶</div>
                  </div>
                </div>
              </div>
              
              {/* 第二個終端機 - 輸入區 */}
              <div className='sec3LeftTerminal2 categoryTerminal input-terminal'>
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                </div>
                <div className='terminal-body'>
                  <div className='input-section'>
                    <p className='input-prompt'>請輸入星星行數：</p>
                    <input type="text" className='terminal-input' placeholder="乙個整數" />
                  </div>
                  <div className='icon-buttons'>
                    <button className='icon-btn'>📁</button>
                    <button className='icon-btn'>📂</button>
                    <button className='icon-btn'>🔖</button>
                    <button className='icon-btn'>⚙️</button>
                    <button className='icon-btn'>🔗</button>
                    <button className='icon-btn'>⚡</button>
                  </div>
                  <div className='star-pattern'>
                    <div>*</div>
                    <div>* *</div>
                    <div>* * *</div>
                    <div>* * * *</div>
                    <div>* * * * *</div>
                    <div className='highlight'>&gt; * * * * * *</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='rightCategory'>
              {/* 產生亂數終端機 */}
              <div className='sec3RightTerminal1 categoryTerminal random-terminal'>
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className='terminal-title'>產生亂數</div>
                </div>
                <div className='terminal-body'>
                  <div className='function-info'>
                    <p className='function-name'>函數：Math.random</p>
                  </div>
                  <div className='description'>
                    <p>請使用亂數產生一個值(1-100)</p>
                  </div>
                  <div className='requirements'>
                    <p>是否含對：</p>
                    <p>猜測次數：</p>
                    <p>答案為：</p>
                  </div>
                </div>
              </div>
              
              {/* 產生樂透號碼終端機 */}
              <div className='sec3RightTerminal2 categoryTerminal lottery-terminal'>
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className='terminal-title'>產生樂透號碼</div>
                </div>
                <div className='terminal-body'>
                  <div className='lottery-buttons'>
                    <button className='lottery-btn'>威力彩</button>
                    <button className='lottery-btn'>大樂透</button>
                    <button className='lottery-btn'>今彩539</button>
                  </div>
                  <div className='lottery-results'>
                    <p>排序前號碼:27,3,32,19,12,6</p>
                    <p>排序後號碼:3,6,12,19,27,32</p>
                    <p>第二區號碼:1</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='categoryRightArea'>
              <div className='categoryDecText'>
                <span className='html-tag'>&lt;p style="color:blue;"&gt;</span>
                <p>這些真的都是入門的程式嗎...？快來查查怎麼做！</p>
                <span className='html-tag'>&lt;/p&gt;</span>
                <p className='cute-face'>(ᵔ̯ᵔ｡)</p>
              </div>
              <Link to='/Category'>
                <div className='sec3BtnBox'>
                  <div className='sec3BtnArrow'>＞＞＞</div>
                  <div className='sec3StartBtn'>
                    <div className='btnUp'>開始學習</div>
                    <div className='btnDown'>Start</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 區塊4: 程式練習區域 */}
      <section className="section exercise-section"
        data-badge-label="Exercise.jsx"
        data-badge-theme="dark"
        style={{ backgroundImage: 'url("images/indexarea4bg.png")' }}
      >
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