"use client";

import { useAuthActions } from "@convex-dev/auth/react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/web/theme-toggle";

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <div>
      Slack Clone
      <ThemeToggle />
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}
