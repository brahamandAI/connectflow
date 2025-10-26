"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function RoleRedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated" && session?.user) {
      const userRole = (session.user as any)?.role;
      console.log("User role:", userRole);

      // Redirect users to their respective dashboards based on role
      if (userRole === "recruiter") {
        router.push("/dashboard/recruiter");
      } else if (userRole === "jobseeker") {
        router.push("/dashboard/job-seeker");
      } else {
        // Fallback to posts page if role is not recognized
        router.push("/posts");
      }
    } else if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Redirecting...</h2>
        <p className="text-muted-foreground">Please wait while we redirect you to your dashboard.</p>
      </motion.div>
    </div>
  );
} 