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

  // 旋轉終端機
  const [spin, setSpin] = useState(true);   // 預設勾選「開始旋轉」
  const [fast, setFast] = useState(false);
  const [zoom, setZoom] = useState(false);

  // 星星終端機
  const [starInput, setStarInput] = useState("");
  const [starRows, setStarRows] = useState([]);

  const handleStarKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const n = parseInt(starInput, 10);
    if (Number.isInteger(n) && n >= 1 && n <= 7) {
      // 生成等腰三角形（左對齊版本，若要置中可改）
      const lines = Array.from({ length: n }, (_, i) => "*".repeat(i + 1));
      setStarRows(lines);
    } else {
      alert("請輸入 1~7 之間的整數");
    }
  };

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
            {/* 左欄：兩個終端機 */}
            <div className='leftCol'>
              {/* 左上：旋轉控制 */}
              <div className='categoryTerminal program-terminal'>
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                </div>
                <div className='terminal-body'>
                  <div className='program-controls'>
                    <label className='control-item'>
                      <input type="checkbox" checked={spin} onChange={e => setSpin(e.target.checked)} />
                      開始旋轉
                    </label>
                    <label className='control-item'>
                      <input type="checkbox" checked={fast} onChange={e => setFast(e.target.checked)} />
                      旋轉加速
                    </label>
                    <label className='control-item'>
                      <input type="checkbox" checked={zoom} onChange={e => setZoom(e.target.checked)} />
                      放大
                    </label>
                  </div>

                  {/* 旋轉的 PNG；請把 triangle.png 放在 public/images/ 之下 */}
                  <img
                    src="images/triangle.png"
                    alt="triangle"
                    className={[
                      "triangle-img",
                      spin ? "running" : "",
                      fast ? "fast" : "",
                      zoom ? "zoom" : "",
                    ].join(" ")}
                  />
                </div>
              </div>

              {/* 左下：星星行數輸入 */}
              <div className='categoryTerminal input-terminal'>
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                </div>
                <div className='terminal-body'>
                  <div className='input-row'>
                    <p className='input-label'>請輸入星星行數：</p>
                    <input
                      type="text"
                      className='terminal-input'
                      placeholder="輸入 1~7 之間整數，按 Enter"
                      value={starInput}
                      onChange={(e) => setStarInput(e.target.value)}
                      onKeyDown={handleStarKeyDown}
                    />
                  </div>

                  {/* 小圖示只是裝飾，可換成 /images/terminalicon1.png /images/terminalicon2.png */}
                  <div className='icon-buttons'>
                    <img src="images/terminalicon1.png" alt="" className="icon" />
                    <img src="images/terminalicon2.png" alt="" className="icon" />
                  </div>

                  <div className='console'>
                    {starRows.length === 0 ? (
                      <div className='console-placeholder'>＞（尚未輸入）</div>
                    ) : (
                      starRows.map((line, idx) => (
                        <div key={idx} className={idx === starRows.length - 1 ? "highlight" : ""}>
                          {idx === starRows.length - 1 ? "> " : ""}
                          {line}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 中欄：先留兩個容器位置（你說之後再做） */}
            <div className='midCol'>
              <div className='categoryTerminal placeholder-terminal'>
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                </div>
                <div className='terminal-body'>（之後放內容 A）</div>
              </div>

              <div className='categoryTerminal placeholder-terminal'>
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                </div>
                <div className='terminal-body'>（之後放內容 B）</div>
              </div>
            </div>

            {/* 右欄：你的文案 + 按鈕（沿用原本） */}
            <div className='rightCol'>
              <div className='categoryDecText'>
                <span className='html-tag'>＜p style="color:blue;"＞</span>
                <p>這些真的都是入門的程式嗎...？快來查查怎麼做！</p>
                <span className='html-tag'>＜/p＞</span>
                <p className='cute-face'>（Ó_Ò｡）</p>
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
      <section
        className="section exercise-section"
        data-badge-label="Exercise.jsx"
        data-badge-theme="dark"
        style={{ backgroundImage: 'url("images/indexarea4bg.png")' }}
      >
        <div className="exercise-content">
          <div className="homeTitleArea">
            <h2>程式練習</h2>
            <p className="exercise-subtitle">Exercise</p>
          </div>

          <div className="exercise-main">
            {/* 左：想法（上）＋ 貓（下） */}
            <div className="exercise-left">
              <div className="thoughts">
                <div className="thought-lines">
                  {/* 由外到內、最短句放中間（可依設計再微調順序） */}
                  <span>Github你又怎麼啦？</span>
                  <span>不要再改了！</span>
                  <span>好想睡覺</span>
                  <span>他剛說啥？</span>
                  <span>晚餐吃什麼？</span>
                  <span>我真的有學會嗎？</span>
                  <span>我真的是合格的工程師了嗎？</span>
                </div>

                {/* 貓固定在 thoughts 容器底部 */}
                <img className="exercise-cat" src="images/cutecat-2.png" alt="cute cat" />
              </div>
            </div>

            {/* 右：錯誤堆疊 + CTA */}
            <div className="exercise-right">
              <div className="error-stack">
                <img src="images/warning4.png" alt="warning stack" />
              </div>

              <Link to="/Exercise" className="sec4BtnBox">
                <div className="sec4BtnArrow">＞＞＞</div>
                <div className="sec4StartBtn">
                  <div className="btnUp">開始測驗</div>
                  <div className="btnDown">Start</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home