'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const BlueTeamLogo = () => {
    return (
        <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
            {/* --- OUTER SHIELD PULSE --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl"
            />

            {/* --- ROTATING RINGS --- */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-cyan-500/30 rounded-full border-dashed"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-12 border-2 border-blue-500/20 rounded-full border-t-transparent border-l-transparent"
            />

            {/* --- CENTRAL EYE / SHIELD EMBLEM --- */}
            <svg viewBox="0 0 100 100" className="w-full h-full p-8 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                {/* Shield Outline */}
                <motion.path
                    d="M50 5 L90 25 V50 C90 75 50 95 50 95 C50 95 10 75 10 50 V25 Z"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Inner Circuit Connections */}
                <motion.path
                    d="M50 20 V80 M20 50 H80"
                    stroke="#0ea5e9"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.5, delay: 1 }}
                />

                {/* The "Eye" Iris */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="15"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                />

                {/* Pupil Pulse */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="6"
                    fill="#fff"
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Scanning Line */}
                <motion.rect
                    x="20"
                    y="0"
                    width="60"
                    height="2"
                    fill="url(#scan-gradient)"
                    animate={{ y: [20, 80, 20] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.5 }}
                />

                <defs>
                    <linearGradient id="scan-gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>

            {/* --- GLITCH TEXT OVERLAY --- */}
            <div className="absolute bottom-8 text-[10px] font-mono text-cyan-400 tracking-[0.3em] font-bold">
                <motion.span
                    animate={{ opacity: [1, 0.5, 1, 0.8, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
                >
                    MONITORING_ACTIVE
                </motion.span>
            </div>
        </div>
    );
};
