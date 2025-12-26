"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, CheckCircle, Clock, Users, Zap, Send, Building, Globe, Mail, User, Briefcase, MessageSquare } from 'lucide-react';

const SECTORS = [
    "Energy",
    "Water & Wastewater",
    "Healthcare & Public Health",
    "Financial Services",
    "Transportation Systems",
    "Communications",
    "Information Technology",
    "Manufacturing",
    "Defense Industrial Base",
    "Food & Agriculture",
    "Government Facilities",
    "Emergency Services",
    "Nuclear Reactors",
    "Chemicals",
    "Commercial Facilities",
    "Dams",
    "Other"
];

const REGIONS = [
    "North America",
    "Europe, Middle East & Africa (EMEA)",
    "Asia Pacific (APAC)",
    "Latin America",
    "Global / Multi-Region"
];

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
            accent: 'cyan-500',
            accentDark: 'cyan-600',
            glow: 'rgba(0, 224, 176, 0.3)',
            border: 'cyan-500/30',
            bg: 'cyan-500/10',
            text: 'cyan-400'
        },
        gold: {
            accent: 'yellow-500',
            accentDark: 'yellow-600',
            glow: 'rgba(234, 179, 8, 0.3)',
            border: 'yellow-500/30',
            bg: 'yellow-500/10',
            text: 'yellow-400'
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
                        <h3 className="text-2xl font-bold text-white mb-4">Message Received.</h3>
                        <p className="text-gray-400 text-lg">
                            Our team will review your request and reach out within 24 hours.
                            In the meantime, your adversaries won't be waiting—stay vigilant.
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
                        <span className="font-bold">THREAT ADVISORY:</span>
                    </div>
                    <span className="text-gray-300 text-center">
                        While you read this page, adversaries are actively scanning your perimeter for weaknesses.
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
                            {headline}
                        </h2>
                        <p className={`text-xl text-${colorScheme.text} font-medium mb-8`}>
                            {subheadline}
                        </p>
                        <p className="text-gray-400 mb-10 leading-relaxed">
                            Request a <span className="text-white font-bold">complimentary threat landscape briefing</span>.
                            Our team will analyze your sector's current threat profile and identify your organization's most critical exposure points—no commitment required.
                        </p>

                        {/* Trust Signals */}
                        <div className="space-y-4 mb-10">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 bg-${colorScheme.bg} rounded-lg flex items-center justify-center shrink-0 border border-${colorScheme.border}`}>
                                    <Shield className={`w-5 h-5 text-${colorScheme.text}`} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Aligned with Industry Standards</h4>
                                    <p className="text-gray-500 text-sm">Methodology based on CISA frameworks, ICS-CERT advisories, and the MITRE ATT&CK matrix.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 bg-${colorScheme.bg} rounded-lg flex items-center justify-center shrink-0 border border-${colorScheme.border}`}>
                                    <Users className={`w-5 h-5 text-${colorScheme.text}`} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Trusted Across All 16 Critical Sectors</h4>
                                    <p className="text-gray-500 text-sm">From energy grids to financial institutions, we understand sector-specific threats.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 bg-${colorScheme.bg} rounded-lg flex items-center justify-center shrink-0 border border-${colorScheme.border}`}>
                                    <Clock className={`w-5 h-5 text-${colorScheme.text}`} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Limited Quarterly Engagements</h4>
                                    <p className="text-gray-500 text-sm">We cap our Red Team engagements to ensure quality. Secure your slot early.</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Proof Quote */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <p className="text-gray-300 italic mb-4">
                                "The AEON Red Team identified attack paths we had no idea existed. Their graph-based approach found a 14-hop chain from a vendor portal to our SCADA network."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 font-bold">
                                    CS
                                </div>
                                <div>
                                    <div className="text-white text-sm font-bold">CISO, Fortune 500 Energy Company</div>
                                    <div className="text-gray-500 text-xs">Verified Engagement</div>
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
                                <h3 className="text-lg font-bold text-white">Request Your Briefing</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name & Title */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">Full Name *</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                required
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all"
                                                placeholder="Jane Smith"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">Job Title *</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                            <input
                                                type="text"
                                                name="jobTitle"
                                                required
                                                value={formData.jobTitle}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all"
                                                placeholder="VP, Security Operations"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">Work Email *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all"
                                            placeholder="jane.smith@company.com"
                                        />
                                    </div>
                                </div>

                                {/* Organization */}
                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">Organization *</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                        <input
                                            type="text"
                                            name="organization"
                                            required
                                            value={formData.organization}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all"
                                            placeholder="Acme Corporation"
                                        />
                                    </div>
                                </div>

                                {/* Sector & Region */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">Sector *</label>
                                        <select
                                            name="sector"
                                            required
                                            value={formData.sector}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all appearance-none"
                                        >
                                            <option value="" className="bg-gray-900">Select Sector</option>
                                            {SECTORS.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">Region *</label>
                                        <select
                                            name="region"
                                            required
                                            value={formData.region}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all appearance-none"
                                        >
                                            <option value="" className="bg-gray-900">Select Region</option>
                                            {REGIONS.map(r => <option key={r} value={r} className="bg-gray-900">{r}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Service Type Selection (Optional) */}
                                {serviceOptions && serviceOptions.length > 0 && (
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3 block">Service Interest *</label>
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
                                    <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1 block">What are your primary concerns? (Optional)</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-600" />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-all resize-none"
                                            placeholder="E.g., We are concerned about supply chain risks and IT/OT convergence..."
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
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Request Threat Briefing
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-gray-600 text-center">
                                    By submitting, you agree to a confidential, no-obligation conversation with our team.
                                </p>
                            </form>
                        </div>

                        {/* Micro-Urgency */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <Zap className="w-3 h-3 text-yellow-500" />
                            <span>Average response time: <span className="text-white font-bold">Under 4 hours</span></span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
