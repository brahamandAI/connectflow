"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, role, isLoading } = useAuth();

  useEffect(() => {
    // If user is already authenticated, redirect to their dashboard
    if (isAuthenticated && role) {
      if (role === "recruiter") {
        router.push("/dashboard/recruiter");
      } else if (role === "jobseeker") {
        router.push("/dashboard/job-seeker");
      } else {
        router.push("/posts");
      }
      return;
    }

    // Check if there's a user type in the URL query
    const params = new URLSearchParams(window.location.search);
    const userType = params.get("type");

    if (userType === "recruiter") {
      router.push("/auth/recruiter/login");
    } else {
      // Default to job seeker login
      router.push("/auth/jobseeker/login");
    }
  }, [router, isAuthenticated, role]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Redirecting to login page...</p>
        </motion.div>
    </div>
  );
} 