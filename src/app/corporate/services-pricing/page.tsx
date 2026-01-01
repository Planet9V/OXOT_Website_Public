'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign, Globe, TrendingUp, Calculator, ArrowRight,
    Building, Users, Building2, CheckCircle, Info, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { services, regions, getRegionalPrice, formatPrice, ServiceData } from '@/data/services-portfolio';
import { BackgroundEffect } from '@/components/BackgroundEffect';
import { PageHeader } from '@/components/branding/PageHeader';

export default function ServicesPricingPage() {
    const [selectedRegion, setSelectedRegion] = useState<string>('EU');
    const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'enterprise'>('medium');
    const [selectedServices, setSelectedServices] = useState<number[]>([]);

    const region = regions[selectedRegion];

    // Calculate ROI projections
    const calculations = useMemo(() => {
        const selected = services.filter(s => selectedServices.includes(s.id));

        let totalMin = 0;
        let totalMax = 0;

        selected.forEach(s => {
            const price = getRegionalPrice(s, selectedRegion, selectedSize);
            totalMin += price.min;
            totalMax += price.max;
        });

        // Calculate potential savings from financial impact
        let estimatedSavings = 0;
        selected.forEach(s => {
            s.financialImpact.forEach(impact => {
                // Extract percentage improvements
                const match = impact.improvement.match(/(\d+)/);
                if (match) {
                    const percent = parseInt(match[1]);
                    // Estimate savings based on improvement (simplified)
                    estimatedSavings += (totalMin * percent / 100) * 0.5;
                }
            });
        });

        return {
            totalMin,
            totalMax,
            avgTotal: (totalMin + totalMax) / 2,
            estimatedSavings: Math.round(estimatedSavings),
            roi: totalMin > 0 ? Math.round((estimatedSavings / totalMin) * 100) : 0,
            selected
        };
    }, [selectedServices, selectedRegion, selectedSize]);

    const toggleService = (id: number) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen">
            <BackgroundEffect />

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                {/* Header */}
                <PageHeader
                    title="PRICING CALCULATOR"
                    subtitle="Regional Pricing Matrix // Financial Decision Support"
                    variant="default"
                    accent="gold"
                />

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/corporate/services-portfolio" className="hover:text-white transition-colors">
                        Services Portfolio
                    </Link>
                    <ArrowRight size={14} />
                    <span className="text-white">Pricing Calculator</span>
                </div>

                {/* Controls */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {/* Region Selector */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Globe className="text-oxot-gold" size={20} />
                            <span className="font-bold text-white">Select Region</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.values(regions).map((r) => (
                                <button
                                    key={r.id}
                                    onClick={() => setSelectedRegion(r.id)}
                                    className={`p-4 rounded-lg border transition-all ${selectedRegion === r.id
                                        ? 'bg-oxot-gold/20 border-oxot-gold/50 text-white'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="font-bold">{r.name}</div>
                                    <div className="text-sm font-mono">
                                        {r.symbol} {r.currency}
                                        {r.multiplier !== 1 && (
                                            <span className="ml-2 text-green-400">
                                                ({Math.round((1 - r.multiplier) * 100)}% discount)
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Client Size Selector */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Building className="text-oxot-gold" size={20} />
                            <span className="font-bold text-white">Organization Size</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => setSelectedSize('small')}
                                className={`p-4 rounded-lg border transition-all text-center ${selectedSize === 'small'
                                    ? 'bg-oxot-gold/20 border-oxot-gold/50'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                <Users className={`mx-auto mb-2 ${selectedSize === 'small' ? 'text-oxot-gold' : 'text-gray-400'}`} size={24} />
                                <div className="font-bold text-white text-sm">SMB</div>
                                <div className="text-xs text-gray-500">&lt;500 employees</div>
                            </button>
                            <button
                                onClick={() => setSelectedSize('medium')}
                                className={`p-4 rounded-lg border transition-all text-center ${selectedSize === 'medium'
                                    ? 'bg-oxot-gold/20 border-oxot-gold/50'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                <Building2 className={`mx-auto mb-2 ${selectedSize === 'medium' ? 'text-oxot-gold' : 'text-gray-400'}`} size={24} />
                                <div className="font-bold text-white text-sm">Mid-Market</div>
                                <div className="text-xs text-gray-500">500-5,000</div>
                            </button>
                            <button
                                onClick={() => setSelectedSize('enterprise')}
                                className={`p-4 rounded-lg border transition-all text-center ${selectedSize === 'enterprise'
                                    ? 'bg-oxot-gold/20 border-oxot-gold/50'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                <Building className={`mx-auto mb-2 ${selectedSize === 'enterprise' ? 'text-oxot-gold' : 'text-gray-400'}`} size={24} />
                                <div className="font-bold text-white text-sm">Enterprise</div>
                                <div className="text-xs text-gray-500">&gt;5,000</div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing Matrix */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Calculator className="text-oxot-gold" />
                        Service Pricing Matrix
                    </h3>

                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500">Service</th>
                                    <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500">Tier</th>
                                    <th className="text-right p-4 text-xs uppercase tracking-wider text-gray-500">Min</th>
                                    <th className="text-right p-4 text-xs uppercase tracking-wider text-gray-500">Max</th>
                                    <th className="text-center p-4 text-xs uppercase tracking-wider text-gray-500">Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service) => {
                                    const price = getRegionalPrice(service, selectedRegion, selectedSize);
                                    const isSelected = selectedServices.includes(service.id);

                                    return (
                                        <tr
                                            key={service.id}
                                            className={`border-b border-white/5 hover:bg-white/5 transition-colors ${isSelected ? 'bg-oxot-gold/10' : ''
                                                }`}
                                        >
                                            <td className="p-4">
                                                <div className="font-medium text-white">{service.name}</div>
                                                <div className="text-xs text-gray-500">{service.research}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-xs font-bold px-2 py-1 rounded ${service.tier === 'Gold' ? 'bg-amber-500/20 text-amber-400' :
                                                    service.tier === 'Blue' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {service.tier}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right font-mono text-white">
                                                {formatPrice(price.min, price.symbol)}
                                            </td>
                                            <td className="p-4 text-right font-mono text-white">
                                                {formatPrice(price.max, price.symbol)}
                                            </td>
                                            <td className="p-4 text-center">
                                                <button
                                                    onClick={() => toggleService(service.id)}
                                                    className={`p-2 rounded-lg transition-colors ${isSelected
                                                        ? 'bg-oxot-gold text-black'
                                                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                                                        }`}
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Card */}
                {selectedServices.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-oxot-gold/20 to-transparent border border-oxot-gold/30 rounded-2xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Investment Summary</h3>

                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Selected Services</div>
                                <div className="text-3xl font-bold text-white">{calculations.selected.length}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Annual Investment (Est.)</div>
                                <div className="text-3xl font-mono font-bold text-oxot-gold">
                                    {formatPrice(calculations.avgTotal, region.symbol)}
                                </div>
                                <div className="text-xs text-gray-500">
                                    Range: {formatPrice(calculations.totalMin, region.symbol)} - {formatPrice(calculations.totalMax, region.symbol)}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Est. Annual Savings</div>
                                <div className="text-3xl font-mono font-bold text-green-400">
                                    {formatPrice(calculations.estimatedSavings, region.symbol)}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Projected ROI</div>
                                <div className="text-3xl font-bold text-blue-400">
                                    {calculations.roi}%
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Info size={14} />
                                ROI calculations are estimates based on industry averages
                            </div>
                            <Link
                                href="/corporate/services-portfolio"
                                className="px-6 py-2 bg-oxot-gold hover:bg-oxot-gold-light text-black font-bold rounded-lg transition-colors"
                            >
                                Build Full Portfolio
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
