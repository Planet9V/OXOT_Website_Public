'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Download, Palette, FileText, Layers, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BackgroundEffect } from './BackgroundEffect';
import { PageHeader } from './branding/PageHeader';
import { OXOTLogo } from './branding/OXOTLogo';

interface BrandAsset {
    title: string;
    description: string;
    src: string;
    category: 'logo' | 'template' | 'service';
    background: 'dark' | 'light';
}

const brandAssets: BrandAsset[] = [
    {
        title: 'Primary Logo — Dark',
        description: 'The definitive OXOT mark for dark-mode interfaces and presentations. Gold and white on charcoal substrate.',
        src: '/Logos_OXOT_Gold_White/OXOT_GW_Dark.svg',
        category: 'logo',
        background: 'dark'
    },
    {
        title: 'Primary Logo — White',
        description: 'Inverse variant for light backgrounds and print applications.',
        src: '/Logos_OXOT_Gold_White/OXOT_GW_White.svg',
        category: 'logo',
        background: 'light'
    },
    {
        title: 'Brand Architecture',
        description: 'Complete brand logo system with sub-brand relationships and hierarchy.',
        src: '/Logos_OXOT_Gold_White/OXOT_Logo_Brands.svg',
        category: 'logo',
        background: 'dark'
    },
    {
        title: 'Report Template',
        description: 'Standard document styling for executive reports, assessments, and formal deliverables.',
        src: '/Logos_OXOT_Gold_White/OXOT_GW_Report_template.svg',
        category: 'template',
        background: 'dark'
    },
    {
        title: 'Services Overview — Dark',
        description: 'Service portfolio visualization optimized for digital presentations and dark interfaces.',
        src: '/Logos_OXOT_Gold_White/OXOT_GW_Services_Overview_Dark.svg',
        category: 'service',
        background: 'dark'
    },
    {
        title: 'Services Overview — Light',
        description: 'Print-optimized service portfolio for proposals and physical collateral.',
        src: '/Logos_OXOT_Gold_White/OXOT_GW_Services_Overview_Light.svg',
        category: 'service',
        background: 'light'
    }
];

const categoryMeta = {
    logo: { icon: Award, label: 'Brand Identity', color: 'oxot-gold' },
    template: { icon: FileText, label: 'Document Standards', color: 'blue-400' },
    service: { icon: Layers, label: 'Service Visualization', color: 'green-400' }
};

