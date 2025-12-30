'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const VisionHeroVisualization = () => {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center pointer-events-none select-none -mt-20">
            {/* Container for the 3D perspective */}
            <div className="relative w-[800px] h-[800px] flex items-center justify-center [perspective:1000px]">

                {/* --- CENTRAL CORE --- */}
                {/* A pulsing, rotating geometric core */}
                <motion.div
                    animate={{
                        rotateX: [0, 360],
                        rotateY: [0, 180],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="relative w-32 h-32 [transform-style:preserve-3d]"
                >
                    {/* Inner Core Shapes - Creating a Tesseract-like feel with borders */}
                    <div className="absolute inset-0 border-2 border-oxot-blue/80 bg-oxot-blue/10 backdrop-blur-sm shadow-[0_0_30px_rgba(0,100,255,0.4)]" />
                    <motion.div
                        className="absolute inset-0 border border-white/40"
                        animate={{ rotateZ: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-0 border border-oxot-gold/40"
                        animate={{ rotateX: [0, 360] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>


                {/* --- ORBITAL RINGS --- */}

                {/* Ring 1 - Gold - Fast-ish */}
                <motion.div
                    className="absolute w-64 h-64 border border-oxot-gold/30 rounded-full border-t-oxot-gold border-r-transparent"
                    animate={{ rotate: 360, rotateX: 60, rotateY: 10 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ boxShadow: "0 0 20px rgba(212, 175, 55, 0.1)" }}
                />

                {/* Ring 2 - Blue - Counter rotation */}
                <motion.div
                    className="absolute w-96 h-96 border border-oxot-blue/20 rounded-full border-b-oxot-blue/60"
                    animate={{ rotate: -360, rotateX: -45, rotateY: 20 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Ring 3 - Large Silver/White Structure */}
                <motion.div
                    className="absolute w-[500px] h-[500px] border border-white/5 rounded-full border-l-white/20 border-r-white/20"
                    animate={{ rotate: 360, rotateY: 45 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />

                {/* --- HYPNOTIC GEOMETRY --- */}
                {/* A set of rotating squares creating a tunnel effect */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute border border-oxot-blue/10"
                        style={{
                            width: 200 + i * 60,
                            height: 200 + i * 60,
                        }}
                        animate={{
                            rotateZ: [0, 360],
                            rotateX: [0, 10 + i * 5, 0],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                            duration: 20 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.5
                        }}
                    />
                ))}

                {/* --- PARTICLE FIELD --- */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`p-${i}`}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{
                            x: (Math.random() - 0.5) * 600,
                            y: (Math.random() - 0.5) * 600,
                            opacity: 0
                        }}
                        animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 0.8, 0],
                            x: (Math.random() - 0.5) * 700,
                            y: (Math.random() - 0.5) * 700,
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}

                {/* --- CENTRAL GLOW --- */}
                <div className="absolute w-[800px] h-[200px] bg-oxot-blue/5 blur-[100px] rounded-full" />

            </div>
        </div>
    );
};
