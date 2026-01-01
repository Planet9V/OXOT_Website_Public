'use client'

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield, Lock, Layers, Activity, AlertTriangle, CheckCircle, ChevronRight,
    Server, Network, Database, Users, ArrowRight, FileDown, Crosshair, Eye,
    Target, Skull, UserX, Crown, Cpu, FileText, Download, Plus, Trash2, Box,
    Monitor, Terminal, FileJson, Save, Layout, GitBranch, HardDrive, FileCheck,
    Search, X, Sparkles, Loader2, ScanEye, BrainCircuit, MessageSquare, Send,
    Bot, Building, BookOpen, Zap, Settings, ClipboardCheck, Upload, FolderOpen,
    BarChart3, PieChart, AlertCircle, Info, ChevronDown, ChevronUp, Briefcase,
    GraduationCap, Factory, Package, Code, TestTube, FileWarning, Wrench, RefreshCw,
    FolderArchive, Link2, ExternalLink
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import AssetInventoryModule from './iec62443/AssetInventoryModule'
import RiskBoardModule from './iec62443/RiskBoardModule'
import ZoneConduitEditorModule from './iec62443/ZoneConduitEditorModule'

// ============================================================
// TYPES & INTERFACES
// ============================================================

interface Asset {
    id: string
    name: string
    type: 'PLC' | 'HMI' | 'Workstation' | 'Server' | 'Network' | 'Sensor' | 'Safety' | 'Other'
    zone: string
    ip?: string
    criticality: 'Critical' | 'High' | 'Medium' | 'Low'
    vendor?: string
    slTarget?: number
    aiAnalysis?: string
}

interface RiskScenario {
    id: string
    title: string
    assetId?: string
    status: 'identified' | 'analyzing' | 'mitigated' | 'accepted' | 'transferred'
    impact: 1 | 2 | 3 | 4 | 5
    likelihood: 1 | 2 | 3 | 4 | 5
    threatVector?: string
    aiSuggestion?: string
}

interface Zone {
    id: string
    name: string
    level: 0 | 1 | 2 | 3 | 4 | 5
    description: string
    slTarget: 1 | 2 | 3 | 4
    assets: string[]
    color: string
    x: number
    y: number
    width: number
    height: number
}

interface Conduit {
    id: string
    name: string
    fromZone: string
    toZone: string
    dataFlow: string
    protocols: string[]
    securityControls: string[]
    slRequired: 1 | 2 | 3 | 4
    encrypted: boolean
    monitored: boolean
}

interface Artifact {
    id: string
    name: string
    type: 'PDF' | 'DOC' | 'XLSX' | 'JSON' | 'ZIP'
    phase: string
    category: string
    status: 'draft' | 'review' | 'approved'
    createdAt: Date
    standard?: string
}

interface Requirement {
    id: string
    code: string
    text: string
    source: 'Manual' | 'AI-Generated' | 'Standard'
    frId?: string
    status: 'pending' | 'implemented' | 'verified'
}

type PersonaType = 'integrator' | 'supplier'
type PhaseId = 'assess' | 'design' | 'implement' | 'verify' | 'maintain' | 'sdl' | 'threat' | 'develop' | 'test' | 'release'

// ============================================================
// CONSTANTS & DATA
// ============================================================

const INTEGRATOR_PHASES = [
    { id: 'assess', name: 'Assess', icon: Search, color: 'yellow', standard: '62443-3-2' },
    { id: 'design', name: 'Design', icon: Layers, color: 'blue', standard: '62443-3-3' },
    { id: 'implement', name: 'Implement', icon: Wrench, color: 'purple', standard: '62443-2-4' },
    { id: 'verify', name: 'Verify', icon: CheckCircle, color: 'green', standard: '62443-3-3' },
    { id: 'maintain', name: 'Maintain', icon: RefreshCw, color: 'cyan', standard: '62443-2-1' }
]

const SUPPLIER_PHASES = [
    { id: 'sdl', name: 'SDL Process', icon: Settings, color: 'blue', standard: '62443-4-1' },
    { id: 'threat', name: 'Threat Model', icon: Target, color: 'red', standard: '62443-4-1' },
    { id: 'develop', name: 'Secure Dev', icon: Code, color: 'purple', standard: '62443-4-1' },
    { id: 'test', name: 'Security Test', icon: TestTube, color: 'green', standard: '62443-4-1' },
    { id: 'release', name: 'Release', icon: Package, color: 'cyan', standard: '62443-4-2' }
]

