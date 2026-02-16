import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { ProfileForm, ProfileAvatar } from "@/components/profile";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authUser = await getAuth();
  if (!authUser?.userId) redirect("/login");

  const profile = await prisma.profile.findUnique({
    where: { userId: authUser.userId },
  });
  const { error } = await searchParams;

  return (
    <div className="space-y-8 animate-page-enter">
      <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#171717] font-display">Profile</h1>
      {error === "invalid" && (
        <p className="rounded-[10px] border border-[#dc2626]/30 bg-[#fef2f2] px-4 py-2 text-[14px] text-[#dc2626]">
          Please check your input. Address, city, state, and ZIP are required.
        </p>
      )}
      <ProfileAvatar name={authUser.name} email={authUser.email} />
      <ProfileForm profile={profile} />
    </div>
  );
}
