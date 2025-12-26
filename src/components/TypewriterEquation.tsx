'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterEquationProps {
    equation: string;
    label?: string;
    delay?: number;
    className?: string;
}

export const TypewriterEquation: React.FC<TypewriterEquationProps> = ({
    equation,
    label,
    delay = 0,
    className = ""
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let currentIndex = 0;
        const startDelayTimeout = setTimeout(() => {
            const intervalId = setInterval(() => {
                if (currentIndex <= equation.length) {
                    setDisplayedText(equation.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    setIsComplete(true);
                    clearInterval(intervalId);
                }
            }, 50); // Typing speed

            return () => clearInterval(intervalId);
        }, delay * 1000);

        return () => clearTimeout(startDelayTimeout);
    }, [equation, delay]);

    return (
        <div className={`font-mono ${className}`}>
            <div className="flex items-baseline gap-4">
                {label && (
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest shrink-0 select-none">
                        {label}
                    </span>
                )}
                <div className="relative group">
                    <span className="text-sm md:text-base text-cyan-400 font-bold tracking-wider">
                        {displayedText}
                        {!isComplete && (
                            <span className="inline-block w-2 h-4 bg-oxot-red ml-1 animate-pulse align-middle" />
                        )}
                    </span>
                    {/* Background glow for the equation */}
                    <div className="absolute -inset-2 bg-cyan-500/5 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};
