'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign, Users, Building2, Calculator, TrendingUp,
    ChevronDown, ChevronUp, RotateCcw, Download, Sparkles,
    Shield, Target, Clock, Check, X
} from 'lucide-react';
import { services, ServiceData, calculateTotalARR } from '@/data/services-portfolio';

export interface ProjectConfig {
    portfolioName?: string;
    clientSize: 'small' | 'medium' | 'enterprise';
    contractLength: 12 | 24 | 36; // months
    paymentTerms: 'annual' | 'quarterly' | 'monthly';
    pilotDiscount: boolean;
    bundleDiscount: boolean;
    timelineDay?: number;
}

export interface SelectedService {
    service: ServiceData;
    customPrice?: number;
    customName?: string;
    notes?: string;
}

interface ServicePricingCalculatorProps {
    selectedServices: Map<number, SelectedService>;
    config: ProjectConfig;
    setConfig: (config: ProjectConfig) => void;
    onUpdatePrice: (serviceId: number, price: number | undefined) => void;
    onUpdateName: (serviceId: number, name: string) => void;
    onToggleService: (service: ServiceData) => void; // Provided by parent to remove
    onReset: () => void;
}


export default function ServicePricingCalculator({
    selectedServices,
    config,
    setConfig,
    onUpdatePrice,
    onUpdateName,
    onToggleService,
    onReset
}: ServicePricingCalculatorProps) {
    // Internal state only for UI toggles, not business logic
    const [expandedService, setExpandedService] = useState<number | null>(null);
    const [showTimeline, setShowTimeline] = useState(true);


    // Calculate totals
    const calculations = useMemo(() => {
        const selected = Array.from(selectedServices.values());

        // Base annual value
        let baseAnnual = selected.reduce((total, item) => {
            if (item.customPrice) return total + item.customPrice;
            const pricing = item.service.pricing[config.clientSize];
            return total + (pricing.min + pricing.max) / 2;
        }, 0);

        // Apply discounts
        let discountRate = 0;
        if (config.pilotDiscount) discountRate += 0.15; // 15% pilot discount
        if (config.bundleDiscount && selected.length >= 3) discountRate += 0.10; // 10% bundle
        if (config.contractLength >= 36) discountRate += 0.08; // 8% for 3-year
        else if (config.contractLength >= 24) discountRate += 0.05; // 5% for 2-year

        const discountAmount = baseAnnual * discountRate;
        const annualValue = baseAnnual - discountAmount;
        const totalContractValue = annualValue * (config.contractLength / 12);

        // Payment schedule
        let paymentAmount = 0;
        let paymentFrequency = '';
        switch (config.paymentTerms) {
            case 'annual':
                paymentAmount = annualValue;
                paymentFrequency = 'per year';
                break;
            case 'quarterly':
                paymentAmount = annualValue / 4;
                paymentFrequency = 'per quarter';
                break;
            case 'monthly':
                paymentAmount = annualValue / 12;
                paymentFrequency = 'per month';
                break;
        }

        return {
            baseAnnual,
            discountRate,
            discountAmount,
            annualValue,
            totalContractValue,
            paymentAmount,
            paymentFrequency,
            serviceCount: selected.length
        };
    }, [selectedServices, config]);

    // State management functions toggleService, updateServicePrice, resetAll removed
    // They are now passed as props: onToggleService, onUpdatePrice, onReset


    const tierGroups = {
        Gold: services.filter(s => s.tier === 'Gold'),
        Blue: services.filter(s => s.tier === 'Blue'),
        Red: services.filter(s => s.tier === 'Red')
    };

    const tierColors = {
        Gold: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
        Blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
        Red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' }
    };

    return (
        <div className="space-y-8">
            {/* Header with Reset */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Project Configuration</h3>
                    <p className="text-gray-400 text-sm">Model service packages and define portfolio identity</p>
                </div>
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 transition-all"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Panel: Service Selection */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Portfolio Name Input */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <label className="block text-sm text-gray-400 mb-2">Portfolio Name</label>
                        <input
                            type="text"
                            value={config.portfolioName || ''}
                            onChange={(e) => setConfig({ ...config, portfolioName: e.target.value })}
                            placeholder="e.g. Q1 2025 Cyber Defense Strategy"
                            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-blue-500/50 outline-none font-medium text-lg placeholder:text-gray-600"
                        />
                    </div>

                    {/* Configuration Panel */}
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-amber-400" />
                            Project Configuration
                        </h4>

                        {/* Global Settings Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Client Size */}
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                    Client Size
                                </label>
                                <select
                                    value={config.clientSize}
                                    onChange={(e) => setConfig({ ...config, clientSize: e.target.value as any })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-amber-500/50 outline-none"
                                >
                                    <option value="small">Small (&lt;500 employees)</option>
                                    <option value="medium">Medium (500-5,000)</option>
                                    <option value="enterprise">Enterprise (5,000+)</option>
                                </select>
                            </div>

                            {/* Contract Length */}
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                    Contract Length
                                </label>
                                <select
                                    value={config.contractLength}
                                    onChange={(e) => setConfig({ ...config, contractLength: parseInt(e.target.value) as any })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-amber-500/50 outline-none"
                                >
                                    <option value={12}>12 Months</option>
                                    <option value={24}>24 Months (+5% discount)</option>
                                    <option value={36}>36 Months (+8% discount)</option>
                                </select>
                            </div>

                            {/* Payment Terms */}
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                    Payment Terms
                                </label>
                                <select
                                    value={config.paymentTerms}
                                    onChange={(e) => setConfig({ ...config, paymentTerms: e.target.value as any })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-amber-500/50 outline-none"
                                >
                                    <option value="annual">Annual</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>

                            {/* Discounts */}
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                    Discount Options
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={config.pilotDiscount}
                                            onChange={(e) => setConfig({ ...config, pilotDiscount: e.target.checked })}
                                            className="w-4 h-4 rounded border-white/20 bg-black/50 text-amber-500 focus:ring-amber-500"
                                        />
                                        <span className="text-sm text-gray-300">Pilot Program (-15%)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={config.bundleDiscount}
                                            onChange={(e) => setConfig({ ...config, bundleDiscount: e.target.checked })}
                                            className="w-4 h-4 rounded border-white/20 bg-black/50 text-amber-500 focus:ring-amber-500"
                                        />
                                        <span className="text-sm text-gray-300">Bundle (3+ services, -10%)</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Service Selection by Tier */}
                    {(['Gold', 'Blue', 'Red'] as const).map(tier => (
                        <div key={tier} className={`p-6 rounded-2xl ${tierColors[tier].bg} border ${tierColors[tier].border}`}>
                            <h4 className={`text-lg font-bold ${tierColors[tier].text} mb-4 flex items-center gap-2`}>
                                {tier === 'Gold' && <Sparkles className="w-5 h-5" />}
                                {tier === 'Blue' && <Shield className="w-5 h-5" />}
                                {tier === 'Red' && <Target className="w-5 h-5" />}
                                {tier} Tier Services
                            </h4>

                            <div className="space-y-3">
                                {tierGroups[tier].map(service => {
                                    const isSelected = selectedServices.has(service.id);
                                    const isExpanded = expandedService === service.id;
                                    const pricing = service.pricing[config.clientSize];
                                    const selectedItem = selectedServices.get(service.id);
                                    const displayPrice = selectedItem?.customPrice ?? (pricing.min + pricing.max) / 2;

                                    return (
                                        <div key={service.id} className="bg-black/30 rounded-xl overflow-hidden">
                                            {/* Service Row */}
                                            <div
                                                className={`p-4 flex items-center gap-4 cursor-pointer transition-all ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'
                                                    }`}
                                                onClick={() => onToggleService(service)}
                                            >
                                                {/* Checkbox */}
                                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isSelected
                                                    ? `${tierColors[tier].border.replace('border-', 'border-').replace('/30', '')} bg-${tier.toLowerCase() === 'gold' ? 'amber' : tier.toLowerCase()}-500/20`
                                                    : 'border-white/20'
                                                    }`}>
                                                    {isSelected && <Check className={`w-4 h-4 ${tierColors[tier].text}`} />}
                                                </div>

                                                {/* Service Info / Rename Input */}
                                                <div className="flex-1 min-w-0">
                                                    {isSelected ? (
                                                        <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                                                            <input
                                                                type="text"
                                                                value={selectedItem?.customName ?? service.name}
                                                                onChange={(e) => onUpdateName(service.id, e.target.value)}
                                                                placeholder="Service Name"
                                                                className="bg-transparent border-b border-white/20 focus:border-blue-500 text-white font-medium text-sm w-full py-1 outline-none"
                                                            />
                                                            <span className="text-xs text-blue-400/80">
                                                                ID: {service.id} · Original: {service.name}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <span className="font-medium text-white">{service.name}</span>
                                                            <span className={`text-xs px-2 py-0.5 rounded ${service.priority === 'P1' ? 'bg-green-500/20 text-green-400' :
                                                                service.priority === 'P2' ? 'bg-blue-500/20 text-blue-400' :
                                                                    'bg-gray-500/20 text-gray-400'
                                                                }`}>
                                                                {service.priority}
                                                            </span>
                                                            <div className="text-xs text-gray-500 truncate">{service.description}</div>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Price Range */}
                                                <div className="text-right">
                                                    <div className="text-sm font-mono text-amber-400">
                                                        €{(pricing.min / 1000).toFixed(0)}K - €{(pricing.max / 1000).toFixed(0)}K
                                                    </div>
                                                    <div className="text-xs text-gray-500">per year</div>
                                                </div>

                                                {/* Expand Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setExpandedService(isExpanded ? null : service.id);
                                                    }}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                                                >
                                                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                                </button>
                                            </div>

                                            {/* Expanded Details */}
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-4 pb-4 border-t border-white/10"
                                                >
                                                    <div className="pt-4 grid md:grid-cols-2 gap-4">
                                                        {/* Custom Price Override */}
                                                        {isSelected && (
                                                            <div>
                                                                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                                                    Custom Price (€/year)
                                                                </label>
                                                                <div className="flex items-center gap-2">
                                                                    <input
                                                                        type="number"
                                                                        value={selectedItem?.customPrice ?? ''}
                                                                        onChange={(e) => onUpdatePrice(service.id, e.target.value ? parseInt(e.target.value) : undefined)}
                                                                        placeholder={`${displayPrice.toLocaleString()}`}
                                                                        className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-amber-500/50 outline-none font-mono"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    />
                                                                    {selectedItem?.customPrice && (
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                onUpdatePrice(service.id, undefined);
                                                                            }}
                                                                            className="p-2 hover:bg-white/10 rounded-lg"
                                                                        >
                                                                            <X className="w-4 h-4 text-gray-400" />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Timeline */}
                                                        <div className={isSelected ? '' : 'md:col-span-2'}>
                                                            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                                                Implementation Timeline
                                                            </label>
                                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                                <div className="p-2 bg-green-500/10 rounded-lg">
                                                                    <div className="text-xs text-gray-500">3 Months</div>
                                                                    <div className="text-sm text-green-400">{service.timeline.threeMonths}</div>
                                                                </div>
                                                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                                                    <div className="text-xs text-gray-500">9 Months</div>
                                                                    <div className="text-sm text-blue-400">{service.timeline.nineMonths}</div>
                                                                </div>
                                                                <div className="p-2 bg-amber-500/10 rounded-lg">
                                                                    <div className="text-xs text-gray-500">1 Year</div>
                                                                    <div className="text-sm text-amber-400">{service.timeline.oneYear}</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Business & Technical Details */}
                                                        {service.details && (
                                                            <div className="md:col-span-2 space-y-4 pt-2 border-t border-white/5">
                                                                <div>
                                                                    <label className="text-xs text-oxot-gold uppercase tracking-wider block mb-2">
                                                                        Strategic Context
                                                                    </label>
                                                                    <p className="text-sm text-gray-400 leading-relaxed">{service.details.business}</p>
                                                                </div>
                                                                <div>
                                                                    <label className="text-xs text-oxot-blue uppercase tracking-wider block mb-2">
                                                                        Technical Architecture
                                                                    </label>
                                                                    <p className="text-sm text-gray-400 leading-relaxed">
                                                                        {service.details.technical.split('**').map((part, i) =>
                                                                            i % 2 === 1 ? <strong key={i} className="text-gray-200">{part}</strong> : part
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Financial Impact */}
                                                        <div className="md:col-span-2">
                                                            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                                                Financial Impact
                                                            </label>
                                                            <div className="space-y-1">
                                                                {service.financialImpact.map((impact, i) => (
                                                                    <div key={i} className="flex items-center justify-between text-sm">
                                                                        <span className="text-gray-400">{impact.metric}</span>
                                                                        <span className="text-green-400">{impact.improvement}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Competitors */}
                                                        <div className="md:col-span-2">
                                                            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                                                                Competitive Landscape
                                                            </label>
                                                            <div className="flex flex-wrap gap-2">
                                                                {service.competitors.map((comp, i) => (
                                                                    <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                                                                        {comp}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <p className="text-xs text-amber-400 mt-2">
                                                                Differentiator: {service.differentiator}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Panel: Summary */}
                <div className="space-y-6">
                    {/* Sticky Summary */}
                    <div className="sticky top-24 space-y-6">
                        {/* Value Summary */}
                        <div className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-2xl">
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-amber-400" />
                                Project Summary
                            </h4>

                            {calculations.serviceCount > 0 ? (
                                <div className="space-y-4">
                                    {/* Selected Count */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Services Selected</span>
                                        <span className="text-xl font-bold text-white">{calculations.serviceCount}</span>
                                    </div>

                                    {/* Base Annual */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Base Annual Value</span>
                                        <span className="text-lg font-mono text-gray-300">
                                            €{calculations.baseAnnual.toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Discount */}
                                    {calculations.discountRate > 0 && (
                                        <div className="flex justify-between items-center text-green-400">
                                            <span>Discount ({(calculations.discountRate * 100).toFixed(0)}%)</span>
                                            <span className="font-mono">-€{calculations.discountAmount.toLocaleString()}</span>
                                        </div>
                                    )}

                                    <div className="border-t border-white/10 pt-4">
                                        {/* Annual Value */}
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Annual Value</span>
                                            <span className="text-2xl font-bold text-amber-400 font-mono">
                                                €{calculations.annualValue.toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Total Contract */}
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-gray-400">Total Contract ({config.contractLength} mo)</span>
                                            <span className="text-lg font-mono text-white">
                                                €{calculations.totalContractValue.toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Payment Schedule */}
                                        <div className="flex justify-between items-center mt-4 p-3 bg-black/30 rounded-lg">
                                            <span className="text-gray-400">Payment</span>
                                            <div className="text-right">
                                                <div className="text-lg font-mono text-green-400">
                                                    €{calculations.paymentAmount.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">{calculations.paymentFrequency}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                    <p>Select services to calculate pricing</p>
                                </div>
                            )}
                        </div>

                        {/* Selected Services List */}
                        {calculations.serviceCount > 0 && (
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                                    Selected Services
                                </h4>
                                <div className="space-y-2">
                                    {Array.from(selectedServices.values()).map(({ service, customPrice }) => {
                                        const pricing = service.pricing[config.clientSize];
                                        const displayPrice = customPrice ?? (pricing.min + pricing.max) / 2;
                                        return (
                                            <div key={service.id} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="w-2 h-2 rounded-full"
                                                        style={{ backgroundColor: service.tierColor }}
                                                    />
                                                    <span className="text-gray-300 truncate max-w-[150px]">{service.name}</span>
                                                </div>
                                                <span className="text-gray-400 font-mono">
                                                    €{(displayPrice / 1000).toFixed(0)}K
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500/20 border border-amber-500/40 rounded-lg text-amber-400 hover:bg-amber-500/30 transition-all">
                                <Download className="w-4 h-4" />
                                Export Proposal
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Visualization */}
            {/* Timeline Visualization */}
            {calculations.serviceCount > 0 && showTimeline && (
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-400" />
                            Implementation Timeline
                        </h4>
                        <button
                            onClick={() => setShowTimeline(!showTimeline)}
                            className="text-xs text-gray-500 hover:text-gray-400"
                        >
                            {showTimeline ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Interactive Slider */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Project Duration</span>
                                <span className="text-amber-400 font-mono font-bold">{config.timelineDay || 30} Days</span>
                            </div>
                            <input
                                type="range"
                                min="30"
                                max="365"
                                step="30"
                                value={config.timelineDay || 30}
                                onChange={(e) => setConfig({ ...config, timelineDay: parseInt(e.target.value) })}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400"
                            />
                            <div className="flex justify-between text-xs text-gray-600 mt-1 font-mono">
                                <span>Day 30</span>
                                <span>Day 90 (Q1)</span>
                                <span>Day 180 (Q2)</span>
                                <span>Day 270 (Q3)</span>
                                <span>Day 365 (Y1)</span>
                            </div>
                        </div>

                        {/* Dynamic Status Grid */}
                        <div className="grid gap-3">
                            <div className="grid grid-cols-12 gap-4 text-xs text-gray-500 uppercase tracking-wider px-4">
                                <div className="col-span-4">Service</div>
                                <div className="col-span-8">Status at {(config.timelineDay || 30)} Days</div>
                            </div>

                            {Array.from(selectedServices.values()).map(({ service }) => {
                                const days = config.timelineDay || 30;
                                let status = "Initiating Deployment";
                                let statusColor = "text-gray-400";
                                let progress = 10;
                                let phase = "Phase 0";

                                if (days >= 365) {
                                    status = service.timeline.oneYear;
                                    statusColor = "text-amber-400";
                                    progress = 100;
                                    phase = "Phase 3 (Maturity)";
                                } else if (days >= 270) {
                                    status = service.timeline.nineMonths;
                                    statusColor = "text-blue-400";
                                    progress = 75;
                                    phase = "Phase 2 (Expansion)";
                                } else if (days >= 90) {
                                    status = service.timeline.threeMonths;
                                    statusColor = "text-green-400";
                                    progress = 25 + ((days - 90) / 180) * 50; // Linear interpolation between 90 and 270
                                    phase = "Phase 1 (Operational)";
                                } else {
                                    progress = (days / 90) * 25;
                                }

                                return (
                                    <div key={service.id} className="bg-black/30 rounded-xl p-4 grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-4 border-r border-white/10 pr-4">
                                            <div className="text-sm font-bold text-gray-200 truncate">{service.name}</div>
                                            <div className="items-center gap-2 mt-1 hidden md:flex">
                                                <div className="w-full bg-white/10 rounded-full h-1.5">
                                                    <div
                                                        className="bg-gradient-to-r from-blue-600 to-blue-400 h-1.5 rounded-full transition-all duration-500"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-[10px] text-gray-500 font-mono w-8 text-right">{progress.toFixed(0)}%</span>
                                            </div>
                                        </div>
                                        <div className="col-span-8 pl-2">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-gray-500 font-mono">{phase}</span>
                                            </div>
                                            <div className={`text-sm ${statusColor} transition-colors duration-300`}>
                                                {status}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
