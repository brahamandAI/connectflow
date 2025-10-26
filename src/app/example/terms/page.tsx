"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Shield, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "December 15, 2024";

  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using ConnectFlow, you accept and agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, please do not use our platform.",
        "We reserve the right to modify these terms at any time with notice to users.",
        "Continued use of the platform after changes constitutes acceptance of the new terms."
      ]
    },
    {
      title: "User Accounts",
      content: [
        "You must be at least 16 years old to create an account.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must provide accurate and complete information when creating your account.",
        "You are responsible for all activities that occur under your account.",
        "You must notify us immediately of any unauthorized use of your account."
      ]
    },
    {
      title: "User Conduct",
      content: [
        "You agree to use the platform only for lawful purposes.",
        "You must not post false, misleading, or fraudulent information.",
        "You must not harass, abuse, or harm other users.",
        "You must not attempt to gain unauthorized access to our systems.",
        "You must not use the platform to distribute spam or malware."
      ]
    },
    {
      title: "Job Postings and Applications",
      content: [
        "Employers must post accurate and legitimate job opportunities.",
        "Job seekers must provide truthful information in their applications.",
        "We do not guarantee job placement or hiring outcomes.",
        "We reserve the right to remove job postings that violate our policies.",
        "All communications between users are the responsibility of the parties involved."
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        "ConnectFlow owns all intellectual property rights in the platform.",
        "Users retain ownership of content they submit to the platform.",
        "By submitting content, you grant us a license to use it for platform purposes.",
        "You must not use our trademarks or branding without permission.",
        "We respect intellectual property rights and expect users to do the same."
      ]
    },
    {
      title: "Privacy and Data",
      content: [
        "Your privacy is important to us. Please review our Privacy Policy.",
        "We collect and process data as described in our Privacy Policy.",
        "You consent to our data practices by using the platform.",
        "We implement appropriate security measures to protect your data.",
        "You have rights regarding your personal data as outlined in our Privacy Policy."
      ]
    }
  ];

  const prohibitedActivities = [
    "Posting fake or misleading job opportunities",
    "Creating multiple accounts for fraudulent purposes",
    "Attempting to reverse engineer our platform",
    "Using automated tools to scrape our data",
    "Sharing account credentials with others",
    "Posting discriminatory or illegal content",
    "Attempting to manipulate our search algorithms",
    "Using the platform for commercial purposes without authorization"
  ];

  const terminationReasons = [
    "Violation of these Terms of Service",
    "Fraudulent or illegal activities",
    "Harassment or abuse of other users",
    "Repeated posting of inappropriate content",
    "Attempting to circumvent platform restrictions",
    "Non-payment of applicable fees (for premium services)",
    "Extended periods of account inactivity"
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
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Terms of <span className="text-primary">Service</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Please read these terms carefully before using ConnectFlow.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-muted/30 rounded-2xl p-8 border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of ConnectFlow, our job platform and related services. 
                By using ConnectFlow, you agree to these terms and our Privacy Policy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                These terms apply to all users of the platform, including job seekers, employers, and visitors. 
                If you have any questions about these terms, please contact us at legal@connectflow.co.in.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Terms Sections */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background rounded-2xl p-8 border mb-8"
              >
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prohibited Activities */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-red-50 border border-red-200 rounded-2xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-foreground">
                  Prohibited Activities
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The following activities are strictly prohibited on ConnectFlow. Violation of these rules may result 
                in account suspension or termination.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prohibitedActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm">{activity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Account Termination */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-background rounded-2xl p-8 border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Account Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We reserve the right to suspend or terminate your account at any time for the following reasons:
              </p>
              <div className="space-y-3 mb-6">
                {terminationReasons.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{reason}</span>
                  </div>
                ))}
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">Effect of Termination</h4>
                <p className="text-sm text-muted-foreground">
                  Upon termination, your access to the platform will be immediately revoked. We may retain certain 
                  information as required by law or for legitimate business purposes, as outlined in our Privacy Policy.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Disclaimers and Limitations */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-muted/30 rounded-2xl p-8 border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Disclaimers and Limitations
              </h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Service Availability</h4>
                  <p className="text-muted-foreground">
                    We strive to maintain high availability but do not guarantee uninterrupted access to the platform. 
                    We may temporarily suspend services for maintenance or updates.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Job Placement</h4>
                  <p className="text-muted-foreground">
                    We do not guarantee job placement or hiring outcomes. The platform facilitates connections between 
                    job seekers and employers, but hiring decisions are made by employers.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Third-Party Content</h4>
                  <p className="text-muted-foreground">
                    We are not responsible for content posted by users or third parties. We do not endorse or verify 
                    the accuracy of user-generated content.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Limitation of Liability</h4>
                  <p className="text-muted-foreground">
                    To the maximum extent permitted by law, ConnectFlow shall not be liable for any indirect, incidental, 
                    special, consequential, or punitive damages arising from your use of the platform.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Governing Law */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-background rounded-2xl p-8 border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Governing Law and Disputes
              </h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Governing Law</h4>
                  <p className="text-muted-foreground">
                    These terms are governed by the laws of the State of California, United States, without regard 
                    to conflict of law principles.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Dispute Resolution</h4>
                  <p className="text-muted-foreground">
                    Any disputes arising from these terms or your use of the platform shall be resolved through 
                    binding arbitration in accordance with the rules of the American Arbitration Association.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Class Action Waiver</h4>
                  <p className="text-muted-foreground">
                    You agree to resolve disputes individually and waive any right to participate in class action 
                    lawsuits or class-wide arbitration.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Changes to Terms */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-muted/30 rounded-2xl p-8 border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Changes to These Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update these Terms of Service from time to time to reflect changes in our services, 
                legal requirements, or business practices. We will notify you of any material changes by:
              </p>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Posting the updated terms on our website</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Sending you an email notification</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Displaying a notice on our platform</span>
                </li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">Your Continued Use</h4>
                <p className="text-sm text-muted-foreground">
                  Your continued use of ConnectFlow after any changes to these terms indicates your acceptance 
                  of the updated Terms of Service. If you do not agree to the changes, you should stop using 
                  the platform and contact us to delete your account.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-primary/10 rounded-2xl p-8 border border-primary/20"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">legal@connectflow.co.in</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Legal Department:</strong> ConnectFlow Inc.<br />
                  <strong>Address:</strong> 123 Innovation Drive, Tech City, TC 12345, United States
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
} 