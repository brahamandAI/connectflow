"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  Database, 
  Globe,
  Calendar,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const lastUpdated = "December 15, 2024";

  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number)",
        "Professional information (resume, work history, skills)",
        "Account credentials and preferences",
        "Usage data and analytics",
        "Communication records"
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and improve our services",
        "To match you with relevant job opportunities",
        "To communicate with you about your account",
        "To send you relevant job alerts and updates",
        "To analyze and improve our platform"
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell your personal information",
        "We may share information with employers when you apply for jobs",
        "We use trusted third-party services for platform functionality",
        "We may disclose information if required by law",
        "We ensure all sharing complies with this privacy policy"
      ]
    },
    {
      title: "Data Security",
      content: [
        "We use industry-standard encryption to protect your data",
        "Regular security audits and updates",
        "Limited access to personal information",
        "Secure data storage and transmission",
        "Immediate notification of any security breaches"
      ]
    },
    {
      title: "Your Rights",
      content: [
        "Access and review your personal information",
        "Update or correct your information",
        "Delete your account and associated data",
        "Opt-out of marketing communications",
        "Request data portability"
      ]
    },
    {
      title: "Cookies and Tracking",
      content: [
        "We use cookies to improve your experience",
        "Essential cookies for platform functionality",
        "Analytics cookies to understand usage patterns",
        "Marketing cookies for relevant job recommendations",
        "You can control cookie preferences in your browser"
      ]
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
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Privacy <span className="text-primary">Policy</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                At ConnectFlow, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                job platform and related services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By using ConnectFlow, you agree to the collection and use of information in accordance with this policy. 
                If you have any questions about this Privacy Policy, please contact us at privacy@connectflow.co.in.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
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

      {/* Data Retention */}
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
                Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We retain your personal information for as long as necessary to provide our services and fulfill the 
                purposes outlined in this Privacy Policy. The retention period depends on the type of information and 
                the purpose for which it was collected.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-background rounded-lg p-6">
                  <h4 className="font-semibold text-foreground mb-3">Account Information</h4>
                  <p className="text-sm text-muted-foreground">
                    Retained until you delete your account or request deletion, plus 30 days for backup purposes.
                  </p>
                </div>
                <div className="bg-background rounded-lg p-6">
                  <h4 className="font-semibold text-foreground mb-3">Application Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Retained for 2 years after your last activity, then anonymized or deleted.
                  </p>
                </div>
                <div className="bg-background rounded-lg p-6">
                  <h4 className="font-semibold text-foreground mb-3">Analytics Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Retained for 3 years for platform improvement and analytics purposes.
                  </p>
                </div>
                <div className="bg-background rounded-lg p-6">
                  <h4 className="font-semibold text-foreground mb-3">Communication Records</h4>
                  <p className="text-sm text-muted-foreground">
                    Retained for 1 year after the last communication for customer support purposes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* International Transfers */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-background rounded-2xl p-8 border"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  International Data Transfers
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ConnectFlow operates globally and may transfer your information to countries other than your own. 
                We ensure that all international transfers comply with applicable data protection laws and 
                implement appropriate safeguards to protect your information.
              </p>
              <div className="bg-muted/30 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">Safeguards We Implement:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Standard Contractual Clauses (SCCs) for EU data transfers</li>
                  <li>• Adequacy decisions where applicable</li>
                  <li>• Encryption during transmission and storage</li>
                  <li>• Regular security assessments and audits</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Children's Privacy */}
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
                Children's Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                ConnectFlow is not intended for children under the age of 16. We do not knowingly collect personal 
                information from children under 16. If you are a parent or guardian and believe your child has 
                provided us with personal information, please contact us immediately. If we become aware that we 
                have collected personal information from a child under 16, we will take steps to delete such 
                information promptly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Changes to Policy */}
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
                Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for 
                other operational, legal, or regulatory reasons. We will notify you of any material changes by:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Posting the updated policy on our website</span>
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
              <p className="text-muted-foreground leading-relaxed mt-6">
                Your continued use of RozgarHub after any changes indicates your acceptance of the updated Privacy Policy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
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
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">privacy@connectflow.co.in</p>
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
                  <strong>Data Protection Officer:</strong> Sarah Johnson<br />
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