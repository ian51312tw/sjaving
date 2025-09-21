import React from "react";
import "../scss/Home.scss";

// --------------------------------------------------------
// Home Page
// --------------------------------------------------------
export default function Home() {
  return (
    <main className="page home">

      {/* --------------------------------------------------------
        HERO 區（標題 + 搜尋 + 右側終端卡 / 氣泡）
      --------------------------------------------------------- */}
      <section className="section hero">
        <div className="hero-left">
          <h1 className="hero-title">Let’s sJAVing!</h1>

          <form className="search" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="今天想學什麼？" />
            <button type="submit" aria-label="Search">🔍</button>
          </form>
        </div>

        <aside className="hero-right">
          <div className="terminal">
            <pre>
              {`// 這裡可以放一小段示意程式碼
const hello = (name) => \`Hi, \${name}!\`;
console.log(hello("World"));`}
            </pre>
          </div>

          <div className="bubbles">
            <p>Hi！今天學什麼呢？</p>
            <p>點右邊開始！</p>
          </div>
        </aside>
      </section>

      {/* --------------------------------------------------------
         名詞釋義（深色區）
      --------------------------------------------------------- */}
      <section className="section def-section">
        <div className="def-wrap">
          <div className="def-left">
            <div className="vertical-title">名詞釋義</div>
            <div className="vertical-sub">Definition</div>
          </div>

          <div className="def-main">
            <div className="terminal">
              <pre>
                {`變數 (Variable) vs. 常數 (Constant)
let / const 的差別與使用時機...
型別：Number / String / Boolean / null / undefined
`}
              </pre>
            </div>

            <div className="chat">
              <p>資料型別有哪些？</p>
              <p>函式(Function) 是怎麼運作的？</p>
              <p>陣列(Array) 怎麼迭代？</p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------
        程式種類（卡片網格）
      --------------------------------------------------------- */}
      <section className="section cards">
        <h2 className="sec-title">程式種類 <span>Category</span></h2>

        <div className="card-grid">
          <article className="card">
            <h3 className="card-title">產生亂數</h3>
            <pre className="card-code">{`// 使用 Math.random()
const n = Math.floor(Math.random() * 100) + 1;`}</pre>
          </article>

          <article className="card">
            <h3 className="card-title">產生樂透號碼</h3>
            <pre className="card-code">{`// Set 去重 + 排序
// [...new Set(...)]`}</pre>
          </article>

          <article className="card">
            <h3 className="card-title">字元/字串</h3>
            <pre className="card-code">{`// padStart / includes / slice`}</pre>
          </article>

          <article className="card">
            <h3 className="card-title">流程控制</h3>
            <pre className="card-code">{`if / else if / switch / 三元運算`}</pre>
          </article>
        </div>
      </section>

      {/* --------------------------------------------------------
        程式練習（示意區）
      --------------------------------------------------------- */}
      <section className="section exercise">
        <h2 className="sec-title">程式練習 <span>Exercise</span></h2>

        <div className="exercise-wrap">
          <div className="exercise-copy">
            <p>我真的是合格的工程師了嗎？</p>
            <p>GitHub 你又怎麼啦？</p>
            <p>今天要練什麼？</p>
          </div>

          <div className="exercise-board">
            <div className="terminal">
              <pre>{`// 練習題載入區
// (之後可接上你的互動題目)`}</pre>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}