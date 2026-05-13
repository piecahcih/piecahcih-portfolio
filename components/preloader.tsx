"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/context/loading-context";

const targetLetters = ["P", "I", "E", "C", "A", "H", "C", "I", "H", "<p>"];

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [displayLetter, setDisplayLetter] = useState("");
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);

  // Handle scroll lock
  useEffect(() => {
    if (!showScrollbar) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showScrollbar]);

  // Handle progress counting
  useEffect(() => {
    const duration = 3000; // 2.5 seconds
    const interval = 20;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Handle letter flickering synced with progress
  useEffect(() => {
    if (progress >= 100) {
      setDisplayLetter(targetLetters[targetLetters.length - 1]);

      // Phase 1: Wait a bit then fade out the text/counter
      const contentTimer = setTimeout(() => {
        setIsContentVisible(false);

        // Phase 2: Wait 0.8s with blank background then fade out preloader
        const exitTimer = setTimeout(() => {
          setIsLoading(false);
        }, 800);

        return () => clearTimeout(exitTimer);
      }, 800);

      return () => clearTimeout(contentTimer);
    }

    // Cycle through all letters except the last one (the target)
    const letterIndex = Math.floor(progress) % (targetLetters.length - 1);
    setDisplayLetter(targetLetters[letterIndex]);
  }, [progress]);

  const roundedProgress = Math.floor(progress);

  const { finishLoading } = useLoading();

  return (
    <AnimatePresence onExitComplete={() => {
      setShowScrollbar(true);
      finishLoading();
    }}>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 1,
              ease: "easeInOut",
              delay: 1
            }
          }}
          className="fixed inset-0 z-800 flex flex-col items-center justify-center bg-background text-foreground selection:bg-background selection:text-foreground"
        >




          <AnimatePresence>
            {isContentVisible && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 0.8, ease: "easeInOut" } }}
                className="flex flex-col items-center justify-center w-full h-full"
              >
                {/* The flickering letters */}
                <div className="h-40 w-40 flex items-center justify-center">
                  <motion.span
                    key={displayLetter}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    className={`tracking-tighter leading-none ${displayLetter === "<p>" ? "font-medium text-5xl text-primary/60" : "font-bold text-8xl md:text-[12rem]"
                      }`}
                  >
                    {displayLetter}
                  </motion.span>
                </div>

                {/* Progress counter at bottom right */}
                <div className="absolute bottom-8 right-8 flex items-end gap-1">
                  <span className="text-xl font-light tracking-tighter tabular-nums">
                    {roundedProgress.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xl font-light opacity-50">%</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%) pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
