import React from "react";

import { LogoLight } from "@/components/web/logo-light";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-slack-purple flex min-h-screen min-w-screen flex-col items-center justify-center gap-4">
      <LogoLight />
      {children}
    </div>
  );
}
