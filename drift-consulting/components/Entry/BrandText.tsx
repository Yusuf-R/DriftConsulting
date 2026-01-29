'use client';

import React from 'react';

interface BrandTextProps {
    brand: string;
    variant?: 'split-color' | 'gradient' | 'elegant' | 'badge' | 'stacked' | 'minimalist' | 'contrast';
    className?: string;
}

export default function BrandText({
                                      brand,
                                      variant = 'split-color',
                                      className = ''
                                  }: BrandTextProps) {

    // Split Color Version (RECOMMENDED)
    if (variant === 'split-color') {
        const [first, ...rest] = brand.split(' ');
        const second = rest.join(' ');

        return (
            <span className={`text-sm sm:text-lg lg:text-xl font-bold ${className}`}>
                <span className="text-slate-900 dark:text-white">{first}</span>
                {second && (
                    <>
                        {' '}
                        <span className="text-amber-600 dark:text-amber-400 font-extrabold">
                            {second}
                        </span>
                    </>
                )}
            </span>
        );
    }

    // Gradient Version
    if (variant === 'gradient') {
        return (
            <span className={`text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 dark:from-amber-400 dark:via-amber-300 dark:to-orange-400 bg-clip-text text-transparent ${className}`}>
                {brand}
            </span>
        );
    }

    // Elegant Underline Version
    if (variant === 'elegant') {
        return (
            <span className={`relative text-sm sm:text-lg lg:text-xl font-serif font-bold text-slate-900 dark:text-white ${className}`}>
                {brand}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-600 to-transparent dark:from-amber-400 opacity-80" />
            </span>
        );
    }

    // Stacked Version
    if (variant === 'stacked') {
        const [first, ...rest] = brand.split(' ');
        const second = rest.join(' ');

        return (
            <div className={`flex flex-col leading-none ${className}`}>
                <span className="text-base sm:text-xl lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {first}
                </span>
                {second && (
                    <span className="text-[10px] sm:text-xs lg:text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                        {second}
                    </span>
                )}
            </div>
        );
    }

    // Minimalist Line Version
    if (variant === 'minimalist') {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <div className="w-6 sm:w-8 h-0.5 bg-amber-500" />
                <span className="text-sm sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white">
                    {brand}
                </span>
            </div>
        );
    }

    // Contrast (Thin/Bold) Version
    if (variant === 'contrast') {
        const [first, ...rest] = brand.split(' ');
        const second = rest.join(' ');

        return (
            <span className={`text-sm sm:text-lg lg:text-xl ${className}`}>
                <span className="font-light text-slate-700 dark:text-slate-300">{first}</span>
                {second && (
                    <>
                        {' '}
                        <span className="font-black text-slate-900 dark:text-white">{second}</span>
                    </>
                )}
            </span>
        );
    }

    if (variant === 'badge') {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {/*<div className="w-6 sm:w-8 h-0.5 bg-amber-500" />*/}
                <span className="text-xs sm:text-sm lg:text-base font-bold text-white px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-orange-500 rounded-md shadow-md">
                    {brand}
                </span>
            </div>
        );
    }

    // Default fallback
    return (
        <span className={`text-sm sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white ${className}`}>
            {brand}
        </span>
    );
}