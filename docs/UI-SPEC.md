# MacroNext – UI spec (every detail)

Exact values for colours, sizes, spacing, shadows, and motion so the UI can be replicated or extended.

---

## 1. CSS variables (globals)

All in `:root`; use as `hsl(var(--name))` or with opacity `hsl(var(--name) / 0.5)`.

| Variable | HSL value | Usage |
|----------|-----------|--------|
| `--background` | `224 45% 6%` | Page background (very dark blue‑gray) |
| `--foreground` | `210 25% 96%` | Primary text |
| `--border` | `220 25% 14%` | Default borders |
| `--primary` | `160 84% 39%` | Emerald (buttons, accents) |
| `--primary-foreground` | `0 0% 100%` | Text on primary (white) |
| `--muted` | `220 25% 12%` | Muted surfaces |
| `--muted-foreground` | `215 20% 58%` | Secondary text |
| `--accent` | `220 25% 14%` | Accent surfaces |
| `--accent-foreground` | `210 25% 96%` | Text on accent |
| `--card` | `220 30% 9%` | Card background |
| `--card-foreground` | `210 25% 96%` | Text on cards |
| `--elevated` | `220 28% 11%` | Hover/raised surface |
| `--glow` | `160 84% 39%` | Same as primary; used in shadow |
| `--radius` | `0.75rem` (12px) | Default radius |
| `--radius-lg` | `1rem` (16px) | Large radius |
| `--radius-xl` | `1.25rem` (20px) | XL radius |

**Body:** `font-feature-settings: "ss01", "ss02", "cv01", "cv02"` (OpenType for DM Sans).

---

## 2. Typography

| Role | Font stack | Size / weight | Where |
|------|------------|----------------|--------|
| Display (headings, logo) | `var(--font-sora)`, system-ui, sans-serif | — | `font-display` |
| Body | `var(--font-dm-sans)`, system-ui, sans-serif | — | `font-sans` (default) |

**Tailwind:**  
- `font-display` → Sora  
- `font-sans` → DM Sans  

**Sizes used:**
- Hero title: `text-5xl` (3rem) → `md:text-6xl` (3.75rem) → `lg:text-7xl` (4.5rem), `font-bold`, `tracking-tight`
- Page title (Dashboard, Profile, etc.): `text-3xl` (1.875rem), `font-display`, `font-bold`, `tracking-tight`
- Card title: `text-xl` (1.25rem), `font-display`, `font-semibold`, `tracking-tight`
- Card title (smaller, e.g. feature cards): `text-lg` (1.125rem), `font-display`
- Subtitle / description: `text-sm` (0.875rem), `text-muted-foreground`
- Body (landing tagline): `text-lg` → `md:text-xl`, `text-muted-foreground`
- Pricing price: `text-4xl` (2.25rem), `font-display`, `font-bold`; suffix `text-lg`, `font-normal`, `text-muted-foreground`
- Button default: `text-sm`; button lg: `text-base`
- Nav links: `text-sm`, `font-medium`
- Label: `text-sm`, `font-medium`, `text-muted-foreground`
- Footer: `text-sm`, `text-muted-foreground`

---

## 3. Buttons

**Base:**  
- `rounded-xl` (12px)  
- `font-medium`  
- `transition-all duration-200`  
- Focus: `focus:ring-2 focus:ring-emerald-500/60 focus:ring-offset-2 focus:ring-offset-[hsl(var(--background))]`  
- Disabled: `opacity-50`, no pointer events  

**Sizes:**

| Size | Padding | Text |
|------|---------|------|
| `sm` | `px-4 py-2` (16px 8px) | `text-xs` |
| `default` | `px-6 py-3` (24px 12px) | `text-sm` |
| `lg` | `px-8 py-4` (32px 16px) | `text-base` |

**Variants:**

