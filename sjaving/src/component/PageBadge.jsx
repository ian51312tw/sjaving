import { useEffect, useState, useRef } from "react";
import "../scss/PageBadge.scss";

export default function PageBadge({
    navHeight = 80,
    insetX = 80,
    offsetY = 60,
    zIndex = 900,
    icon = "/images/badge-icon.svg",      // ← 全站共用 icon
}) {
    const [badge, setBadge] = useState({ label: "Home.jsx", theme: "light" });
    const lastSectionId = useRef(null);   // 用來避免不必要的 re-render

    // —— 2) 「視窗中心線」判定：穩、不卡、無閃爍 ——
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll(".section"));
        if (!sections.length) return;

        const pickActive = () => {
            const vh = window.innerHeight;
            // 取「視窗中線」略低於 navbar 的位置（避免 navbar 區域干擾）
            const centerY = navHeight + Math.max(30, Math.round(vh * 0.2));

            // 找到包住這條中線的 section（top <= centerY <= bottom）
            let active = null;
            for (const s of sections) {
                const r = s.getBoundingClientRect();
                const top = r.top;
                const bottom = r.bottom;
                if (top <= centerY && bottom >= centerY) { active = s; break; }
            }

            if (!active) return; // 沒找到就維持現狀

            // 用 id 或 DOM 參考當 key，避免來回切換時抖動
            const key = active.id || active.dataset.badgeLabel || active.className;
            if (lastSectionId.current === key) return; // 同一個就不更新

            lastSectionId.current = key;
            setBadge({
                label: active.dataset.badgeLabel || "Untitled.jsx",
                theme: active.dataset.badgeTheme || "light",
            });
        };

        // 用 rAF 節流的 scroll/resize 監聽
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => { pickActive(); ticking = false; });
        };

        pickActive();                         // 進場先算一次
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [navHeight]);

    return (
        <div
            className={`page-badge ${badge.theme}`}
            style={{
                "--inset-x": `${insetX}px`,
                "--top": `calc(${navHeight}px - ${offsetY}px)`,
                "--z": zIndex,
            }}
        >
            <img className="badge-icon" src={icon} alt="" aria-hidden />
            <span className="badge-label">{badge.label}</span>
        </div>
    );
}