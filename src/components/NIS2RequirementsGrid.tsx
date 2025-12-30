'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield, FileText, RefreshCw, Link2, Code, BarChart3,
    GraduationCap, Lock, Users, Key, ChevronDown, ChevronUp,
    CheckCircle, ArrowRight
} from 'lucide-react'

// Article 21 - 10 Minimum Cybersecurity Risk-Management Measures
const REQUIREMENTS = [
    {
        id: 'a',
        title: 'Risk Analysis & Security Policies',
        icon: Shield,
        color: '#D4AF37', // Gold
        summary: 'Policies on risk analysis and information system security',
        details: [
            'Conduct thorough risk assessments identifying threats to network and information systems',
            'Develop and implement security policies based on identified risks',
            'Regular review and update of risk assessments',
            'Document risk acceptance criteria and treatment plans'
        ],
        frameworks: ['ISO 27001 A.5', 'IEC 62443-2-1', 'NIST CSF ID.RA'],
        oxotService: 'Risk Assessment & Policy Development'
    },
    {
        id: 'b',
        title: 'Incident Handling',
        icon: FileText,
        color: '#3B82F6', // Blue
        summary: 'Procedures for detection, analysis, response, and reporting',
        details: [
            'Establish detection capabilities for security incidents',
            'Define analysis and classification procedures',
            'Implement response and recovery protocols',
            '24-hour early warning, 72-hour notification, 1-month report deadlines'
        ],
        frameworks: ['ISO 27001 A.16', 'IEC 62443-2-1', 'NIST CSF RS'],
        oxotService: 'Incident Response Program'
    },
    {
        id: 'c',
        title: 'Business Continuity & Crisis Management',
        icon: RefreshCw,
        color: '#64748b', // Slate
        summary: 'Backup management, disaster recovery, and crisis response',
        details: [
            'Develop comprehensive business continuity plans',
            'Implement regular backup procedures with testing',
            'Define recovery time and point objectives (RTO/RPO)',
            'Establish crisis management and communication protocols'
        ],
        frameworks: ['ISO 22301', 'IEC 62443-2-1', 'NIST CSF PR.IP'],
        oxotService: 'Business Continuity Planning'
    },
    {
        id: 'd',
        title: 'Supply Chain Security',
        icon: Link2,
        color: '#D4AF37', // Gold
        summary: 'Security aspects of supplier and service provider relationships',
        details: [
            'Identify and assess risks from direct suppliers and service providers',
            'Include cybersecurity clauses in contracts',
            'Monitor supplier compliance continuously',
            'Minimize dependencies and single points of failure'
        ],
        frameworks: ['ISO 27001 A.15', 'IEC 62443-2-4', 'NIST CSF ID.SC'],
        oxotService: 'Supply Chain Risk Management'
    },
    {
        id: 'e',
        title: 'Secure Development & Vulnerability Handling',
        icon: Code,
        color: '#3B82F6', // Blue
        summary: 'Security in acquisition, development, maintenance, and vulnerability disclosure',
        details: [
            'Incorporate security throughout the development lifecycle',
            'Implement secure coding practices',
            'Establish vulnerability identification and patching processes',
            'Coordinate vulnerability disclosure with vendors'
        ],
        frameworks: ['ISO 27001 A.14', 'IEC 62443-4-1', 'NIST CSF PR.DS'],
        oxotService: 'Secure Development Lifecycle'
    },
    {
        id: 'f',
        title: 'Effectiveness Assessment',
        icon: BarChart3,
        color: '#64748b', // Slate
        summary: 'Policies and procedures to assess cybersecurity measure effectiveness',
        details: [
            'Regular evaluation of security controls',
            'Penetration testing and security audits',
            'Key performance indicators for security',
            'Continuous improvement based on findings'
        ],
        frameworks: ['ISO 27001 A.18', 'IEC 62443-2-1', 'NIST CSF ID.RA'],
        oxotService: 'Security Assessment & Testing'
    },
    {
        id: 'g',
        title: 'Cyber Hygiene & Training',
        icon: GraduationCap,
        color: '#D4AF37', // Gold
        summary: 'Basic cyber hygiene practices and cybersecurity training',
        details: [
            'Implement fundamental security practices across organization',
            'Regular security awareness training for all staff',
            'Phishing simulations and social engineering tests',
            'Role-specific training for technical personnel'
        ],
        frameworks: ['ISO 27001 A.7', 'IEC 62443-2-1', 'NIST CSF PR.AT'],
        oxotService: 'Security Awareness Program'
    },
    {
        id: 'h',
        title: 'Cryptography & Encryption',
        icon: Lock,
        color: '#3B82F6', // Blue
        summary: 'Policies and procedures on cryptography and encryption use',
        details: [
            'Define cryptographic policies aligned with data sensitivity',
            'Implement encryption for data at rest and in transit',
            'Manage cryptographic keys securely',
            'Regular review of cryptographic algorithms'
        ],
        frameworks: ['ISO 27001 A.10', 'IEC 62443-3-3', 'NIST CSF PR.DS'],
        oxotService: 'Cryptographic Controls'
    },
    {
        id: 'i',
        title: 'HR Security & Access Control',
        icon: Users,
        color: '#64748b', // Slate
        summary: 'Human resources security and access control policies',
        details: [
            'Background checks for personnel with privileged access',
            'Clear security responsibilities in job descriptions',
            'Least privilege access control implementation',
            'Secure offboarding procedures'
        ],
        frameworks: ['ISO 27001 A.7, A.9', 'IEC 62443-2-1', 'NIST CSF PR.AC'],
        oxotService: 'Access Management'
    },
    {
        id: 'j',
        title: 'Multi-Factor Authentication',
        icon: Key,
        color: '#D4AF37', // Gold
        summary: 'MFA, continuous authentication, and secure communications',
        details: [
            'Multi-factor authentication for critical systems',
            'Continuous authentication where appropriate',
            'Secured voice, video, and text communications',
            'Emergency communication systems'
        ],
        frameworks: ['ISO 27001 A.9', 'IEC 62443-3-3', 'NIST CSF PR.AC'],
        oxotService: 'Identity & Access Management'
    }
]

