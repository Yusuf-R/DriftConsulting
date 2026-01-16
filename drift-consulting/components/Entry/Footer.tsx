'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { href: '/', label: 'Home' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/services', label: 'Services' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    const services = [
        { href: '/services#project-management', label: 'Project Management' },
        { href: '/services#pre-construction', label: 'Pre-Construction' },
        { href: '/services#construction-phase', label: 'Construction Phase' },
        { href: '/services#post-construction', label: 'Post-Construction' },
    ];

    return (
        <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand Column */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Building2 className="w-8 h-8 text-amber-500" />
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                GandeWest
                            </h3>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            International Construction Project Manager with UK government-level expertise delivering excellence across residential, hospitality, and institutional projects.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-amber-500 hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-amber-500 hover:text-white transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            Services
                        </h4>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service.href}>
                                    <Link
                                        href={service.href}
                                        className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                    >
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            Contact
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-500" />
                                <a
                                    href="mailto:contact@gandewest.com"
                                    className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                >
                                    contact@gandewest.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-500" />
                                <a
                                    href="tel:+2348012345678"
                                    className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                >
                                    +234 801 234 5678
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-500" />
                                <span>Lagos, Nigeria</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400 text-center sm:text-left">
                            © {currentYear} GandeWest Construction Management. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link
                                href="/privacy"
                                className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}