import { SignUp } from "@clerk/nextjs";
import { clerkAuthAppearance } from "@/lib/clerk";

export default function RegisterPage() {
  return (
    <SignUp
      appearance={clerkAuthAppearance}
      signInUrl="/login"
      afterSignUpUrl="/app"
    />
  );
}
