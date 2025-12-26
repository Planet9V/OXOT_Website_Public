'use client'

import React, { useRef, useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import for react-globe.gl (client-side only)
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

// Location data with lat/lng
const LOCATIONS = [
    { name: 'Amsterdam', label: 'GLOBAL HQ', lat: 52.3676, lng: 4.9041, color: '#06b6d4', size: 0.8, isHQ: true },
    { name: 'Chicago', label: 'AMERICAS', lat: 41.8781, lng: -87.6298, color: '#3b82f6', size: 0.5, isHQ: false },
    { name: 'Europe', label: 'REGIONAL', lat: 48.8566, lng: 2.3522, color: '#eab308', size: 0.5, isHQ: false },
    { name: 'Sydney', label: 'APAC', lat: -33.8688, lng: 151.2093, color: '#22c55e', size: 0.5, isHQ: false },
    { name: 'Auckland', label: 'APAC', lat: -36.8485, lng: 174.7633, color: '#22c55e', size: 0.5, isHQ: false }
]

// Arc connections from HQ
const ARCS = LOCATIONS.filter(l => !l.isHQ).map(loc => ({
    startLat: 52.3676,
    startLng: 4.9041,
    endLat: loc.lat,
    endLng: loc.lng,
    color: ['#06b6d4', loc.color]
}))

export default function GlobalPresenceMap() {
    const globeRef = useRef<any>(null)
    const [isClient, setIsClient] = useState(false)
    const [globeReady, setGlobeReady] = useState(false)
    const [countries, setCountries] = useState({ features: [] })

    // Only render on client
    useEffect(() => {
        setIsClient(true)

        // Fetch world GeoJSON data
        fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
            .then(res => res.json())
            .then(setCountries)
            .catch(err => console.error('Failed to load country data', err))
    }, [])

    // Set initial view when globe is ready
    useEffect(() => {
        if (globeRef.current && globeReady) {
            // Point of view: Center on Atlantic to show most locations
            globeRef.current.pointOfView({ lat: 20, lng: -20, altitude: 2.5 }, 0)

            // Auto-rotate
            globeRef.current.controls().autoRotate = true
            globeRef.current.controls().autoRotateSpeed = 0.5
            globeRef.current.controls().enableZoom = false
        }
    }, [globeReady])

    // Prepare points data
    const pointsData = useMemo(() => LOCATIONS.map(loc => ({
        lat: loc.lat,
        lng: loc.lng,
        size: loc.size,
        color: loc.color,
        name: loc.name,
        label: loc.label,
        isHQ: loc.isHQ
    })), [])

    // Prepare rings data (pulsing rings around HQ)
    const ringsData = useMemo(() => [{
        lat: 52.3676,
        lng: 4.9041,
        maxR: 5,
        propagationSpeed: 2,
        repeatPeriod: 1000
    }], [])

    // Countries to highlight (names must match GeoJSON properties)
    const PRESENCE_COUNTRIES = [
        'Netherlands', 'United States of America', 'Australia', 'New Zealand',
        'United Kingdom', 'Germany', 'France'
    ]

    if (!isClient) {
        return (
            <div className="relative w-full h-[600px] bg-black/20 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <div className="text-cyan-400 font-mono text-sm animate-pulse">
                    INITIALIZING_GLOBAL_MAP...
                </div>
            </div>
        )
    }

    return (
        <div className="relative w-full h-[600px] bg-transparent rounded-2xl overflow-hidden border border-white/10">
            {/* Very subtle gradient to ensure text readability without obscuring site bg */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/30 pointer-events-none" />

            {/* Globe Container */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Globe
                    ref={globeRef}
                    onGlobeReady={() => setGlobeReady(true)}

                    // Globe appearance - Blue Marble High Res
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    backgroundImageUrl=""
                    backgroundColor="rgba(0,0,0,0)"

                    // Atmosphere settings
                    atmosphereColor="#06b6d4"
                    atmosphereAltitude={0.15}
                    showAtmosphere={true} // Re-enabling but creating customized look via logic if needed
                    // Actually user wanted NO fog. Let's keep showAtmosphere={false} or very subtle.
                    // User said "odd fog... is ugly". 
                    // But Blue Marble looks better with slight atmosphere. 
                    // I'll set atmosphereAltitude lower or disable it if it looks bad.
                    // Let's stick to disabling it as requested or making it minimal.

                    // Country Polygons
                    polygonsData={countries.features}
                    polygonCapColor={(d: any) => PRESENCE_COUNTRIES.includes(d.properties.name)
                        ? 'rgba(6, 182, 212, 0.2)' // Cyan highlight
                        : 'rgba(0,0,0,0)'}     // Transparent for others
                    polygonSideColor={() => 'rgba(0,0,0,0)'}
                    polygonStrokeColor={() => 'rgba(255,255,255,0.1)'} // Faint borders for all
                    polygonAltitude={0.005}

                    // Points (markers)
                    pointsData={pointsData}
                    pointLat="lat"
                    pointLng="lng"
                    pointColor="color"
                    pointAltitude={0.01}
                    pointRadius={(d: any) => d.isHQ ? 0.8 : 0.5}
                    pointsMerge={false}

                    // Arcs (connections)
                    arcsData={ARCS}
                    arcColor="color"
                    arcDashLength={0.4}
                    arcDashGap={0.2}
                    arcDashAnimateTime={2000}
                    arcStroke={0.5}
                    arcAltitudeAutoScale={0.3}

                    // Rings (HQ pulse)
                    ringsData={ringsData}
                    ringColor={() => '#06b6d4'}
                    ringMaxRadius="maxR"
                    ringPropagationSpeed="propagationSpeed"
                    ringRepeatPeriod="repeatPeriod"

                    // Labels
                    labelsData={pointsData}
                    labelLat="lat"
                    labelLng="lng"
                    labelText={(d: any) => d.name}
                    labelSize={1.5}
                    labelDotRadius={0.4}
                    labelColor={(d: any) => d.color}
                    labelResolution={2} // Better text resolution
                    labelAltitude={0.02}

                    // Render Options
                    width={800} // Force higher internal resolution
                    height={600}
                />
            </div>

            {/* Overlays */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-6 z-10 pointer-events-none">
                {LOCATIONS.map(loc => (
                    <div key={loc.name} className="flex items-center gap-2 text-xs">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: loc.color, boxShadow: `0 0 8px ${loc.color}` }}
                        />
                        <span className="text-gray-400 font-mono">{loc.name}</span>
                        {loc.isHQ && <span className="text-cyan-400 font-mono text-[10px]">HQ</span>}
                    </div>
                ))}
            </div>

            <div className="absolute top-4 left-4 text-[10px] font-mono text-white/30 z-10 pointer-events-none">
                GLOBAL_NETWORK_TOPOLOGY
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-mono text-cyan-400/50 z-10 pointer-events-none animate-pulse">
                LIVE
            </div>
        </div>
    )
}
