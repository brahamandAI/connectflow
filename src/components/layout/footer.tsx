import Link from "next/link";
import {
  BriefcaseBusiness,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "For Job Seekers",
      links: [
        { name: "Browse Jobs", href: "/jobs" },
        { name: "Browse Companies", href: "/companies" },
        { name: "Resume Builder", href: "/resume-builder" },
        { name: "Career Advice", href: "/example/career-advice" },
        { name: "Salary Calculator", href: "/example/salary-calculator" },
      ],
    },
    {
      title: "For Employers",
      links: [
        { name: "Post a Job", href: "/auth/recruiter/login" },
        { name: "Browse Candidates", href: "/auth/recruiter/login" },
        { name: "Find Jobs", href: "/auth/jobseeker/login" },
        { name: "Pricing Plans", href: "/example/pricing" },
        { name: "Recruiting Solutions", href: "/example/solutions" },
        { name: "Advertise with Us", href: "/example/advertise" },
      ],
    },
    {
      title: "Connectflow",
      links: [
        { name: "About Us", href: "/example/about" },
        { name: "Contact Us", href: "/example/contact" },
        { name: "Privacy Policy", href: "/example/privacy" },
        { name: "Terms of Service", href: "/example/terms" },
        { name: "Help Center", href: "/example/help" },
      ],
    },
  ];

  return (
    <footer className="bg-muted/40 border-t pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <BriefcaseBusiness className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Connectflow
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Connecting talented professionals with leading companies. Your career journey starts here.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="p-2.5 rounded-full bg-background hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-full bg-background hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-full bg-background hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-full bg-background hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-foreground text-lg">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Connectflow. All rights reserved.
          </p>
          <div className="flex items-center space-x-8">
            <Link href="/example/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/example/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/example/cookies" className="text-sm text-muted-foreground hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 