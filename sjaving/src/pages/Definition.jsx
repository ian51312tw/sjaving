import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'  // ← 加入 useLocation
import '../scss/Definition.scss'

const Definition = () => {
    // -------- 狀態
    const [selectedTopic, setSelectedTopic] = useState('識別字')
    const [searchQuery, setSearchQuery] = useState('')

    // -------- 原始 topics 順序（一路排下去）
    const rawTopics = [
        '識別字',
        '變數',
        '常數',
        '資料型別',
        '運算子',
        '條件判斷',
        '迴圈',
        '跳出',
        '繼續',
        '函式',
        '方法',
        '參數',
        '引數',
    ]

    // -------- 每個 topic 指派到哪個 category（沒指定者歸到「其他」）
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

        // 之後有「資料結構」「非同步與事件」「DOM操作」請在這裡補
    }

    const location = useLocation()

    // 讀取 Home 送來的 preselect 狀態（topic 優先，其次是 category）
    useEffect(() => {
        const preTopic = location.state?.preselectTopic
        const preCat = location.state?.preselectCategory

        if (preTopic) {
            // 保守：確認這個 topic 存在
            const exists = rawTopics.includes(preTopic)
            if (exists) {
                setSelectedTopic(preTopic)
            }
            // 不存在就保持原樣
            return
        }

        if (preCat) {
            // 找到該類別的第一個 topic（依原始順序）
            const firstOfCat = rawTopics.find(t => (categoryOfTopic[t] ?? '其他') === preCat)
            if (firstOfCat) {
                setSelectedTopic(firstOfCat)
            }
        }
        // location.state 只需初始化一次即可；若你希望每次導頁都能覆蓋，就留空依賴陣列
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // -------- 頁面載入動畫（保留你的寫法與時間差）
    useEffect(() => {
        const elements = document.querySelectorAll('.definition-container > *')
        elements.forEach((el, index) => {
            el.style.opacity = '0'
            el.style.transform = 'translateY(20px)'

            setTimeout(() => {
                el.style.transition = 'all 0.6s ease'
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'
            }, index * 100)
        })
    }, [])

    // -------- UI 顯示工具
    const getStarRating = (difficulty) => {
        const total = 5
        const stars = []

        for (let i = 0; i < difficulty; i++) {
            stars.push(<img key={`filled-${i}`} src="images/difficult1.png" alt="filled star" className="star-icon" />)
        }
        for (let i = difficulty; i < total; i++) {
            stars.push(<img key={`empty-${i}`} src="images/difficult2.png" alt="empty star" className="star-icon" />)
        }
        return stars
    }

    // -------- 內容取得（原樣保留）
    const getTopicContent = (topic) => {
        switch (topic) {
            case '識別字':
                return {
                    title: '識別字',
                    subtitle: 'Identifier',
                    difficulty: 3,
                    definition:
                        ['識別字就是程式中用來「命名」各種實體的名稱：變數、函式、物件、物件屬性等，它是讓識別系統分辨「這是誰」的概念'],
                    rules:
                        '識別字是程式打地基的一環，入門的基礎素養，熟練掌握後會逐漸變成本能，不再是問題所在！',
                    usage: [
                        '1. 開頭字元：必須必須以字母（A–Z, a–z）、底線 ，或$開頭',
                        '2. 後續字元：可以包含字母、數字、底線或$',
                        '3. 區分大小寫：myVar ≠ MyVar，兩者不同',
                        '不能使用系統專用保留字：if、for、let、const等都是系統用字，不可作為識別字',
                        '5. 駝峰式命名：第一個單字須小寫，後續單字首字母大寫，其餘字母維持小寫',
                    ],
                    note: '原來！就像是貼姓名貼紙一樣！貼上名字後電腦跟協作者就能分辨這個東西是做什麼用的囉～',
                    emoticon: '(★´∀｀)o',
                }
            case '變數':
                return {
                    title: '變數',
                    subtitle: 'Variable',
                    difficulty: 5,
                    definition:
                        ['變數是程式裡用來存放資料的容器。它的值可以隨著程式執行而改變，讓你能重複利用同一個名稱來存取不同資料'],
                    rules: '變數是程式的根，沒有變數，程式只能硬寫死數值，無法動態計算、處理輸入或儲存狀態，使用便利性大幅下降，幾乎所有程式都以變數為基底進行設計',
                    usage: [],
                    note: '竟然只是收藏資料的盒子嗎？還以為很難呢！',
                    emoticon: '╮(╯_╰)╭',
                    codeExample: {
                        title: '//宣告變數',
                        code: [
                            'let lunchBox = "三明治";',
                            'console.log(lunchBox);',
                            '// 直接輸出三明治',
                            '// 更新內容',
                            'lunchBox = "義司";',
                            'console.log(lunchBox);',
                            '// 更新後輸出義司'
                        ],
                    },
                }
            case '常數':
                return {
                    title: '常數',
                    subtitle: 'Constant',
                    difficulty: 4,
                    definition:
                        ['與變數類似，同樣是承載資料的容器，但不能被重新賦值，一旦宣告並設定值，這個名稱就被「鎖定」了，不能再改變',
                            '常數可以保證某些關鍵數值不會被意外修改（例如稅率、圓周率），在團隊協作或大型專案中，能降低錯誤，增加程式的安全性與可預測性'],
                    rules:
                        '怎麼跟變數那麼像呀！開始有點搞混了QQ',
                    usage: [
                        '1. 多數情況仍使用駝峰式',
                        '2. 若值是真正「不會改變的設定值」，習慣用 全大寫蛇形（UPPER_SNAKE_CASE）：MAX_USERS, TAX_RATE。',
                        '3. 確定不需要被重新賦值的資料，例如 API 金鑰、設定參數、圓周率',
                        '4. 優先使用 const：現代 JS 的建議是先用 const，確定需要改變時才改成 let',
                        '5. 注意物件與陣列：雖然不能整個重新指派，但裡面的內容還是可以修改',
                    ],
                    note: '蛤！這也是裝資料的盒子...跟變數(Variables)比起來就像是便當盒跟保險箱的差別呢！',
                    emoticon: '∑(ι´Дン)ノ',
                }
            default:
                return {
                    title: topic,
                    subtitle: topic,
                    difficulty: 0,
                    definition: ['此項目正在建構中...'],
                    rules: '',
                    usage: [],
                    emoticon: '(｡◕‿◕｡)',
                }
        }
    }

    // ========== 分組 / 搜尋 / 排序邏輯（不新增 class，完全配合現有 SCSS 結構） ==========
    // 1) 整備 topicsData（帶類別與原始順序）
    const topicsData = rawTopics.map((name, idx) => ({
        name,
        category: categoryOfTopic[name] ?? '其他',
        order: idx,
    }))

    // 2) 搜尋（標題 + 內容）
    const normalized = (s) => (s || '').toLowerCase()
    const q = normalized(searchQuery)

    const matchTopic = (tName) => {
        if (!q) return true
        const c = getTopicContent(tName)
        const haystack = [
            tName,
            c?.definition,
            c?.rules,
            c?.note,
            ...(c?.usage || []),
            ...((c?.codeExample?.code) || []),
        ].join('\n')
        return normalized(haystack).includes(q)
    }

    // 3) 過濾與分組
    const filteredTopics = topicsData.filter((t) => matchTopic(t.name))

    const grouped = filteredTopics.reduce((acc, t) => {
        if (!acc[t.category]) acc[t.category] = []
        acc[t.category].push(t)
        return acc
    }, {})

    // 4) 類別排序：先依項目數量多→少；同數量再依第一個出現的原始順序
    const sortedCategories = Object.entries(grouped).sort((a, b) => {
        const [_, aItems] = a
        const [__, bItems] = b
        const byCount = bItems.length - aItems.length
        if (byCount !== 0) return byCount
        const minA = Math.min(...aItems.map((x) => x.order))
        const minB = Math.min(...bItems.map((x) => x.order))
        return minA - minB
    })

    // -------- 目前主內容
    const currentContent = getTopicContent(selectedTopic)

    return (
        <section
            className="section definition-section"
            data-badge-label="Definition.jsx"
            data-badge-theme="dark"
            style={{ backgroundImage: 'url("images/indexarea2bg.png")' }}
        >
            <div className="definition-container">
                {/* 左側選單：沿用 .sidebar/.search-box/.category-section/.category-title/.topic-list/.topic-item */}
                <div className="sidebar">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="搜尋內含關鍵詞"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="搜尋主題"
                        />
                    </div>

                    {sortedCategories.map(([category, items]) => (
                        <div key={category} className="category-section">
                            {/* 不新增額外 class，直接在標題內顯示數量 */}
                            <h3 className="category-title">
                                {category}（{items.length}）
                            </h3>

                            <ul className="topic-list">
                                {items
                                    .sort((a, b) => a.order - b.order) // 類別內維持原 topics 順序
                                    .map((t) => (
                                        <li key={t.name}>
                                            <button
                                                className={`topic-item ${selectedTopic === t.name ? 'active' : ''
                                                    }`}
                                                onClick={() => setSelectedTopic(t.name)}
                                            >
                                                {t.name}
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* 主要內容區域（完全沿用你的結構與 class） */}
                <div className="main-content">
                    <div className="content-header">
                        <h1 className="main-title">{currentContent.title}</h1>
                        <span className="subtitle">{currentContent.subtitle}</span>
                    </div>

                    <div className="difficulty-indicator">
                        <span className="difficulty-label">重要度：</span>
                        <span className="stars">{getStarRating(currentContent.difficulty)}</span>
                    </div>

                    <div className="terminal-window definition-block">
                        <div className="terminal-header">
                            <div className="terminal-dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                        </div>
                        <div className="terminal-content">
                            <h3>• 定義：</h3>
                            {/* <p>{currentContent.definition}</p> */}
                            <p>{currentContent.definition[0]}</p>
                            <p>{currentContent.definition[1]}</p>
                            <p>{currentContent.definition[2]}</p>


                            {currentContent.rules && (
                                <div className="rules-emoticon-row">
                                    <p className="rules-text">{currentContent.rules}</p>
                                    {currentContent.emoticon && (
                                        <div className="emoticon">{currentContent.emoticon}</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {currentContent.usage && currentContent.usage.length > 0 && (
                        <div className="terminal-window usage-block">
                            <div className="terminal-header">
                                <div className="terminal-dots">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                </div>
                            </div>
                            <div className="terminal-content">
                                <h3>• 常用規則：</h3>
                                <ol>
                                    {currentContent.usage.map((rule, index) => (
                                        <li key={index}>{rule}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    )}

                    {currentContent.codeExample && (
                        <div className="terminal-window code-block">
                            <div className="terminal-header">
                                <div className="terminal-dots">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                </div>
                            </div>
                            <div className="terminal-content code-content">
                                <h3>{currentContent.codeExample.title}</h3>
                                <pre className="code">
                                    {currentContent.codeExample.code.map((line, index) => (
                                        <div key={index} className="code-line">
                                            {line}
                                        </div>
                                    ))}
                                </pre>
                            </div>
                        </div>
                    )}

                    {currentContent.note && (
                        <div className="note-block">
                            <p>{currentContent.note}</p>
                            <div className="note-emoticon">σ(´∀｀*)</div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Definition