| Variant | Background | Text | Border | Hover | Active |
|---------|------------|------|--------|--------|--------|
| default | `bg-emerald-500` | `text-white` | — | `bg-emerald-400`, `shadow-glow` | `scale-[0.98]` |
| default shadow | — | — | — | — | Uses `shadow-glow-sm` by default |
| outline | transparent | `text-emerald-400` | `border border-emerald-500/40` | `bg-emerald-500/10`, `border-emerald-500/60` | — |
| ghost | — | `text-muted-foreground` | — | `bg-white/5`, `text-white` | — |

---

## 4. Cards

**Base (all cards):**
- `rounded-2xl` (16px)
- `border border-white/[0.06]`
- `bg-card` (CSS variable)
- `p-6` (24px)
- `shadow-card`
- `backdrop-blur-sm`
- `transition-all duration-300`

**With `hover`:**
- Hover: `border-emerald-500/20`, `bg-elevated`, `shadow-elevated`, `shadow-emerald-500/5`
- Motion: `scale(1.01)`, `y: -2` on hover; `scale(0.995)` on tap; `duration: 0.2`

**With `gradient`:**
- Adds `.gradient-border`: 1px gradient border (inset -1px), radius `var(--radius-lg)` (16px).
- Gradient: `linear-gradient(135deg, hsl(160 84% 45%), hsl(200 90% 50%), hsl(270 70% 55%))`, opacity 0.6.

**Card subcomponents:**
- **CardHeader:** `mb-4` (16px below).
- **CardTitle:** `font-display text-xl font-semibold tracking-tight text-white`.
- **CardDescription:** `text-sm text-muted-foreground`.
- **CardContent:** no extra class by default (spacing via `space-y-*` where used).

**Accent bar (left edge):**
- Width: `w-1` (4px).
- Full height: `h-full`.
- Position: `absolute left-0 top-0`.
- Gradients used:
  - `from-emerald-500 to-teal-500`
  - `from-teal-500 to-cyan-500`
  - `from-cyan-500 to-emerald-500`
- When used, card has `overflow-hidden` and content often has `pl-6` so text clears the bar.

---

## 5. Inputs

- `w-full`
- `rounded-xl` (12px)
- `border border-white/10`
- `bg-white/5`
- `px-4 py-3` (16px 12px)
- `text-white`
- Placeholder: `text-muted-foreground/80`
- Focus: `border-emerald-500/60`, `ring-2`, `ring-emerald-500/20`
- `transition-colors duration-200`

**Selects (profile/plan):**
- Same radius and padding; `border-white/10`, `bg-white/5`, `text-white`; focus `border-emerald-500/60`, `ring-2`, `ring-emerald-500/20`.

---

## 6. Labels

- `block`
- `text-sm`
- `font-medium`
- `text-muted-foreground`

Spacing above inputs: typically `mt-1` (4px) between label and field.

---

## 7. Shadows (Tailwind)

| Name | Value |
|------|--------|
| `shadow-glow` | `0 0 40px -8px hsl(var(--glow) / 0.35)` |
| `shadow-glow-sm` | `0 0 24px -4px hsl(var(--glow) / 0.25)` |
| `shadow-card` | `0 4px 24px -4px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.04)` |
| `shadow-elevated` | `0 8px 32px -8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)` |

---

## 8. Border radius (Tailwind)

- `rounded-lg`: 8px (nav links, etc.)
- `rounded-xl`: 12px (buttons, inputs, header links)
- `rounded-2xl`: 16px (cards)
- Theme: `DEFAULT: var(--radius)` (12px), `lg: var(--radius-lg)` (16px), `xl: var(--radius-xl)` (20px).

---

## 9. Header (global)

