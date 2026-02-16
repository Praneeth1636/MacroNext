import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

export type AuthUser = {
  userId: string;
  email: string | null;
  name: string | null;
  role: string;
};

/** Get current auth from Clerk and sync our DB User. Returns null if not signed in. */
export async function getAuth(): Promise<AuthUser | null> {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.primaryEmailAddress?.emailAddress ?? null;
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;
  const isAdminEmail = email === "admin@macronext.com";

  try {
    const dbUser = await prisma.user.upsert({
      where: { clerkId: clerkUserId },
      create: {
        clerkId: clerkUserId,
        email: email ?? undefined,
        name: name ?? undefined,
        role: isAdminEmail ? "ADMIN" : "USER",
      },
      update: {
        email: email ?? undefined,
        name: name ?? undefined,
        ...(isAdminEmail ? { role: "ADMIN" as const } : {}),
      },
    });

    return {
      userId: dbUser.id,
      email: dbUser.email ?? null,
      name: dbUser.name ?? null,
      role: dbUser.role,
    };
  } catch (e) {
    // Database unreachable (e.g. Postgres not running): use Clerk data only so app doesn't crash
    console.error("Database unavailable in getAuth(), using Clerk-only fallback:", e);
    return {
      userId: clerkUserId,
      email,
      name,
      role: isAdminEmail ? "ADMIN" : "USER",
    };
  }
}
