import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#fafafa",
        surface: "#ffffff",
        "surface-elevated": "#f5f5f5",
        border: "#e5e5e5",
        "border-hover": "#d4d4d4",
        "text-primary": "#171717",
        "text-secondary": "#737373",
        "text-tertiary": "#a3a3a3",
        primary: { DEFAULT: "#6c47ff", hover: "#5b3ae6" },
        "primary-subtle": { bg: "#f5f3ff", border: "#e9e5ff" },
        success: "#16a34a",
        destructive: "#dc2626",
      },
      borderRadius: {
        btn: "10px",
        card: "16px",
        input: "10px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        "btn-primary": "0 1px 2px rgba(0,0,0,0.05)",
        "btn-primary-hover": "0 4px 12px rgba(108,71,255,0.15)",
        nav: "0 1px 3px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;
