"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConvexError } from "convex/values";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { AuthButtons } from "@/features/auth/components/auth-buttons";
import { PasswordAuthFlow } from "@/features/auth/types";
import { SignInFormData, signInSchema } from "@/features/auth/validators";

export function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuthActions();
  const flow: PasswordAuthFlow = "signIn";

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (formData: SignInFormData) => {
    startTransition(async () => {
      try {
        const { email, password } = formData;
        await signIn("password", { email, password, flow });
        // Reset the form after successful sign-in to clear the input fields
        form.reset();
        toast.success("Signed in successfully");
      } catch (error) {
        let errorMessage: string;
        if (error instanceof ConvexError && error.data === "INVALID_PASSWORD") {
          errorMessage = "Invalid password - check the requirements and try again.";
        } else {
          errorMessage = "Failed to sign in. Please check your credentials and try again.";
        }

        toast.error(errorMessage);
      }
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email address"
                    autoComplete="off"
                    disabled={isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link href="/forgot-password" className="text-sm font-medium text-sky-700 hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      autoComplete="off"
                      disabled={isPending}
                    />
                    <InputGroupAddon align="inline-end">
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="text-muted-foreground hover:text-foreground cursor-pointer hover:bg-transparent focus:outline-none"
                      >
                        {showPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Field orientation="responsive">
          <Button type="submit" form="sign-in-form" disabled={isPending}>
            {isPending && <Spinner data-icon="inline-start" />}
            {isPending ? "Signing In..." : "Sign In"}
          </Button>

          <div className="flex w-full items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-sm uppercase">or continue with</span>
            <Separator className="flex-1" />
          </div>

          <AuthButtons isPending={isPending} />
        </Field>

        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium text-sky-700 hover:underline">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
