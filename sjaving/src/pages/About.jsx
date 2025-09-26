import { useState, useEffect } from 'react'
import { useLocation, } from 'react-router-dom'
import '../scss/About.scss'
const About = () => {
    const location = useLocation()

    // -------- 頁面載入動畫（保留你的寫法與時間差）
    useEffect(() => {
        const els = document.querySelectorAll('.section-About > *')

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
        <section className='section-About'
            data-badge-label="About.jsx"
            data-badge-theme="light"
            style={{ backgroundImage: 'url("images/indexarea3bg.png")' }}
        >
            <div className="about-content">
                <div className='homeTitleArea'>
                    <h2>關於我們</h2>
                    <p className="about-subtitle">About</p>
                </div>
                <div className='aboutContentBox'>
                    <p>sJAVing是為了讓所有初學者以最友善、最吸引人的方式來學習程式而架構的網站</p>
                    <p>製作者在學習之於也將持續更新！（有空的話）</p>
                    <p>若您認為學習程式很辛苦，那我做這個網站也是非常辛苦！</p>
                    <p>歡迎buy me a coffee！</p>
                    <p>請掃左下方QRcode，斗內我～</p><br />
                    <div className='aboutImgBox'>
                        {/* <img className='willSmith' src="images/willsmith.png" alt="" /> */}
                        <img className='aboutQRcode' src="images/about-qrcode.png" alt="" />
                        <img className='aboutLogo' src="images/sjavinglogobig.png" alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About