"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Architectural spring physics: smooth, responsive, no jitter
    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const [isHidden, setIsHidden] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            setIsHidden(!!target.closest("[data-hide-cursor]"));

            const expandTarget = target.closest('[data-expand-cursor="true"]') as HTMLElement;
            if (expandTarget) {
                const opacity = window.getComputedStyle(expandTarget).opacity;
                setIsExpanded(opacity !== "0");
            } else {
                setIsExpanded(false);
            }
        };
        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseover", handleOver);
        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseover", handleOver);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className={`fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 ${isExpanded ? "border border-yellow-400/80 bg-yellow-400/20" : " bg-yellow-400/80"}`}
            style={{ x: cursorX, y: cursorY }}
            animate={{
                opacity: isHidden ? 0 : 1,
                scale: isExpanded ? 6.8 : isHidden ? 0.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
    );
}