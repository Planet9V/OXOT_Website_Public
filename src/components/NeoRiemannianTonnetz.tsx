"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface TonnetzProps {
    activeNotes: string[];
    transformation?: 'R' | 'L' | 'P' | 'PLP';
}

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function NeoRiemannianTonnetz({ activeNotes, transformation }: TonnetzProps) {
    // Generate a hexagonal grid of notes
    // We'll arrange them in major/minor thirds axes
    // Horizontal axis: Major Thirds (C - E - G#)
    // Up-Right axis: Minor Thirds (C - Eb - Gb - A)
    // Up-Left axis: Perfect Fifths (C - G - D - A)
    const gridSize = 3;
    const hexConfig = useMemo(() => {
        const nodes = [];
        const radius = 45;
        const spacingX = radius * 1.5;
        const spacingY = radius * 0.866 * 2;

        for (let q = -gridSize; q <= gridSize; q++) {
            for (let r = -gridSize; r <= gridSize; r++) {
                // Skewed coordinate system for hex grid
                const x = spacingX * (3 / 2 * q);
                const y = spacingX * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r);

                // Map coordinates to musical notes (Simplified mapping for visualization)
                // In a true Tonnetz, these would follow specific interval axes
                const noteIndex = (Math.abs(q * 4 + r * 3)) % 12;
                const note = NOTES[noteIndex];

                if (Math.abs(x) < 300 && Math.abs(y) < 200) {
                    nodes.push({ id: `${q},${r}`, x, y, note, q, r });
                }
            }
        }
        return nodes;
    }, []);

    const isActive = (note: string) => activeNotes.includes(note);

    return (
        <div className="relative w-full h-[320px] bg-black/40 rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center p-4">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.1),transparent_70%)]" />

            <svg
                viewBox="-300 -200 600 400"
                className="w-full h-full drop-shadow-2xl"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Connections (Edges) */}
                <g opacity="0.15">
                    {hexConfig.map((node, i) => {
                        return hexConfig.slice(i + 1).map((other) => {
                            const dist = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2));
                            if (dist < 80) { // Only connect neighbors
                                const isConnectionActive = isActive(node.note) && isActive(other.note);
                                return (
                                    <motion.line
                                        key={`${node.id}-${other.id}`}
                                        x1={node.x} y1={node.y}
                                        x2={other.x} y2={other.y}
                                        stroke={isConnectionActive ? "#2dd4bf" : "white"}
                                        strokeWidth={isConnectionActive ? 2 : 0.5}
                                        animate={{
                                            opacity: isConnectionActive ? 0.8 : 0.2,
                                            strokeDashoffset: isConnectionActive ? [0, -20] : 0
                                        }}
                                        strokeDasharray={isConnectionActive ? "5,5" : "0"}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                );
                            }
                            return null;
                        });
                    })}
                </g>

                {/* Nodes */}
                {hexConfig.map((node) => {
                    const active = isActive(node.note);
                    return (
                        <g key={node.id} transform={`translate(${node.x},${node.y})`}>
                            {/* Bloom Effect */}
                            {active && (
                                <motion.circle
                                    r={25}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    fill="url(#activeGlow)"
                                />
                            )}

                            {/* Hexagon Shape */}
                            <motion.path
                                d="M 0 -20 L 17.32 -10 L 17.32 10 L 0 20 L -17.32 10 L -17.32 -10 Z"
                                fill={active ? "#2dd4bf" : "transparent"}
                                stroke={active ? "#2dd4bf" : "white"}
                                strokeWidth={active ? 2 : 0.5}
                                initial={false}
                                animate={{
                                    fillOpacity: active ? 0.2 : 0,
                                    strokeOpacity: active ? 1 : 0.2,
                                    scale: active ? 1.1 : 1
                                }}
                            />

                            {/* Note Label */}
                            <text
                                y={2}
                                textAnchor="middle"
                                className={`text-[10px] font-mono font-black ${active ? "fill-teal-300" : "fill-white/30"}`}
                                style={{ fontSize: active ? '10px' : '8px' }}
                            >
                                {node.note}
                            </text>
                        </g>
                    );
                })}

                <defs>
                    <radialGradient id="activeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                    </radialGradient>
                </defs>
            </svg>

            {/* Active Transformation Label */}
            {transformation && (
                <div className="absolute top-6 right-6 flex items-center gap-3">
                    <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest italic">Current Transformation</div>
                    <motion.div
                        key={transformation}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="px-4 py-1.5 bg-teal-500 text-black text-[11px] font-black rounded-lg shadow-[0_0_20px_rgba(45,212,191,0.4)]"
                    >
                        {transformation}
                    </motion.div>
                </div>
            )}

            <div className="absolute bottom-6 left-6 text-[8px] font-mono text-gray-600 uppercase tracking-widest flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full border border-white/20" /> Static Node
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_5px_rgba(45,212,191,1)]" /> Active Vector
                </div>
            </div>
        </div>
    );
}
