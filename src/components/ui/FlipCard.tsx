import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
    frontContent: React.ReactNode;
    backContent: React.ReactNode;
    height?: string;
    className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({
    frontContent,
    backContent,
    height = "h-64",
    className = ""
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`relative w-full ${height} perspective-1000 group cursor-pointer ${className}`}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="relative w-full h-full transition-all duration-500 transform-style-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm">
                    {frontContent}
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-md"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    {backContent}
                </div>
            </motion.div>
        </div>
    );
};
