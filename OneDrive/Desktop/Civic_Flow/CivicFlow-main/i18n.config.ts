export const i18n = {
  defaultLocale: "en",
  locales: [
    "en",    // English (US/Default)
    "en-GB", // UK English
    "hi",    // Hindi
    "bn",    // Bengali
    "mr",    // Marathi
    "gu",    // Gujarati
    "ta",    // Tamil
    "te",    // Telugu
    "ml",    // Malayalam
    "fr",    // French
    "ne",    // Nepali
    "ur",    // Urdu
  ],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const localeNames: Record<Locale, string> = {
  "en": "English (US)",
  "en-GB": "English (UK)",
  "hi": "हिन्दी (Hindi)",
  "bn": "বাংলা (Bengali)",
  "mr": "मराठी (Marathi)",
  "gu": "ગુજરાતી (Gujarati)",
  "ta": "தமிழ் (Tamil)",
  "te": "తెలుగు (Telugu)",
  "ml": "മലയാളം (Malayalam)",
  "fr": "Français",
  "ne": "नेपाली (Nepali)",
  "ur": "اردو (Urdu)",
};
