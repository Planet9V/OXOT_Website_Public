'use client'

import React, { useRef, useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, Building2, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

// Dynamic import for react-globe.gl (client-side only)
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

// EU Member State NIS2 transposition data
const EU_COUNTRIES_DATA = [
    // Fully Transposed (Green)
    { name: 'Italy', code: 'IT', status: 'transposed', authority: 'ACN (National Cybersecurity Agency)', deadline: 'February 2025', localLaw: 'Legislative Decree 138/2024', lat: 41.9028, lng: 12.4964 },
    { name: 'Hungary', code: 'HU', status: 'transposed', authority: 'NBSZ (National Security Service)', deadline: 'Q3-Q4 2025', localLaw: 'Act XXIII of 2024', lat: 47.1625, lng: 19.5033 },
    { name: 'Croatia', code: 'HR', status: 'transposed', authority: 'CARNET/CERT', deadline: 'Q3 2025', localLaw: 'Cybersecurity Act 2024', lat: 45.1, lng: 15.2 },
    { name: 'Belgium', code: 'BE', status: 'transposed', authority: 'CCB (Centre for Cybersecurity Belgium)', deadline: 'March 2025', localLaw: 'NIS2 Framework Law', lat: 50.8503, lng: 4.3517 },
    { name: 'Lithuania', code: 'LT', status: 'transposed', authority: 'NKSC (National Cyber Security Centre)', deadline: 'Q2 2025', localLaw: 'Cybersecurity Law Amendment', lat: 55.1694, lng: 23.8813 },
    { name: 'Latvia', code: 'LV', status: 'transposed', authority: 'CERT.LV', deadline: 'February 28, 2025', localLaw: 'Cybersecurity Law', lat: 56.8796, lng: 24.6032 },

    // In Progress (Yellow/Orange)
    { name: 'Germany', code: 'DE', status: 'in_progress', authority: 'BSI (Federal Office for Information Security)', deadline: 'Early 2025', localLaw: 'IT-Sicherheitsgesetz 3.0 (Draft)', lat: 51.1657, lng: 10.4515 },
    { name: 'France', code: 'FR', status: 'in_progress', authority: 'ANSSI', deadline: 'Q1 2025', localLaw: 'NIS2 Transposition Law (Draft)', lat: 46.2276, lng: 2.2137 },
    { name: 'Netherlands', code: 'NL', status: 'in_progress', authority: 'NCSC-NL', deadline: 'Q2 2025', localLaw: 'Cybersecurity Act (Draft)', lat: 52.1326, lng: 5.2913 },
    { name: 'Spain', code: 'ES', status: 'delayed', authority: 'CCN-CERT / INCIBE', deadline: 'Q2-Q3 2025', localLaw: 'Royal Decree (Pending)', lat: 40.4168, lng: -3.7038 },
    { name: 'Austria', code: 'AT', status: 'in_progress', authority: 'NIS Authority Austria', deadline: 'Q1 2025', localLaw: 'NISG 2024 (Draft)', lat: 47.5162, lng: 14.5501 },
    { name: 'Poland', code: 'PL', status: 'delayed', authority: 'NASK/CERT Polska', deadline: 'Q2 2025', localLaw: 'Cybersecurity Act Amendment', lat: 51.9194, lng: 19.1451 },
    { name: 'Sweden', code: 'SE', status: 'delayed', authority: 'MSB (Swedish Civil Contingencies Agency)', deadline: 'Q2 2025', localLaw: 'Cybersecurity Act', lat: 60.1282, lng: 18.6435 },
    { name: 'Denmark', code: 'DK', status: 'in_progress', authority: 'CFCS (Danish Centre for Cyber Security)', deadline: 'April 2025', localLaw: 'NIS2 Implementation Act', lat: 56.2639, lng: 9.5018 },
    { name: 'Finland', code: 'FI', status: 'delayed', authority: 'Traficom/NCSC-FI', deadline: 'Q1 2025', localLaw: 'Cybersecurity Act Amendment', lat: 61.9241, lng: 25.7482 },
    { name: 'Portugal', code: 'PT', status: 'delayed', authority: 'CNCS (National Cybersecurity Centre)', deadline: 'Q2 2025', localLaw: 'Regime Jurídico da Segurança', lat: 39.3999, lng: -8.2245 },
    { name: 'Ireland', code: 'IE', status: 'delayed', authority: 'NCSC Ireland', deadline: 'Q1-Q2 2025', localLaw: 'NIS2 Regulations (Pending)', lat: 53.1424, lng: -7.6921 },
    { name: 'Greece', code: 'GR', status: 'in_progress', authority: 'National Cybersecurity Authority', deadline: 'March-April 2025', localLaw: 'Cybersecurity Law', lat: 39.0742, lng: 21.8243 },
    { name: 'Czechia', code: 'CZ', status: 'delayed', authority: 'NÚKIB', deadline: 'Q1-Q2 2025', localLaw: 'Cybersecurity Act Amendment', lat: 49.8175, lng: 15.4730 },
    { name: 'Romania', code: 'RO', status: 'transposed', authority: 'DNSC', deadline: '1 month post-law', localLaw: 'NIS2 Law', lat: 45.9432, lng: 24.9668 },
    { name: 'Bulgaria', code: 'BG', status: 'delayed', authority: 'State Agency for National Security', deadline: 'Q2 2025', localLaw: 'Cybersecurity Act (Pending)', lat: 42.7339, lng: 25.4858 },
    { name: 'Slovakia', code: 'SK', status: 'in_progress', authority: 'NBU Slovakia', deadline: 'Q1 2025', localLaw: 'Cybersecurity Act Amendment', lat: 48.6690, lng: 19.6990 },
    { name: 'Slovenia', code: 'SI', status: 'delayed', authority: 'SI-CERT', deadline: 'Q2 2025', localLaw: 'Information Security Act', lat: 46.1512, lng: 14.9955 },
    { name: 'Luxembourg', code: 'LU', status: 'in_progress', authority: 'ILR/CIRCL', deadline: 'Q1 2025', localLaw: 'NIS2 Law (Draft)', lat: 49.8153, lng: 6.1296 },
    { name: 'Estonia', code: 'EE', status: 'delayed', authority: 'RIA (Information System Authority)', deadline: 'Q1 2025', localLaw: 'Cybersecurity Act Amendment', lat: 58.5953, lng: 25.0136 },
    { name: 'Cyprus', code: 'CY', status: 'in_progress', authority: 'DSA (Digital Security Authority)', deadline: 'Q1 2025', localLaw: 'NIS2 Law', notes: '6-hour early warning requirement', lat: 35.1264, lng: 33.4299 },
    { name: 'Malta', code: 'MT', status: 'in_progress', authority: 'MCA (Malta Communications Authority)', deadline: 'Q1 2025', localLaw: 'NIS2 Regulations', lat: 35.9375, lng: 14.3754 },
]

// GeoJSON country name mapping (some names differ)
const COUNTRY_NAME_MAPPING: { [key: string]: string } = {
    'Italy': 'Italy',
    'Hungary': 'Hungary',
    'Croatia': 'Croatia',
    'Belgium': 'Belgium',
    'Lithuania': 'Lithuania',
    'Latvia': 'Latvia',
    'Germany': 'Germany',
    'France': 'France',
    'Netherlands': 'Netherlands',
    'Spain': 'Spain',
    'Austria': 'Austria',
    'Poland': 'Poland',
    'Sweden': 'Sweden',
    'Denmark': 'Denmark',
    'Finland': 'Finland',
    'Portugal': 'Portugal',
    'Ireland': 'Ireland',
    'Greece': 'Greece',
    'Czechia': 'Czech Republic',
    'Czech Republic': 'Czechia',
    'Romania': 'Romania',
    'Bulgaria': 'Bulgaria',
    'Slovakia': 'Slovakia',
    'Slovenia': 'Slovenia',
    'Luxembourg': 'Luxembourg',
    'Estonia': 'Estonia',
    'Cyprus': 'Cyprus',
    'Malta': 'Malta',
}

const STATUS_COLORS = {
    transposed: { fill: 'rgba(34, 197, 94, 0.5)', stroke: '#22c55e', label: 'Fully Transposed', icon: CheckCircle },
    in_progress: { fill: 'rgba(234, 179, 8, 0.4)', stroke: '#eab308', label: 'In Progress', icon: Clock },
    delayed: { fill: 'rgba(217, 119, 6, 0.4)', stroke: '#d97706', label: 'Delayed / Infringement', icon: AlertTriangle },
}

interface CountryDetails {
    name: string
    code: string
    status: string
    authority: string
    deadline: string
    localLaw: string
    notes?: string
}

export default function NIS2EuropeGlobe() {
    const globeRef = useRef<any>(null)
    const [isClient, setIsClient] = useState(false)
    const [globeReady, setGlobeReady] = useState(false)
    const [countries, setCountries] = useState({ features: [] })
    const [selectedCountry, setSelectedCountry] = useState<CountryDetails | null>(null)
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

    // Only render on client
    useEffect(() => {
        setIsClient(true)

        // Fetch world GeoJSON data
        fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
            .then(res => res.json())
            .then(setCountries)
            .catch(err => console.error('Failed to load country data', err))
    }, [])

    // Set initial view when globe is ready - Focus on Europe
    useEffect(() => {
        if (globeRef.current && globeReady) {
            // Point of view: Center on Europe
            globeRef.current.pointOfView({ lat: 50, lng: 10, altitude: 1.8 }, 1000)

            // Slow auto-rotate
            globeRef.current.controls().autoRotate = true
            globeRef.current.controls().autoRotateSpeed = 0.3
            globeRef.current.controls().enableZoom = true
            globeRef.current.controls().minDistance = 150
            globeRef.current.controls().maxDistance = 500
        }
    }, [globeReady])

    // Get country status
    const getCountryStatus = (countryName: string) => {
        const normalizedName = COUNTRY_NAME_MAPPING[countryName] || countryName
        const country = EU_COUNTRIES_DATA.find(c =>
            c.name === countryName ||
            c.name === normalizedName ||
            COUNTRY_NAME_MAPPING[c.name] === countryName
        )
        return country?.status || null
    }

    // Get country data
    const getCountryData = (countryName: string): CountryDetails | null => {
        const normalizedName = COUNTRY_NAME_MAPPING[countryName] || countryName
        return EU_COUNTRIES_DATA.find(c =>
            c.name === countryName ||
            c.name === normalizedName ||
            COUNTRY_NAME_MAPPING[c.name] === countryName
        ) || null
    }

    // Points data for capital markers
    const pointsData = useMemo(() => EU_COUNTRIES_DATA.map(country => ({
        lat: country.lat,
        lng: country.lng,
        size: 0.3,
        color: STATUS_COLORS[country.status as keyof typeof STATUS_COLORS]?.stroke || '#888',
        name: country.name,
        status: country.status
    })), [])

    // Rings for transposed countries
    const ringsData = useMemo(() => EU_COUNTRIES_DATA
        .filter(c => c.status === 'transposed')
        .map(country => ({
            lat: country.lat,
            lng: country.lng,
            maxR: 3,
            propagationSpeed: 1,
            repeatPeriod: 2000
        })), [])

    if (!isClient) {
        return (
            <div className="relative w-full h-[700px] bg-black/20 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <div className="text-oxot-gold font-mono text-sm animate-pulse">
                    INITIALIZING_NIS2_MAP...
                </div>
            </div>
        )
    }

    return (
        <div className="relative w-full h-[700px] bg-transparent rounded-2xl overflow-hidden border border-white/10">
            {/* Header */}
            <div className="absolute top-4 left-4 z-20">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    NIS2_TRANSPOSITION_STATUS
                </div>
                <div className="text-lg font-bold text-white mt-1">
                    EU Member States
                </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute top-4 right-4 text-[10px] font-mono text-oxot-gold/80 z-20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-oxot-gold animate-pulse" />
                LIVE DATA
            </div>

            {/* Legend */}
            <div className="absolute top-20 left-4 z-20 space-y-2">
                {Object.entries(STATUS_COLORS).map(([key, value]) => {
                    const Icon = value.icon
                    const count = EU_COUNTRIES_DATA.filter(c => c.status === key).length
                    return (
                        <div key={key} className="flex items-center gap-2 text-xs">
                            <div
                                className="w-3 h-3 rounded-sm border"
                                style={{ backgroundColor: value.fill, borderColor: value.stroke }}
                            />
                            <Icon size={12} style={{ color: value.stroke }} />
                            <span className="text-gray-400">{value.label}</span>
                            <span className="text-white/50 font-mono">({count})</span>
                        </div>
                    )
                })}
            </div>

            {/* Statistics */}
            <div className="absolute bottom-4 left-4 z-20 flex gap-6">
                <div className="text-center">
                    <div className="text-2xl font-black text-green-400">
                        {EU_COUNTRIES_DATA.filter(c => c.status === 'transposed').length}
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Transposed</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-black text-yellow-400">
                        {EU_COUNTRIES_DATA.filter(c => c.status === 'in_progress').length}
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">In Progress</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-black text-amber-500">
                        {EU_COUNTRIES_DATA.filter(c => c.status === 'delayed').length}
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Delayed</div>
                </div>
            </div>

            {/* Globe Container */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Globe
                    ref={globeRef}
                    onGlobeReady={() => setGlobeReady(true)}

                    // Globe appearance
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    backgroundImageUrl=""
                    backgroundColor="rgba(0,0,0,0)"

                    // Atmosphere
                    atmosphereColor="#3b82f6"
                    atmosphereAltitude={0.1}
                    showAtmosphere={true}

                    // Country Polygons
                    polygonsData={countries.features}
                    polygonCapColor={(d: any) => {
                        const status = getCountryStatus(d.properties.name)
                        if (status) {
                            const isHovered = hoveredCountry === d.properties.name
                            const colors = STATUS_COLORS[status as keyof typeof STATUS_COLORS]
                            return isHovered
                                ? colors.fill.replace('0.4', '0.7').replace('0.5', '0.8')
                                : colors.fill
                        }
                        return 'rgba(30,30,30,0.3)'
                    }}
                    polygonSideColor={(d: any) => {
                        const status = getCountryStatus(d.properties.name)
                        if (status) {
                            return STATUS_COLORS[status as keyof typeof STATUS_COLORS].stroke
                        }
                        return 'rgba(50,50,50,0.5)'
                    }}
                    polygonStrokeColor={(d: any) => {
                        const status = getCountryStatus(d.properties.name)
                        if (status) {
                            return STATUS_COLORS[status as keyof typeof STATUS_COLORS].stroke
                        }
                        return 'rgba(255,255,255,0.05)'
                    }}
                    polygonAltitude={(d: any) => {
                        const status = getCountryStatus(d.properties.name)
                        return status ? 0.02 : 0.001
                    }}
                    onPolygonClick={(polygon: any) => {
                        const countryData = getCountryData(polygon.properties.name)
                        if (countryData) {
                            setSelectedCountry(countryData)
                        }
                    }}
                    onPolygonHover={(polygon: any) => {
                        setHoveredCountry(polygon?.properties?.name || null)
                        document.body.style.cursor = polygon && getCountryStatus(polygon.properties.name) ? 'pointer' : 'default'
                    }}

                    // Points (capital markers)
                    pointsData={pointsData}
                    pointLat="lat"
                    pointLng="lng"
                    pointColor="color"
                    pointAltitude={0.03}
                    pointRadius={(d: any) => d.size}
                    pointsMerge={false}

                    // Rings (pulsing on transposed countries)
                    ringsData={ringsData}
                    ringColor={() => '#22c55e'}
                    ringMaxRadius="maxR"
                    ringPropagationSpeed="propagationSpeed"
                    ringRepeatPeriod="repeatPeriod"

                    // Labels
                    labelsData={pointsData}
                    labelLat="lat"
                    labelLng="lng"
                    labelText={(d: any) => d.name}
                    labelSize={1.2}
                    labelDotRadius={0.3}
                    labelColor={(d: any) => d.color}
                    labelResolution={2}
                    labelAltitude={0.04}

                    // Render Options
                    width={900}
                    height={700}
                />
            </div>

            {/* Country Details Modal */}
            <AnimatePresence>
                {selectedCountry && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="absolute top-4 right-4 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 z-30"
                    >
                        <button
                            onClick={() => setSelectedCountry(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>

                        {/* Status Badge */}
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-4"
                            style={{
                                backgroundColor: STATUS_COLORS[selectedCountry.status as keyof typeof STATUS_COLORS]?.fill,
                                borderColor: STATUS_COLORS[selectedCountry.status as keyof typeof STATUS_COLORS]?.stroke,
                                borderWidth: 1,
                                color: STATUS_COLORS[selectedCountry.status as keyof typeof STATUS_COLORS]?.stroke
                            }}
                        >
                            {React.createElement(STATUS_COLORS[selectedCountry.status as keyof typeof STATUS_COLORS]?.icon, { size: 12 })}
                            {STATUS_COLORS[selectedCountry.status as keyof typeof STATUS_COLORS]?.label}
                        </div>

                        {/* Country Name */}
                        <h3 className="text-xl font-bold text-white mb-4">{selectedCountry.name}</h3>

                        {/* Details */}
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <Building2 size={14} className="text-oxot-blue mt-0.5 flex-shrink-0" />
                                <div>
                                    <div className="text-gray-500 text-xs uppercase tracking-wider">Competent Authority</div>
                                    <div className="text-white">{selectedCountry.authority}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Calendar size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <div className="text-gray-500 text-xs uppercase tracking-wider">Registration Deadline</div>
                                    <div className="text-white">{selectedCountry.deadline}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <div className="text-gray-500 text-xs uppercase tracking-wider">National Law</div>
                                    <div className="text-white">{selectedCountry.localLaw}</div>
                                </div>
                            </div>

                            {selectedCountry.notes && (
                                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                    <div className="text-yellow-400 text-xs font-mono">⚠ SPECIAL REQUIREMENT</div>
                                    <div className="text-yellow-200 text-sm mt-1">{selectedCountry.notes}</div>
                                </div>
                            )}
                        </div>

                        {/* CTA */}
                        <button className="w-full mt-6 py-3 bg-gradient-to-r from-oxot-blue to-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity text-sm">
                            Get Compliance Guidance →
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hover Tooltip */}
            {hoveredCountry && !selectedCountry && getCountryData(hoveredCountry) && (
                <div className="absolute bottom-20 right-4 z-20 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 pointer-events-none">
                    <div className="text-white font-bold">{hoveredCountry}</div>
                    <div className="text-xs text-gray-400">Click for details</div>
                </div>
            )}
        </div>
    )
}
