"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Heart, 
  Shield, 
  Zap, 
  TrendingUp,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const stats = [
    { value: "50K+", label: "Active Job Seekers", icon: Users },
    { value: "1000+", label: "Companies Hiring", icon: Target },
    { value: "95%", label: "Success Rate", icon: Award },
    { value: "24hrs", label: "Avg. Response Time", icon: Zap }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "People First",
      description: "We believe in putting people at the center of everything we do, ensuring both job seekers and employers find meaningful connections."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Security",
      description: "Your data and privacy are our top priorities. We maintain the highest standards of security and transparency."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Connecting talent and opportunities across borders, cultures, and industries worldwide."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Innovation",
      description: "Continuously evolving our platform with cutting-edge technology to provide the best user experience."
    }
  ];


  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                About <span className="text-primary">ConnectFlow</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                We're on a mission to transform how people find meaningful work and how companies discover exceptional talent.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2023, ConnectFlow emerged from a simple observation: the traditional job market was broken. 
                Job seekers struggled to find opportunities that matched their skills and aspirations, while employers 
                faced challenges in discovering the right talent for their organizations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  The Problem We Solved
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Traditional job boards were cluttered, impersonal, and inefficient. Job seekers spent hours applying 
                  to positions with little feedback, while employers received hundreds of unqualified applications.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We saw an opportunity to create a platform that would streamline the hiring process, provide better 
                  matching through AI, and create meaningful connections between talent and opportunity.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Our Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ConnectFlow combines cutting-edge technology with human-centered design to create a platform that 
                  works for everyone. Our AI-powered matching system connects the right candidates with the right 
                  opportunities.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We've built tools for resume building, skill assessment, and direct communication, making the 
                  entire hiring process more efficient and effective for both job seekers and employers.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do at ConnectFlow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us in Transforming the Job Market
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're looking for your next opportunity or seeking exceptional talent, 
              we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                  Browse Jobs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/employers">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary">
                  For Employers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 