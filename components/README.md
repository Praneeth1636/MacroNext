# Components structure

- **`ui/`** — Primitives: Button, Card, Input, Label, MeshBackground, AuroraBackground. Use `@/components/ui` or `@/components/ui/button` etc.
- **`layout/`** — App-wide layout: Header, AppPageBackground, Providers. Use `@/components/layout`.
- **`landing/`** — Landing page: LandingFeatures. Use `@/components/landing`.
- **`dashboard/`** — Dashboard: MacroRings, MealsListCard, QuickAddSection. Use `@/components/dashboard`.
- **`profile/`** — Profile: ProfileAvatar, ProfileForm. Use `@/components/profile`.
- **`pricing/`** — Pricing: PricingCard. Use `@/components/pricing`.
- **`auth/`** — Auth: AuthMagneticButton, SignOutButton, plus auth forms (login, register, forgot-password). Use `@/components/auth`.

Each folder has an `index.ts` that re-exports public components for clean imports.
