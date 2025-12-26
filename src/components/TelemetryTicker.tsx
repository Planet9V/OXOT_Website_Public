'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Radio, Activity, ShieldAlert, FileText, Database,
    Server, Terminal, MessageSquare, Mic, PhoneCall
} from 'lucide-react'

// --- MOCK TELEMETRY STREAMS ---
const SOURCES = [
    { id: 'LOG-01', type: 'Syslog', content: 'Auth failure detected on Zone 5 Switch', source: 'Cisco Nexus', severity: 'low' },
    { id: 'CMDB-44', type: 'CMDB', content: 'New Asset Discovered: Dell Edge XR11', source: 'ServiceNow', severity: 'info' },
    { id: 'FMEA-02', type: 'FMEA', content: 'Failure Mode: Cooling Loss > 15m', source: 'Safety System', severity: 'high' },
    { id: 'RAMS-99', type: 'RAMS', content: 'Reliability metrics updated: 99.999%', source: 'Analytics Engine', severity: 'info' },
    { id: 'VULN-88', type: 'Scan', content: 'CVE-2025-1029 Found on Controller', source: 'Tenable.ot', severity: 'critical' },
    { id: 'HIST-22', type: 'Historian', content: 'Temp Spike Zone 6 (95°F)', source: 'OSIsoft PI', severity: 'medium' },
]

export default function TelemetryTicker() {
    const [tickerItems, setTickerItems] = useState<(typeof SOURCES[0] & { time?: string })[]>([])
    const [activeCall, setActiveCall] = useState(false)

    // Simulate Ingestion
    useEffect(() => {
        const interval = setInterval(() => {
            const newItem = SOURCES[Math.floor(Math.random() * SOURCES.length)]
            // Force Q1 2025 Simulation Date
            const simTime = new Date()
            const timeString = `2025-01-15 ${simTime.toLocaleTimeString()}`

            const timestampedItem = { ...newItem, id: Math.random().toString(), time: timeString }
            setTickerItems(prev => [timestampedItem, ...prev].slice(0, 5)) // Keep last 5

            // Random Voice Call Simulation
            if (Math.random() > 0.8) {
                setActiveCall(true)
                setTimeout(() => setActiveCall(false), 4000)
            }
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full bg-black border-t border-b border-white/10 flex items-center h-12 overflow-hidden relative">

            {/* LABEL */}
            <div className="h-full bg-red-900/20 px-4 flex items-center gap-2 border-r border-red-500/30 text-red-500 font-bold text-xs uppercase tracking-widest shrink-0">
                <Radio size={14} className="animate-pulse" />
                Live Command
            </div>

            {/* SCROLLING TICKER */}
            <div className="flex-1 overflow-hidden relative font-mono text-xs">
                <AnimatePresence mode="popLayout">
                    {tickerItems.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="inline-flex items-center gap-4 px-6 h-full text-gray-400"
                        >
                            <span className="text-gray-600">{item.time}</span>
                            <span className={`font-bold ${item.severity === 'critical' ? 'text-red-500' :
                                item.severity === 'high' ? 'text-orange-500' : 'text-cyan-500'
                                }`}>
                                [{item.type}]
                            </span>
                            <span className="text-white">{item.content}</span>
                            <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded">src: {item.source}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* CRISIS CHANNEL (Right Side) */}
            <div className="h-full flex items-center px-4 gap-4 bg-slate-900 border-l border-white/10 shrink-0">

                {/* Voice Status */}
                <div className={`flex items-center gap-2 px-3 py-1 rounded transition-colors ${activeCall ? 'bg-green-900/40 text-green-400 animate-pulse' : 'bg-black/40 text-gray-600'}`}>
                    {activeCall ? <PhoneCall size={14} /> : <Mic size={14} />}
                    <span className="text-[10px] font-bold uppercase">{activeCall ? 'INCOMING VOICE REPORT...' : 'VOICE CHANNEL IDLE'}</span>
                </div>

                <div className="w-px h-6 bg-white/10" />

                <div className="flex gap-2">
                    <MessageSquare size={16} className="text-gray-500 hover:text-white cursor-pointer" />
                    <Terminal size={16} className="text-gray-500 hover:text-white cursor-pointer" />
                </div>
            </div>

            {/* INPUT VISUALIZER LEGEND (Bottom Overlay, optional) */}
            <div className="absolute bottom-0 right-0 left-0 h-0.5 flex">
                <div className="bg-red-500 flex-1 opacity-20" />
                <div className="bg-blue-500 flex-1 opacity-20" />
                <div className="bg-green-500 flex-1 opacity-20" />
            </div>
        </div>
    )
}
