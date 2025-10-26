"use client";

import { useMemo } from "react";

interface JobLogoProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const JobLogo = ({ name, size = "md", className = "" }: JobLogoProps) => {
  // Generate a consistent color based on the company name
  const { bgColor, textColor, initial } = useMemo(() => {
    // Get the first letter of each word and join them
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    // Create a simple hash from the company name for color consistency
    const hash = Array.from(name).reduce(
      (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
      0
    );

    // Generate a hue value (0-360) from the hash
    const hue = Math.abs(hash) % 360;
    
    // Create background with appropriate saturation and lightness
    const bgColor = `hsl(${hue}, 70%, 50%)`;
    
    // Use white for darker background colors and dark for lighter ones
    const textColor = hue > 40 && hue < 200 ? "text-black" : "text-white";

    return {
      bgColor,
      textColor,
      initial: initials,
    };
  }, [name]);

  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-base",
    lg: "w-20 h-20 text-xl",
  };

  return (
    <div
      className={`flex items-center justify-center font-semibold rounded-lg ${sizeClasses[size]} ${textColor} ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {initial}
    </div>
  );
}; 