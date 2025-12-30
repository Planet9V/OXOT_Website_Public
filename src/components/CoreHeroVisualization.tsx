'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const CoreHeroVisualization = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
            {/* Container for the 3D perspective */}
            <div className="relative w-full h-full flex items-center justify-center [perspective:1200px]">

                {/* --- CENTRAL NEURAL SPINE --- */}
                <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="relative w-[400px] h-screen flex flex-col items-center justify-center [transform-style:preserve-3d]"
                >
                    {/* Vertical Segments */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-px bg-gradient-to-b from-transparent via-oxot-blue/40 to-transparent"
                            style={{
                                height: '100vh',
                                left: `${50 + (i - 6) * 10}%`,
                                transform: `rotateY(${i * 30}deg) translateZ(150px)`,
                            }}
                        />
                    ))}

                    {/* Pulsing Nodes (Hexagonal Rings) */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`ring-${i}`}
                            className="absolute border-[0.5px] border-oxot-gold/20"
                            style={{
                                width: 300,
                                height: 300,
                                top: `${15 + i * 15}%`,
                                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                                transform: `rotateX(90deg) translateZ(${(i - 3) * 50}px)`,
                            }}
                            animate={{
                                rotateZ: [0, 360],
                                borderColor: ["rgba(212,175,55,0.1)", "rgba(212,175,55,0.4)", "rgba(212,175,55,0.1)"],
                                scale: [0.95, 1.05, 0.95]
                            }}
                            transition={{
                                duration: 10 + i * 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}

                    {/* Rotating Data Clusters */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={`node-${i}`}
                            className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                            style={{
                                transform: `rotateY(${i * 18}deg) translateZ(180px) translateY(${(i - 10) * 40}px)`,
                            }}
                            animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [0.5, 1.2, 0.5],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: i * 0.1,
                            }}
                        />
                    ))}
                </motion.div>

                {/* --- GLOBAL ATMOSPHERE --- */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.05)_0%,transparent_70%)]" />

                {/* Background Rotating Grids */}
                <motion.div
                    className="absolute w-[200%] h-[200%] border border-white/5"
                    style={{ transform: 'rotateX(60deg) rotateZ(0deg)' }}
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                />

            </div>
        </div>
    );
};
