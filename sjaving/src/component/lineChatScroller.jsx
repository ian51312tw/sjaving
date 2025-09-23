// LineChatScroller.jsx
import { useEffect, useRef, useState } from "react";
import '../scss/lineChatScroller.scss'

export default function LineChatScroller({
    messages,
    pxPerSecond = 30,
    pauseMs = 1000,
}) {
    const wrapRef = useRef(null);

    const directionRef = useRef(1); // 1=往下, -1=往上
    const pausedRef = useRef(false);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;

        let raf = 0;
        let last = performance.now();

        const loop = (now) => {
            const dt = (now - last) / 1000;
            last = now;

            if (!pausedRef.current) {
                el.scrollTop += directionRef.current * pxPerSecond * dt;

                // 到頂
                if (el.scrollTop <= 0) {
                    pausedRef.current = true;
                    setTimeout(() => {
                        directionRef.current = 1;
                        pausedRef.current = false;
                        last = performance.now();
                        raf = requestAnimationFrame(loop);
                    }, pauseMs);
                    return;
                }
                // 到底
                if (el.scrollTop >= el.scrollHeight - el.clientHeight) {
                    pausedRef.current = true;
                    setTimeout(() => {
                        directionRef.current = -1;
                        pausedRef.current = false;
                        last = performance.now();
                        raf = requestAnimationFrame(loop);
                    }, pauseMs);
                    return;
                }
            }

            raf = requestAnimationFrame(loop);
        };

        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, [pxPerSecond, pauseMs]);

    // === 滑鼠拖曳捲動 ===
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;

        let isDown = false;
        let startY = 0;
        let startTop = 0;

        const onMouseDown = (e) => {
            if (e.button !== 0) return;
            isDown = true;
            el.classList.add("dragging");
            startY = e.pageY;
            startTop = el.scrollTop;
            e.preventDefault();
        };

        const onMouseMove = (e) => {
            if (!isDown) return;
            const dy = e.pageY - startY;
            el.scrollTop = startTop - dy;
        };

        const onMouseUp = () => {
            isDown = false;
            el.classList.remove("dragging");
        };

        el.addEventListener("mousedown", onMouseDown);
        el.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            el.removeEventListener("mousedown", onMouseDown);
            el.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    return (
        <div
            className="line-chat-wrap"
            ref={wrapRef}
            aria-label="auto-scrolling chat"
        >
            <ul className="line-chat-list">
                {messages.map((t, i) => (
                    <li key={i} className={`bubble ${i % 2 === 0 ? "right" : "left"} item-enter`}>
                        <p>{t}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
