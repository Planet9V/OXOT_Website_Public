"use client";

import React, { useState } from 'react';
import { useTranslations } from '@/i18n';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, CheckCircle, Clock, Users, Zap, Send, Building, Globe, Mail, User, Briefcase, MessageSquare } from 'lucide-react';

interface ContactFormCTAProps {
    variant?: 'red' | 'blue' | 'gold';
    headline?: string;
    subheadline?: string;
    serviceOptions?: { value: string; label: string; color: string }[];
}

export default function ContactFormCTA({
    variant = 'red',
    headline = "Your Adversaries Are Already Working.",
    subheadline = "Are You Ready to See What They See?",
    serviceOptions
}: ContactFormCTAProps) {
    const { t } = useTranslations();

    // Use translations for defaults if props are not provided
    const effectiveHeadline = headline === "Your Adversaries Are Already Working." ? t.cta.defaultHeadline : headline;
    const effectiveSubheadline = subheadline === "Are You Ready to See What They See?" ? t.cta.defaultSubheadline : subheadline;

    const [formData, setFormData] = useState({
        fullName: '',
        jobTitle: '',
        email: '',
        organization: '',
        sector: '',
        region: '',
        serviceType: serviceOptions?.[0]?.value || '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            console.log('Form submitted:', formData);
        }, 1500);
    };

    const colorScheme = {
        red: {
            accent: 'red-500',
            accentDark: 'red-600',
            glow: 'rgba(239, 68, 68, 0.3)',
            border: 'red-500/30',
            bg: 'red-500/10',
            text: 'red-400'
        },
        blue: {
            accent: 'oxot-blue',
            accentDark: 'oxot-blue-light',
            glow: 'rgba(0, 66, 214, 0.3)',
            border: 'oxot-blue/30',
            bg: 'oxot-blue/10',
            text: 'oxot-blue-light'
        },
        gold: {
            accent: 'oxot-gold',
            accentDark: 'oxot-gold-light',
            glow: 'rgba(255, 215, 0, 0.3)',
            border: 'oxot-gold/30',
            bg: 'oxot-gold/10',
            text: 'oxot-gold'
        }
    }[variant];

    if (isSubmitted) {
        return (
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={`w-20 h-20 bg-${colorScheme.bg} border border-${colorScheme.border} rounded-full flex items-center justify-center mx-auto mb-8`}>
                            <CheckCircle className={`w-10 h-10 text-${colorScheme.text}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{t.cta.success.title}</h3>
                        <p className="text-gray-400 text-lg">
                            {t.cta.success.message}
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-24 px-4 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
            <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-${colorScheme.accent} rounded-full blur-[200px] opacity-10`}></div>
            <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] bg-${colorScheme.accentDark} rounded-full blur-[150px] opacity-10`}></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Urgency Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`mb-12 bg-${colorScheme.bg} border border-${colorScheme.border} rounded-xl p-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm`}
                >
                    <div className="flex items-center gap-2 text-red-400">
                        <AlertTriangle className="w-4 h-4 animate-pulse" />
                        <span className="font-bold">{t.cta.threatAdvisory.label}</span>
                    </div>
                    <span className="text-gray-300 text-center">
                        {t.cta.threatAdvisory.message}
                    </span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Value Proposition */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                            {effectiveHeadline}
                        </h2>
                        <p className={`text-xl text-${colorScheme.text} font-medium mb-8`}>
                            {effectiveSubheadline}
                        </p>
                        <p className="text-gray-400 mb-10 leading-relaxed">
                            {t.cta.briefingRequest.prefix} <span className="text-white font-bold">{t.cta.briefingRequest.link}</span>.
                            {t.cta.briefingRequest.description}
                        </p>

                        {/* Trust Signals */}
                        <div className="space-y-4 mb-10">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 bg-${colorScheme.bg} rounded-lg flex items-center justify-center shrink-0 border border-${colorScheme.border}`}>
                                    <Shield className={`w-5 h-5 text-${colorScheme.text}`} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{t.cta.trustSignals.standards.title}</h4>
                                    <p className="text-gray-500 text-sm">{t.cta.trustSignals.standards.desc}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 bg-${colorScheme.bg} rounded-lg flex items-center justify-center shrink-0 border border-${colorScheme.border}`}>
                                    <Users className={`w-5 h-5 text-${colorScheme.text}`} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{t.cta.trustSignals.sectors.title}</h4>
                                    <p className="text-gray-500 text-sm">{t.cta.trustSignals.sectors.desc}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 bg-${colorScheme.bg} rounded-lg flex items-center justify-center shrink-0 border border-${colorScheme.border}`}>
                                    <Clock className={`w-5 h-5 text-${colorScheme.text}`} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{t.cta.trustSignals.engagements.title}</h4>
                                    <p className="text-gray-500 text-sm">{t.cta.trustSignals.engagements.desc}</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Proof Quote */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <p className="text-gray-300 italic mb-4">
                                "{t.cta.quote.text}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 font-bold">
                                    {t.cta.quote.author}
                                </div>
                                <div>
                                    <div className="text-white text-sm font-bold">{t.cta.quote.authorTitle}</div>
                                    <div className="text-gray-500 text-xs">{t.cta.quote.verified}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className={`bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl`}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-3 h-3 bg-${colorScheme.accent} rounded-full animate-pulse`}></div>
                                <h3 className="text-lg font-bold text-white">{t.cta.form.title}</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name & Title */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">{t.cta.form.labels.name}</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                required
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all"
                                                placeholder={t.cta.form.placeholders.name}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">{t.cta.form.labels.title}</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                            <input
                                                type="text"
                                                name="jobTitle"
                                                required
                                                value={formData.jobTitle}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all"
                                                placeholder={t.cta.form.placeholders.title}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">{t.cta.form.labels.email}</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all"
                                            placeholder={t.cta.form.placeholders.email}
                                        />
                                    </div>
                                </div>

                                {/* Organization */}
                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">{t.cta.form.labels.org}</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        <input
                                            type="text"
                                            name="organization"
                                            required
                                            value={formData.organization}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all"
                                            placeholder={t.cta.form.placeholders.org}
                                        />
                                    </div>
                                </div>

                                {/* Sector & Region */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">{t.cta.form.labels.sector}</label>
                                        <select
                                            name="sector"
                                            required
                                            value={formData.sector}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all appearance-none"
                                        >
                                            <option value="" className="bg-gray-900">{t.cta.form.placeholders.selectSector}</option>
                                            {t.cta.sectors.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">{t.cta.form.labels.region}</label>
                                        <select
                                            name="region"
                                            required
                                            value={formData.region}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all appearance-none"
                                        >
                                            <option value="" className="bg-gray-900">{t.cta.form.placeholders.selectRegion}</option>
                                            {t.cta.regions.map(r => <option key={r} value={r} className="bg-gray-900">{r}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Service Type Selection (Optional) */}
                                {serviceOptions && serviceOptions.length > 0 && (
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3 block">{t.cta.form.labels.service}</label>
                                        <div className="flex flex-wrap gap-3">
                                            {serviceOptions.map((opt) => {
                                                const isActive = formData.serviceType === opt.value;
                                                // Safe color mapping
                                                const getColors = (c: string) => {
                                                    if (c === 'cyan') return isActive ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-white/10 bg-white/5 hover:border-white/20';
                                                    if (c === 'blue') return isActive ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/10 bg-white/5 hover:border-white/20';
                                                    if (c === 'yellow') return isActive ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-white/10 bg-white/5 hover:border-white/20';
                                                    return isActive ? 'border-white/50 bg-white/10' : 'border-white/10 bg-white/5';
                                                };
                                                const getDotColor = (c: string) => {
                                                    if (c === 'cyan') return 'border-cyan-400 bg-cyan-400';
                                                    if (c === 'blue') return 'border-blue-400 bg-blue-400';
                                                    if (c === 'yellow') return 'border-yellow-400 bg-yellow-400';
                                                    return 'border-white bg-white';
                                                };
                                                const getTextColor = (c: string) => {
                                                    if (c === 'cyan') return 'text-cyan-400';
                                                    if (c === 'blue') return 'text-blue-400';
                                                    if (c === 'yellow') return 'text-yellow-400';
                                                    return 'text-white';
                                                };

                                                return (
                                                    <label
                                                        key={opt.value}
                                                        className={`flex-1 min-w-[140px] cursor-pointer p-4 rounded-xl border transition-all ${getColors(opt.color)}`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="serviceType"
                                                            value={opt.value}
                                                            checked={isActive}
                                                            onChange={handleChange}
                                                            className="sr-only"
                                                        />
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isActive ? getDotColor(opt.color) : 'border-gray-600'}`}>
                                                                {isActive && (
                                                                    <div className="w-2 h-2 bg-black rounded-full"></div>
                                                                )}
                                                            </div>
                                                            <span className={`text-sm font-bold ${isActive ? getTextColor(opt.color) : 'text-gray-300'}`}>
                                                                {opt.label}
                                                            </span>
                                                        </div>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Message */}
                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">{t.cta.form.labels.concerns}</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-600" />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all resize-none"
                                            placeholder={t.cta.form.placeholders.concerns}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-gradient-to-r from-${colorScheme.accent} to-${colorScheme.accentDark} text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-${colorScheme.accent}/20`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            {t.cta.form.submitting}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            {t.cta.form.submit}
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-gray-600 text-center">
                                    {t.cta.form.disclaimer}
                                </p>
                            </form>
                        </div>

                        {/* Micro-Urgency */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <Zap className="w-3 h-3 text-yellow-500" />
                            <span>{t.cta.urgency.label} <span className="text-white font-bold">{t.cta.urgency.value}</span></span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
