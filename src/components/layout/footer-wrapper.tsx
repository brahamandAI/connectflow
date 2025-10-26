"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";
import { useEffect, useState } from "react";

export default function FooterWrapper() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until after hydration
  if (!mounted) {
    return null;
  }

  // Only render Footer on the homepage
  if (pathname === "/") {
    return <Footer />;
  }
  
  return null;
} 