import "server-only";
import type { Locale } from "@/i18n.config";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  "en-GB": () => import("../dictionaries/en-GB.json").then((module) => module.default),
  hi: () => import("../dictionaries/hi.json").then((module) => module.default),
  bn: () => import("../dictionaries/bn.json").then((module) => module.default),
  mr: () => import("../dictionaries/mr.json").then((module) => module.default),
  gu: () => import("../dictionaries/gu.json").then((module) => module.default),
  ta: () => import("../dictionaries/ta.json").then((module) => module.default),
  te: () => import("../dictionaries/te.json").then((module) => module.default),
  ml: () => import("../dictionaries/ml.json").then((module) => module.default),
  fr: () => import("../dictionaries/fr.json").then((module) => module.default),
  ne: () => import("../dictionaries/ne.json").then((module) => module.default),
  ur: () => import("../dictionaries/ur.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
