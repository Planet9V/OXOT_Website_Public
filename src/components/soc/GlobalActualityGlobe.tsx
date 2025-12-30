'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Hexagon } from 'lucide-react'

// Dynamic import for Globe to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

interface GlobalActualityGlobeProps {
    onRegionSelect?: (region: string) => void;
}

export default function GlobalActualityGlobe({ onRegionSelect }: GlobalActualityGlobeProps) {
    const globeEl = useRef<any>(null);
    const [mounted, setMounted] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- DATA GENERATION ---

    interface GlobePoint {
        lat: number;
        lng: number;
        size?: number;
        color?: string;
        weight?: number;
    }

    interface GlobeArc {
        startLat: number;
        startLng: number;
        endLat: number;
        endLng: number;
        color: string[];
    }

    // 1. FACTORY POINTS (Industrial Hubs)
    const factoryData = useMemo<GlobePoint[]>(() => {
        const points: GlobePoint[] = [];
        // US Hubs (East/West/Texas)
        for (let i = 0; i < 15; i++) points.push({ lat: 35 + Math.random() * 10, lng: -100 + Math.random() * 30, size: 0.5, color: '#00BFFF' });
        // EU Hubs (Germany/UK/France)
        for (let i = 0; i < 12; i++) points.push({ lat: 48 + Math.random() * 8, lng: 10 + Math.random() * 15, size: 0.5, color: '#00BFFF' });
        // APAC Hubs (Japan/Korea/China/Singapore)
        for (let i = 0; i < 20; i++) points.push({ lat: 30 + Math.random() * 15, lng: 110 + Math.random() * 30, size: 0.5, color: '#00BFFF' });
        // ANZ Hubs
        for (let i = 0; i < 5; i++) points.push({ lat: -25 + Math.random() * 5, lng: 135 + Math.random() * 10, size: 0.5, color: '#00BFFF' });

        return points;
    }, []);

    // 2. ARCS (Threat Intelligence Syncing)
    const arcsData = useMemo<GlobeArc[]>(() => {
        const arcs: GlobeArc[] = [];
        const coreLat = 39.0; // Simulated Data Center (Ashburn, VA)
        const coreLng = -77.0;

        factoryData.forEach((factory, i) => {
            if (i % 3 === 0) { // Connect 1/3 of factories to core
                arcs.push({
                    startLat: factory.lat,
                    startLng: factory.lng,
                    endLat: coreLat,
                    endLng: coreLng,
                    color: i % 2 === 0 ? ['rgba(0,191,255,0.5)', 'rgba(34,211,238,0.2)'] : ['rgba(234,179,8,0.5)', 'rgba(234,179,8,0.1)'], // Blue or Gold
                });
            }
        });
        return arcs;
    }, [factoryData]);

    // 3. HEXBINS (Demographics/Risk) - Simulated High Density Areas
    const hexBinPoints = useMemo<GlobePoint[]>(() => {
        const points: GlobePoint[] = [];
        // Generate density around main hubs
        factoryData.forEach(p => {
            for (let j = 0; j < 5; j++) {
                points.push({
                    lat: p.lat + (Math.random() - 0.5) * 5,
                    lng: p.lng + (Math.random() - 0.5) * 5,
                    weight: Math.random()
                });
            }
        });
        return points;
    }, [factoryData]);


    // --- LIFECYCLE ---
    useEffect(() => {
        setMounted(true);
        if (containerRef.current) {
            setDimensions({
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight
            });
        }

        // Auto-rotation
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;
            globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
        }

        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!mounted) return <div className="w-full h-full bg-slate-950 flex items-center justify-center text-oxot-blue/50 text-xs font-mono">INITIALIZING GLOBAL ASSETS...</div>;

    return (
        <div ref={containerRef} className="w-full h-full relative cursor-move">
            <Globe
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl={null}

                // ATMOSPHERE
                atmosphereColor="#00BFFF"
                atmosphereAltitude={0.15}

                // ARCS (Connectivity)
                arcsData={arcsData}
                arcColor="color"
                arcDashLength={() => Math.random()}
                arcDashGap={() => Math.random()}
                arcDashAnimateTime={() => Math.random() * 4000 + 500}
                arcStroke={0.5}

                // POINTS (Factories)
                pointsData={factoryData}
                pointColor="color"
                pointAltitude={0.01}
                pointRadius={0.5}
                pointsMerge={true} // Performance optimization
                pointResolution={2}

                // RINGS (Active Alerts)
                ringsData={[
                    { lat: 39.0, lng: -77.0, color: '#EAB308' }, // Core
                    { lat: 35.6, lng: 139.6, color: '#EF4444' }  // Tokyo Alert
                ]}
                ringColor="color"
                ringMaxRadius={5}
                ringPropagationSpeed={2}
                ringRepeatPeriod={1000}

                // HEX BINS (Demographics)
                hexBinPointsData={hexBinPoints}
                hexBinPointWeight="weight"
                hexBinResolution={3}
                hexMargin={0.2}
                hexTopColor={() => 'rgba(0, 191, 255, 0.4)'}
                hexSideColor={() => 'rgba(0, 191, 255, 0.1)'}
                hexBinMerge={true}
            />

            {/* OVERLAY UI */}
            <div className="absolute bottom-10 left-10 pointer-events-none select-none">
                <div className="flex flex-col gap-1">
                    <div className="text-[10px] font-mono text-oxot-blue uppercase tracking-widest flex items-center gap-2">
                        <div className="w-2 h-2 bg-oxot-blue rounded-full animate-pulse"></div>
                        Live Telemetry
                    </div>
                    <div className="text-4xl font-black text-white/10 uppercase">
                        Global Command
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono mt-2">
                        <span>active_nodes: {factoryData.length}</span>
                        <span>throughput: 45.2 TB/s</span>
                        <span>latency: 12ms</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
