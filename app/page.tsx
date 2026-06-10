"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/web/theme-toggle";

export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <div>
      Slack Clone
      <ThemeToggle />
      <Button onClick={() => signOut().then(() => router.push("/sign-in"))}>Sign Out</Button>
    </div>
  );
}
