
'use client'

import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
    ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { SimulationParams, DataFeedItem } from '../types';
import { GitCommit, AlertTriangle, Database, Globe, Shield, Terminal, Cpu, Activity, Zap, Radio } from 'lucide-react';
import { CalculusRequirements } from './CalculusRequirements';

interface SimulationGraphProps {
    params: SimulationParams;
}

// Mock Data Generators
const CYPHER_QUERIES = [
    "MATCH (t:ThreatActor)-[:TARGETS]->(s:Sector {name: 'Energy'}) RETURN t.probability",
    "CALL gds.pageRank.stream('PsychGraph') YIELD nodeId, score",
    "MATCH (v:Vulnerability) WHERE v.cvss > 9.0 DETACH DELETE v",
    "MERGE (e:Event {type: 'Geopolitical'})-[:IMPACTS]->(m:Market)",
    "CALCULATE d(Psi)/dt WHERE entropy > threshold"
];

const NEWS_FRAGMENTS = [
    { source: 'NVD', content: 'CVE-2025-8921: Remote Code Execution in OpenSSL', severity: 'critical' },
    { source: 'REUTERS', content: 'Tensions rise in Strait of Hormuz, shipping impacted', severity: 'high' },
    { source: 'INT', content: 'Intercepted chatter regarding water utility SCADA', severity: 'high' },
    { source: 'DARKWEB', content: 'New exploit kit "Vortex" selling for 50BTC', severity: 'medium' },
    { source: 'INT', content: 'Employee sentiment analysis: "Burnout" detected', severity: 'medium' },
    { source: 'NVD', content: 'CVE-2025-9912: Minor buffer overflow in legacy stack', severity: 'low' },
];

