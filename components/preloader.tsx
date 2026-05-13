"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const targetLetters = ["P", "I", "E", "C", "A", "H", "C", "I", "H", "P"];

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [displayLetter, setDisplayLetter] = useState("");

  // Handle scroll lock
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // Handle progress counting
  useEffect(() => {
    const duration = 2500; // 2.5 seconds
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
      setTimeout(() => setIsLoading(false), 800);
      return;
    }

    // Sync letter change with every percentage point
    // This will cycle through PIECAHCIH repeatedly
    const letterIndex = Math.floor(progress) % targetLetters.length;
    setDisplayLetter(targetLetters[letterIndex]);
  }, [progress]);

  const roundedProgress = Math.floor(progress);

  return (
    <AnimatePresence>
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
          {/* Noise overlay for texture */}
          {/* <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" /> */}

          <div className="relative flex flex-col items-center">
            <div className="flex items-center gap-8 md:gap-16">
              {/* The flickering letters */}
              <div className="h-40 w-40 flex items-center justify-center">
                <motion.span
                  key={displayLetter}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                  className="text-8xl md:text-[12rem] font-bold tracking-tighter leading-none"
                >
                  {displayLetter}
                </motion.span>
              </div>

              {/* Progress counter to the right */}
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-light tracking-tighter tabular-nums">
                  {roundedProgress.toString().padStart(2, '0')}
                </span>
                <span className="text-xl font-light opacity-50">%</span>
              </div>
            </div>

            {/* Letter sequence hint under the letters */}
            {/* <div className="mt-12 flex flex-col items-center gap-2">
              <div className="flex gap-2">
                {targetLetters.map((l, i) => (
                  <span
                    key={i}
                    className={`text-[12px] md:text-sm font-mono transition-all duration-300 ${i <= Math.floor((progress / 100) * targetLetters.length) ? 'opacity-100 scale-110 font-bold' : 'opacity-20 scale-100'
                      }`}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div> */}
          </div>

          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%) pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
