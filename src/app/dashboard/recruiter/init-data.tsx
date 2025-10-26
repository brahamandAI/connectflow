"use client";

import { useEffect } from "react";

export default function InitializeData() {
  useEffect(() => {
    // Check if candidates data exists
    const candidatesData = localStorage.getItem("candidates");
    
    if (!candidatesData) {
      // Create empty candidates array
      localStorage.setItem("candidates", JSON.stringify([]));
    }
    
    // Check if jobs data exists
    const jobsData = localStorage.getItem("jobs");
    
    if (!jobsData) {
      // Create empty jobs array
      localStorage.setItem("jobs", JSON.stringify([]));
    }
    
    // Initialize any other necessary data structures here
  }, []);
  
  // This component doesn't render anything
  return null;
} 