import type { Locale } from "@/lib/agentic-commerce/i18n/config";
import { en, type Dictionary } from "@/lib/agentic-commerce/i18n/dictionaries/en";
import { fr } from "@/lib/agentic-commerce/i18n/dictionaries/fr";

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
