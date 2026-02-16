import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/layout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MacroNext - Tomorrow's Meals, Today",
  description: "Set your macros. Get your meal plan. Delivered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`scroll-smooth ${inter.variable} ${plusJakarta.variable}`}>
        <body className="font-sans antialiased bg-[#fafafa] text-[#171717]">
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
