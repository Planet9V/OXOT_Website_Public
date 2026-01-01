'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Clock, Calendar, ArrowRight, CheckCircle, AlertTriangle,
    Target, Layers, TrendingUp, Play, Pause
} from 'lucide-react';
import Link from 'next/link';
import { services, ServiceData } from '@/data/services-portfolio';
import { BackgroundEffect } from '@/components/BackgroundEffect';
import { PageHeader } from '@/components/branding/PageHeader';

// Timeline milestones
const MILESTONES = [
    { month: 3, label: '3 Months', color: 'bg-blue-500' },
    { month: 9, label: '9 Months', color: 'bg-amber-500' },
    { month: 12, label: '1 Year', color: 'bg-green-500' }
];

export default function ServicesTimelinePage() {
    const [selectedServices, setSelectedServices] = useState<number[]>([1, 4, 7, 11]); // Default P1 services
    const [viewMode, setViewMode] = useState<'gantt' | 'list'>('gantt');

    const selectedServiceData = useMemo(() => {
        return services.filter(s => selectedServices.includes(s.id));
    }, [selectedServices]);

    const toggleService = (id: number) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Group services by readiness for implementation order
    const implementationOrder = useMemo(() => {
        return [...selectedServiceData].sort((a, b) => b.readiness - a.readiness);
    }, [selectedServiceData]);

    return (
        <div className="min-h-screen">
            <BackgroundEffect />

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                {/* Header */}
                <PageHeader
                    title="IMPLEMENTATION TIMELINE"
                    subtitle="Project Roadmap // Resource Planning"
                    variant="default"
                    accent="blue"
                />

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/corporate/services-portfolio" className="hover:text-white transition-colors">
                        Services Portfolio
                    </Link>
                    <ArrowRight size={14} />
                    <span className="text-white">Implementation Timeline</span>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('gantt')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'gantt' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                                }`}
                        >
                            Gantt View
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                                }`}
                        >
                            List View
                        </button>
                    </div>

                    <div className="text-sm text-gray-400">
                        {selectedServices.length} services selected
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Service Selector */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 sticky top-24">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Layers size={16} /> Select Services
                            </h3>
                            <div className="space-y-2 max-h-[500px] overflow-y-auto">
                                {services.map((service) => {
                                    const isSelected = selectedServices.includes(service.id);
                                    return (
                                        <button
                                            key={service.id}
                                            onClick={() => toggleService(service.id)}
                                            className={`w-full text-left p-3 rounded-lg border transition-all ${isSelected
                                                ? 'bg-blue-500/20 border-blue-500/50'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className={`text-sm ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                                                    {service.name}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded ${service.priority === 'P1' ? 'bg-green-500/20 text-green-400' :
                                                    service.priority === 'P2' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-gray-500/20 text-gray-400'
                                                    }`}>
                                                    {service.priority}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Timeline View */}
                    <div className="lg:col-span-3">
                        {viewMode === 'gantt' ? (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                                    <Calendar size={18} /> Implementation Gantt
                                </h3>

                                {/* Timeline Header */}
                                <div className="flex border-b border-white/10 pb-4 mb-4">
                                    <div className="w-1/3 text-sm text-gray-500 font-medium">Service</div>
                                    <div className="w-2/3 flex">
                                        {MILESTONES.map((m) => (
                                            <div key={m.month} className="flex-1 text-center text-xs text-gray-500">
                                                {m.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Timeline Rows */}
                                <div className="space-y-3">
                                    {implementationOrder.map((service, index) => {
                                        // Calculate bar position based on timeline
                                        const startMonth = 0;
                                        const endMonth = service.timeline.threeMonths.toLowerCase().includes('production') ? 3 :
                                            service.timeline.nineMonths.toLowerCase().includes('production') ? 9 : 12;

                                        return (
                                            <motion.div
                                                key={service.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="flex items-center"
                                            >
                                                <div className="w-1/3 pr-4">
                                                    <div className="text-sm font-medium text-white truncate">
                                                        {service.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        Readiness: {service.readiness}/5
                                                    </div>
                                                </div>
                                                <div className="w-2/3 flex items-center h-10 bg-white/5 rounded-lg relative">
                                                    {/* Progress bar */}
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(endMonth / 12) * 100}%` }}
                                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                                        className={`absolute left-0 h-6 rounded ${service.tier === 'Gold' ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                                                            service.tier === 'Blue' ? 'bg-gradient-to-r from-blue-600 to-blue-400' :
                                                                'bg-gradient-to-r from-red-600 to-red-400'
                                                            }`}
                                                        style={{ top: '50%', transform: 'translateY(-50%)' }}
                                                    />

                                                    {/* Milestone markers */}
                                                    {MILESTONES.map((m) => (
                                                        <div
                                                            key={m.month}
                                                            className="absolute h-full border-l border-white/20"
                                                            style={{ left: `${(m.month / 12) * 100}%` }}
                                                        />
                                                    ))}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {selectedServiceData.length === 0 && (
                                    <div className="text-center py-12 text-gray-500">
                                        Select services to view timeline
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* List View */
                            <div className="space-y-4">
                                {implementationOrder.map((service, index) => (
                                    <motion.div
                                        key={service.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white/5 border border-white/10 rounded-xl p-6"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{service.name}</h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className={`text-xs px-2 py-0.5 rounded ${service.tier === 'Gold' ? 'bg-amber-500/20 text-amber-400' :
                                                        service.tier === 'Blue' ? 'bg-blue-500/20 text-blue-400' :
                                                            'bg-red-500/20 text-red-400'
                                                        }`}>
                                                        {service.tier}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        Readiness: {service.readiness}/5
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={`text-xs font-bold px-3 py-1 rounded ${service.priority === 'P1' ? 'bg-green-500/20 text-green-400' :
                                                service.priority === 'P2' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {service.priority}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Clock size={14} className="text-blue-400" />
                                                    <span className="text-xs text-blue-400 font-medium">3 Months</span>
                                                </div>
                                                <p className="text-sm text-gray-300">{service.timeline.threeMonths}</p>
                                            </div>
                                            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Clock size={14} className="text-amber-400" />
                                                    <span className="text-xs text-amber-400 font-medium">9 Months</span>
                                                </div>
                                                <p className="text-sm text-gray-300">{service.timeline.nineMonths}</p>
                                            </div>
                                            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Clock size={14} className="text-green-400" />
                                                    <span className="text-xs text-green-400 font-medium">1 Year</span>
                                                </div>
                                                <p className="text-sm text-gray-300">{service.timeline.oneYear}</p>
                                            </div>
                                        </div>

                                        {service.integration && (
                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                <div className="text-xs text-gray-500 mb-2">Required Integrations:</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {service.integration.map((int, i) => (
                                                        <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded text-gray-300">
                                                            {int}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Summary */}
                        {selectedServiceData.length > 0 && (
                            <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Recommended Implementation Order</h4>
                                        <p className="text-sm text-gray-400">
                                            Based on readiness levels and dependencies
                                        </p>
                                    </div>
                                    <Link
                                        href="/corporate/services-portfolio"
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors"
                                    >
                                        Configure Portfolio
                                    </Link>
                                </div>

                                <div className="mt-4 flex items-center gap-2 flex-wrap">
                                    {implementationOrder.map((s, i) => (
                                        <React.Fragment key={s.id}>
                                            <span className="px-3 py-1 bg-white/10 rounded text-sm text-white">
                                                {i + 1}. {s.name}
                                            </span>
                                            {i < implementationOrder.length - 1 && (
                                                <ArrowRight size={14} className="text-gray-500" />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
