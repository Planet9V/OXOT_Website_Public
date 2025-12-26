'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts'
import { Sigma, Brain, Target, AlertTriangle, TrendingUp, HelpCircle, Database, Shield, Link2, Layers, CheckCircle, Cpu, GitBranch } from 'lucide-react'

// EPSS Probability Distribution Data (based on real EPSS statistics)
const EPSS_DISTRIBUTION = [
    { range: '0-10%', count: 185000, color: '#22c55e' },
    { range: '10-20%', count: 12000, color: '#84cc16' },
    { range: '20-30%', count: 4500, color: '#eab308' },
    { range: '30-40%', count: 2100, color: '#f97316' },
    { range: '40-50%', count: 1200, color: '#ef4444' },
    { range: '50-60%', count: 650, color: '#dc2626' },
    { range: '60-70%', count: 320, color: '#b91c1c' },
    { range: '70-80%', count: 180, color: '#991b1b' },
    { range: '80-90%', count: 95, color: '#7f1d1d' },
    { range: '90-100%', count: 45, color: '#450a0a' },
]

// Sigmoid curve for logistic regression
const generateSigmoidData = () => {
    const data = []
    for (let i = -6; i <= 6; i += 0.3) {
        const sigmoid = 1 / (1 + Math.exp(-i))
        data.push({ x: i.toFixed(1), y: (sigmoid * 100).toFixed(1) })
    }
    return data
}

// EPSS Model Features Data
const MODEL_FEATURES = [
    { category: 'Vulnerability Metadata', features: ['CVE description keywords', 'CVE age (days since publication)', 'Reference count', 'Vendor information (from CPE)'], icon: <Database className="w-4 h-4" /> },
    { category: 'Exploit Intelligence', features: ['Public exploit code exists', 'Metasploit module available', 'ExploitDB entry', 'GitHub PoC repositories'], icon: <Target className="w-4 h-4" /> },
    { category: 'CVSS Metrics', features: ['Attack Vector (AV)', 'Attack Complexity (AC)', 'Privileges Required (PR)', 'User Interaction (UI)'], icon: <Shield className="w-4 h-4" /> },
    { category: 'Weakness Classification', features: ['CWE category', 'CWE severity ranking', 'Exploitability patterns', 'Historical CWE exploitation rates'], icon: <GitBranch className="w-4 h-4" /> },
]

// Standards Relationships
const STANDARDS_RELATIONS = [
    {
        id: 'CVE',
        name: 'Common Vulnerabilities & Exposures',
        desc: 'Unique identifier for each vulnerability',
        relation: 'EPSS scores each CVE with exploitation probability',
        color: 'text-cyan-400',
        borderColor: 'border-cyan-500/30',
        example: 'CVE-2021-44228 (Log4Shell)'
    },
    {
        id: 'CVSS',
        name: 'Common Vulnerability Scoring System',
        desc: 'Measures severity (0-10 scale)',
        relation: 'EPSS uses CVSS metrics as input features; predicts likelihood while CVSS measures impact',
        color: 'text-orange-400',
        borderColor: 'border-orange-500/30',
        example: '9.8 Critical ≠ High EPSS'
    },
    {
        id: 'CWE',
        name: 'Common Weakness Enumeration',
        desc: 'Root cause weakness types',
        relation: 'EPSS analyzes CWE category to predict exploit patterns',
        color: 'text-purple-400',
        borderColor: 'border-purple-500/30',
        example: 'CWE-787: Out-of-bounds Write'
    },
    {
        id: 'CPE',
        name: 'Common Platform Enumeration',
        desc: 'Affected products/vendors',
        relation: 'EPSS uses CPE vendor data to weight urgency',
        color: 'text-green-400',
        borderColor: 'border-green-500/30',
        example: 'cpe:2.3:a:apache:log4j:2.14.1'
    },
    {
        id: 'CAPEC',
        name: 'Common Attack Pattern Enumeration',
        desc: 'Attack patterns & techniques',
        relation: 'CAPEC → CWE mapping informs exploitation likelihood',
        color: 'text-red-400',
        borderColor: 'border-red-500/30',
        example: 'CAPEC-66: SQL Injection'
    },
]

