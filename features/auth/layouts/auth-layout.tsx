import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="bg-slack-purple flex min-h-screen flex-col items-center justify-center">{children}</div>;
}
