/**
 * Auth: Clerk-inspired light theme. Primary #6c47ff, clean white card, subtle violet accent.
 */
export const clerkAuthAppearance = {
  variables: {
    colorPrimary: "#6c47ff",
    colorText: "#171717",
    colorTextSecondary: "#737373",
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorInputText: "#171717",
    borderRadius: "10px",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    fontFamilyButtons: "var(--font-inter), system-ui, sans-serif",
  },
  elements: {
    rootBox: "mx-auto w-full flex justify-center",
    cardBox:
      "w-full max-w-[400px] min-w-0 rounded-[16px] border border-[#e5e5e5] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] [border-top:3px_solid_#6c47ff]",
    card: "p-8 sm:p-10",
    headerTitle: "text-[24px] font-bold tracking-tight text-[#171717] font-[var(--font-plus-jakarta)]",
    headerSubtitle: "text-[14px] text-[#737373]",
    socialButtonsBlockButton:
      "h-12 rounded-[10px] border border-[#e5e5e5] bg-white text-[14px] font-medium text-[#171717] hover:border-[#6c47ff] hover:bg-[#f5f3ff] transition-all duration-150",
    dividerLine: "bg-[#e5e5e5]",
    dividerText: "text-[13px] font-medium text-[#a3a3a3] uppercase tracking-wider",
    formFieldLabel: "text-[13px] font-medium text-[#737373]",
    formFieldInput:
      "h-12 rounded-[10px] border border-[#e5e5e5] bg-white text-[#171717] placeholder:text-[#a3a3a3] focus:border-[#6c47ff] focus:ring-[3px] focus:ring-[rgba(108,71,255,0.1)] transition-all duration-150",
    formButtonPrimary:
      "h-12 w-full rounded-[10px] bg-[#6c47ff] text-[14px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#5b3ae6] hover:shadow-[0_4px_12px_rgba(108,71,255,0.15)] hover:-translate-y-px active:scale-[0.995] transition-all duration-150",
    footerActionLink: "text-[#6c47ff] font-semibold hover:underline",
    footerPagesLink: "text-[#737373] hover:text-[#6c47ff]",
  },
};
