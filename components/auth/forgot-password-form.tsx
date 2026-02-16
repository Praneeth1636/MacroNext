"use client";

import * as React from "react";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AuthCard,
  AuthCardHeader,
  AuthLogo,
  AuthTitle,
  AuthSubtitle,
  AuthForm,
  AuthFooter,
  AuthFooterLinks,
} from "./auth-card";
import { AuthLabel } from "./auth-label";
import { AuthInput } from "./auth-input";
import { AuthButton } from "./auth-button";

const REDIRECT = "/app";

export function ForgotPasswordForm() {
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<{ email?: string; code?: string; password?: string }>({});

  React.useEffect(() => {
    if (isLoaded && isSignedIn) router.push(REDIRECT);
  }, [isLoaded, isSignedIn, router]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    if (!isLoaded || !signIn) return;
    setLoading(true);
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSent(true);
    } catch (err: unknown) {
      const e = err as { errors?: Array<{ longMessage?: string; message?: string }> };
      const msg = e?.errors?.[0]?.longMessage ?? e?.errors?.[0]?.message;
      setFieldErrors((prev) => ({ ...prev, email: msg ?? "Something went wrong" }));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    if (!isLoaded || !signIn) return;
    setLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) return;
            router.push(REDIRECT);
          },
        });
      } else if (result.status === "needs_second_factor") {
        setError("Two-factor authentication is required. Please sign in from the login page.");
      }
    } catch (err: unknown) {
      const e = err as { errors?: Array<{ longMessage?: string; message?: string; meta?: { paramName?: string } }> };
      const first = e?.errors?.[0];
      const msg = first?.longMessage ?? first?.message;
      if (first?.meta?.paramName === "code") setFieldErrors((prev) => ({ ...prev, code: msg ?? "Invalid code" }));
      else if (first?.meta?.paramName === "password") setFieldErrors((prev) => ({ ...prev, password: msg ?? "Invalid password" }));
      else setError(msg ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <AuthCard>
        <div className="flex justify-center py-8">
          <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#0f172a] border-t-transparent" />
        </div>
      </AuthCard>
    );
  }

  if (sent) {
    return (
      <AuthCard>
        <AuthCardHeader>
          <AuthLogo>MacroNext</AuthLogo>
          <AuthTitle>Reset your password</AuthTitle>
          <AuthSubtitle>Enter the code we sent to your email and your new password.</AuthSubtitle>
        </AuthCardHeader>
        <AuthForm onSubmit={handleReset}>
          {error && (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          )}
          <div>
            <AuthLabel htmlFor="code">Verification code</AuthLabel>
            <AuthInput
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
              error={fieldErrors.code}
              required
            />
          </div>
          <div>
            <AuthLabel htmlFor="password">New password</AuthLabel>
            <AuthInput
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={fieldErrors.password}
              required
            />
          </div>
          <AuthButton loading={loading}>Reset password</AuthButton>
        </AuthForm>
        <p className="mt-4 text-center text-sm text-[#64748b]">
          <Link href="/login" className="font-medium text-[#6366f1] hover:underline">
            Back to sign in
          </Link>
        </p>
        <AuthFooter>
          By continuing, you agree to our{" "}
          <AuthFooterLinks href="/terms">Terms</AuthFooterLinks> and{" "}
          <AuthFooterLinks href="/privacy">Privacy</AuthFooterLinks>.
        </AuthFooter>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthLogo>MacroNext</AuthLogo>
        <AuthTitle>Forgot password?</AuthTitle>
        <AuthSubtitle>Enter your email and we&apos;ll send you a reset code.</AuthSubtitle>
      </AuthCardHeader>
      <AuthForm onSubmit={handleSendCode}>
        <div>
          <AuthLabel htmlFor="email">Email</AuthLabel>
          <AuthInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={fieldErrors.email}
            required
          />
        </div>
        <AuthButton loading={loading}>Send reset code</AuthButton>
      </AuthForm>
      <p className="mt-4 text-center text-sm text-[#64748b]">
        <Link href="/login" className="font-medium text-[#6366f1] hover:underline">
          Back to sign in
        </Link>
      </p>
      <AuthFooter>
        By continuing, you agree to our{" "}
        <AuthFooterLinks href="/terms">Terms</AuthFooterLinks> and{" "}
        <AuthFooterLinks href="/privacy">Privacy</AuthFooterLinks>.
      </AuthFooter>
    </AuthCard>
  );
}