// --- WARGAMES WIDGET COMPONENT (Re-integrated) ---
const WarGamesWidget: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = container.clientWidth;
        let height = canvas.height = container.clientHeight;

        // Entities
        const ORBIT_RADIUS = Math.min(width, height) * 0.35;
        const SHIELD_RADIUS = ORBIT_RADIUS * 0.6;
        let time = 0;

        // Sociological Disruptors (Floating Labels)
        const DISRUPTORS = [
            { text: "Bias", x: 0, y: 0, angle: 0, speed: 0.002, color: "#fca5a5" },
            { text: "Burnout", x: 0, y: 0, angle: 2, speed: 0.0015, color: "#fca5a5" },
            { text: "Ego", x: 0, y: 0, angle: 4, speed: 0.003, color: "#fca5a5" },
            { text: "Groupthink", x: 0, y: 0, angle: 1, speed: 0.001, color: "#fca5a5" },
            { text: "Vulnerability", x: 0, y: 0, angle: 3, speed: 0.0025, color: "#93c5fd" }, // Blueish for tech
            { text: "Zero-Day", x: 0, y: 0, angle: 5, speed: 0.004, color: "#ef4444" },     // Red for threat
            { text: "Phishing", x: 0, y: 0, angle: 2.5, speed: 0.002, color: "#ef4444" },
            { text: "Exploit", x: 0, y: 0, angle: 0.5, speed: 0.003, color: "#ef4444" },
        ];

        // Attack Drones (Red Triangles)
        const ATTACKERS = Array.from({ length: 6 }).map((_, i) => ({
            angle: i * (Math.PI / 3),
            radius: ORBIT_RADIUS + Math.random() * 40,
            speed: 0.01 + Math.random() * 0.02,
            type: Math.random() > 0.5 ? 'HEAVY' : 'FAST',
            cooldown: Math.random() * 100
        }));

        // Projectiles
        const projectiles: { x: number, y: number, vx: number, vy: number, life: number }[] = [];

        const handleResize = () => {
            width = canvas.width = container.clientWidth;
            height = canvas.height = container.clientHeight;
        };
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);

        const animate = () => {
            time += 0.01;
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            // 1. Draw Defender Shield (Blue Matrix)
            ctx.strokeStyle = '#00aaff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            const shieldSegments = 12;
            for (let i = 0; i < shieldSegments; i++) {
                const startAngle = (i / shieldSegments) * Math.PI * 2 + time * 0.1;
                const endAngle = ((i + 0.6) / shieldSegments) * Math.PI * 2 + time * 0.1;
                ctx.arc(cx, cy, SHIELD_RADIUS, startAngle, endAngle);
            }
            ctx.stroke();

            // Shield Inner Glow
            const grd = ctx.createRadialGradient(cx, cy, SHIELD_RADIUS * 0.5, cx, cy, SHIELD_RADIUS);
            grd.addColorStop(0, 'rgba(0, 170, 255, 0)');
            grd.addColorStop(1, 'rgba(0, 170, 255, 0.1)');
            ctx.fillStyle = grd;
            ctx.fill();

            // 2. Update & Draw Attackers
            ATTACKERS.forEach(att => {
                att.angle += att.speed;
                const ax = cx + Math.cos(att.angle) * att.radius;
                const ay = cy + Math.sin(att.angle) * att.radius;

                // Draw Drone
                ctx.save();
                ctx.translate(ax, ay);
                ctx.rotate(att.angle + Math.PI / 2);
                ctx.beginPath();
                if (att.type === 'HEAVY') {
                    ctx.moveTo(0, 5); ctx.lineTo(-4, -4); ctx.lineTo(4, -4);
                    ctx.fillStyle = '#ef4444';
                } else {
                    ctx.moveTo(0, 6); ctx.lineTo(-2, -6); ctx.lineTo(2, -6);
                    ctx.fillStyle = '#fca5a5';
                }
                ctx.fill();
                ctx.restore();

                // Fire Logic
                att.cooldown--;
                if (att.cooldown <= 0) {
                    att.cooldown = 50 + Math.random() * 100;
                    // Fire missile at core
                    const angleToCore = Math.atan2(cy - ay, cx - ax);
                    const speed = 2;
                    projectiles.push({
                        x: ax, y: ay,
                        vx: Math.cos(angleToCore) * speed,
                        vy: Math.sin(angleToCore) * speed,
                        life: 100
                    });
                }
            });

            // 3. Update & Draw Projectiles
            for (let i = projectiles.length - 1; i >= 0; i--) {
                const p = projectiles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life--;

                // Draw Trail
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x - p.vx * 4, p.y - p.vy * 4);
                ctx.stroke();

                // Shield Collision
                const dx = p.x - cx;
                const dy = p.y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < SHIELD_RADIUS) {
                    // Impact Effect
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                    ctx.fill();
                    projectiles.splice(i, 1);
                } else if (p.life <= 0) {
                    projectiles.splice(i, 1);
                }
            }

            // 4. Update & Draw Disruptors (Sociological Factors)
            ctx.font = "10px 'Roboto Mono'";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            DISRUPTORS.forEach((d, i) => {
                d.angle += d.speed;
                // Varying orbit radii
                const currentRadius = SHIELD_RADIUS + 25 + (Math.sin(time + i) * 10) + (i % 3) * 15;
                const dx = cx + Math.cos(d.angle) * currentRadius;
                const dy = cy + Math.sin(d.angle) * currentRadius;

                // Draw Label
                ctx.fillStyle = d.color;
                ctx.fillText(d.text, dx, dy);

                // Connection line to shield (Simulating interference)
                if (Math.random() > 0.95) {
                    ctx.strokeStyle = d.color + '40';
                    ctx.beginPath();
                    ctx.moveTo(dx, dy);
                    const shieldX = cx + Math.cos(d.angle) * SHIELD_RADIUS;
                    const shieldY = cy + Math.sin(d.angle) * SHIELD_RADIUS;
                    ctx.lineTo(shieldX, shieldY);
                    ctx.stroke();
                }
            });

            // HUD Text
            ctx.font = "10px 'Roboto Mono'";
            ctx.fillStyle = "#555";
            ctx.fillText("SIEGE SIMULATION // LIVE", cx, height - 20);

            requestAnimationFrame(animate);
        };
        const animId = requestAnimationFrame(animate);

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animId);
        };
    }, []);

    return <div ref={containerRef} className="w-full h-full min-h-[300px] relative bg-black/20" />;
};