const STANDARD_SERIES = {
    '1-x': {
        name: 'General',
        color: 'gray',
        parts: [
            { id: '1-1', name: 'Terminology & Concepts', desc: 'Core definitions and models for IACS security' },
            { id: '1-2', name: 'Master Glossary', desc: 'Terms and abbreviations used across the standard' },
            { id: '1-3', name: 'Conformance Metrics', desc: 'Methods to measure security compliance' },
            { id: '1-4', name: 'Lifecycle & Use Cases', desc: 'Security lifecycle phases and scenarios' }
        ]
    },
    '2-x': {
        name: 'Policies & Procedures',
        color: 'yellow',
        parts: [
            { id: '2-1', name: 'CSMS Requirements', desc: 'Cybersecurity Management System establishment', role: 'Asset Owner' },
            { id: '2-2', name: 'Service Provider', desc: 'Requirements for IACS service providers', role: 'Asset Owner' },
            { id: '2-3', name: 'Patch Management', desc: 'Patch management in IACS environments', role: 'Asset Owner' },
            { id: '2-4', name: 'Integration Requirements', desc: 'Security requirements for integration activities', role: 'Integrator' }
        ]
    },
    '3-x': {
        name: 'System',
        color: 'blue',
        parts: [
            { id: '3-1', name: 'Security Technologies', desc: 'Assessment of security technologies for IACS' },
            { id: '3-2', name: 'Risk Assessment', desc: 'Security risk assessment for system design', role: 'Integrator' },
            { id: '3-3', name: 'System Security', desc: 'System security requirements and security levels', role: 'Integrator' }
        ]
    },
    '4-x': {
        name: 'Component',
        color: 'purple',
        parts: [
            { id: '4-1', name: 'Secure Dev Lifecycle', desc: 'Secure development lifecycle requirements', role: 'Supplier' },
            { id: '4-2', name: 'Component Requirements', desc: 'Technical security requirements for components', role: 'Supplier' }
        ]
    }
}

const FOUNDATIONAL_REQUIREMENTS = [
    { id: 'FR1', name: 'Identification & Authentication (IAC)', icon: Users },
    { id: 'FR2', name: 'Use Control (UC)', icon: Lock },
    { id: 'FR3', name: 'System Integrity (SI)', icon: Shield },
    { id: 'FR4', name: 'Data Confidentiality (DC)', icon: Eye },
    { id: 'FR5', name: 'Restricted Data Flow (RDF)', icon: Network },
    { id: 'FR6', name: 'Timely Response to Events (TRE)', icon: Activity },
    { id: 'FR7', name: 'Resource Availability (RA)', icon: Server }
]

const ARTIFACT_TEMPLATES = {
    integrator: {
        assess: [
            { name: 'Asset Inventory', type: 'XLSX', standard: '2-1' },
            { name: 'High-Level Risk Assessment', type: 'PDF', standard: '3-2' },
            { name: 'Zone & Conduit Diagram', type: 'PDF', standard: '3-2' },
            { name: 'Data Flow Diagram', type: 'PDF', standard: '3-2' }
        ],
        design: [
            { name: 'Detailed Risk Assessment', type: 'PDF', standard: '3-2' },
            { name: 'SL-Target Assignment', type: 'XLSX', standard: '3-3' },
            { name: 'Cybersecurity Requirements Spec (CRS)', type: 'DOC', standard: '3-3' },
            { name: 'Gap Analysis Report', type: 'PDF', standard: '3-3' }
        ],
        implement: [
            { name: 'Design Specification', type: 'DOC', standard: '2-4' },
            { name: 'Configuration Items', type: 'JSON', standard: '2-4' },
            { name: 'Hardening Guides', type: 'PDF', standard: '2-4' },
            { name: 'Network Segmentation Plan', type: 'PDF', standard: '3-3' }
        ],
        verify: [
            { name: 'FAT Security Report', type: 'PDF', standard: '2-4' },
            { name: 'SAT Security Report', type: 'PDF', standard: '2-4' },
            { name: 'Penetration Test Report', type: 'PDF', standard: '3-3' },
            { name: 'SL-Achieved Declaration', type: 'PDF', standard: '3-3' }
        ],
        maintain: [
            { name: 'CSMS Policy', type: 'DOC', standard: '2-1' },
            { name: 'Incident Response Plan', type: 'DOC', standard: '2-1' },
            { name: 'Patch Management Schedule', type: 'XLSX', standard: '2-3' },
            { name: 'Audit Reports', type: 'PDF', standard: '2-1' }
        ]
    },
    supplier: {
        sdl: [
            { name: 'SDL Process Definition', type: 'DOC', standard: '4-1' },
            { name: 'Security Training Records', type: 'XLSX', standard: '4-1' },
            { name: 'Role & Responsibility Matrix', type: 'XLSX', standard: '4-1' },
            { name: 'Defect Management Policy', type: 'DOC', standard: '4-1' }
        ],
        threat: [
            { name: 'Threat Model Document', type: 'PDF', standard: '4-1' },
            { name: 'Attack Surface Analysis', type: 'PDF', standard: '4-1' },
            { name: 'Trust Boundary Diagram', type: 'PDF', standard: '4-1' },
            { name: 'Mitigation Plan', type: 'DOC', standard: '4-1' }
        ],
        develop: [
            { name: 'Secure Coding Guidelines', type: 'DOC', standard: '4-1' },
            { name: 'SAST Scan Reports', type: 'PDF', standard: '4-1' },
            { name: 'Code Review Logs', type: 'XLSX', standard: '4-1' },
            { name: 'Crypto Library Approval', type: 'PDF', standard: '4-2' }
        ],
        test: [
            { name: 'Fuzz Testing Report', type: 'PDF', standard: '4-1' },
            { name: 'DAST Scan Reports', type: 'PDF', standard: '4-1' },
            { name: 'Vulnerability Scan Report', type: 'PDF', standard: '4-1' },
            { name: 'Pen Test Report', type: 'PDF', standard: '4-1' }
        ],
        release: [
            { name: 'Product Security Manual', type: 'PDF', standard: '4-2' },
            { name: 'Hardening Guide', type: 'PDF', standard: '4-2' },
            { name: 'SL-Capability Declaration', type: 'PDF', standard: '4-2' },
            { name: 'Known Vulnerabilities List', type: 'XLSX', standard: '4-2' }
        ]
    }
}