export default function NIS2RequirementsGrid() {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">
                        ARTICLE 21(2) // MANDATORY MEASURES
                    </div>
                    <h3 className="text-xl font-bold text-white">
                        10 Minimum Cybersecurity Risk-Management Measures
                    </h3>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-gray-400">ISO 27001</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        <span className="text-gray-400">IEC 62443</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-gray-400">NIST CSF</span>
                    </div>
                </div>
            </div>

            {/* Requirements Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {REQUIREMENTS.map((req, index) => {
                    const Icon = req.icon
                    const isExpanded = expandedId === req.id

                    return (
                        <motion.div
                            key={req.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div
                                className={`
                                    bg-white/[0.02] border rounded-xl overflow-hidden cursor-pointer
                                    transition-all duration-300 hover:bg-white/[0.04]
                                    ${isExpanded ? 'border-white/20' : 'border-white/5'}
                                `}
                                style={{
                                    borderLeftWidth: 3,
                                    borderLeftColor: req.color
                                }}
                                onClick={() => setExpandedId(isExpanded ? null : req.id)}
                            >
                                {/* Header */}
                                <div className="p-4 flex items-center gap-4">
                                    {/* Requirement Letter */}
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-lg"
                                        style={{
                                            backgroundColor: `${req.color}20`,
                                            color: req.color
                                        }}
                                    >
                                        {req.id}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <Icon size={14} style={{ color: req.color }} />
                                            <h4 className="text-white font-semibold text-sm truncate">
                                                {req.title}
                                            </h4>
                                        </div>
                                        <p className="text-gray-500 text-xs mt-1 line-clamp-1">
                                            {req.summary}
                                        </p>
                                    </div>

                                    {/* Expand Icon */}
                                    <div className="text-gray-500">
                                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-4 space-y-4 border-t border-white/5 pt-4">
                                                {/* Technical Details */}
                                                <div className="space-y-2">
                                                    {req.details.map((detail, i) => (
                                                        <div key={i} className="flex items-start gap-2 text-sm">
                                                            <CheckCircle
                                                                size={14}
                                                                className="mt-0.5 flex-shrink-0"
                                                                style={{ color: req.color }}
                                                            />
                                                            <span className="text-gray-400">{detail}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Framework Mapping */}
                                                <div className="flex flex-wrap gap-2">
                                                    {req.frameworks.map((fw, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-400 uppercase"
                                                        >
                                                            {fw}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* OXOT Service */}
                                                <div
                                                    className="flex items-center justify-between p-3 rounded-lg"
                                                    style={{ backgroundColor: `${req.color}10` }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-2 h-2 rounded-full"
                                                            style={{ backgroundColor: req.color }}
                                                        />
                                                        <span className="text-sm" style={{ color: req.color }}>
                                                            OXOT: {req.oxotService}
                                                        </span>
                                                    </div>
                                                    <ArrowRight size={14} style={{ color: req.color }} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Footer Note */}
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                    <Shield size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <div className="text-cyan-400 font-semibold text-sm">All-Hazards Approach Required</div>
                        <p className="text-cyan-200/60 text-xs mt-1">
                            Measures must be proportionate to the size of the entity, risk exposure, and the likely societal and economic impact of potential incidents.
                            Implementation costs and state-of-the-art technologies must be considered.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
