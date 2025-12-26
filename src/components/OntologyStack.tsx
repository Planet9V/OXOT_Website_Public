
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Map, Server, Box, Cpu, Hash, Globe, Database, ArrowRight } from 'lucide-react'
import { GlowCard } from '@/components/ui/GlowCard'

// Define the Ontology Levels based on the source material
const LEVELS = [
    {
        level: 0,
        name: 'Sector',
        description: 'Critical Infrastructure Sector',
        icon: Globe,
        color: 'blue',
        example: 'Energy / Water / Transportation',
        details: 'The highest level of categorization. Defines regulatory requirements (NERC CIP, TSA SD) and threat landscape profiles.'
    },
    {
        level: 1,
        name: 'Site',
        description: 'Physical Facility / Asset Owner',
        icon: Map,
        color: 'green',
        example: 'Site-8: AEON Tier III Datacenter',
        details: 'A distinct physical location with defined perimeter. Container for all zones and assets.'
    },
    {
        level: 2,
        name: 'Zone / System',
        description: 'Logical Security Grouping (IEC 62443)',
        icon: Layers,
        color: 'purple',
        example: 'Zone 6: Cooling Yard',
        details: 'A grouping of logical or physical assets that share common security requirements. Separated by Conduits.'
    },
    {
        level: 3,
        name: 'Equipment Product',
        description: 'Abstract Catalog Item (The "Class")',
        icon: Database,
        color: 'cyan',
        example: 'York YVAA Chiller (Model Definition)',
        details: 'The canonical definition of a piece of hardware. Defines the manufacturer provided specs, firmware versions, and known vulnerabilities (CVEs) affecting all instances.'
    },
    {
        level: 4,
        name: 'Equipment Instance',
        description: 'Physical Deployment (The "Object")',
        icon: Box,
        color: 'yellow',
        example: 'CHILLER-01 (Asset Tag #8842)',
        details: 'A specific deployed instance of an Equipment Product. Has distinct serial number, install date, maintenance history, and IP address.'
    },
    {
        level: 5,
        name: 'Component',
        description: 'Replaceable Part / Sub-System',
        icon: Cpu,
        color: 'orange',
        example: 'VFD Control Board',
        details: 'Internal components that may have their own firmware or vulnerabilities (e.g., a network card inside a UPS).'
    },
    {
        level: 6,
        name: 'Signal',
        description: 'I/O Point / Telemetry Tag',
        icon: Hash,
        color: 'red',
        example: 'CH01_COMP_TEMP_OUT',
        details: 'The atomic unit of data. A specific read/write point used for control logic and monitoring.'
    }
]

export default function OntologyStack() {
    const [activeLevel, setActiveLevel] = useState(0)

    return (
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual Stack (Pyramid) */}
            <div className="space-y-2">
                {LEVELS.map((lvl) => {
                    const Icon = lvl.icon
                    const isActive = activeLevel === lvl.level
                    return (
                        <motion.div
                            key={lvl.level}
                            onClick={() => setActiveLevel(lvl.level)}
                            whileHover={{ scale: 1.02, x: 10 }}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between
                ${isActive
                                    ? `border-${lvl.color}-500 bg-${lvl.color}-950/40 shadow-[0_0_20px_rgba(var(--${lvl.color}),0.3)]`
                                    : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-600'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                  ${isActive ? `bg-${lvl.color}-500 text-black` : `bg-zinc-900 text-${lvl.color}-500`}`}>
                                    <span className="font-black text-lg">{lvl.level}</span>
                                </div>
                                <div>
                                    <div className={`font-bold ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                                        {lvl.name}
                                    </div>
                                    <div className="text-xs text-zinc-500 font-mono uppercase">
                                        {lvl.description.split('(')[0]}
                                    </div>
                                </div>
                            </div>
                            <Icon size={20} className={isActive ? `text-${lvl.color}-400` : 'text-zinc-700'} />
                        </motion.div>
                    )
                })}
            </div>

            {/* Detail Pane */}
            <div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeLevel}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <GlowCard className="p-8 h-full" glowColor={`var(--${LEVELS[activeLevel].color})`}>
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                                <div className={`p-3 rounded-xl bg-${LEVELS[activeLevel].color}-950/50 border border-${LEVELS[activeLevel].color}-500/30`}>
                                    {React.createElement(LEVELS[activeLevel].icon, {
                                        size: 32,
                                        className: `text-${LEVELS[activeLevel].color}-400`
                                    })}
                                </div>
                                <div>
                                    <div className={`text-${LEVELS[activeLevel].color}-400 font-mono font-bold uppercase tracking-widest text-xs mb-1`}>
                                        Level {activeLevel} Ontology
                                    </div>
                                    <h2 className="text-3xl font-bold text-white">
                                        {LEVELS[activeLevel].name}
                                    </h2>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-3">Definition</h4>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        {LEVELS[activeLevel].details}
                                    </p>
                                </div>

                                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                                    <h4 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-3">AEON Digital Twin Example</h4>
                                    <div className="flex items-center gap-3 text-white font-mono">
                                        <ArrowRight size={16} className={`text-${LEVELS[activeLevel].color}-500`} />
                                        {LEVELS[activeLevel].example}
                                    </div>
                                </div>

                                {/* Cypher Query Hints (From Source Material) */}
                                <div>
                                    <h4 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-3">Graph Schema</h4>
                                    <div className="font-mono text-xs text-green-400 bg-black p-4 rounded-lg overflow-x-auto">
                                        {activeLevel === 3 && `MATCH (p:Product)<-[:IS_INSTANCE_OF]-(i:Instance)\nWHERE p.manufacturer = 'Vertiv'\nRETURN count(i)`}
                                        {activeLevel === 4 && `MATCH (i:Instance)-[:LOCATED_IN]->(z:Zone)\nMATCH (i)-[:HAS_VULN]->(v:CVE)\nRETURN z.sl, count(v)`}
                                        {activeLevel === 6 && `MATCH (s:Signal)-[:BELONGS_TO]->(c:Component)\nRETURN s.tag, s.value, s.last_updated`}
                                        {activeLevel < 3 && `(:Sector)-[:CONTAINS]->(:Site)-[:CONTAINS]->(:Zone)`}
                                    </div>
                                </div>
                            </div>
                        </GlowCard>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
