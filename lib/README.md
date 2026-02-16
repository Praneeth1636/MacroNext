# Lib structure

- **`auth.ts`** — Auth helpers (e.g. `getAuth()`).
- **`db/`** — Database: `prisma` client. Use `@/lib/db/prisma` or `@/lib/db`.
- **`clerk/`** — Clerk: `clerkAuthAppearance`. Use `@/lib/clerk/appearance` or `@/lib/clerk`.
- **`utils.ts`** — Shared utilities (e.g. `cn`).
- **`validations.ts`** — Zod schemas for forms.
- **`meal-generator.ts`** — Meal generation logic.