// ============================================================
// STORE (Zustand-like state management)
// ============================================================

const createWorkshopStore = () => {
    const [state, setState] = useState({
        persona: 'integrator' as PersonaType,
        currentPhase: 'assess' as PhaseId,
        projectName: 'IEC 62443 Workshop Project',
        assets: [] as Asset[],
        risks: [] as RiskScenario[],
        zones: [] as Zone[],
        conduits: [] as Conduit[],
        artifacts: [] as Artifact[],
        requirements: [] as Requirement[],
        slTargets: { FR1: 2, FR2: 2, FR3: 2, FR4: 1, FR5: 2, FR6: 2, FR7: 2 } as Record<string, number>,
        slAchieved: { FR1: 1, FR2: 1, FR3: 1, FR4: 0, FR5: 1, FR6: 1, FR7: 1 } as Record<string, number>
    })

    const setPersona = (persona: PersonaType) => setState(s => ({ ...s, persona }))
    const setPhase = (phase: PhaseId) => setState(s => ({ ...s, currentPhase: phase }))
    const addAsset = (asset: Asset) => setState(s => ({ ...s, assets: [...s.assets, asset] }))
    const updateAsset = (id: string, data: Partial<Asset>) => setState(s => ({
        ...s, assets: s.assets.map(a => a.id === id ? { ...a, ...data } : a)
    }))
    const addRisk = (risk: RiskScenario) => setState(s => ({ ...s, risks: [...s.risks, risk] }))
    const updateRisk = (id: string, data: Partial<RiskScenario>) => setState(s => ({
        ...s, risks: s.risks.map(r => r.id === id ? { ...r, ...data } : r)
    }))
    const addZone = (zone: Zone) => setState(s => ({ ...s, zones: [...s.zones, zone] }))
    const addConduit = (conduit: Conduit) => setState(s => ({ ...s, conduits: [...s.conduits, conduit] }))
    const addArtifact = (artifact: Artifact) => setState(s => ({ ...s, artifacts: [...s.artifacts, artifact] }))
    const updateArtifactStatus = (id: string, status: Artifact['status']) => setState(s => ({
        ...s, artifacts: s.artifacts.map(a => a.id === id ? { ...a, status } : a)
    }))
    const addRequirement = (req: Requirement) => setState(s => ({ ...s, requirements: [...s.requirements, req] }))
    const updateSlTarget = (fr: string, value: number) => setState(s => ({
        ...s, slTargets: { ...s.slTargets, [fr]: value }
    }))
    const updateSlAchieved = (fr: string, value: number) => setState(s => ({
        ...s, slAchieved: { ...s.slAchieved, [fr]: value }
    }))

    const deleteAsset = (id: string) => setState(s => ({ ...s, assets: s.assets.filter(a => a.id !== id) }))
    const deleteRisk = (id: string) => setState(s => ({ ...s, risks: s.risks.filter(r => r.id !== id) }))
    const updateZone = (id: string, data: Partial<Zone>) => setState(s => ({ ...s, zones: s.zones.map(z => z.id === id ? { ...z, ...data } : z) }))
    const deleteZone = (id: string) => setState(s => ({ ...s, zones: s.zones.filter(z => z.id !== id) }))
    const updateConduit = (id: string, data: Partial<Conduit>) => setState(s => ({ ...s, conduits: s.conduits.map(c => c.id === id ? { ...c, ...data } : c) }))
    const deleteConduit = (id: string) => setState(s => ({ ...s, conduits: s.conduits.filter(c => c.id !== id) }))

    return {
        state, setPersona, setPhase, addAsset, updateAsset, deleteAsset,
        addRisk, updateRisk, deleteRisk,
        addZone, updateZone, deleteZone,
        addConduit, updateConduit, deleteConduit,
        addArtifact, updateArtifactStatus, addRequirement,
        updateSlTarget, updateSlAchieved
    }
}

