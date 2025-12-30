'use client';

import React from 'react';
import Image from 'next/image';

export type LogoVariant = 'default' | 'dark' | 'ribbon' | 'text-only';
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface OXOTLogoProps {
    variant?: LogoVariant;
    size?: LogoSize;
    className?: string;
    animated?: boolean;
}

const sizeMap: Record<LogoSize, { width: number; height: number }> = {
    sm: { width: 100, height: 33 },
    md: { width: 150, height: 50 },
    lg: { width: 200, height: 67 },
    xl: { width: 280, height: 93 },
};

const variantSrcMap: Record<LogoVariant, string> = {
    default: '/OXOT3Logo_Black.png',
    dark: '/OXOT3Logo_Black.png',
    ribbon: '/OXOT_Gold_Ribbon.svg',
    'text-only': '/OXOT_Text_Only_Logo_grey.svg',
};

export const OXOTLogo: React.FC<OXOTLogoProps> = ({
    variant = 'default',
    size = 'md',
    className = '',
    animated = false
}) => {
    const { width, height } = sizeMap[size];
    const src = variantSrcMap[variant];

    return (
        <div
            className={`relative ${animated ? 'animate-float' : ''} ${className}`}
            style={{ width, height }}
        >
            <Image
                src={src}
                alt="OXOT Logo"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
};

export default OXOTLogo;
