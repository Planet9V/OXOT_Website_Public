'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Complex Equation Data Structure with Greek Alphabet
const EQUATIONS = [
    {
        id: 'state_evolution',
        name: 'State Evolution',
        latex: 'dΨ/dt = ∇(S - M) + Qκ',
        latexParts: [
            { text: 'd' },
            { text: 'Ψ' },
            { text: '/dt' },
            { text: ' = ' },
            { text: '∇' },
            { text: '(' },
            { text: 'S' },
            { text: ' - ' },
            { text: 'M' },
            { text: ')' },
            { text: ' + ' },
            { text: 'Q' },
            { text: 'κ' },
        ],
        desc: 'Differential engine computing state evolution over time.',
        vars: [
            { symbol: 'Ψ', desc: 'System State' },
            { symbol: '∇', desc: 'Gradient Operator' },
            { symbol: 'S', desc: 'Sensitivity Matrix' },
            { symbol: 'κ', desc: 'Coupling Constant' }
        ]
    },
    {
        id: 'system_entropy',
        name: 'System Entropy',
        latex: 'H = -Σᵢ pᵢ log₂(pᵢ)',
        latexParts: [
            { text: 'H' },
            { text: ' = ' },
            { text: '-Σ' },
            { text: 'ᵢ' },
            { text: ' p' },
            { text: 'ᵢ' },
            { text: ' log' },
            { text: '₂' },
            { text: '(p' },
            { text: 'ᵢ' },
            { text: ')' },
        ],
        desc: 'Shannon entropy quantifying uncertainty in infrastructure state.',
        vars: [
            { symbol: 'H', desc: 'Entropy' },
            { symbol: 'Σ', desc: 'Summation' },
            { symbol: 'pᵢ', desc: 'Probability' }
        ]
    },
    {
        id: 'influence',
        name: 'Influence Propagation',
        latex: 'dI/dt = αI(1 - I/K) - βIR',
        latexParts: [
            { text: 'dI' },
            { text: '/' },
            { text: 'dt' },
            { text: ' = ' },
            { text: 'α' },
            { text: 'I' },
            { text: '(1 - I/K)' },
            { text: ' - ' },
            { text: 'β' },
            { text: 'IR' },
        ],
        desc: 'Logistic growth model for threat propagation dynamics.',
        vars: [
            { symbol: 'α', desc: 'Transmission Rate' },
            { symbol: 'β', desc: 'Recovery Rate' },
            { symbol: 'K', desc: 'Carrying Capacity' },
            { symbol: 'I', desc: 'Infected Count' }
        ]
    },
    {
        id: 'shock',
        name: 'Shock Response',
        latex: 'R(ω) = ∫₀^∞ h(τ)e^(-iωτ) dτ',
        latexParts: [
            { text: 'R' },
            { text: '(ω)' },
            { text: ' = ' },
            { text: '∫' },
            { text: '₀' },
            { text: '^∞' },
            { text: ' h(τ)' },
            { text: 'e' },
            { text: '^(-iωτ)' },
            { text: ' dτ' },
        ],
        desc: 'Fourier transform of impulse response function.',
        vars: [
            { symbol: 'R(ω)', desc: 'Frequency Response' },
            { symbol: 'h(τ)', desc: 'Impulse Response' },
            { symbol: 'ω', desc: 'Angular Frequency' }
        ]
    },
    {
        id: 'bayesian',
        name: 'Bayesian Update',
        latex: 'P(θ|D) ∝ P(D|θ)P(θ)',
        latexParts: [
            { text: 'P' },
            { text: '(θ|D)' },
            { text: ' ∝ ' },
            { text: 'P' },
            { text: '(D|θ)' },
            { text: 'P' },
            { text: '(θ)' },
        ],
        desc: 'Posterior probability proportional to likelihood times prior.',
        vars: [
            { symbol: 'θ', desc: 'Parameters' },
            { symbol: 'D', desc: 'Observed Data' },
            { symbol: '∝', desc: 'Proportional To' }
        ]
    }
];

// Typewriter effect hook
const useTypewriter = (text: string, speed: number = 50, delay: number = 0) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsComplete(false);

        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    setDisplayedText(text.substring(0, i + 1));
                    i++;
                } else {
                    setIsComplete(true);
                    clearInterval(interval);
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, speed, delay]);

    return { displayedText, isComplete };
};