// ============================================================
// AI INTEGRATION
// ============================================================

const callGeminiAPI = async (prompt: string, context?: string): Promise<string> => {
    // Note: In production, use environment variable for API key
    // This simulates AI response for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (prompt.includes('risk analysis')) {
        return `**Identified Security Risks:**

1. **Unauthorized Access** (High): Assets lack multi-factor authentication
   - *Mitigation*: Implement IEC 62443-3-3 FR1 controls at SL-2 minimum

2. **Data Integrity** (Medium): No integrity verification on sensor data
   - *Mitigation*: Deploy cryptographic checksums per FR3 requirements

3. **Network Segmentation** (High): Flat network topology detected
   - *Mitigation*: Implement Zone/Conduit architecture per IEC 62443-3-2

*Recommendation*: Prioritize network segmentation before proceeding to Design phase.`
    }

    if (prompt.includes('requirements')) {
        return `**Generated Security Requirements (IEC 62443-3-3):**

| Req ID | Requirement | FR | SL |
|--------|-------------|----|----|
| CRS-001 | All users shall be uniquely identified | FR1 | 2 |
| CRS-002 | Failed login attempts shall be logged | FR6 | 2 |
| CRS-003 | Communications shall use TLS 1.3+ | FR4 | 2 |
| CRS-004 | Network traffic shall be monitored | FR5 | 2 |

*These requirements are based on your SL-Target vector and asset criticality.*`
    }

    if (prompt.includes('gap analysis')) {
        return `**Compliance Gap Analysis:**

✅ **FR1 (IAC)**: Target SL-2, Achieved SL-1 - **GAP DETECTED**
   - Missing: Role-based access control
   - Missing: Session timeout enforcement

✅ **FR3 (SI)**: Target SL-2, Achieved SL-2 - **COMPLIANT**

⚠️ **FR5 (RDF)**: Target SL-2, Achieved SL-1 - **GAP DETECTED**
   - Missing: Zone-to-zone traffic filtering
   - Missing: Conduit security policies

*Priority: Address FR1 and FR5 gaps before verification phase.*`
    }

    return 'AI analysis complete. Please refine your query for more specific guidance on IEC 62443 compliance.'
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

