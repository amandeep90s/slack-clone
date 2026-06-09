import { useAuthActions } from "@convex-dev/auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { AuthProvider } from "@/features/auth/types";

interface AuthButtonsProps {
  isPending: boolean;
}

export function AuthButtons({ isPending = false }: AuthButtonsProps) {
  const { signIn } = useAuthActions();

  const onAuthProviderSignIn = (provider: AuthProvider) => {
    signIn(provider);
  };

  return (
    <>
      <Button type="button" variant="outline" onClick={() => void onAuthProviderSignIn("google")} disabled={isPending}>
        <FcGoogle className="size-5" />
        Continue with Google
      </Button>

      <Button type="button" variant="outline" onClick={() => void onAuthProviderSignIn("github")} disabled={isPending}>
        <FaGithub className="size-5" />
        Continue with Github
      </Button>
    </>
  );
}
