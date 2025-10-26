"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Mail, Lock, Loader2, Eye, EyeOff, Briefcase, User, GraduationCap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function JobSeekerLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, role, isLoading } = useAuth("jobseeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Pre-fill email from URL parameters
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    console.log("Job seeker login page - Auth status:", { isAuthenticated, role, isLoading });
    
    if (isAuthenticated && role === "jobseeker") {
      console.log("User is authenticated as jobseeker, redirecting to posts");
      router.push("/posts");
    }
  }, [isAuthenticated, role, router, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        role: "jobseeker",
        redirect: false,
      });
      if (res?.ok) {
        toast.success("Login successful! Redirecting to posts...");
        // Use window.location.href for a full page refresh to ensure session is loaded
        window.location.href = "/posts";
      } else {
        toast.error(res?.error || "Login failed. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log("Starting Google sign-in...");
      await signIn("google", {
        callbackUrl: "/dashboard/job-seeker",
        redirect: true,
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 pt-24">
      <div className="grid md:grid-cols-2 gap-0 max-w-4xl w-full bg-card shadow-2xl rounded-lg overflow-hidden border border-border">
        {/* Left Side: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to your ConnectFlow account to continue your job search.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                placeholder="Enter your email"
                  disabled={isSubmitting}
              />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors text-foreground"
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary bg-background border-border rounded focus:ring-primary"
                  disabled={isSubmitting}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full bg-secondary text-secondary-foreground font-semibold py-3 px-4 rounded-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            Don't have an account?{" "}
            <a href="/auth/jobseeker/register" className="font-medium text-primary hover:text-primary/80">
              Create one
            </a>
          </motion.div>
        </div>

        {/* Right Side: Feature Panel */}
        <div className="bg-gradient-to-br from-primary to-primary/80 p-8 md:p-12 flex flex-col justify-center rounded-r-lg md:rounded-r-lg rounded-l-lg md:rounded-l-none">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-primary-foreground">Find Your Dream Job</h2>
            <p className="text-primary-foreground/90 mb-8 text-sm leading-relaxed">
              Join ConnectFlow to access thousands of job opportunities and advance your career.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-primary-foreground/20 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">Job Search</h3>
                  <p className="text-primary-foreground/90 text-xs">Browse and apply to thousands of job listings from top companies.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-primary-foreground/20 p-2 rounded-full">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">Profile Visibility</h3>
                  <p className="text-primary-foreground/90 text-xs">Get noticed by recruiters and increase your chances of landing interviews.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-primary-foreground/20 p-2 rounded-full">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">Career Growth</h3>
                  <p className="text-primary-foreground/90 text-xs">Access resources and tools to advance your career and develop new skills.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function JobSeekerLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <JobSeekerLoginContent />
    </Suspense>
  );
} 
