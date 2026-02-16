# MacroNext – Production-Ready MVP Architecture

## 1. Product Vision

MacroNext is a **daily macro-based meal ordering system**:

- Users define **protein + calories** for “tomorrow”
- The system **generates a compliant meal plan** from a catalog
- Users **confirm an order**
- Admin views **next-day production & delivery logistics**

This MVP focuses on:

- Clean auth experience
- Reliable data model
- Deterministic meal generation
- Operational visibility for kitchen/admin
- **Graceful degradation** if DB unavailable

---

## 2. Architecture Overview

| Layer | Stack |
|-------|--------|
| **Frontend** | Next.js 15 (App Router), React 18, TypeScript, TailwindCSS, Framer Motion |
| **Marketing** | Aurora-style pages, Clerk custom appearance for auth |
| **Backend** | Next.js Route Handlers + Server Actions, Prisma ORM 6, PostgreSQL (Neon or Docker) |
| **Validation** | Zod for form/input validation in server actions |
| **Auth** | Clerk (hosted, fully customized appearance), RBAC (USER / ADMIN), middleware route protection |

---

## 3. Auth System – Elevated Clerk Experience

**Philosophy:** Premium SaaS — subtle, calm, minimal distractions.

- **Background:** Full viewport; soft vertical gradient `#f8f7ff` → `#f0eeff` → `#ffffff`; 160° angled on large screens; no header.
- **Card:** Max width 420px, border-radius 20px, border `#e5e4eb`, soft neutral + slight purple shadow.
- **Typography:** Inter; title 24px semibold; subtitle 15px muted.
- **Inputs:** Height 48px, radius 12px, border-2; focus: purple ring `#6C47FF`, 200ms transition.
- **Primary button:** `#6C47FF`, white text, rounded-xl, hover darker, active scale(0.99).
- **Social buttons:** Border-2, rounded-xl, hover light purple tint.
- **Footer:** Terms & Privacy links in purple.

---

## 4. Authentication Logic

- **getAuth():** Uses Clerk `auth()` and `currentUser()`; upserts DB User by `clerkId`; assigns ADMIN if `email === admin@macronext.com`.
- **Fallback:** If Prisma throws (e.g. DB down), log error and return Clerk-only fallback user with same RBAC logic so auth never blocks UI and app shell still renders.

---

## 5. Database Model

**Enums:** Role, Goal, DietType, DeliveryWindow, Preference, OrderStatus.

**Core models:**

- **User** — clerkId, email, name, role; relations: 1 Profile, many MacroPlans, many Orders.
- **Profile** — goal, dietType, allergies[], address, deliveryWindow (meal filtering + admin logistics).
- **MacroPlan** — unique (userId, date); calories, protein, preference, mealsCount, notes.
- **Order** — per user per date; status, totals, generatedMeals (JSON).
- **MealCatalog** — static seed; name, tags[], calories, protein, carbs, fat.

---

## 6. Meal Generation Engine

**File:** `lib/meal-generator.ts`

- **Inputs:** targetCalories, targetProtein, mealsCount, dietType, allergies[].
- **Filtering:** Remove meals violating diet and allergy keywords; fallback gracefully if insufficient.
- **Selection:** Sort by protein density; assign one meal per slot; adjust servings 1–3; trim last meal if over calorie target.
- **Tolerances:** ±10g protein, ±150 kcal.
- **Output:** Array of `{ mealId, name, servings, calories, protein, carbs, fat }` — deterministic and debuggable.

---

## 7. App Layout (Logged-in)

- Dark theme; deep blue-gray background; white/10 borders.
- **Nav:** MacroNext, Dashboard, Profile, Plan, Orders; Admin (amber) if role ADMIN; right: email, Sign out.

---

## 8. Dashboard UX

- **Tomorrow’s Macros:** If plan exists → calories, protein, meals, preference, notes + Edit; else CTA “Set tomorrow’s plan.”
- **Tomorrow’s Order:** If order exists → status badge, totals, top 3 meals, “View all orders”; else CTA to plan.
- **DB down:** Amber card “Database not connected” with instructions (Neon or Docker + `db:push`).

---

## 9. Plan Flow

1. User fills macro form → `createTomorrowPlan` (Zod-validated) upserts plan.
2. Preview loads generated meals via `getTomorrowPlanPreview`.
3. User confirms → `generateOrderFromPlan` creates Order.
4. Server actions revalidate `/app`, `/app/plan`, `/app/orders`.

---

## 10. Orders (User)

- **List:** Last 20; date, status, macros, View.
- **Detail:** Status badge, macros, full meal breakdown.

---

## 11. Admin System

- **Layout:** Amber highlight; max-width 6xl; link back to App.
- **Orders:** Filter by date; table (Name, Address, Macros, Meals, Status dropdown); `adminUpdateOrderStatus()`; **CSV export** (Name, Email, Address, Calories, Protein, Meals, Status).

---

## 12. Design System

- **Cards:** rounded-2xl, border white/10, bg white/5, backdrop blur; hover: emerald glow; Framer Motion subtle scale on hover/tap.
- **Buttons:** default (emerald), outline, ghost; rounded-xl; focus ring emerald.
- **Landing:** Aurora background; feature cards with staggered reveal (Framer Motion).

---

## 13. Deployment

- **Local:** Docker Postgres (`db:docker`), `db:push`, `db:seed`.
- **Production:** Neon (or other Postgres), Vercel, Clerk production keys; set `DATABASE_URL` in env.

---

## 14. Why This Is Production-Ready

- Clear boundaries: auth, app, admin, meal engine.
- Auth UX is productized, not dev-default.
- Operational (admin) vs user layers separated.
- Resilience: DB down → graceful fallback and clear instructions.
- Validated inputs (Zod) and deterministic meal generation for reliability.
