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
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { AuthButtons } from "@/features/auth/components/auth-buttons";
import { PasswordAuthFlow } from "@/features/auth/types";
import { SignUpFormData, signUpSchema } from "@/features/auth/validators";

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { signIn } = useAuthActions();
  const flow: PasswordAuthFlow = "signUp";

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (formData: SignUpFormData) => {
    startTransition(async () => {
      try {
        const { name, email, password } = formData;
        await signIn("password", { name, email, password, flow });
        // Reset the form after successful sign-up to clear the input fields
        form.reset();
        toast.success("Account created successfully");
      } catch (error) {
        let errorMessage: string;
        if (error instanceof ConvexError && error.data === "INVALID_PASSWORD") {
          errorMessage = "Invalid password - check the requirements and try again.";
        } else {
          errorMessage = "Failed to create account. Please check your details and try again.";
        }

        toast.error(errorMessage);
      }
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-up-form" className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your name"
                    autoComplete="off"
                    disabled={isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

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
                  <FieldLabel htmlFor="password">Password</FieldLabel>
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
                  <FieldDescription className="text-xs">
                    Use uppercase, lowercase, number, and special characters.
                  </FieldDescription>
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm your password"
                      autoComplete="off"
                      disabled={isPending}
                    />
                    <InputGroupAddon align="inline-end">
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        className="text-muted-foreground hover:text-foreground cursor-pointer hover:bg-transparent focus:outline-none"
                      >
                        {showConfirmPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
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
          <Button type="submit" form="sign-up-form" disabled={isPending}>
            {isPending && <Spinner data-icon="inline-start" />}
            {isPending ? "Signing Up..." : "Sign Up"}
          </Button>

          <div className="flex w-full items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-sm uppercase">or continue with</span>
            <Separator className="flex-1" />
          </div>

          <AuthButtons isPending={isPending} />
        </Field>

        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-sky-700 hover:underline">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
