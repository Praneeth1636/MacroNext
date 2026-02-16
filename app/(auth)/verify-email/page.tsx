import Link from "next/link";
import {
  AuthCard,
  AuthCardHeader,
  AuthLogo,
  AuthTitle,
  AuthSubtitle,
  AuthFooter,
  AuthFooterLinks,
} from "@/components/auth/auth-card";

export default function VerifyEmailPage() {
  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthLogo>MacroNext</AuthLogo>
        <AuthTitle>Check your email</AuthTitle>
        <AuthSubtitle>
          We sent you a verification link. Click it to verify your email and continue.
        </AuthSubtitle>
      </AuthCardHeader>
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
