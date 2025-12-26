'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Activity, AlertTriangle, Lock, Server, Globe } from 'lucide-react';

const LogicNode = ({ x, y, label, icon: Icon, status, active, onHover, id, parentId }: any) => {
    const color = status === 'CRITICAL' ? '#ef4444' : status === 'WARNING' ? '#eab308' : '#22d3ee';
    const bgColor = status === 'CRITICAL' ? 'rgba(239, 68, 68, 0.1)' : status === 'WARNING' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(34, 211, 238, 0.1)';

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            style={{ left: x, top: y }}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={() => onHover(null)}
        >
            <motion.div
                animate={{
                    scale: active ? 1.2 : 1,
                    boxShadow: active ? `0 0 20px ${color}` : 'none',
                    borderColor: active ? color : 'rgba(255,255,255,0.1)'
                }}
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center backdrop-blur-md transition-all duration-300`}
                style={{ backgroundColor: bgColor, borderColor: active ? color : 'rgba(255,255,255,0.1)' }}
            >
                <Icon size={24} style={{ color }} />
            </motion.div>

            <motion.div
                className="absolute top-20 left-1/2 -translate-x-1/2 text-center w-32"
                animate={{ opacity: active ? 1 : 0.6 }}
            >
                <div className="text-[10px] font-bold text-white uppercase tracking-widest bg-black/50 px-2 py-1 rounded inline-block">
                    {label}
                </div>
                {active && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[9px] text-gray-400 mt-1 font-mono"
                    >
                        {status === 'CRITICAL' ? 'THREAT DETECTED' : 'SYSTEM OPTIMAL'}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

const LogicPath = ({ start, end, active, status }: any) => {
    const color = status === 'CRITICAL' ? '#ef4444' : status === 'WARNING' ? '#eab308' : '#22d3ee';

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <motion.path
                d={`M ${start.x} ${start.y} C ${start.x} ${(start.y + end.y) / 2}, ${end.x} ${(start.y + end.y) / 2}, ${end.x} ${end.y}`}
                fill="none"
                stroke={active ? color : 'rgba(255,255,255,0.05)'}
                strokeWidth={active ? 3 : 1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {active && (
                <motion.circle
                    r="3"
                    fill={color}
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    style={{ offsetPath: `path("M ${start.x} ${start.y} C ${start.x} ${(start.y + end.y) / 2}, ${end.x} ${(start.y + end.y) / 2}, ${end.x} ${end.y}")` }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            )}
        </svg>
    );
};

export const SovereignLogicTree = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const nodes = [
        { id: 'root', x: '50%', y: '15%', label: 'National Grid', icon: Globe, status: 'SECURE' },
        { id: 'energy', x: '25%', y: '50%', label: 'Energy Sector', icon: Zap, status: 'CRITICAL', parent: 'root' },
        { id: 'transport', x: '50%', y: '50%', label: 'Transport', icon: Activity, status: 'WARNING', parent: 'root' },
        { id: 'finance', x: '75%', y: '50%', label: 'Financial', icon: Lock, status: 'SECURE', parent: 'root' },

        // Children of Energy
        { id: 'nuke', x: '15%', y: '85%', label: 'Nuclear', icon: AlertTriangle, status: 'SECURE', parent: 'energy' },
        { id: 'grid', x: '35%', y: '85%', label: 'Distrib. Grid', icon: Server, status: 'CRITICAL', parent: 'energy' },
    ];

    const getCoords = (node: any) => {
        // Convert percentages to roughly pixels for svg path drawing hack (assuming 800x600 container)
        // This is a simplification; in production, use a ref to get container size
        const w = 800; // Mock width
        const h = 600; // Mock height
        return {
            x: parseFloat(node.x) / 100 * w,
            y: parseFloat(node.y) / 100 * h
        };
    };

    return (
        <div className="w-full h-[600px] relative bg-black/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            />

            {/* Title */}
            <div className="absolute top-6 left-6 z-30">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity size={20} className="text-oxot-blue" /> SOVEREIGN LOGIC™
                </h3>
                <p className="text-xs text-gray-500 font-mono">Real-time Cascasde Analysis</p>
            </div>

            {/* Render Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 600" preserveAspectRatio="none">
                {nodes.filter(n => n.parent).map(node => {
                    const parent = nodes.find(p => p.id === node.parent);
                    if (!parent) return null;
                    const start = getCoords(parent);
                    const end = getCoords(node);

                    // Path is active if either connected node is hovered OR if the parent path is active (propagation logic could be added)
                    const isActive = hoveredNode === node.id || hoveredNode === parent.id;

                    return (
                        <motion.path
                            key={`${parent.id}-${node.id}`}
                            d={`M ${start.x} ${start.y} C ${start.x} ${(start.y + end.y) / 2}, ${end.x} ${(start.y + end.y) / 2}, ${end.x} ${end.y}`}
                            fill="none"
                            stroke={isActive ? (node.status === 'CRITICAL' ? '#ef4444' : '#22d3ee') : 'rgba(255,255,255,0.1)'}
                            strokeWidth={isActive ? 2 : 1}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                        />
                    );
                })}
            </svg>

            {/* Render Nodes */}
            {nodes.map(node => (
                <LogicNode
                    key={node.id}
                    {...node}
                    active={hoveredNode === node.id || nodes.find(n => n.parent === node.id && hoveredNode === n.id)}
                    onHover={setHoveredNode}
                />
            ))}

            {/* Interactive Threat Detail Panel (Shows when hovering Critical) */}
            {hoveredNode === 'grid' && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute bottom-6 right-6 w-64 bg-red-900/90 border border-red-500 rounded-xl p-4 backdrop-blur-md z-40"
                >
                    <div className="flex items-center gap-2 mb-2 text-red-100 font-bold text-sm uppercase">
                        <AlertTriangle size={16} /> Threat Specifics
                    </div>
                    <p className="text-xs text-red-200 leading-tight">
                        Zero-day exploits detected in Distribution Management Systems (DMS).
                        Cascade probability to Nuclear Sector: <span className="font-bold text-white">12%</span>.
                    </p>
                </motion.div>
            )}
        </div>
    );
};