// Phase Progress Bar
const PhaseProgress = ({ phases, currentPhase, onPhaseClick }: {
    phases: typeof INTEGRATOR_PHASES
    currentPhase: string
    onPhaseClick: (id: string) => void
}) => {
    const currentIndex = phases.findIndex(p => p.id === currentPhase)

    return (
        <div className="flex items-center gap-1 bg-slate-900/50 p-2 rounded-xl border border-white/5">
            {phases.map((phase, i) => {
                const Icon = phase.icon
                const isActive = phase.id === currentPhase
                const isPast = i < currentIndex

                return (
                    <React.Fragment key={phase.id}>
                        <button
                            onClick={() => onPhaseClick(phase.id)}
                            className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive
                                ? 'bg-oxot-gold/20 text-oxot-gold border border-oxot-gold/30'
                                : isPast
                                    ? 'bg-green-900/20 text-green-400 hover:bg-green-900/30'
                                    : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                                }`}
                        >
                            <Icon size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">{phase.name}</span>
                            {isPast && <CheckCircle size={12} className="text-green-400" />}
                        </button>
                        {i < phases.length - 1 && (
                            <ChevronRight size={16} className={`${i < currentIndex ? 'text-green-400' : 'text-slate-700'}`} />
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    )
}

// Security Level Radar Chart (Simplified SVG)
const SecurityLevelRadar = ({ slTargets, slAchieved, onUpdateTarget }: {
    slTargets: Record<string, number>
    slAchieved: Record<string, number>
    onUpdateTarget?: (fr: string, value: number) => void
}) => {
    const center = 150
    const maxRadius = 120
    const levels = [1, 2, 3, 4]

    const getPoint = (index: number, level: number) => {
        const angle = (index * 360 / 7 - 90) * (Math.PI / 180)
        const radius = (level / 4) * maxRadius
        return {
            x: center + radius * Math.cos(angle),
            y: center + radius * Math.sin(angle)
        }
    }

    const createPath = (values: Record<string, number>) => {
        const frs = Object.keys(values)
        const points = frs.map((fr, i) => getPoint(i, values[fr]))
        return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
    }

    return (
        <div className="relative">
            <svg viewBox="0 0 300 300" className="w-full max-w-[400px] mx-auto">
                {/* Grid circles */}
                {levels.map(level => (
                    <circle
                        key={level}
                        cx={center}
                        cy={center}
                        r={(level / 4) * maxRadius}
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeDasharray="4,4"
                    />
                ))}

                {/* Axis lines */}
                {FOUNDATIONAL_REQUIREMENTS.map((fr, i) => {
                    const end = getPoint(i, 4)
                    return (
                        <line
                            key={fr.id}
                            x1={center}
                            y1={center}
                            x2={end.x}
                            y2={end.y}
                            stroke="rgba(255,255,255,0.1)"
                        />
                    )
                })}

                {/* Target area */}
                <path
                    d={createPath(slTargets)}
                    fill="rgba(59, 130, 246, 0.2)"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2"
                />

                {/* Achieved area */}
                <path
                    d={createPath(slAchieved)}
                    fill="rgba(234, 179, 8, 0.2)"
                    stroke="rgb(234, 179, 8)"
                    strokeWidth="2"
                />

                {/* Labels */}
                {FOUNDATIONAL_REQUIREMENTS.map((fr, i) => {
                    const pos = getPoint(i, 4.5)
                    return (
                        <text
                            key={fr.id}
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[10px] fill-slate-400 font-mono"
                        >
                            {fr.id}
                        </text>
                    )
                })}
            </svg>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs text-slate-400">SL-Target</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-oxot-gold" />
                    <span className="text-xs text-slate-400">SL-Achieved</span>
                </div>
            </div>
        </div>
    )
}

// Artifact Card
const ArtifactCard = ({ template, onGenerate, isGenerating }: {
    template: { name: string; type: string; standard: string }
    onGenerate: () => void
    isGenerating: boolean
}) => {
    const typeColors: Record<string, string> = {
        PDF: 'text-red-400 bg-red-900/20',
        DOC: 'text-blue-400 bg-blue-900/20',
        XLSX: 'text-green-400 bg-green-900/20',
        JSON: 'text-yellow-400 bg-yellow-900/20',
        ZIP: 'text-purple-400 bg-purple-900/20'
    }

    return (
        <div className="bg-slate-900/50 border border-white/5 rounded-lg p-4 hover:border-oxot-gold/30 transition-all group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <FileText size={16} className="text-slate-500" />
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${typeColors[template.type]}`}>
                        {template.type}
                    </span>
                </div>
                <span className="text-[10px] text-oxot-gold font-mono">IEC {template.standard}</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-3 group-hover:text-oxot-gold transition-colors">
                {template.name}
            </h4>
            <button
                onClick={onGenerate}
                disabled={isGenerating}
                className="w-full py-2 bg-slate-800 hover:bg-oxot-gold/20 text-slate-300 hover:text-oxot-gold text-xs font-bold rounded border border-slate-700 hover:border-oxot-gold/50 transition-all flex items-center justify-center gap-2"
            >
                {isGenerating ? (
                    <>
                        <Loader2 size={12} className="animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <FileDown size={12} />
                        Generate
                    </>
                )}
            </button>
        </div>
    )
}

// AI Chat Panel
const AIChatPanel = ({ isOpen, onClose, context }: {
    isOpen: boolean
    onClose: () => void
    context: string
}) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
        { role: 'ai', text: 'Hello! I\'m your IEC 62443 compliance assistant. I have access to your project data and can help with risk analysis, requirements generation, gap analysis, and more. What would you like to explore?' }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    useEffect(() => { scrollToBottom() }, [messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return
        const userMsg = input
        setInput('')
        setMessages(prev => [...prev, { role: 'user', text: userMsg }])
        setIsLoading(true)

        const response = await callGeminiAPI(userMsg, context)
        setMessages(prev => [...prev, { role: 'ai', text: response }])
        setIsLoading(false)
    }

    const quickActions = [
        { label: 'Risk Analysis', prompt: 'Perform a risk analysis based on my asset inventory' },
        { label: 'Generate Requirements', prompt: 'Generate security requirements based on my SL-Target' },
        { label: 'Gap Analysis', prompt: 'Perform a gap analysis between SL-Target and SL-Achieved' }
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 400, opacity: 0 }}
                    className="fixed right-0 top-0 bottom-0 w-[400px] bg-slate-950 border-l border-white/10 z-50 flex flex-col"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oxot-gold to-yellow-600 flex items-center justify-center">
                                <BrainCircuit size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">OXOT AI Assistant</h3>
                                <p className="text-[10px] text-green-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    IEC 62443 Context Active
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-slate-500 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="p-3 border-b border-white/5 flex gap-2 overflow-x-auto">
                        {quickActions.map(action => (
                            <button
                                key={action.label}
                                onClick={() => { setInput(action.prompt); handleSend() }}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-oxot-gold/20 text-xs text-slate-300 hover:text-oxot-gold rounded-full border border-slate-700 hover:border-oxot-gold/30 whitespace-nowrap transition-all"
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user'
                                    ? 'bg-slate-800 text-white rounded-br-none'
                                    : 'bg-oxot-gold/10 border border-oxot-gold/20 text-slate-300 rounded-bl-none'
                                    }`}>
                                    {/* @ts-ignore */}
                                    <ReactMarkdown className="prose prose-invert prose-sm max-w-none">{msg.text}</ReactMarkdown>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800 rounded-2xl px-4 py-3 flex items-center gap-2">
                                    <Loader2 size={14} className="animate-spin text-oxot-gold" />
                                    <span className="text-xs text-slate-400">Analyzing...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about IEC 62443 compliance..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-full px-4 py-3 text-sm text-white focus:border-oxot-gold focus:outline-none pr-12"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="absolute right-1 top-1 p-2 bg-oxot-gold rounded-full text-black hover:bg-yellow-500 transition-colors disabled:opacity-50"
                            >
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function IEC62443UnifiedWorkshop() {
    const store = createWorkshopStore()

    const {
        state, setPersona, setPhase, addArtifact,
        addAsset, updateAsset, deleteAsset,
        addRisk, updateRisk, deleteRisk,
        addZone, updateZone, deleteZone,
        addConduit, updateConduit, deleteConduit
    } = store
    const [isAIOpen, setIsAIOpen] = useState(false)
    const [generatingArtifact, setGeneratingArtifact] = useState<string | null>(null)
    const [expandedSeries, setExpandedSeries] = useState<string | null>('3-x')
    const [activeModule, setActiveModule] = useState<string>('assets') // 'assets', 'risks', 'zones'

    // Reset active module when phase changes
    useEffect(() => {
        if (state.currentPhase === 'assess') setActiveModule('assets')
        else if (state.currentPhase === 'design') setActiveModule('zones')
        else if (state.currentPhase === 'threat') setActiveModule('risks')
    }, [state.currentPhase])

    const phases = state.persona === 'integrator' ? INTEGRATOR_PHASES : SUPPLIER_PHASES
    const currentPhaseData = phases.find(p => p.id === state.currentPhase)
    const artifactTemplates = (ARTIFACT_TEMPLATES as any)[state.persona][state.currentPhase] || []

    const handleGenerateArtifact = async (template: { name: string; type: string; standard: string }) => {
        setGeneratingArtifact(template.name)
        await new Promise(resolve => setTimeout(resolve, 2000))
        addArtifact({
            id: crypto.randomUUID(),
            name: template.name,
            type: template.type as Artifact['type'],
            phase: state.currentPhase,
            category: currentPhaseData?.name || '',
            status: 'draft',
            createdAt: new Date(),
            standard: template.standard
        })
        setGeneratingArtifact(null)
    }

    const completedArtifacts = state.artifacts.filter(a => a.phase === state.currentPhase).length
    const totalArtifacts = artifactTemplates.length

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-oxot-gold to-yellow-600 flex items-center justify-center">
                                <Shield size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-white tracking-tight">
                                    IEC 62443 <span className="text-oxot-gold">Workshop</span>
                                </h1>
                                <p className="text-xs text-slate-500 font-mono">{state.projectName}</p>
                            </div>
                        </div>

                        {/* Persona Switcher */}
                        <div className="flex items-center gap-4">
                            <div className="flex bg-slate-900 p-1 rounded-lg border border-white/5">
                                <button
                                    onClick={() => { setPersona('integrator'); setPhase('assess') }}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${state.persona === 'integrator'
                                        ? 'bg-slate-800 text-oxot-gold border border-oxot-gold/30'
                                        : 'text-slate-500 hover:text-white'
                                        }`}
                                >
                                    <Factory size={14} className="inline mr-2" />
                                    Integrator
                                    <span className="block text-[10px] opacity-60">2-x / 3-x</span>
                                </button>
                                <button
                                    onClick={() => { setPersona('supplier'); setPhase('sdl') }}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${state.persona === 'supplier'
                                        ? 'bg-slate-800 text-oxot-gold border border-oxot-gold/30'
                                        : 'text-slate-500 hover:text-white'
                                        }`}
                                >
                                    <Package size={14} className="inline mr-2" />
                                    Supplier
                                    <span className="block text-[10px] opacity-60">4-x</span>
                                </button>
                            </div>

                            <button
                                onClick={() => setIsAIOpen(true)}
                                className="p-3 bg-gradient-to-br from-oxot-gold to-yellow-600 rounded-xl text-black hover:shadow-lg hover:shadow-oxot-gold/20 transition-all"
                            >
                                <BrainCircuit size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Phase Navigation */}
                    <PhaseProgress
                        phases={phases}
                        currentPhase={state.currentPhase}
                        onPhaseClick={(id) => setPhase(id as PhaseId)}
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Standard Reference */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                <BookOpen size={16} className="text-oxot-gold" />
                                Standard Reference
                            </h2>

                            <div className="space-y-2">
                                {Object.entries(STANDARD_SERIES).map(([key, series]) => (
                                    <div key={key} className="border border-white/5 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setExpandedSeries(expandedSeries === key ? null : key)}
                                            className="w-full px-4 py-3 flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full bg-${series.color}-500`} />
                                                <span className="text-sm font-bold text-white">{series.name}</span>
                                                <span className="text-[10px] text-slate-500 font-mono">({key})</span>
                                            </div>
                                            {expandedSeries === key ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                        </button>

                                        <AnimatePresence>
                                            {expandedSeries === key && (
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: 'auto' }}
                                                    exit={{ height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-3 space-y-2 bg-slate-900/30">
                                                        {series.parts.map(part => (
                                                            <div key={part.id} className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors group cursor-pointer">
                                                                <div className="flex items-start justify-between">
                                                                    <div>
                                                                        <span className="text-[10px] text-oxot-gold font-mono">IEC 62443-{part.id}</span>
                                                                        <h4 className="text-xs font-bold text-white group-hover:text-oxot-gold transition-colors">{part.name}</h4>
                                                                    </div>
                                                                    <ExternalLink size={12} className="text-slate-600 group-hover:text-oxot-gold" />
                                                                </div>
                                                                <p className="text-[10px] text-slate-500 mt-1">{part.desc}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Security Level Visualization */}
                        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                <BarChart3 size={16} className="text-oxot-gold" />
                                Security Level Vector
                            </h2>
                            <SecurityLevelRadar
                                slTargets={state.slTargets}
                                slAchieved={state.slAchieved}
                            />
                        </div>
                    </div>

                    {/* Right Column: Phase Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Phase Header */}
                        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-xl bg-${currentPhaseData?.color}-500/20 border border-${currentPhaseData?.color}-500/30 flex items-center justify-center`}>
                                        {currentPhaseData && <currentPhaseData.icon size={28} className={`text-${currentPhaseData.color}-400`} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h2 className="text-2xl font-black text-white">{currentPhaseData?.name}</h2>
                                            <span className="text-[10px] px-2 py-1 bg-oxot-gold/20 text-oxot-gold rounded font-mono">
                                                IEC 62443-{currentPhaseData?.standard}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400">
                                            {state.persona === 'integrator'
                                                ? 'Asset Owner / System Integrator Journey'
                                                : 'Product Supplier SDL Journey'}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="text-right">
                                    <div className="text-3xl font-black text-white">{completedArtifacts}/{totalArtifacts}</div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Artifacts Generated</p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(completedArtifacts / totalArtifacts) * 100}%` }}
                                    className="h-full bg-gradient-to-r from-oxot-gold to-yellow-500"
                                />
                            </div>
                        </div>

                        {/* WORKSPACE MODULES */}
                        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-1 overflow-hidden min-h-[600px] flex flex-col">

                            {/* Module Selector (for phases with multiple tools) */}
                            {(state.currentPhase === 'design' || state.currentPhase === 'assess') && (
                                <div className="flex gap-2 p-4 border-b border-white/5">
                                    <button
                                        onClick={() => setActiveModule('assets')}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeModule === 'assets' ? 'bg-oxot-gold text-black' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                                    >
                                        Assets
                                    </button>
                                    <button
                                        onClick={() => setActiveModule('risks')}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeModule === 'risks' ? 'bg-oxot-gold text-black' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                                    >
                                        Risk Board
                                    </button>
                                    {state.currentPhase === 'design' && (
                                        <button
                                            onClick={() => setActiveModule('zones')}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeModule === 'zones' ? 'bg-oxot-gold text-black' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                                        >
                                            Zones & Conduits
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className="p-1 flex-1">
                                {(state.currentPhase === 'assess' || state.currentPhase === 'design' || state.currentPhase === 'threat') ? (
                                    <>
                                        {activeModule === 'assets' && (
                                            <AssetInventoryModule
                                                assets={state.assets}
                                                onAddAsset={addAsset}
                                                onUpdateAsset={updateAsset}
                                                onDeleteAsset={deleteAsset}
                                            />
                                        )}
                                        {activeModule === 'risks' && (
                                            <RiskBoardModule
                                                risks={state.risks}
                                                assets={state.assets}
                                                onAddRisk={addRisk}
                                                onUpdateRisk={updateRisk}
                                                onDeleteRisk={deleteRisk}
                                            />
                                        )}
                                        {activeModule === 'zones' && (
                                            <ZoneConduitEditorModule
                                                zones={state.zones}
                                                conduits={state.conduits}
                                                assets={state.assets}
                                                onAddZone={addZone}
                                                onUpdateZone={updateZone}
                                                onDeleteZone={deleteZone}
                                                onAddConduit={addConduit}
                                                onUpdateConduit={updateConduit}
                                                onDeleteConduit={deleteConduit}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-500">
                                        <Wrench size={48} className="mb-4 opacity-20" />
                                        <h3 className="text-lg font-bold text-slate-400">Implementation Tools Loading...</h3>
                                        <p className="text-sm">Tools for {state.currentPhase} phase are coming soon.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Artifact Templates */}
                        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                <FolderArchive size={16} className="text-oxot-gold" />
                                Required Artifacts
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {artifactTemplates.map((template: any, i: number) => (
                                    <ArtifactCard
                                        key={i}
                                        template={template}
                                        onGenerate={() => handleGenerateArtifact(template)}
                                        isGenerating={generatingArtifact === template.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Generated Artifacts */}
                        {
                            state.artifacts.filter(a => a.phase === state.currentPhase).length > 0 && (
                                <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <ClipboardCheck size={16} className="text-green-400" />
                                        Evidence Locker
                                    </h3>

                                    <div className="space-y-2">
                                        {state.artifacts.filter(a => a.phase === state.currentPhase).map(artifact => (
                                            <div key={artifact.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <FileText size={16} className="text-slate-400" />
                                                    <div>
                                                        <span className="text-sm font-bold text-white">{artifact.name}</span>
                                                        <span className="text-[10px] text-slate-500 ml-2">IEC 62443-{artifact.standard}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] px-2 py-1 rounded font-bold ${artifact.status === 'approved'
                                                        ? 'bg-green-900/30 text-green-400'
                                                        : artifact.status === 'review'
                                                            ? 'bg-yellow-900/30 text-yellow-400'
                                                            : 'bg-slate-700 text-slate-400'
                                                        }`}>
                                                        {artifact.status.toUpperCase()}
                                                    </span>
                                                    <button className="p-1.5 hover:bg-slate-700 rounded">
                                                        <Download size={14} className="text-slate-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {/* Phase Actions */}
                        <div className="flex justify-between items-center">
                            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg border border-white/10 flex items-center gap-2">
                                <Save size={16} />
                                Save Progress
                            </button>

                            <button
                                onClick={() => {
                                    const currentIndex = phases.findIndex(p => p.id === state.currentPhase)
                                    if (currentIndex < phases.length - 1) {
                                        setPhase(phases[currentIndex + 1].id as PhaseId)
                                    }
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-oxot-gold to-yellow-600 text-black text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-oxot-gold/20 transition-all flex items-center gap-2"
                            >
                                Next Phase
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div >
                </div >
            </main >

            {/* AI Chat Panel */}
            < AIChatPanel
                isOpen={isAIOpen}
                onClose={() => setIsAIOpen(false)
                }
                context={
                    JSON.stringify({
                        persona: state.persona,
                        phase: state.currentPhase,
                        assets: state.assets.length,
                        risks: state.risks.length,
                        slTargets: state.slTargets,
                        slAchieved: state.slAchieved
                    })
                }
            />

            {/* AI Toggle Button (when closed) */}
            {
                !isAIOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={() => setIsAIOpen(true)}
                        className="fixed bottom-6 right-6 p-4 bg-gradient-to-br from-oxot-gold to-yellow-600 rounded-full text-black shadow-2xl shadow-oxot-gold/20 hover:scale-110 transition-transform z-50"
                    >
                        <Bot size={24} />
                    </motion.button>
                )
            }
        </div >
    )
}
