'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import MobileNav from './MobileNav';

// Navigation items
const items = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

interface NavProps {
    logoSrc: string;
    brand: string;
}

interface BrandMarkProps {
    logoSrc?: string;
    size?: number;
    alt?: string;
}

/* --- Default inline SVG logo (fallback) --- */
function DefaultLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 324 323" fill="currentColor" aria-hidden="true" {...props}>
            <rect x="88.1023" y="144.792" width="151.802" height="36.5788" rx="18.2894"
                  transform="rotate(-38.5799 88.1023 144.792)" />
            <rect x="85.3459" y="244.537" width="151.802" height="36.5788" rx="18.2894"
                  transform="rotate(-38.5799 85.3459 244.537)" />
        </svg>
    );
}

function BrandMark({ logoSrc, size = 120, alt = 'Drift Consulting' }: BrandMarkProps) {
    if (logoSrc) {
        return (
            <Image
                src={logoSrc}
                alt={alt}
                width={size}
                height={size}
                priority
                className="inline-block object-contain"
            />
        );
    }
    return <DefaultLogo style={{ width: size, height: size }} />;
}

export default function Nav({ logoSrc, brand }: NavProps) {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/' || pathname === '/home';
        }
        return pathname.startsWith(href);
    };

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
                scrolled
                    ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md'
                    : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Left: Brand */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 sm:gap-3 text-primary hover:opacity-80 transition-opacity no-underline group"
                        aria-label="Go to home"
                    >
                        <span className="text-2xl leading-none transition-transform group-hover:scale-105">
                            <BrandMark logoSrc={logoSrc} size={80} />
                        </span>
                        <span className="hidden sm:inline-block text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                            {brand}
                        </span>
                    </Link>

                    {/* Center: Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative px-3 lg:px-4 py-2 rounded-md text-sm lg:text-base font-medium transition-colors ${
                                    isActive(item.href)
                                        ? 'text-amber-600 dark:text-amber-400'
                                        : 'text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400'
                                }`}
                            >
                                {item.label}
                                {isActive(item.href) && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* CTA Button - Hidden on small mobile */}
                        <Link href="/contact" className="hidden sm:block">
                            <Button
                                size="sm"
                                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                            >
                                <span className="hidden lg:inline">Start Project</span>
                                <span className="lg:hidden">Contact</span>
                            </Button>
                        </Link>

                        {/* Theme Toggle - Desktop */}
                        <div className="hidden md:block">
                            <ModeToggle />
                        </div>

                        {/* Mobile Menu */}
                        <MobileNav items={items} />
                    </div>
                </div>
            </div>
        </header>
    );
}