- **Container:** `sticky top-0 z-50`, `border-b border-white/[0.06]`, `bg-[hsl(var(--background))]/80`, `px-6 py-4`, `backdrop-blur-xl`.
- **Inner:** `max-w-5xl` (1024px), `items-center justify-between`.
- **Logo:** `font-display text-xl font-bold tracking-tight text-white`, hover `text-emerald-400`, `transition-colors`.
- **Nav links (Pricing, Log in):** `rounded-xl`, `px-4 py-2.5`, `text-sm font-medium text-muted-foreground`, hover `bg-white/5 text-white`.
- **CTA (Get started):** `rounded-xl`, `bg-emerald-500`, `px-5 py-2.5`, `text-sm font-medium text-white`, `shadow-glow-sm`, hover `bg-emerald-400 shadow-glow`.
- **Avatar (signed in):** `w-9 h-9` (36px), `ring-2 ring-white/10`.
- **Gap between nav items:** `gap-2`.

---

## 10. App nav (logged-in)

- Same sticky/blur as header: `border-white/[0.06]`, `bg-[hsl(var(--background))]/90`, `px-6 py-4`, `backdrop-blur-xl`, `z-40`.
- **Gap (logo vs links):** `gap-8`.
- **Nav links:** `rounded-lg`, `px-3 py-2`, `text-sm font-medium text-muted-foreground`, hover `bg-white/5 text-white`.
- **Gap between nav links:** `gap-1`.
- **Admin link:** `text-amber-400`, hover `bg-amber-500/10 text-amber-300`.
- **Email:** `text-sm text-muted-foreground`; gap before sign out `gap-4`.
- **Main content:** `max-w-4xl`, `px-6 py-8`.

---

## 11. Aurora background (marketing)

- **Container:** `min-h-screen`, `flex flex-col items-center justify-center`, `overflow-hidden`, `bg-[hsl(var(--background))]`, `px-4 py-20`.
- **Grid:** absolute, full bleed; lines `rgba(34,197,94,0.06)` 1px; cell size `3rem` (48px).
- **Aurora orbs:** absolute `-inset-20`, `opacity-60`, `animate-aurora` (60s linear infinite).
  - Ellipse 1: 70% 50% at 50% -10%, `rgba(34, 197, 94, 0.45)` (emerald), fade by 50%.
  - Ellipse 2: 55% 40% at 100% 10%, `rgba(59, 130, 246, 0.35)` (blue).
  - Ellipse 3: 50% 35% at 0% 10%, `rgba(168, 85, 247, 0.3)` (purple).
  - `backgroundSize: 200% 200%`.
- **Radial (bottom):** `ellipse 80% 60% at 50% 110%`, `rgba(34,197,94,0.08)`.
- **Grain:** `.grain` overlay (see below), `z-[1]`.
- **Content:** `relative z-10`.

**Grain (`.grain`):**
- SVG fractal noise, `baseFrequency="0.9"`, `numOctaves="4"`, opacity 0.04; `pointer-events: none`.

**Aurora keyframes:**  
From `background-position: 50% 50%, 50% 50%` to `350% 50%, 350% 50%` over 60s linear.

---

## 12. Auth layout & Clerk card

**Auth page background (`.auth-page-bg`):**
- Mobile: `linear-gradient(165deg, #f6f4ff 0%, #ede9fe 25%, #faf5ff 60%, #ffffff 100%)`.
- Desktop (768px+): `linear-gradient(155deg, #f8f6ff 0%, #f0ecff 30%, #fdf8ff 70%, #ffffff 100%)`.

**Clerk card (variables):**
- Primary: `#6C47FF`.
- Text: `#0f172a`; secondary: `#64748b`.
- Input bg: `#fafafa`; input text: `#0f172a`.
- Border radius: `12px`.
- Font: `var(--font-dm-sans)` (and Sora for title).

