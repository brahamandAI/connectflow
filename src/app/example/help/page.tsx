"use client";

import { motion } from "framer-motion";
import { 
  HelpCircle, 
  Search, 
  Mail, 
  Phone, 
  MessageSquare, 
  BookOpen,
  Users,
  FileText,
  Settings,
  Shield,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Getting Started",
      description: "Learn how to create an account and get started with RozgarHub",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Job Applications",
      description: "Everything you need to know about applying for jobs",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Account Settings",
      description: "Manage your profile, preferences, and account settings",
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy & Security",
      description: "Learn about our privacy practices and security measures",
      color: "bg-red-50 border-red-200"
    }
  ];

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top right corner of any page. You can choose to register as either a job seeker or employer. Fill in your details and verify your email address to complete the registration process."
        },
        {
          question: "What's the difference between job seeker and employer accounts?",
          answer: "Job seeker accounts allow you to browse jobs, apply for positions, and manage your applications. Employer accounts let you post job openings, browse candidates, and manage your hiring process."
        },
        {
          question: "Is RozgarHub free to use?",
          answer: "Yes, RozgarHub offers a free tier for both job seekers and employers. Job seekers can browse and apply for jobs for free. Employers can post up to 3 jobs for free. Premium features are available with paid plans."
        }
      ]
    },
    {
      category: "Job Applications",
      questions: [
        {
          question: "How do I apply for a job?",
          answer: "Browse jobs on our platform, click on a job that interests you, and click the 'Apply' button. You'll need to upload your resume or create one using our resume builder. Make sure your profile is complete before applying."
        },
        {
          question: "Can I track my job applications?",
          answer: "Yes! Once you're logged in, you can view all your applications in your dashboard. You'll see the status of each application and any updates from employers."
        },
        {
          question: "How do I know if an employer has viewed my application?",
          answer: "You'll receive notifications when employers view your application, schedule interviews, or provide updates. You can also check your application status in your dashboard."
        }
      ]
    },
    {
      category: "Resume Builder",
      questions: [
        {
          question: "How do I create a resume using RozgarHub?",
          answer: "Go to the Resume Builder section and choose a template. Fill in your personal information, work experience, education, and skills. You can preview and download your resume as a PDF."
        },
        {
          question: "Can I save multiple resumes?",
          answer: "Yes! You can create and save multiple resumes with different templates and content. This is useful for applying to different types of jobs or industries."
        },
        {
          question: "How do I download my resume?",
          answer: "In the Resume Builder, click the 'Download PDF' button to save your resume as a PDF file. You can also access your saved resumes from the 'My Resumes' section."
        }
      ]
    },
    {
      category: "For Employers",
      questions: [
        {
          question: "How do I post a job?",
          answer: "Log in to your employer account and click 'Post a Job' in your dashboard. Fill in the job details including title, description, requirements, and location. Review and publish your job posting."
        },
        {
          question: "How much does it cost to post a job?",
          answer: "You can post up to 3 jobs for free. For more job postings and advanced features, we offer Professional ($99/month) and Enterprise (custom pricing) plans."
        },
        {
          question: "How do I manage applications?",
          answer: "All applications for your job postings appear in your dashboard. You can view candidate profiles, download resumes, and communicate with applicants directly through our platform."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@rozgarhub.com",
      response: "Within 24 hours"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      response: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with support",
      contact: "Available on platform",
      response: "Real-time assistance"
    }
  ];

  const filteredFAQs = faqs.flatMap(category => 
    category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Help <span className="text-primary">Center</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Find answers to your questions and get the support you need.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for help articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Browse by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Find help articles organized by topic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${category.color} rounded-xl p-6 border hover:shadow-lg transition-shadow cursor-pointer`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Results or Popular FAQs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {searchQuery ? (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Search Results for "{searchQuery}"
                </h2>
                {filteredFAQs.length > 0 ? (
                  <div className="space-y-6">
                    {filteredFAQs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-background rounded-xl p-6 border"
                      >
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No results found
                    </h3>
                    <p className="text-muted-foreground">
                      Try searching with different keywords or browse our categories above.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-8">
                  {faqs.map((category, categoryIndex) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    >
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        {category.category}
                      </h3>
                      <div className="space-y-4">
                        {category.questions.map((faq, faqIndex) => (
                          <div key={faqIndex} className="bg-background rounded-xl p-6 border">
                            <h4 className="text-lg font-semibold text-foreground mb-3">
                              {faq.question}
                            </h4>
                            <p className="text-muted-foreground">
                              {faq.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Still Need Help?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our support team is here to help you get the most out of RozgarHub.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-muted/30 rounded-xl p-6 border text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {method.description}
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">
                      {method.contact}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Response: {method.response}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/example/contact">
                <Button size="lg" className="px-8">
                  Contact Support
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Quick Links
              </h2>
              <p className="text-lg text-muted-foreground">
                Access important resources and information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Privacy Policy", href: "/example/privacy", icon: <Shield className="w-5 h-5" /> },
                { title: "Terms of Service", href: "/example/terms", icon: <FileText className="w-5 h-5" /> },
                { title: "Contact Us", href: "/example/contact", icon: <Mail className="w-5 h-5" /> },
                { title: "About Us", href: "/example/about", icon: <Users className="w-5 h-5" /> },
                { title: "Resume Builder", href: "/resume-builder", icon: <FileText className="w-5 h-5" /> },
                { title: "Browse Jobs", href: "/jobs", icon: <BookOpen className="w-5 h-5" /> }
              ].map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={link.href}>
                    <div className="bg-background rounded-xl p-6 border hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          {link.icon}
                        </div>
                        <span className="font-medium text-foreground">
                          {link.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 