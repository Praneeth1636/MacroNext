"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { EmailCodeFactor } from "@clerk/types";
import Link from "next/link";
import {
  AuthCard,
  AuthCardHeader,
  AuthLogo,
  AuthTitle,
  AuthSubtitle,
  AuthSocialSection,
  AuthDivider,
  AuthForm,
  AuthFooter,
  AuthFooterLinks,
} from "./auth-card";
import { AuthButtonOutline } from "./auth-button";
import { AuthLabel } from "./auth-label";
import { AuthInput } from "./auth-input";
import { AuthButton } from "./auth-button";

const REDIRECT = "/app";

export function LoginForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [showEmailCode, setShowEmailCode] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<{ email?: string; password?: string; code?: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    if (!isLoaded) return;
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) return;
            router.push(REDIRECT);
          },
        });
        return;
      }
      if (signInAttempt.status === "needs_second_factor") {
        const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor): factor is EmailCodeFactor => factor.strategy === "email_code"
        );
        if (emailCodeFactor) {
          await signIn.prepareSecondFactor({
            strategy: "email_code",
            emailAddressId: emailCodeFactor.emailAddressId,
          });
          setShowEmailCode(true);
        }
      }
    } catch (err: unknown) {
      const e = err as { errors?: Array<{ message: string; meta?: { paramName?: string } }> };
      const list = e?.errors;
      if (list?.length) {
        const first = list[0];
        if (first.meta?.paramName === "identifier") setFieldErrors((prev) => ({ ...prev, email: first.message }));
        else if (first.meta?.paramName === "password") setFieldErrors((prev) => ({ ...prev, password: first.message }));
        else setError(first.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    if (!isLoaded) return;
    setLoading(true);
    try {
      const signInAttempt = await signIn!.attemptSecondFactor({
        strategy: "email_code",
        code,
      });
      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) return;
            router.push(REDIRECT);
          },
        });
      }
    } catch (err: unknown) {
      const e = err as { errors?: Array<{ message: string }> };
      const msg = e?.errors?.[0]?.message;
      setFieldErrors((prev) => ({ ...prev, code: msg ?? "Invalid code" }));
    } finally {
      setLoading(false);
    }
  };

  if (showEmailCode) {
    return (
      <AuthCard>
        <AuthCardHeader>
          <AuthLogo>MacroNext</AuthLogo>
          <AuthTitle>Verify your email</AuthTitle>
          <AuthSubtitle>A verification code has been sent to your email.</AuthSubtitle>
        </AuthCardHeader>
        <AuthForm onSubmit={handleEmailCode}>
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
          <AuthButton loading={loading}>Verify</AuthButton>
        </AuthForm>
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
        <AuthTitle>Sign in</AuthTitle>
        <AuthSubtitle>Welcome back</AuthSubtitle>
      </AuthCardHeader>
      <AuthSocialSection>
        <AuthButtonOutline
          type="button"
          onClick={() => signIn?.authenticateWithRedirect({ strategy: "oauth_google", redirectUrl: REDIRECT, redirectUrlComplete: REDIRECT })}
          disabled={!isLoaded}
        >
          <GoogleIcon className="h-4 w-4" />
          Continue with Google
        </AuthButtonOutline>
        <AuthButtonOutline
          type="button"
          onClick={() => signIn?.authenticateWithRedirect({ strategy: "oauth_github", redirectUrl: REDIRECT, redirectUrlComplete: REDIRECT })}
          disabled={!isLoaded}
        >
          <GitHubIcon className="h-4 w-4" />
          Continue with GitHub
        </AuthButtonOutline>
      </AuthSocialSection>
      <AuthDivider />
      <AuthForm onSubmit={handleSubmit}>
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
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
        <div>
          <div className="flex items-center justify-between">
            <AuthLabel htmlFor="password">Password</AuthLabel>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-[#6366f1] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <AuthInput
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={fieldErrors.password}
            required
          />
        </div>
        <AuthButton loading={loading}>Sign in</AuthButton>
      </AuthForm>
      <p className="mt-4 text-center text-sm text-[#64748b]">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-[#6366f1] hover:underline">
          Sign up
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

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}
