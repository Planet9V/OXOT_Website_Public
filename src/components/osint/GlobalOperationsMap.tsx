"use client";

import React, { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, ZoomableGroupProps } from "react-simple-maps";
import { OFI_ASSETS, OFILocation, AssetType } from '@/data/ofi-locations';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Factory, Coffee, Bean, Briefcase,
    Droplet, Sprout, Network, Shield,
    AlertTriangle, Server, Users, X,
    Maximize2, Minimize2
} from 'lucide-react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Theme Colors
const COLORS: Record<AssetType, string> = {
    'Cocoa': '#FFA500',   // Orange
    'Coffee': '#8B4513',  // Brown
    'Nuts': '#DEB887',    // Tan
    'Spices': '#FF4500',  // Red Orange
    'Dairy': '#00FFFF',   // Cyan
    'Innovation': '#1E90FF', // Dodger Blue
    'Agri': '#32CD32',    // Lime Green
    'Corporate': '#808080' // Grey
};

const ICONS: Record<AssetType, React.ReactNode> = {
    'Cocoa': <Bean size={16} />,
    'Coffee': <Coffee size={16} />,
    'Nuts': <div className="text-[10px] font-bold">N</div>,
    'Spices': <Sprout size={16} />,
    'Dairy': <Droplet size={16} />,
    'Innovation': <Network size={16} />,
    'Agri': <Factory size={16} />,
    'Corporate': <Briefcase size={16} />
};

