import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../scss/PageBadge.scss";

const routeDefaults = {
    "/": { label: "Home.jsx", theme: "light" },
    "/Definition": { label: "Definition.jsx", theme: "dark" },
    "/Category": { label: "Category.jsx", theme: "light" },
    "/Exercise": { label: "Exercise.jsx", theme: "dark" },
    "/About": { label: "About.jsx", theme: "light" },
};

export default function PageBadge({
    navHeight = 80,
    insetX = 80,
    offsetY = 60,
    zIndex = 900,
    icon = "images/sjavinglogo.png",
}) {
    const location = useLocation();
    const [badge, setBadge] = useState(
        routeDefaults[location.pathname] ?? { label: "Untitled.jsx", theme: "light" }
    );
    const observerRef = useRef(null);
    const currentKeyRef = useRef(null);
    const changeTimeoutRef = useRef(null);

    useEffect(() => {
        // 斷開舊 observer
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        // 清除待定的變更
        if (changeTimeoutRef.current) {
            clearTimeout(changeTimeoutRef.current);
            changeTimeoutRef.current = null;
        }

        const sections = Array.from(document.querySelectorAll(".section"));
        // 沒有 section：走路由預設
        if (sections.length === 0) {
            const def = routeDefaults[location.pathname];
            if (def) setBadge(def);
            return;
        }

        // 使用更穩定的判定邏輯
        const handleIntersection = (entries) => {
            // 取得所有可見的 sections，並按照 DOM 順序和可見程度排序
            const visibleSections = entries
                .filter(entry => entry.isIntersecting && entry.intersectionRatio > 0.3) // 提高可見度門檻
                .map(entry => ({
                    element: entry.target,
                    ratio: entry.intersectionRatio,
                    boundingRect: entry.boundingClientRect,
                    domIndex: sections.indexOf(entry.target)
                }))
                .sort((a, b) => {
                    // 優先考慮在視窗上方較多的 section
                    const aCenter = a.boundingRect.top + a.boundingRect.height / 2;
                    const bCenter = b.boundingRect.top + b.boundingRect.height / 2;
                    const viewportCenter = window.innerHeight / 2;

                    // 計算距離視窗中心的距離
                    const aDistance = Math.abs(aCenter - viewportCenter);
                    const bDistance = Math.abs(bCenter - viewportCenter);

                    // 如果距離相近，則按照可見比例排序
                    if (Math.abs(aDistance - bDistance) < 100) {
                        return b.ratio - a.ratio;
                    }

                    return aDistance - bDistance;
                });

            if (!visibleSections.length) return;

            const targetSection = visibleSections[0].element;
            const key = targetSection.id || targetSection.dataset.badgeLabel || targetSection.className;

            // 避免頻繁切換 - 加入防抖機制
            if (currentKeyRef.current === key) return;

            // 清除之前的延遲變更
            if (changeTimeoutRef.current) {
                clearTimeout(changeTimeoutRef.current);
            }

            // 延遲變更，避免快速滾動時的閃爍
            changeTimeoutRef.current = setTimeout(() => {
                currentKeyRef.current = key;
                setBadge({
                    label: targetSection.dataset.badgeLabel || routeDefaults[location.pathname]?.label || "Untitled.jsx",
                    theme: targetSection.dataset.badgeTheme || routeDefaults[location.pathname]?.theme || "light",
                });
            }, 150); // 150ms 防抖延遲
        };

        // 調整 IntersectionObserver 設定
        const io = new IntersectionObserver(handleIntersection, {
            root: null,
            // 調整 rootMargin：減少頂部排除區域，增加底部緩衝
            rootMargin: `-${navHeight + 20}px 0px -30% 0px`,
            // 使用更精細的門檻值
            threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
        });

        sections.forEach(section => io.observe(section));
        observerRef.current = io;

        // 路由初次載入時的預設值
        const firstSection = sections[0];
        if (firstSection) {
            setBadge({
                label: firstSection.dataset.badgeLabel || routeDefaults[location.pathname]?.label || "Untitled.jsx",
                theme: firstSection.dataset.badgeTheme || routeDefaults[location.pathname]?.theme || "light",
            });
            currentKeyRef.current = firstSection.id || firstSection.dataset.badgeLabel || firstSection.className;
        }

        return () => {
            io.disconnect();
            if (changeTimeoutRef.current) {
                clearTimeout(changeTimeoutRef.current);
            }
        };
    }, [location.key, navHeight]);

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