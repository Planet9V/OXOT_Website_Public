'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, FileJson, X, Loader2, Check } from 'lucide-react';
import { ServiceData, regions, getRegionalPrice, formatPrice } from '@/data/services-portfolio';

interface PortfolioExportProps {
    selectedServices: ServiceData[];
    regionId: string;
    clientSize: 'small' | 'medium' | 'enterprise';
    clientName?: string;
    onClose?: () => void;
}

// OXOT Brand Colors
const BRAND = {
    gold: '#D4A418',
    blue: '#0042D6',
    red: '#D60000',
    black: '#0A0A0A',
    white: '#FFFFFF',
    gray: '#6B7280'
};

export default function PortfolioExport({
    selectedServices,
    regionId,
    clientSize,
    clientName = 'Client',
    onClose
}: PortfolioExportProps) {
    const [isExporting, setIsExporting] = useState(false);
    const [exportComplete, setExportComplete] = useState<string | null>(null);

    const region = regions[regionId] || regions.EU;

    // Calculate totals
    const totals = selectedServices.reduce((acc, service) => {
        const price = getRegionalPrice(service, regionId, clientSize);
        return {
            min: acc.min + price.min,
            max: acc.max + price.max,
            count: acc.count + 1,
            goldCount: acc.goldCount + (service.tier === 'Gold' ? 1 : 0),
            blueCount: acc.blueCount + (service.tier === 'Blue' ? 1 : 0),
            redCount: acc.redCount + (service.tier === 'Red' ? 1 : 0)
        };
    }, { min: 0, max: 0, count: 0, goldCount: 0, blueCount: 0, redCount: 0 });

    // Export as JSON
    const exportJSON = () => {
        setIsExporting(true);

        const exportData = {
            exportDate: new Date().toISOString(),
            clientName,
            region: region.name,
            clientSize,
            currency: region.currency,
            services: selectedServices.map(s => {
                const price = getRegionalPrice(s, regionId, clientSize);
                return {
                    id: s.id,
                    name: s.name,
                    tier: s.tier,
                    description: s.description,
                    pricing: {
                        min: price.min,
                        max: price.max,
                        currency: price.currency
                    },
                    timeline: s.timeline,
                    compliance: s.compliance,
                    integration: s.integration,
                    financialImpact: s.financialImpact
                };
            }),
            summary: {
                totalServices: totals.count,
                estimatedAnnualValueMin: totals.min,
                estimatedAnnualValueMax: totals.max,
                tierBreakdown: {
                    gold: totals.goldCount,
                    blue: totals.blueCount,
                    red: totals.redCount
                }
            }
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `OXOT_Portfolio_${clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        setTimeout(() => {
            setIsExporting(false);
            setExportComplete('json');
            setTimeout(() => setExportComplete(null), 2000);
        }, 500);
    };

    // Export as PDF (client-side generation)
    const exportPDF = async () => {
        setIsExporting(true);

        try {
            // Dynamic import of the utility
            const { generatePortfolioPDF } = await import('@/utils/portfolio-pdf');

            await generatePortfolioPDF({
                selectedServices,
                regionId,
                clientSize,
                clientName
            });

            setIsExporting(false);
            setExportComplete('pdf');
            setTimeout(() => setExportComplete(null), 2000);
        } catch (error) {
            console.error('PDF export failed:', error);
            setIsExporting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-lg w-full"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Download className="text-oxot-gold" />
                        Export Portfolio
                    </h2>
                    {onClose && (
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <X className="text-gray-400" />
                        </button>
                    )}
                </div>

                {/* Summary */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-white">{totals.count}</div>
                            <div className="text-xs text-gray-500">Services</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-oxot-gold">
                                {formatPrice((totals.min + totals.max) / 2, region.symbol)}
                            </div>
                            <div className="text-xs text-gray-500">Est. Annual</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{region.name}</div>
                            <div className="text-xs text-gray-500">Region</div>
                        </div>
                    </div>
                </div>

                {/* Export options */}
                <div className="space-y-3">
                    <button
                        onClick={exportPDF}
                        disabled={isExporting || selectedServices.length === 0}
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-oxot-gold/20 to-transparent border border-oxot-gold/30 rounded-xl hover:bg-oxot-gold/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="flex items-center gap-3">
                            <FileText className="text-oxot-gold" />
                            <div className="text-left">
                                <div className="font-bold text-white">Branded PDF Proposal</div>
                                <div className="text-xs text-gray-400">Full proposal with cover page and pricing</div>
                            </div>
                        </div>
                        {isExporting ? (
                            <Loader2 className="text-oxot-gold animate-spin" />
                        ) : exportComplete === 'pdf' ? (
                            <Check className="text-green-400" />
                        ) : (
                            <Download className="text-gray-400" />
                        )}
                    </button>

                    <button
                        onClick={exportJSON}
                        disabled={isExporting || selectedServices.length === 0}
                        className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="flex items-center gap-3">
                            <FileJson className="text-blue-400" />
                            <div className="text-left">
                                <div className="font-bold text-white">JSON Data Export</div>
                                <div className="text-xs text-gray-400">Machine-readable format for integrations</div>
                            </div>
                        </div>
                        {isExporting ? (
                            <Loader2 className="text-blue-400 animate-spin" />
                        ) : exportComplete === 'json' ? (
                            <Check className="text-green-400" />
                        ) : (
                            <Download className="text-gray-400" />
                        )}
                    </button>
                </div>

                {selectedServices.length === 0 && (
                    <div className="mt-4 text-center text-sm text-yellow-500">
                        No services selected. Add services to your portfolio first.
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
