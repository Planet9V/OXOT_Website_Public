'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale, Translations } from './types';

// Import translation files
import en from './locales/en.json';
import nl from './locales/nl.json';
import de from './locales/de.json';

const translations: Record<Locale, Translations> = {
    en: en as Translations,
    nl: nl as Translations,
    de: de as Translations,
};

interface I18nState {
    locale: Locale;
    t: Translations;
    setLocale: (locale: Locale) => void;
    availableLocales: { code: Locale; name: string; flag: string }[];
}

export const useI18n = create<I18nState>()(
    persist(
        (set) => ({
            locale: 'en',
            t: translations.en,
            availableLocales: [
                { code: 'en', name: 'English', flag: '🇬🇧' },
                { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
                { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
            ],
            setLocale: (locale: Locale) =>
                set({
                    locale,
                    t: translations[locale],
                }),
        }),
        {
            name: 'oxot-locale',
            partialize: (state) => ({ locale: state.locale }),
            onRehydrateStorage: () => (state) => {
                // Rehydrate translations after loading persisted locale
                if (state) {
                    state.t = translations[state.locale];
                }
            },
        }
    )
);

// Utility hook for SSR-safe locale access
export const useTranslations = () => {
    const { t, locale, setLocale, availableLocales } = useI18n();
    return { t, locale, setLocale, availableLocales };
};
