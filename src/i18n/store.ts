'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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
    setLocale: (locale: Locale) => void;
    availableLocales: { code: Locale; name: string; flag: string }[];
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

// Create the store with proper hydration handling
export const useI18nStore = create<I18nState>()(
    persist(
        (set) => ({
            locale: 'en',
            availableLocales: [
                { code: 'en', name: 'English', flag: '🇬🇧' },
                { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
                { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
            ],
            _hasHydrated: false,
            setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
            setLocale: (locale: Locale) => set({ locale }),
        }),
        {
            name: 'oxot-locale',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ locale: state.locale }),
            onRehydrateStorage: () => (state) => {
                // Use queueMicrotask to defer state update until after component mount
                // This prevents "Can't perform a React state update on an unmounted component" error
                queueMicrotask(() => {
                    state?.setHasHydrated(true);
                });
            },
        }
    )
);

// Derived hook that computes translations from locale
export const useTranslations = () => {
    const { locale, setLocale, availableLocales, _hasHydrated } = useI18nStore();

    // Get translations based on current locale
    const t = translations[locale];

    return { t, locale, setLocale, availableLocales, isHydrated: _hasHydrated };
};

// Re-export for backwards compatibility
export const useI18n = useTranslations;