**Clerk card (elements):**
- **cardBox:** `max-w-[420px]`, `rounded-[20px]`, `border border-[#e2e8f0]`, `bg-white`, shadow: `0_25px_50px_-12px_rgba(0,0,0,0.08), 0_0_0_1px_rgba(0,0,0,0.02), 0_0_80px_-20px_rgba(108,71,255,0.15)`.
- **card:** `p-8 sm:p-10`.
- **headerTitle:** `24px`, `font-semibold`, `tracking-tight`, `#0f172a`, Sora.
- **headerSubtitle:** `15px`, `#64748b`.
- **Social buttons:** `h-12`, `rounded-xl`, `border-2 border-[#e2e8f0]`, `bg-white`, `text-[15px]`, hover `border-[#6C47FF]/50`, `bg-[#f8f7ff]`, `text-[#6C47FF]`, `duration-200`.
- **Divider line:** `bg-[#e2e8f0]`; text `text-xs font-semibold uppercase tracking-widest text-[#94a3b8]`.
- **Field label:** `text-sm font-medium text-[#475569]`.
- **Field input:** `h-12`, `rounded-xl`, `border-2 border-[#e2e8f0]`, `bg-[#fafafa]`, focus `border-[#6C47FF]`, `ring-2 ring-[#6C47FF]/20`, `bg-white`, `duration-200`; placeholder `#94a3b8`.
- **Primary button:** `h-12`, `w-full`, `rounded-xl`, `bg-[#6C47FF]`, `text-[15px] font-semibold text-white`, shadow `0_4px_14px_rgba(108,71,255,0.4)`, hover `bg-[#5b3ae6]`, shadow `0_6px_20px_rgba(108,71,255,0.45)`, active `scale-[0.99]`.
- **Footer links:** primary `#6C47FF` font-semibold; pages `#64748b`, hover `#6C47FF`.

---

## 13. Landing page spacing & layout

- **Hero block:** `max-w-5xl`, centered, `text-center`.
- **Title:** `mb-6` removed; tagline has `mt-6` (24px); CTA has `mt-10` (40px).
- **Tagline:** `max-w-xl`, `text-lg md:text-xl`, `text-muted-foreground`.
- **Features section:** `mt-28` (112px), `max-w-5xl`, grid `gap-6`, `md:grid-cols-3`.
- **Pricing section:** `mt-28`, `max-w-md`.
- **Pricing card:** `border-emerald-500/20`, `shadow-glow-sm`; content `space-y-4`; price `text-4xl`, suffix `text-lg font-normal text-muted-foreground`.
- **Footer:** `mt-28`, `pb-12`, `text-sm text-muted-foreground`.

**Feature card icons:** `h-5 w-5`; colours `text-emerald-400`, `text-teal-400`, `text-cyan-400`. Card header: `pl-6`, icon+title `gap-2`, `mb-2`; description `text-left`.

**Landing motion (features):**  
`whileInView` with `viewport: { once: true, margin: "-60px" }`; stagger `0.1`; item variants: hidden `opacity: 0, y: 20`, visible `opacity: 1, y: 0`; transition `0.35s easeOut`.

---

## 14. Dashboard & app pages

- **Section title:** `font-display text-3xl font-bold tracking-tight text-white`; block spacing `space-y-8`.
- **Dashboard cards:** First card emerald→teal bar; second card teal→cyan bar; both `pl-6` on header and content.
- **DB-unavailable card:** `border-amber-500/30`, `bg-amber-500/10`, `shadow-card`; title `text-amber-400`.

---

## 15. Admin

- **Nav:** Same as app nav; logo `text-amber-400`, hover `text-amber-300`.
- **Main:** `max-w-6xl`, `p-6`.
- **Page title:** `font-display text-3xl font-bold tracking-tight text-white`.
- **Table select:** `rounded-lg`, `border border-white/10`, `bg-white/5`, `px-3 py-1.5`, `text-sm text-white`, focus `border-emerald-500/50`, `ring-1 ring-emerald-500/30`.

---

## 16. Misc

- **Transition defaults:** Buttons/inputs `duration-200`; cards `duration-300`; header/nav link hovers use `transition-colors` (no duration specified, inherits).
- **Focus ring offset:** `focus:ring-offset-2`, offset colour `hsl(var(--background))`.
- **Link underlines:** Only where explicitly added (e.g. footer links in auth); CTAs are buttons, not underlined.

This file is the single source of truth for every UI detail in the app.
