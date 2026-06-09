"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { AuthButtons } from "@/features/auth/components/auth-buttons";
import { SignUpFormData, signUpSchema } from "@/features/auth/validators";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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

  const isPending = false; // Replace with actual pending state from your authentication logic

  const onSubmit = (data: SignUpFormData) => {
    // Handle form submission, e.g., call your sign-up API
    console.log("Form Data:", data);
  };

  return (
    <Card className="w-full max-w-lg">
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

          <Separator />

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
