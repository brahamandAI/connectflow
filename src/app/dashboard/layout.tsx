"use client";

import { ReactNode } from "react";
import InitializeData from "./recruiter/init-data";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <InitializeData />
      {children}
    </>
  );
} 