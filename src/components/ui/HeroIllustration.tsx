"use client";

import { useTheme } from "next-themes";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroIllustrationProps {
  className?: string;
}

export const HeroIllustration = ({ className }: HeroIllustrationProps) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only run animations after client-side hydration is complete
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Define animations
  const fadeIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" as const }
    }
  };
  
  const float = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
        repeatType: "loop" as const
      }
    }
  };
  
  // Background blobs animation
  const blobAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 0.9, 0.7], 
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut" as const,
        repeatType: "loop" as const
      }
    }
  };

  // Stars animation
  const starsAnimation = {
    animate: {
      opacity: [0, 0.8, 0],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
        repeatType: "reverse" as const
      }
    }
  };

  // Use a consistent theme value that's determined client-side
  const currentTheme = mounted ? (resolvedTheme || theme) : null;

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Animated background elements - only render when mounted */}
      {mounted && (
        <motion.div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Blob 1 - Top left */}
          <motion.div 
            className={`absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full 
              ${currentTheme === "dark" ? "bg-primary/10" : "bg-primary/5"} 
              blur-3xl opacity-50 z-0`}
            variants={blobAnimation}
            animate="animate"
          />
          
          {/* Blob 2 - Bottom right */}
          <motion.div 
            className={`absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full 
              ${currentTheme === "dark" ? "bg-blue-400/10" : "bg-blue-400/5"} 
              blur-3xl opacity-50 z-0`}
            variants={blobAnimation}
            animate="animate"
            style={{ animationDelay: "1s" }}
          />
        </motion.div>
      )}
      
      {/* Stars/sparkles for dark theme - only render when mounted */}
      {mounted && currentTheme === "dark" && (
        <>
          <motion.div 
            className="absolute top-[10%] left-[15%] w-2 h-2 bg-blue-300 rounded-full"
            variants={starsAnimation}
            animate="animate"
          />
          <motion.div 
            className="absolute top-[20%] right-[20%] w-1.5 h-1.5 bg-primary/90 rounded-full"
            variants={starsAnimation}
            animate="animate"
            style={{ animationDelay: "1.2s" }}
          />
          <motion.div 
            className="absolute bottom-[25%] left-[25%] w-2 h-2 bg-blue-200 rounded-full"
            variants={starsAnimation}
            animate="animate"
            style={{ animationDelay: "0.8s" }}
          />
          <motion.div 
            className="absolute bottom-[12%] right-[18%] w-1 h-1 bg-primary/80 rounded-full"
            variants={starsAnimation}
            animate="animate"
            style={{ animationDelay: "1.5s" }}
          />
        </>
      )}
      
      {/* Dark mode glow effect behind the illustration - only render when mounted */}
      {mounted && currentTheme === "dark" && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-primary/5 blur-3xl"
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop" as const 
          }}
        />
      )}
      
      {/* Main SVG illustration - static version for SSR, animated for CSR */}
      {!mounted ? (
        <div className="relative z-10">
          <div className="relative w-full h-full">
            <Image
              src="/job_hunt-amico.svg"
              alt="Job hunt illustration"
              width={600}
              height={600}
              className="w-full h-auto mx-auto"
              priority
            />
          </div>
        </div>
      ) : (
        <motion.div 
          className="relative z-10"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <motion.div
            variants={float}
            animate="animate"
            className="relative w-full h-full"
          >
            <div className={`
              relative w-full h-full
              ${currentTheme === "dark" 
                ? "drop-shadow-[0_0_20px_rgba(100,150,255,0.2)]" 
                : "drop-shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
              }
              transition-all duration-500
            `}>
              <Image
                src="/job_hunt-amico.svg"
                alt="Job hunt illustration"
                width={600}
                height={600}
                className={`
                  w-full h-auto mx-auto
                  ${currentTheme === "dark" 
                    ? "filter brightness-110 contrast-105 saturate-105" 
                    : "filter brightness-100"
                  }
                  transition-all duration-300
                `}
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Interactive elements that overlay the SVG - only render when mounted */}
      {mounted && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Highlight Circle */}
          <motion.div 
            className={`absolute top-[15%] right-[30%] w-8 h-8 rounded-full 
              ${currentTheme === "dark" ? "bg-primary/20" : "bg-primary/10"} 
              backdrop-blur-sm z-20`}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop" as const
            }}
          />
          
          {/* Pulse Effect */}
          <motion.div
            className={`absolute bottom-[25%] left-[30%] w-12 h-12 rounded-full 
              ${currentTheme === "dark" ? "border-primary/30" : "border-primary/20"} 
              border-2 z-20`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              repeatType: "loop" as const
            }}
          />
        </motion.div>
      )}
    </div>
  );
};