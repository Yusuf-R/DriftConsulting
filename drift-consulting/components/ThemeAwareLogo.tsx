// components/ThemeAwareLogo.tsx
'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ThemeAwareLogoProps {
    lightLogoSrc: string;
    darkLogoSrc: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

export default function ThemeAwareLogo({
                                           lightLogoSrc,
                                           darkLogoSrc,
                                           alt,
                                           width,
                                           height,
                                           className = ''
                                       }: ThemeAwareLogoProps) {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const currentTheme = resolvedTheme || theme;

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return a placeholder with same dimensions to prevent layout shift
        return (
            <div
                style={{ width, height }}
                className={`bg-transparent ${className}`}
                aria-hidden="true"
            />
        );
    }

    const logoSrc = currentTheme === 'dark' ? darkLogoSrc : lightLogoSrc;

    return (
        <Image
            src={logoSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority
        />
    );
}