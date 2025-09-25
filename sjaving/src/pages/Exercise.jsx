import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../scss/Exercise.scss'

const Exercise = () => {

    const location = useLocation()

    // -------- 頁面載入動畫（保留你的寫法與時間差）
    useEffect(() => {
        const els = document.querySelectorAll('.section-exercise > *')

        // 先重置成初始狀態（不要 transition）
        els.forEach(el => {
            el.style.transition = 'none'
            el.style.opacity = '0'
            el.style.transform = 'translateY(20px)'
        })

        // 強制回流，讓瀏覽器記住上面的初始狀態
        //（任何讀 layout 的動作都行，這裡用 offsetHeight）
        els.forEach(el => void el.offsetHeight)

        // 再啟用 transition，開始做進場動畫
        els.forEach((el, index) => {
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease'
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'
            }, index * 100)
        })

        // 可選：在離開前清掉 transition，避免殘留
        return () => {
            els.forEach(el => {
                el.style.transition = ''
            })
        }
    }, [location.key]) // ← 依賴路由 key，每次切頁回來都會重跑


    return (
        <section className='section-exercise'
            data-badge-label="Exercise.jsx"
            data-badge-theme="dark"
            style={{ backgroundImage: 'url("images/indexarea4bg.png")' }}
        >
            <div className='unfinishImg'>
                <img className='unfinish' src="images/unfinish.jpg" alt="" />
            </div>
        </section>
    )
}

export default Exercise