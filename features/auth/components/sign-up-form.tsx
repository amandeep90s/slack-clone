import { useState } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <Card className="w-full md:w-lg">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription className="text-muted-foreground">Create a new account</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <form id="sign-up-form"></form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