export default function BrandingShowcaseView() {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="min-h-screen bg-black relative overflow-hidden font-sans selection:bg-oxot-gold/30 text-slate-300">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10 filter grayscale contrast-125">
                <BackgroundEffect />
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-oxot-gold via-amber-400 to-white origin-left z-50"
                style={{ scaleX }}
            />

            <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-20 pb-40">

                {/* Hero Section */}
                <section className="h-screen flex flex-col items-center justify-center relative text-center">
                    {/* Navigation */}
                    <div className="absolute top-20 left-0">
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            <Palette className="w-4 h-4" />
                            Corporate Identity
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-12"
                    >
                        <OXOTLogo size="xl" animated />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-oxot-gold/10 border border-oxot-gold/30 rounded-full text-oxot-gold/80 text-xs font-mono tracking-[0.2em] mb-6 uppercase">
                                <span className="w-2 h-2 rounded-full bg-oxot-gold animate-pulse" />
                                Brand Guidelines 2025
                            </div>
                        </div>

                        <PageHeader
                            title="Visual Identity"
                            subtitle="The sovereign essence of OXOT—precision, intelligence, and uncompromising excellence—distilled into visual form."
                            variant="hero"
                            accent="gold"
                            className="items-center"
                        />
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
                    >
                        <span className="text-[10px] tracking-[0.2em] uppercase">Explore Assets</span>
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                    </motion.div>
                </section>

                {/* Brand Philosophy */}
                <section className="py-32 border-t border-white/5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center mb-20"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">The OXOT Standard</h2>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Our visual identity reflects our mission: to bring <span className="text-oxot-gold">sovereign intelligence</span> to
                            critical infrastructure protection. Every element—from the gold accents signifying value to the
                            charcoal depths representing security—is intentional.
                        </p>
                    </motion.div>

                    {/* Color Palette */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                        {[
                            { name: 'OXOT Gold', hex: '#C9A227', class: 'bg-oxot-gold' },
                            { name: 'Charcoal', hex: '#1A1A1A', class: 'bg-[#1A1A1A] border border-white/10' },
                            { name: 'Slate', hex: '#64748B', class: 'bg-slate-500' },
                            { name: 'Pure White', hex: '#FFFFFF', class: 'bg-white' }
                        ].map((color, i) => (
                            <motion.div
                                key={color.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className={`${color.class} h-24 rounded-xl mb-3 group-hover:scale-105 transition-transform shadow-lg`} />
                                <div className="text-sm font-medium text-white">{color.name}</div>
                                <div className="text-xs font-mono text-gray-500">{color.hex}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Asset Gallery */}
                <section className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Brand Assets</h2>
                        <p className="text-gray-400">Official visual assets for internal and external communications.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {brandAssets.map((asset, index) => {
                            const CategoryIcon = categoryMeta[asset.category].icon;
                            return (
                                <motion.div
                                    key={asset.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    {/* Glow Effect */}
                                    <div className="absolute -inset-2 bg-gradient-to-r from-oxot-gold/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className={`relative rounded-2xl border border-white/10 overflow-hidden ${asset.background === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
                                        }`}>
                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 z-10">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase ${asset.background === 'dark'
                                                    ? 'bg-white/10 text-white/70'
                                                    : 'bg-black/10 text-black/70'
                                                }`}>
                                                <CategoryIcon className="w-3 h-3" />
                                                {categoryMeta[asset.category].label}
                                            </div>
                                        </div>

                                        {/* Asset Display */}
                                        <div className="p-8 pt-16 flex items-center justify-center min-h-[300px]">
                                            <Image
                                                src={asset.src}
                                                alt={asset.title}
                                                width={500}
                                                height={300}
                                                className="max-w-full h-auto object-contain"
                                            />
                                        </div>

                                        {/* Info Footer */}
                                        <div className={`p-6 border-t ${asset.background === 'dark'
                                                ? 'border-white/5 bg-black/50'
                                                : 'border-black/5 bg-gray-50'
                                            }`}>
                                            <h3 className={`text-lg font-bold mb-2 ${asset.background === 'dark' ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                {asset.title}
                                            </h3>
                                            <p className={`text-sm mb-4 ${asset.background === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                {asset.description}
                                            </p>
                                            <a
                                                href={asset.src}
                                                download
                                                className={`inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase ${asset.background === 'dark'
                                                        ? 'text-oxot-gold hover:text-amber-300'
                                                        : 'text-amber-700 hover:text-amber-600'
                                                    } transition-colors`}
                                            >
                                                <Download className="w-3 h-3" />
                                                Download SVG
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Usage Guidelines */}
                <section className="py-32 border-t border-white/5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">Usage Guidelines</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Do's */}
                            <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-sm">✓</span>
                                    Do
                                </h3>
                                <ul className="space-y-4 text-gray-400">
                                    <li className="flex gap-3">
                                        <span className="text-green-400">•</span>
                                        Use dark logo variant on dark backgrounds
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-green-400">•</span>
                                        Maintain minimum clear space around logo
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-green-400">•</span>
                                        Use official OXOT Gold (#C9A227) for accents
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-green-400">•</span>
                                        Apply Report Template to formal documents
                                    </li>
                                </ul>
                            </div>

                            {/* Don'ts */}
                            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-sm">✕</span>
                                    Don&apos;t
                                </h3>
                                <ul className="space-y-4 text-gray-400">
                                    <li className="flex gap-3">
                                        <span className="text-red-400">•</span>
                                        Stretch, rotate, or distort the logo
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400">•</span>
                                        Use unauthorized color variations
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400">•</span>
                                        Place logo on busy or low-contrast backgrounds
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400">•</span>
                                        Combine with competing visual elements
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Contact CTA */}
                <section className="py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-oxot-gold/5 to-amber-900/10 border border-oxot-gold/20 rounded-3xl p-12"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Need Custom Assets?</h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            For specialized applications, co-branding requests, or high-resolution assets,
                            contact the OXOT brand team.
                        </p>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-oxot-gold text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
                        >
                            Contact Brand Team
                        </Link>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