// Terminal-style equation display with Professional Colors
const AcademicEquation = ({ equation, isActive }: { equation: typeof EQUATIONS[0], isActive: boolean }) => {
    const [charIndex, setCharIndex] = useState(0);
    const fullText = equation.latexParts.map(p => p.text).join('');

    useEffect(() => {
        if (!isActive) {
            setCharIndex(0);
            return;
        }

        setCharIndex(0);
        const interval = setInterval(() => {
            setCharIndex(prev => {
                if (prev >= fullText.length) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 40);

        return () => clearInterval(interval);
    }, [isActive, fullText.length]);

    // Calculate visible characters
    let currentPos = 0;
    const visibleParts = equation.latexParts.map((part) => {
        const partStart = currentPos;
        currentPos += part.text.length;
        const partEnd = currentPos;

        if (charIndex <= partStart) {
            return { ...part, visible: '' };
        } else if (charIndex >= partEnd) {
            return { ...part, visible: part.text };
        } else {
            return { ...part, visible: part.text.substring(0, charIndex - partStart) };
        }
    });

    const isComplete = charIndex >= fullText.length;

    return (
        <div className="relative">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-gray-700 rounded-t-lg">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                </div>
                <span className="text-xs font-mono text-gray-400 ml-2">e27_solver.py — {equation.name}</span>
                <div className="ml-auto flex items-center gap-2">
                    <span className={`text-[10px] font-mono ${isComplete ? 'text-gray-300' : 'text-gray-500 animate-pulse'}`}>
                        {isComplete ? '● SOLVED' : '○ COMPUTING...'}
                    </span>
                </div>
            </div>

            {/* Terminal Body */}
            <div className="bg-gray-950 p-6 font-mono rounded-b-lg border border-t-0 border-gray-800 min-h-[200px]">
                {/* Line Numbers */}
                <div className="flex">
                    <div className="text-gray-600 text-xs pr-4 border-r border-gray-800 select-none">
                        <div>01</div>
                        <div>02</div>
                        <div>03</div>
                        <div>04</div>
                    </div>
                    <div className="pl-4 flex-grow">
                        {/* Comment */}
                        <div className="text-gray-500 text-sm mb-2">
                            <span className="text-gray-600"># </span>
                            {equation.desc}
                        </div>

                        {/* Function definition */}
                        <div className="text-sm mb-4">
                            <span className="text-gray-400">def</span>
                            <span className="text-white"> solve_{equation.id}</span>
                            <span className="text-gray-500">(</span>
                            <span className="text-gray-300">params</span>
                            <span className="text-gray-500">):</span>
                        </div>

                        {/* The Equation - Main Display - Professional White/Gray */}
                        <div className="pl-4 mb-4">
                            <span className="text-gray-400">return</span>
                            <span className="text-gray-500 ml-2">"</span>
                            <span className="text-sm font-mono tracking-wide">
                                {visibleParts.map((part, i) => (
                                    <span
                                        key={i}
                                        className={`
                                            ${part.text.match(/[=+\-×/]/) ? 'text-gray-500' : 'text-white'}
                                            ${part.text.match(/[()\[\],]/) ? 'text-gray-600' : ''}
                                        `}
                                    >
                                        {part.visible}
                                    </span>
                                ))}
                                <span className={`inline-block w-0.5 h-5 bg-white/60 ml-1 ${isComplete ? 'opacity-0' : 'animate-pulse'}`}></span>
                            </span>
                            <span className="text-gray-500">"</span>
                        </div>

                        {/* Execution result */}
                        {isComplete && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-800"
                            >
                                <span className="text-gray-400">{'>>>'}</span> Equation validated. Precision: <span className="text-gray-300">1e-12</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Variable Legend */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {equation.vars.map((v, i) => (
                    <motion.div
                        key={v.symbol}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isComplete ? 1 : 0.3, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 flex items-center gap-3"
                    >
                        <div className="font-serif text-white">
                            {v.symbol}
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wide leading-tight">
                            {v.desc}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export const EquationVisualizer = () => {
    const [activeEq, setActiveEq] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveEq((prev) => (prev + 1) % EQUATIONS.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-24 px-4 md:px-8 overflow-hidden bg-transparent">

            <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left: Text Description */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-oxot-blue/10 text-oxot-blue text-xs font-mono uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-oxot-blue animate-ping"></span>
                        E27 Core Logic
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                        The Math of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxot-blue via-white to-oxot-blue">Anti-Fragility</span>
                    </h2>

                    <p className="text-lg text-gray-400 font-light max-w-lg leading-relaxed normal-case">
                        We don't guess. We solve. By mapping human behavior and system physics to rigorous equations, the AEON Cyber Digital Twin creates a predictive model of reality that strengthens under stress.
                    </p>

                    <div className="flex flex-col gap-3">
                        {EQUATIONS.map((eq, idx) => (
                            <button
                                key={eq.id}
                                onClick={() => setActiveEq(idx)}
                                className={`text-left p-4 rounded-lg border transition-all duration-300 group ${activeEq === idx ? 'bg-oxot-blue/10 border-oxot-blue/50' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`font-mono text-xs uppercase tracking-widest ${activeEq === idx ? 'text-oxot-blue' : 'text-gray-500 group-hover:text-white'}`}>
                                        {eq.name}
                                    </span>
                                    {activeEq === idx && <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-oxot-blue" />}
                                </div>
                                <div className={`text-sm ${activeEq === idx ? 'text-white' : 'text-gray-600'} transition-colors`}>
                                    {eq.desc}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Terminal Equation Display */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeEq}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <AcademicEquation equation={EQUATIONS[activeEq]} isActive={true} />
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};
