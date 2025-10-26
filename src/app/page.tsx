"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Search, BriefcaseBusiness, Users, Building, TrendingUp, ArrowRight, MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/job/JobCard";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock data for featured jobs
const featuredJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "New York, NY (Remote)",
    salary: "$120K - $150K",
    type: "Full-time",
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    tags: ["React", "TypeScript", "Next.js"],
    isFeatured: true,
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Design Masters",
    location: "San Francisco, CA",
    salary: "$90K - $120K",
    type: "Full-time",
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    tags: ["Figma", "UI/UX", "User Research"],
    isFeatured: true,
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "Cloud Systems",
    location: "Remote",
    salary: "$130K - $160K",
    type: "Contract",
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    tags: ["AWS", "Kubernetes", "Docker", "CI/CD"],
    isFeatured: false,
  },
];

// Mock popular companies
const popularCompanies = [
  {
    id: "1",
    name: "Google",
    logo: "/placeholder.svg",
    industry: "Technology",
    jobCount: 23,
  },
  {
    id: "2",
    name: "Amazon",
    logo: "/placeholder.svg",
    industry: "E-commerce",
    jobCount: 45,
  },
  {
    id: "3",
    name: "Microsoft",
    logo: "/placeholder.svg",
    industry: "Technology",
    jobCount: 18,
  },
  {
    id: "4",
    name: "Apple",
    logo: "/placeholder.svg",
    industry: "Technology",
    jobCount: 12,
  },
];

// Stats
const stats = [
  { icon: BriefcaseBusiness, label: "Active Jobs", value: "12K+" },
  { icon: Users, label: "Job Seekers", value: "8M+" },
  { icon: Building, label: "Companies", value: "25K+" },
  { icon: TrendingUp, label: "Successful Hires", value: "1M+" },
];

// How it works steps
const howItWorks = [
  {
    step: 1,
    title: "Create an Account",
    description:
      "Sign up in minutes and complete your professional profile.",
  },
  {
    step: 2,
    title: "Discover Opportunities",
    description:
      "Browse and search for jobs that match your skills and interests.",
  },
  {
    step: 3,
    title: "Apply with Ease",
    description:
      "Apply to jobs with one click and track your application status.",
  },
];

