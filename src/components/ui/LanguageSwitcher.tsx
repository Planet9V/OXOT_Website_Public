'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslations, Locale } from '@/i18n';

export const LanguageSwitcher = () => {
    const { locale, setLocale, availableLocales } = useTranslations();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLocale = availableLocales.find((l) => l.code === locale);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (code: Locale) => {
        setLocale(code);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-oxot-gold/30 transition-all group"
                aria-label="Select language"
            >
                <Globe size={14} className="text-gray-500 group-hover:text-oxot-gold transition-colors" />
                <span className="text-[10px] font-mono text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">
                    {currentLocale?.flag} {currentLocale?.code}
                </span>
                <ChevronDown
                    size={12}
                    className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-40 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50"
                    >
                        {availableLocales.map((loc) => (
                            <button
                                key={loc.code}
                                onClick={() => handleSelect(loc.code)}
                                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left transition-all
                  ${locale === loc.code
                                        ? 'bg-oxot-gold/10 text-oxot-gold'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }
                `}
                            >
                                <span className="text-lg">{loc.flag}</span>
                                <div>
                                    <div className="text-xs font-bold">{loc.name}</div>
                                    <div className="text-[9px] font-mono text-gray-500 uppercase">{loc.code}</div>
                                </div>
                                {locale === loc.code && (
                                    <motion.div
                                        layoutId="locale-indicator"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-oxot-gold"
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
