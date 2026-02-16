# MacroNext folder structure

## `/app`
- **`layout.tsx`** — Root layout (Clerk, fonts, Header).
- **`page.tsx`** — Landing page.
- **`actions/`** — Server actions.
- **`(auth)/`** — Auth routes (login, register, etc.) and shared auth layout.
- **`admin/`** — Admin layout and `orders/` (stats, table).
- **`app/`** — Authenticated app: dashboard, plan, profile, orders.
- **`pricing/`** — Pricing page.

## `/components`
- **`ui/`** — Button, Card, Input, Label, MeshBackground, AuroraBackground.
- **`layout/`** — Header, AppPageBackground, Providers.
- **`landing/`** — LandingFeatures.
- **`dashboard/`** — MacroRings, MealsListCard, QuickAddSection.
- **`profile/`** — ProfileAvatar, ProfileForm.
- **`pricing/`** — PricingCard.
- **`auth/`** — AuthMagneticButton, SignOutButton, auth forms (login, register, forgot-password).

Import from barrel: `@/components/layout`, `@/components/dashboard`, etc.

## `/lib`
- **`auth.ts`** — `getAuth()` and auth helpers.
- **`db/`** — Prisma client. Import: `@/lib/db`.
- **`clerk/`** — Clerk appearance config. Import: `@/lib/clerk`.
- **`utils.ts`** — `cn()` and shared helpers.
- **`validations.ts`** — Zod schemas.
- **`meal-generator.ts`** — Meal generation.

## `/prisma`
- Schema and `seed.ts`.
