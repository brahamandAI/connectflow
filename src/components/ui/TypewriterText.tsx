"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface TypewriterTextProps {
  words: string[];
  delayBetweenWords?: number;
  className?: string;
}

export function TypewriterText({
  words,
  delayBetweenWords = 2000,
  className = "",
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const currentWord = words[wordIndex];

  // Handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Word cycling effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, delayBetweenWords);

    return () => clearTimeout(timer);
  }, [wordIndex, words, delayBetweenWords]);

  // Determine text and cursor color based on theme
  const textColorClass = mounted && theme === "dark" ? "text-white" : "text-foreground";
  const cursorColorClass = mounted && theme === "dark" ? "bg-white" : "bg-foreground";
  const cursorShadow = mounted && theme === "dark" 
    ? "0 0 8px rgba(255, 255, 255, 0.5)" 
    : "0 0 8px rgba(0, 0, 0, 0.3)";

  return (
    <span className={`relative inline-flex ${className} ${textColorClass}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 350,
              damping: 25,
              duration: 0.5,
            }
          }}
          exit={{ 
            scale: 0.8, 
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            }
          }}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
      <span
        className={`inline-block ml-0.5 w-[3px] h-[60%] ${cursorColorClass} align-text-top self-center ${
          cursorVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          transition: "opacity 0.2s",
          boxShadow: cursorShadow
        }}
      />
    </span>
  );
} 