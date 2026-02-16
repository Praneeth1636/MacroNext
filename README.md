# MacroNext

MVP: Set tomorrow's macros → get a generated meal plan → confirm order. Admin views orders and can export CSV.

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for the production-ready MVP architecture spec (auth UX, resilience, meal engine, design system).

## Tech stack

- **Next.js** (App Router) + TypeScript
- **TailwindCSS** + Aceternity-style UI (animated hero, cards, buttons)
- **Clerk** — sign-in, sign-up, sessions
- **PostgreSQL** + **Prisma** (works with Neon or Supabase)
- Deploy: **Vercel**

## Run locally

1. **Clone and install**

   ```bash
   cd MacroNext
   npm install
   ```

2. **Environment**

   Prisma and Next.js read from **`.env`** (not `.env.local`). Create it:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and set:

   - `DATABASE_URL` — PostgreSQL connection string (Neon, Supabase, or local Postgres)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` — from [Clerk Dashboard](https://dashboard.clerk.com) (create an application, then API Keys)

3. **Database**

   **Option A — No Docker (recommended):** Use free [Neon](https://neon.tech) Postgres:

   - Go to [neon.tech](https://neon.tech), sign up, create a project.
   - Copy the connection string (e.g. `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`).
   - In `.env` or `.env.local`, set `DATABASE_URL` to that string.

   **Option B — Docker:** Run `npm run db:docker` then use the same `DATABASE_URL` as in `.env.example`.

   Then run:

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

   Seed creates 12 meals in `MealCatalog`. To get admin access, sign up in Clerk with email `admin@macronext.com`; that user will have the ADMIN role.

4. **Dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing (hero, features, CTA) |
| `/pricing` | Simple pricing |
| `/login`, `/register` | Clerk auth (sign-in, sign-up) |
| `/app` | Dashboard (tomorrow macros + order) |
| `/app/profile` | Profile (goal, diet, allergies, address, delivery window) |
| `/app/plan` | Set tomorrow’s plan + preview + confirm order |
| `/app/orders` | User orders list |
| `/app/orders/[id]` | Order detail |
| `/admin/orders?date=YYYY-MM-DD` | Admin: orders for date, status dropdown, Export CSV |

## Flow

1. User signs up / logs in.
2. User completes **Profile** (goal, diet, allergies, address, delivery window).
3. User goes to **Plan**, sets protein, calories, preference, meals count, notes → Save plan.
4. Preview shows generated meals and totals → **Confirm order** creates an Order (status = PLACED).
5. **Dashboard** shows tomorrow’s macros and order status.
6. **Admin** (role = ADMIN) opens `/admin/orders`, filters by date (default tomorrow), updates status, exports CSV.

## Deliverables

- Full working codebase: pages, components, Prisma schema, seed, and the instructions above to run locally.
