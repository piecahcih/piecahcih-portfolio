"use client";
import { useState, useEffect } from "react";

export default function Typewriter({ texts }: { texts: string[] }) {
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopIndex, setLoopIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const currentFullText = texts[loopIndex % texts.length];

            setDisplayText(
                isDeleting
                    ? currentFullText.substring(0, displayText.length - 1)
                    : currentFullText.substring(0, displayText.length + 1)
            );

            // Speed adjustment
            if (!isDeleting && displayText === currentFullText) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end
                setTypingSpeed(100);
            } else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setLoopIndex(loopIndex + 1);
                setTypingSpeed(150);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, loopIndex, texts, typingSpeed]);

    return (
        <span className="font-mono text-yellow-500">
            {displayText}
            <span className="animate-pulse border-r-2 border-yellow-500 ml-1" />
        </span>
    );
}