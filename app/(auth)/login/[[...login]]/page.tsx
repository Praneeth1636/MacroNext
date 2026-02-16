import { SignIn } from "@clerk/nextjs";
import { clerkAuthAppearance } from "@/lib/clerk";

export default function LoginPage() {
  return (
    <SignIn
      appearance={clerkAuthAppearance}
      signUpUrl="/register"
      afterSignInUrl="/app"
    />
  );
}