// Job roles for the typewriter effect
const jobRoles = [
  "Dream",
  "Tech",
  "Software",
  "Data Science", 
  "DevOps",
  "Cloud",
  "Web Dev",
  "Marketing",
  "Healthcare",
  "Engineering",
  "Remote",
  "Freelance"
];

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const howItWorksRef = useRef(null);
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 });

  const companiesRef = useRef(null);
  const companiesInView = useInView(companiesRef, { once: true, amount: 0.3 });

  // Check if user is authenticated
  const isAuthenticated = status === "authenticated";
  const userRole = (session?.user as any)?.role;
  const userName = (session?.user as any)?.name || (session?.user as any)?.email?.split('@')[0] || "User";

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/dashboard/job-seeker",
        redirect: true,
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleEmailLogin = () => {
    router.push("/auth/jobseeker/login?email=udayznanam@gmail.com");
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-background">
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center min-h-[80vh]">
            {/* Left Section - Text and Login Options */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center space-y-8"
            >
              {/* Main Heading */}
              <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-outfit leading-tight">
                <div>
                    Find your{" "}
                  <span className="relative inline-block">
                    <TypewriterText 
                      words={jobRoles} 
                      delayBetweenWords={2500} 
                      className="inline-block font-bold"
                    />
                  </span>
                </div>
                <div>
                    job and build your career
                  </div>
                </h1>
              </div>

              {/* Login/Signup Options or Dashboard Button */}
              {isAuthenticated ? (
                // Show Dashboard button for logged-in users
                <div className="space-y-4 w-full max-w-md">
                  <Link 
                    href={userRole === "recruiter" ? "/dashboard/recruiter" : "/dashboard/job-seeker"}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-lg flex items-center justify-center transition-colors duration-200 shadow-lg"
                  >
                    <BriefcaseBusiness className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Link>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Welcome back, <span className="font-semibold text-foreground">{userName}</span>!
                    </p>
                  </div>
                </div>
              ) : (
                // Show Login options for non-authenticated users
                <div className="space-y-4 w-full max-w-md">
                  {/* Continue with Google */}
                  <button 
                    onClick={handleGoogleSignIn}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-colors duration-200"
                  >
                    <div className="w-5 h-5 bg-primary-foreground rounded flex items-center justify-center">
                      <span className="text-primary font-bold text-xs">G</span>
                    </div>
                    <span>Continue with Google</span>
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-background text-muted-foreground">or</span>
                    </div>
                  </div>

                  {/* Email Login */}
                  <Link 
                    href="/auth/jobseeker/login"
                    className="w-full bg-card border-2 border-border hover:border-primary/50 text-card-foreground font-medium py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Sign in with Email</span>
                  </Link>
                </div>
              )}

              {/* Legal Text and Join Link - Only show for non-authenticated users */}
              {!isAuthenticated && (
                <>
                  {/* Legal Text */}
                  <p className="text-sm text-muted-foreground max-w-md">
                    By clicking Continue to join or sign in, you agree to ConnectFlow's{" "}
                    <Link href="/example/terms" className="text-primary hover:underline">User Agreement</Link>,{" "}
                    <Link href="/example/privacy" className="text-primary hover:underline">Privacy Policy</Link>, and{" "}
                    <Link href="/example/privacy" className="text-primary hover:underline">Cookie Policy</Link>.
                  </p>

                  {/* Join Now Link */}
                  <div className="text-foreground">
                    New to ConnectFlow?{" "}
                    <Link href="/auth/register" className="text-primary hover:underline font-medium">
                      Join now
                    </Link>
                  </div>
                </>
              )}
            </motion.div>

            {/* Right Section - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-4xl mx-auto">
                <Image 
                  src="/homepage.png" 
                  alt="Professional workspace illustration - Find your dream job" 
                  width={1400}
                  height={900}
                  priority
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUpVariants}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                custom={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative p-6 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 shadow-soft">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        ref={howItWorksRef}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              How ConnectFlow Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your path to career success made simple
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                custom={index}
                initial="hidden"
                animate={howItWorksInView ? "visible" : "hidden"}
                variants={fadeInUpVariants}
                className="bg-card rounded-2xl p-8 border relative"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
                {index < howItWorks.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-5 top-1/2 transform -translate-y-1/2 text-primary/40 w-8 h-8" />
                )}
              </motion.div>
            ))}
          </div>


        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Featured Jobs
              </h2>
              <p className="mt-2 text-muted-foreground">
                Discover opportunities from top employers
              </p>
            </div>
            <Link 
              href="/jobs" 
              className="mt-4 md:mt-0 inline-flex items-center text-primary hover:underline font-medium"
            >
              View all jobs
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Companies Section */}
      <section 
        ref={companiesRef}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Popular Companies
              </h2>
              <p className="mt-2 text-muted-foreground">
                Top employers hiring on our platform
              </p>
            </div>
            <Link 
              href="/companies" 
              className="mt-4 md:mt-0 inline-flex items-center text-primary hover:underline font-medium"
            >
              Browse all companies
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                custom={index}
                initial="hidden"
                animate={companiesInView ? "visible" : "hidden"}
                variants={fadeInUpVariants}
                className="bg-card rounded-2xl border p-6 hover:shadow-lg transition-shadow"
              >
                <Link href={`/companies/${company.id}`} className="block">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      {/* TODO: Replace with actual logo */}
                      <Building className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {company.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {company.industry}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center text-sm text-muted-foreground">
                      <BriefcaseBusiness className="mr-1 h-4 w-4" />
                      {company.jobCount} jobs
                    </span>
                    <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      View
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary rounded-3xl overflow-hidden">
            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="absolute inset-0 opacity-10">
                <svg
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <pattern 
                      id="grid" 
                      width="8" 
                      height="8" 
                      patternUnits="userSpaceOnUse"
                    >
                      <path 
                        d="M 8 0 L 0 0 0 8" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <div className="inline-block rounded-full bg-primary-foreground px-4 py-1.5 text-sm font-medium text-primary mb-6">
                  <span className="flex items-center">
                    <Award className="mr-1.5 h-4 w-4" />
                    For Employers
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                  Ready to Hire Top Talent for Your Team?
                </h2>
                
                <p className="text-lg text-primary-foreground/90 mb-8">
                  Post jobs, review applications, and connect with qualified candidates all in one place.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/recruiter/register">
                    <Button 
                      size="xl" 
                      variant="glassy" 
                      className="w-full sm:w-auto"
                    >
                      Post a Job
                    </Button>
                  </Link>
                  <Link href="/example/pricing">
                    <Button 
                      size="xl" 
                      variant="outline" 
                      className="w-full sm:w-auto bg-transparent border-white/20 text-white hover:bg-white/10"
                    >
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
    </div>
      </section>
    </>
  );
}