import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";
import { AppPageBackground } from "@/components/layout";

export default async function AppLayout({
  children,
}: { children: React.ReactNode }) {
  const authUser = await getAuth();
  if (!authUser) redirect("/login");

  return (
    <AppPageBackground>
      <main className="relative z-10 mx-auto max-w-4xl px-6 py-8">{children}</main>
    </AppPageBackground>
  );
}
