'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import ThemeAwareLogo from '@/components/ThemeAwareLogo'; // Import the new component
import BrandText from "@/components/Entry/BrandText"

// Navigation items
const items = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

interface NavProps {
    brand: string;
    // Remove logoSrc, we'll handle logos differently
    brandVariant?: 'split-color' | 'gradient' | 'elegant' | 'badge' | 'stacked' | 'minimalist' | 'contrast';

}

export default function Nav({ brand, brandVariant }: NavProps) {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/' || pathname === '/home';
        }
        return pathname.startsWith(href);
    };

    return (
        <>
            <header
                className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
                    scrolled
                        ? 'bg-white/98 dark:bg-slate-900/98 shadow-sm'
                        : 'bg-white dark:bg-slate-900'
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* Logo & Brand - Using ThemeAwareLogo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                            aria-label="Go to home"
                        >
                            <ThemeAwareLogo
                                lightLogoSrc="/light_mode_drift-consulting.svg"
                                darkLogoSrc="/dark_mode_drift-consulting.svg"
                                alt={brand}
                                width={70}
                                height={70}
                                className="w-14 h-14 lg:w-16 lg:h-16 object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            {/*<span className="text-sm sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white">*/}
                            {/*    {brand}*/}
                            {/*</span>*/}
                            <div className="sm:block">
                                <BrandText brand={brand} variant={brandVariant} />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative px-4 py-2 text-[15px] font-medium transition-colors rounded-md ${
                                        isActive(item.href)
                                            ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30'
                                            : 'text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-3">
                            <ModeToggle />
                            <Link href="/contact">
                                <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold">
                                    Start Project
                                </Button>
                            </Link>
                        </div>

                        {/* MOBILE: Right side - Theme Toggle + Menu Button */}
                        <div className="lg:hidden flex items-center gap-2">
                            {/* Theme Toggle - Visible on mobile */}
                            <div className="mr-1">
                                <ModeToggle />
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6 text-slate-900 dark:text-white" />
                                ) : (
                                    <Menu className="w-6 h-6 text-slate-900 dark:text-white" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b shadow-xl z-40 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
                        >
                            {/* Navigation Links */}
                            <nav className="py-4">
                                {items.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center justify-between px-6 py-4 text-base font-medium transition-colors border-l-4 ${
                                                isActive(item.href)
                                                    ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-500'
                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                                            }`}
                                        >
                                            <span>{item.label}</span>
                                            <ChevronRight className={`w-5 h-5 transition-transform ${
                                                isActive(item.href) ? 'text-amber-500' : 'text-slate-400'
                                            }`} />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Mobile Actions */}
                            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50">
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold h-12">
                                        Start Your Project
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}