export default function GlobalOperationsMap() {
    const [selectedAsset, setSelectedAsset] = useState<OFILocation | null>(null);
    const [filter, setFilter] = useState<AssetType | 'All'>('All');
    const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1.2 }); // Start slightly zoomed out

    const filteredAssets = useMemo(() => {
        return filter === 'All'
            ? OFI_ASSETS
            : OFI_ASSETS.filter(a => a.type === filter);
    }, [filter]);

    const handleZoomIn = () => {
        if (position.zoom >= 4) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
    };

    const handleZoomOut = () => {
        if (position.zoom <= 1) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
    };

    const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
        setPosition(position);
    };

    return (
        <div className="relative w-full h-[800px] bg-[#050505] rounded-xl overflow-hidden border border-oxot-blue/20 shadow-2xl">
            {/* Header / Controls */}
            <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/10 max-w-md">
                <h3 className="text-white font-mono text-lg font-bold mb-1 flex items-center gap-2">
                    <Factory className="text-oxot-gold" size={18} />
                    GLOBAL_ASSET_ATLAS
                </h3>
                <p className="text-grey text-xs mb-4">
                    Pan/Zoom enabled. Select a node for Intelligence Dossier.
                </p>

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter('All')}
                        className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold border transition-all ${filter === 'All'
                                ? 'bg-white text-black border-white'
                                : 'bg-transparent text-grey border-white/20 hover:border-white/50'
                            }`}
                    >
                        ALL SYSTEMS
                    </button>
                    {Object.keys(COLORS).map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type as AssetType)}
                            className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold border transition-all flex items-center gap-1 ${filter === type
                                    ? `bg-[${COLORS[type as AssetType]}] text-black border-[${COLORS[type as AssetType]}] opacity-100`
                                    : 'bg-transparent text-grey border-white/20 hover:border-white/50 opacity-70'
                                }`}
                            style={{
                                backgroundColor: filter === type ? COLORS[type as AssetType] : 'transparent',
                                borderColor: filter === type ? COLORS[type as AssetType] : undefined,
                                color: filter === type ? '#000' : undefined
                            }}
                        >
                            {/* Dot indicator */}
                            <span
                                className="w-2 h-2 rounded-full inline-block mr-1"
                                style={{ backgroundColor: COLORS[type as AssetType] }}
                            />
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-8 right-8 z-10 flex flex-col gap-2">
                <button onClick={handleZoomIn} className="p-2 bg-black/80 border border-white/20 rounded text-white hover:bg-white/10">
                    <Maximize2 size={20} />
                </button>
                <button onClick={handleZoomOut} className="p-2 bg-black/80 border border-white/20 rounded text-white hover:bg-white/10">
                    <Minimize2 size={20} />
                </button>
            </div>

            {/* Map Canvas */}
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 150 }}
                className="w-full h-full"
            // Remove bg here, handled by parent div
            >
                <ZoomableGroup
                    center={position.coordinates as [number, number]}
                    zoom={position.zoom}
                    onMoveEnd={handleMoveEnd}
                    maxZoom={4}
                    minZoom={1}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#1a1a1a"
                                    stroke="#333"
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "#2a2a2a", outline: "none" },
                                        pressed: { fill: "#2a2a2a", outline: "none" },
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    {filteredAssets.map((asset) => (
                        <Marker
                            key={asset.id}
                            coordinates={asset.coordinates}
                            onClick={() => setSelectedAsset(asset)}
                        >
                            <g className="cursor-pointer group">
                                {/* Pulse Effect for High Risk or Innovation */}
                                {asset.type === 'Innovation' && (
                                    <circle r={8} fill={COLORS[asset.type]} opacity={0.3}>
                                        <animate
                                            attributeName="r"
                                            from="8"
                                            to="16"
                                            dur="1.5s"
                                            begin="0s"
                                            repeatCount="indefinite"
                                        />
                                        <animate
                                            attributeName="opacity"
                                            from="0.3"
                                            to="0"
                                            dur="1.5s"
                                            begin="0s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                )}

                                <circle
                                    r={4}
                                    fill={COLORS[asset.type]}
                                    stroke="#000"
                                    strokeWidth={1}
                                    className="transition-all duration-300 group-hover:r-6"
                                />

                                {/* Label only on hover/zoom */}
                                <text
                                    textAnchor="middle"
                                    y={-10}
                                    className="text-[4px] font-mono fill-white opacity-0 group-hover:opacity-100 uppercase pointer-events-none"
                                >
                                    {asset.name}
                                </text>
                            </g>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>

            {/* Asset Detail Overlay (Side Panel) */}
            <AnimatePresence>
                {selectedAsset && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute top-0 right-0 h-full w-[400px] bg-black/95 backdrop-blur-xl border-l border-oxot-blue/30 p-6 z-20 overflow-y-auto"
                    >
                        <button
                            onClick={() => setSelectedAsset(null)}
                            className="absolute top-4 right-4 text-grey hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <div className="mt-8">
                            <span
                                className="inline-block px-3 py-1 rounded text-[10px] font-bold uppercase mb-4"
                                style={{ backgroundColor: COLORS[selectedAsset.type] + '20', color: COLORS[selectedAsset.type] }} // 20% opacity bg
                            >
                                {selectedAsset.type} DIVISION
                            </span>

                            <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                                {selectedAsset.name}
                            </h2>
                            <p className="text-grey mb-6 flex items-start gap-2 text-sm">
                                <span className="mt-1 opacity-70">📍</span>
                                {selectedAsset.address}
                            </p>

                            <div className="space-y-6">
                                {/* FUNCTION */}
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <h4 className="text-oxot-gold font-mono text-xs uppercase mb-2">Operational Function</h4>
                                    <p className="text-white text-sm leading-relaxed">
                                        {selectedAsset.function}
                                    </p>
                                </div>

                                {/* KEY PERSONNEL */}
                                <div>
                                    <h4 className="text-blue-400 font-mono text-xs uppercase mb-3 flex items-center gap-2">
                                        <Users size={14} /> Key Personnel
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedAsset.key_personnel.map((p, i) => (
                                            <li key={i} className="text-sm text-grey-light border-b border-white/5 pb-2">
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* TECH STACK */}
                                <div>
                                    <h4 className="text-purple-400 font-mono text-xs uppercase mb-3 flex items-center gap-2">
                                        <Server size={14} /> Technology Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedAsset.technologies.map((t, i) => (
                                            <span key={i} className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* RISKS */}
                                <div>
                                    <h4 className="text-red-400 font-mono text-xs uppercase mb-3 flex items-center gap-2">
                                        <AlertTriangle size={14} /> Known Risks
                                    </h4>
                                    <ul className="list-disc list-inside text-sm text-red-200/80 space-y-1">
                                        {selectedAsset.risks.map((r, i) => (
                                            <li key={i}>{r}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CERTIFICATIONS */}
                                <div>
                                    <h4 className="text-green-400 font-mono text-xs uppercase mb-3 flex items-center gap-2">
                                        <Shield size={14} /> Compliance
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedAsset.certifications.map((c, i) => (
                                            <span key={i} className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-300 text-[10px] rounded">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