export const SimulationGraph: React.FC<SimulationGraphProps> = ({ params }) => {
    const [feeds, setFeeds] = useState<DataFeedItem[]>([]);
    const [activeQuery, setActiveQuery] = useState("");
    const [timeStep, setTimeStep] = useState(0);
    const feedScrollRef = useRef<HTMLDivElement>(null);

    // Simulation Data Calculation
    const data = useMemo(() => {
        const points = [];
        const days = 90;

        let currentRealist = 0.2;
        let currentOptimistic = 0.2;
        let currentPessimistic = 0.2;

        // Seed randomness based on params to keep it stable-ish but reactive
        const seed = params.systemEntropy * 100;

        for (let day = 0; day <= days; day++) {
            // Dynamic time-based phase shift for "breathing" graph
            const phaseShift = Math.sin(timeStep * 0.1);
            const timeNoise = Math.sin(day * 0.1 + seed + phaseShift) * 0.05;
            const entropyNoise = (Math.random() - 0.5) * params.systemEntropy * 0.15;

            // Equations
            // dP/dt = (Entropy * Viscosity) / Inertia
            const riskDelta = (params.systemEntropy * params.culturalViscosity) / (params.socialInertia + 0.1) * 0.03;
            const mitigation = (params.adaptationRate / 100) * 0.025;

            currentRealist = currentRealist + riskDelta - mitigation + entropyNoise + (timeNoise * 0.2);
            currentRealist = Math.max(0.05, Math.min(0.95, currentRealist));

            // Optimistic (Seldon Path)
            currentOptimistic = currentOptimistic + (0.05 * 0.02) - 0.03; // Natural decay of risk
            currentOptimistic = Math.max(0.02, Math.min(currentRealist - 0.1, currentOptimistic));

            // Pessimistic (Collapse)
            currentPessimistic = currentPessimistic + 0.015 + entropyNoise; // Accumulating risk
            currentPessimistic = Math.max(currentRealist + 0.1, Math.min(1.0, currentPessimistic));

            points.push({
                day: day,
                label: `T+${day}`,
                optimistic: currentOptimistic.toFixed(3),
                realist: currentRealist.toFixed(3),
                pessimistic: currentPessimistic.toFixed(3),
                threshold: 0.8
            });
        }
        return points;
    }, [params, timeStep]); // Re-calc when timeStep changes for animation

    // Live Feed & Animation Loop
    useEffect(() => {
        const interval = setInterval(() => {
            // Feed Update
            if (Math.random() > 0.3) {
                const newItem = NEWS_FRAGMENTS[Math.floor(Math.random() * NEWS_FRAGMENTS.length)];
                const feedItem: DataFeedItem = {
                    id: Math.random().toString(36).substring(7),
                    source: newItem.source as any,
                    timestamp: new Date().toLocaleTimeString([], { hour12: false }),
                    content: newItem.content,
                    severity: newItem.severity as any,
                    impactParameter: 'general'
                };
                setFeeds(prev => [feedItem, ...prev].slice(0, 10));
            }

            // Query Update
            if (Math.random() > 0.7) {
                setActiveQuery(CYPHER_QUERIES[Math.floor(Math.random() * CYPHER_QUERIES.length)]);
            }

            // Animation Step
            setTimeStep(t => t + 1);

        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const currentRisk = parseFloat(data[data.length - 1].realist);
    const isCrisis = currentRisk > 0.8;
    const riskColor = isCrisis ? '#ef4444' : currentRisk > 0.5 ? '#eab308' : '#00e0b0';

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 perspective-1000 lg:h-[550px] h-auto">

            {/* COLUMN 1: PRIME RADIANT (Main Visualization) - 8 Cols */}
            <div className="lg:col-span-8 relative group bg-dark/40 border border-gray-800 backdrop-blur-sm overflow-hidden flex flex-col transform transition-transform duration-700 hover:rotate-y-1 hover:scale-[1.01] shadow-2xl">

                {/* Background: Cypher Matrix */}
                <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none font-mono text-[10px] leading-4 text-primary select-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="whitespace-nowrap animate-pulse" style={{ animationDelay: `${i * 0.5}s`, transform: `translateY(${timeStep % 10}px)` }}>
                            {CYPHER_QUERIES[i % CYPHER_QUERIES.length]}
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="relative z-10 flex justify-between items-start p-6 border-b border-gray-800/50 bg-gradient-to-b from-black/40 to-transparent">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <Activity className="text-primary animate-pulse" size={16} />
                            <h3 className="text-sm font-bold font-mono text-white tracking-[0.2em] uppercase">Granovetter Threshold</h3>
                        </div>
                        <div className="text-xs text-gray-500 font-mono flex items-center gap-4">
                            <span>MODEL: GATED GRAPH NEURAL NET</span>
                            <span className="text-primary">SYNCED</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black font-mono tracking-tighter" style={{ color: riskColor, textShadow: `0 0 20px ${riskColor}40` }}>
                            {(currentRisk * 100).toFixed(1)}%
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-500">Collapse (Ψ)</div>
                    </div>
                </div>

                {/* Graph Area */}
                <div className="relative flex-grow p-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorPessimistic" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00e0b0" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#00e0b0" stopOpacity={0} />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                            <XAxis dataKey="label" tick={{ fill: '#444', fontSize: 10, fontFamily: 'monospace' }} tickLine={false} axisLine={{ stroke: '#333' }} interval={14} />
                            <YAxis domain={[0, 1.1]} hide />

                            <Tooltip
                                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', fontFamily: 'monospace' }}
                                itemStyle={{ fontSize: '12px' }}
                            />

                            <ReferenceLine y={0.8} stroke="#ef4444" strokeDasharray="3 3" opacity={0.5} label={{ value: "CRITICAL THRESHOLD", fill: "#ef4444", fontSize: 10, position: "insideTopRight" }} />

                            <Area type="monotone" dataKey="pessimistic" stroke="transparent" fill="url(#colorPessimistic)" />
                            <Area type="monotone" dataKey="optimistic" stroke="transparent" fill="url(#colorOptimistic)" />

                            <Line type="monotone" dataKey="pessimistic" stroke="#ef4444" strokeWidth={1} strokeDasharray="4 4" dot={false} opacity={0.6} />
                            <Line type="monotone" dataKey="optimistic" stroke="#00e0b0" strokeWidth={1} strokeDasharray="4 4" dot={false} opacity={0.6} />
                            <Line type="monotone" dataKey="realist" stroke={riskColor} strokeWidth={3} dot={false} filter="url(#glow)" animationDuration={1000} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                <div className="h-8 bg-black border-t border-gray-800 flex items-center px-4 gap-2">
                    <Terminal size={12} className="text-primary" />
                    <span className="font-mono text-[10px] text-gray-500 truncate w-full animate-pulse">
                        {activeQuery}
                    </span>
                </div>
            </div>

            {/* COLUMN 2: LIVE FEED - 4 Cols (Was 3) */}
            <div className="lg:col-span-4 flex flex-col gap-4 h-full">

                {/* Stats Box */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-surface/60 border border-gray-800 p-3 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <Database size={12} />
                            <span className="text-[10px] uppercase font-mono">Data</span>
                        </div>
                        <div className="text-white font-mono font-bold text-xl">42.8M</div>
                    </div>
                    <div className="bg-surface/60 border border-gray-800 p-3 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                            <Cpu size={12} />
                            <span className="text-[10px] uppercase font-mono">Load</span>
                        </div>
                        <div className="text-primary font-mono font-bold text-xl">8%</div>
                    </div>
                </div>

                {/* The Feed List */}
                <div className="flex-grow bg-black/80 border border-gray-800 flex flex-col overflow-hidden relative">
                    <div className="p-3 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
                        <h4 className="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider">Ingestion Stream</h4>
                        <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                    </div>

                    <div className="flex-grow overflow-y-hidden relative p-2 space-y-2" ref={feedScrollRef}>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none z-10"></div>

                        {feeds.map((feed, idx) => (
                            <div key={feed.id} className={`p-3 border border-gray-800 bg-gray-900/30 backdrop-blur-sm transition-all duration-500 animate-in slide-in-from-top-2 fade-in ${idx === 0 ? 'border-primary/50 bg-primary/5' : ''}`}>
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-mono font-bold ${feed.source === 'NVD' ? 'text-red-400' :
                                            feed.source === 'REUTERS' ? 'text-blue-400' :
                                                feed.source === 'INT' ? 'text-yellow-400' : 'text-purple-400'
                                            }`}>{feed.source}</span>
                                    </div>
                                    <span className="text-[9px] text-gray-600 font-mono">{feed.timestamp}</span>
                                </div>
                                <p className="text-[10px] text-gray-300 font-mono leading-tight">
                                    {feed.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
};
