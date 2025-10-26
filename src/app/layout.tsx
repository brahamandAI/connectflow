import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import FooterWrapper from "@/components/layout/footer-wrapper";
import Providers from "./providers";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Connectflow - Find Your Dream Job",
  description: "A modern job portal to connect job seekers with employers",
  keywords: ["jobs", "career", "employment", "recruitment", "hiring", "job portal"],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen bg-gradient-to-b from-background to-background/95`}
      >
        <Providers>
          <NotificationProvider>
            <div className="flex flex-col min-h-screen relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
              <Navbar />
              <main className="flex-grow relative z-10">
                {children}
              </main>
              <FooterWrapper />
            </div>
            <Toaster position="top-right" />
          </NotificationProvider>
        </Providers>
      </body>
    </html>
  );
}