export default function EPSSMathDeepDive() {
    const [sigmoidData] = useState(generateSigmoidData())
    const [activeTab, setActiveTab] = useState<'overview' | 'formula' | 'features' | 'relations'>('overview')

    return (
        <div className="w-full space-y-8">

            {/* TAB NAVIGATION */}
            <div className="flex gap-2 flex-wrap justify-center">
                {[
                    { id: 'overview', label: 'Overview', icon: <Brain className="w-4 h-4" /> },
                    { id: 'formula', label: 'Algorithm & Math', icon: <Sigma className="w-4 h-4" /> },
                    { id: 'features', label: 'Model Features', icon: <Layers className="w-4 h-4" /> },
                    { id: 'relations', label: 'CVE/CWE/CAPEC', icon: <Link2 className="w-4 h-4" /> },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-all
                            ${activeTab === tab.id
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                : 'text-gray-500 border border-white/10 hover:bg-white/5'}`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        {/* Header Card */}
                        <div className="bg-black/40 border border-white/10 rounded-xl p-8">
                            <div className="flex flex-col lg:flex-row gap-8 items-start">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3 mb-4">
                                        <Brain className="text-cyan-400" />
                                        EPSS: Exploit Prediction Scoring System
                                    </h2>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        Developed by <span className="text-white font-bold">FIRST.org</span>, EPSS is a machine learning model that predicts
                                        the <span className="text-cyan-400">probability (0-100%)</span> that a vulnerability will be
                                        <span className="text-white font-bold"> exploited in the wild within 30 days</span>. Unlike CVSS which measures
                                        theoretical severity, EPSS provides actionable prioritization based on real-world threat intelligence.
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                        <div className="p-4 bg-cyan-900/20 border border-cyan-500/20 rounded-lg">
                                            <div className="text-xl font-black text-cyan-400">~1,500</div>
                                            <div className="text-[10px] text-gray-500 uppercase">Model Features</div>
                                        </div>
                                        <div className="p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
                                            <div className="text-xl font-black text-green-400">200K+</div>
                                            <div className="text-[10px] text-gray-500 uppercase">CVEs Scored</div>
                                        </div>
                                        <div className="p-4 bg-purple-900/20 border border-purple-500/20 rounded-lg">
                                            <div className="text-xl font-black text-purple-400">30 Days</div>
                                            <div className="text-[10px] text-gray-500 uppercase">Prediction Window</div>
                                        </div>
                                        <div className="p-4 bg-orange-900/20 border border-orange-500/20 rounded-lg">
                                            <div className="text-xl font-black text-orange-400">Daily</div>
                                            <div className="text-[10px] text-gray-500 uppercase">Score Refresh</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Distribution Chart */}
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="text-cyan-400" /> EPSS Score Distribution (All CVEs)
                            </h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Most vulnerabilities have very low exploitation probability. Only ~5% of CVEs have EPSS &gt; 10%.
                            </p>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={EPSS_DISTRIBUTION}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                        <XAxis dataKey="range" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                                        <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                                            labelStyle={{ color: '#fff' }}
                                        />
                                        <Bar dataKey="count" name="CVE Count">
                                            {EPSS_DISTRIBUTION.map((entry, idx) => (
                                                <Cell key={idx} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Key Insight */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-red-900/10 border border-red-500/20 rounded-xl">
                                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> The CVSS Trap
                                </h4>
                                <p className="text-gray-400 text-sm">
                                    Organizations using CVSS alone often patch vulnerabilities with high severity scores that are
                                    <span className="text-white"> never exploited</span>, while missing lower-scored vulnerabilities
                                    that are actively weaponized.
                                </p>
                            </div>
                            <div className="p-6 bg-green-900/10 border border-green-500/20 rounded-xl">
                                <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" /> EPSS Advantage
                                </h4>
                                <p className="text-gray-400 text-sm">
                                    By prioritizing the <span className="text-white">top 10% of EPSS scores</span>, security teams
                                    can achieve 80%+ coverage of actually exploited vulnerabilities while patching
                                    <span className="text-white"> 90% fewer CVEs</span>.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* FORMULA TAB */}
                {activeTab === 'formula' && (
                    <motion.div
                        key="formula"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <div className="bg-black/40 border border-white/10 rounded-xl p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Logistic Regression Model</h3>
                            <p className="text-gray-400 mb-8">
                                EPSS uses <span className="text-cyan-400">logistic regression</span> (sigmoid function) to output a probability
                                between 0 and 1. The model learns weights for ~1,500 features from historical exploitation data.
                            </p>

                            {/* Formula Display */}
                            <div className="bg-black border border-cyan-500/30 rounded-xl p-6 mb-8 font-mono text-center">
                                <div className="text-sm text-gray-500 mb-4">Sigmoid / Logistic Function:</div>
                                <div className="text-xl text-cyan-400 mb-4">
                                    P(exploit) = σ(z) = 1 / (1 + e<sup>-z</sup>)
                                </div>
                                <div className="text-sm text-gray-500 mt-4 mb-2">Where z is the linear combination of features:</div>
                                <div className="text-lg text-white">
                                    z = β₀ + β₁x₁ + β₂x₂ + ... + β<sub>n</sub>x<sub>n</sub>
                                </div>
                                <div className="text-xs text-gray-600 mt-4">
                                    β = learned weights, x = feature values (CVE metadata, exploit intel, CVSS metrics, etc.)
                                </div>
                            </div>

                            {/* Sigmoid Curve */}
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={sigmoidData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                        <XAxis dataKey="x" tick={{ fill: '#9ca3af', fontSize: 10 }} label={{ value: 'z (weighted sum)', position: 'bottom', fill: '#666' }} />
                                        <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} label={{ value: 'P(exploit) %', angle: -90, position: 'insideLeft', fill: '#666' }} />
                                        <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                                        <Line type="monotone" dataKey="y" stroke="#22d3ee" strokeWidth={3} dot={false} name="Probability %" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-black/40 border border-white/10 rounded-xl">
                                <h4 className="text-white font-bold mb-3">Probability Score</h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    Value between 0 and 1 representing the likelihood of exploitation in the next 30 days.
                                </p>
                                <div className="font-mono text-cyan-400 text-lg">0.0 → 1.0</div>
                            </div>
                            <div className="p-6 bg-black/40 border border-white/10 rounded-xl">
                                <h4 className="text-white font-bold mb-3">Percentile Ranking</h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    How this CVE ranks compared to all other scored CVEs. 95th percentile = riskier than 95% of all CVEs.
                                </p>
                                <div className="font-mono text-purple-400 text-lg">1st → 100th</div>
                            </div>
                            <div className="p-6 bg-black/40 border border-white/10 rounded-xl">
                                <h4 className="text-white font-bold mb-3">Efficiency Gain</h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    Remediation effort reduction when using EPSS vs. patching all CVEs blindly.
                                </p>
                                <div className="font-mono text-green-400 text-lg">Up to 97%</div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* FEATURES TAB */}
                {activeTab === 'features' && (
                    <motion.div
                        key="features"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-2">~1,500 Model Features</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                EPSS ingests data from multiple sources to build a comprehensive feature set for each CVE.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {MODEL_FEATURES.map((cat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 bg-black/40 border border-white/10 rounded-xl hover:border-cyan-500/30 transition-colors"
                                >
                                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                        <span className="text-cyan-400">{cat.icon}</span>
                                        {cat.category}
                                    </h4>
                                    <ul className="space-y-2">
                                        {cat.features.map((f, j) => (
                                            <li key={j} className="text-gray-400 text-sm flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>

                        {/* Data Sources */}
                        <div className="p-6 bg-cyan-900/10 border border-cyan-500/20 rounded-xl">
                            <h4 className="text-cyan-400 font-bold mb-4">Data Sources</h4>
                            <div className="flex flex-wrap gap-3">
                                {['NVD (NIST)', 'CISA KEV', 'Exploit-DB', 'Metasploit', 'GitHub PoCs', 'Shodan', 'GreyNoise', 'AlienVault OTX'].map((src, i) => (
                                    <span key={i} className="px-3 py-1 bg-black/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono rounded">
                                        {src}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* RELATIONS TAB */}
                {activeTab === 'relations' && (
                    <motion.div
                        key="relations"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-2">Security Standards Ecosystem</h3>
                            <p className="text-gray-400 text-sm">
                                EPSS integrates with and complements other security enumeration systems.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {STANDARDS_RELATIONS.map((std, i) => (
                                <motion.div
                                    key={std.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`p-5 bg-black/40 border ${std.borderColor} rounded-xl`}
                                >
                                    <div className={`text-lg font-black ${std.color} mb-1`}>{std.id}</div>
                                    <div className="text-white text-sm font-bold mb-2">{std.name}</div>
                                    <p className="text-gray-500 text-xs mb-3">{std.desc}</p>
                                    <div className="p-3 bg-black/40 rounded border border-white/5 mb-3">
                                        <div className="text-[10px] text-gray-600 uppercase mb-1">EPSS Relationship</div>
                                        <p className="text-gray-300 text-xs">{std.relation}</p>
                                    </div>
                                    <div className="text-[10px] text-gray-600 font-mono">{std.example}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Knowledge Graph Visualization */}
                        <div className="p-6 bg-black/40 border border-white/10 rounded-xl">
                            <h4 className="text-white font-bold mb-4">Relationship Map</h4>
                            <div className="flex items-center justify-center gap-4 flex-wrap text-center py-8">
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-cyan-900/30 border-2 border-cyan-500 flex items-center justify-center text-cyan-400 font-bold">CVE</div>
                                    <div className="text-xs text-gray-500 mt-2">Identifier</div>
                                </div>
                                <div className="text-gray-600">→</div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-purple-900/30 border-2 border-purple-500 flex items-center justify-center text-purple-400 font-bold">CWE</div>
                                    <div className="text-xs text-gray-500 mt-2">Weakness</div>
                                </div>
                                <div className="text-gray-600">→</div>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-red-900/30 border-2 border-red-500 flex items-center justify-center text-red-400 font-bold">CAPEC</div>
                                    <div className="text-xs text-gray-500 mt-2">Attack</div>
                                </div>
                                <div className="text-gray-600">→</div>
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full bg-green-900/30 border-2 border-green-500 flex items-center justify-center text-green-400 font-bold">EPSS</div>
                                    <div className="text-xs text-gray-500 mt-2">Probability</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

