import React from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({
    children,
    className = "",
    glowColor = "rgba(6, 182, 212, 0.15)" // Default cyan glow
}) => {
    return (
        <div className={`relative group ${className}`}>
            {/* Glow Effect */}
            <div
                className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${glowColor}, transparent)` }}
            ></div>

            {/* Card Content */}
            <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                {/* Inner Glow */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)` }}
                ></div>

                <div className="relative z-10 h-full">
                    {children}
                </div>
            </div>
        </div>
    );
};
