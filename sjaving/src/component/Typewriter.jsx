import { useEffect, useState, useMemo } from "react";

function Typewriter({
    words = ["Recall Memory", "Learn Something New"],
    typingSpeed = 100,   // 每個字的毫秒數
    pauseMs = 5000       // 打完後停留時間
}) {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIdx, setWordIdx] = useState(0);

    const currentWord = useMemo(() => words[wordIdx], [words, wordIdx]);

    useEffect(() => {
        let timer;

        const handleTyping = () => {
            // 同樣速度：打與消都用 typingSpeed
            const speed = typingSpeed;

            if (!isDeleting) {
                // 正在打字
                const next = currentWord.substring(0, text.length + 1);
                setText(next);

                if (next === currentWord) {
                    // 打完：停 pauseMs 後開始刪
                    timer = setTimeout(() => setIsDeleting(true), pauseMs);
                    return;
                }
                timer = setTimeout(handleTyping, speed);
            } else {
                // 正在刪字
                const next = currentWord.substring(0, text.length - 1);
                setText(next);

                if (next === "") {
                    // 刪完：切到下一個字（循環）
                    setIsDeleting(false);
                    setWordIdx((i) => (i + 1) % words.length);
                    timer = setTimeout(handleTyping, speed); // 立刻開始打下一個
                    return;
                }
                timer = setTimeout(handleTyping, speed);
            }
        };

        timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, currentWord, typingSpeed, pauseMs]);

    return (
        <p className="typewriter">
            {text}
            <span className="caret" aria-hidden="true">|</span>
        </p>
    );
}

export default Typewriter;