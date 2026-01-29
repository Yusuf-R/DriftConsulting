'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Award, Users, Globe, TrendingUp, Shield, Zap, Target, CheckCircle,
    Briefcase, GraduationCap, Trophy, Building2, Sparkles, ArrowRight,
    Star, Clock, DollarSign, Heart
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// About Hero Section
const AboutHero = () => {
    return (
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-amber-50 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
            {/* Animated Elements */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10">
                <div className="absolute top-20 right-20 w-72 h-72 bg-amber-400 dark:bg-amber-500 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-400 dark:bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-6"
                        >
                            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                                About Drift Consulting
                            </span>
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            Building trust, one{' '}
                            <span className="bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                                project at a time
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                            For over 15 years, we've been the silent force behind Nigeria and the UK's most
                            ambitious construction projects—delivering certainty in an uncertain industry.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact">
                                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-6 shadow-xl">
                                    Work With Us
                                    <ArrowRight className="ml-2" />
                                </Button>
                            </Link>
                            <Link href="/portfolio">
                                <Button size="lg" variant="outline" className="border-2 hover:bg-amber-50 dark:hover:bg-amber-950/30 px-8 py-6">
                                    View Our Work
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                                alt="Modern Construction"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

                            {/* Floating Stats */}
                            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                                {[
                                    { icon: <Building2 />, value: '80+', label: 'Projects' },
                                    { icon: <Award />, value: '15+', label: 'Years' },
                                    { icon: <Trophy />, value: '100%', label: 'Success' }
                                ].map((stat, idx) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + idx * 0.1 }}
                                        className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl p-3 text-center"
                                    >
                                        <div className="text-amber-600 dark:text-amber-400 mb-1 flex justify-center">
                                            {stat.icon}
                                        </div>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                                        <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Our Story Section
const OurStory = () => {
    return (
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Our Story: From Vision to{' '}
                            <span className="text-amber-600 dark:text-amber-400">Reality</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-8" />
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mb-8 p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl"
                        >
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                                Drift Consulting was born from a simple observation: the construction industry was
                                drowning in promises but starving for delivery. Too many projects ran over budget,
                                over schedule, and under quality.
                            </p>
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                We decided to do things differently. Not with flashy marketing or empty guarantees,
                                but with methodical planning, transparent communication, and an obsessive focus on results.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                <Target className="w-8 h-8 text-amber-500" />
                                Our Mission
                            </h3>
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                To eliminate uncertainty from construction. Every client deserves to know their project
                                will be delivered on time, on budget, and exactly as promised. That's not a dream—it's
                                our standard operating procedure.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                <Heart className="w-8 h-8 text-amber-500" />
                                Our Values
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { title: 'Brutal Honesty', desc: 'We tell you what you need to hear, not what you want to hear.' },
                                    { title: 'Zero Surprises', desc: 'Proactive risk management means problems are solved before they exist.' },
                                    { title: 'Relentless Quality', desc: 'Good enough isn\'t good enough. Excellence is the baseline.' },
                                    { title: 'Client Obsession', desc: 'Your success is our success. We don\'t rest until you\'re thrilled.' }
                                ].map((value, idx) => (
                                    <div key={value.title} className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">{value.title}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">{value.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Timeline Section
const Timeline = () => {
    const milestones = [
        {
            year: '2008',
            title: 'Foundation',
            description: 'Started with a vision to bring international construction standards to Nigeria.',
            icon: <Sparkles className="w-6 h-6" />
        },
        {
            year: '2012',
            title: 'First Major Project',
            description: 'Delivered 80-unit residential complex 3 weeks ahead of schedule.',
            icon: <Building2 className="w-6 h-6" />
        },
        {
            year: '2015',
            title: 'UK Expansion',
            description: 'Secured UK Government certification and launched London operations.',
            icon: <Globe className="w-6 h-6" />
        },
        {
            year: '2018',
            title: 'Government Projects',
            description: 'Selected as preferred contractor for major institutional developments.',
            icon: <Award className="w-6 h-6" />
        },
        {
            year: '2021',
            title: 'Hospitality Excellence',
            description: 'Completed 5-star hotel ahead of schedule with zero defects.',
            icon: <Trophy className="w-6 h-6" />
        },
        {
            year: '2024',
            title: 'Continued Growth',
            description: '80+ projects delivered, maintaining 100% success rate.',
            icon: <TrendingUp className="w-6 h-6" />
        }
    ];

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Our Journey to{' '}
                        <span className="text-amber-600 dark:text-amber-400">Excellence</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        15+ years of consistent delivery, innovation, and unwavering commitment to our clients.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {milestones.map((milestone, idx) => (
                        <motion.div
                            key={milestone.year}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative flex items-center gap-8 mb-12 last:mb-0"
                        >
                            {/* Timeline Line */}
                            {idx !== milestones.length - 1 && (
                                <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-amber-500 to-transparent" />
                            )}

                            {/* Icon */}
                            <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                {milestone.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                                        {milestone.year}
                                    </span>
                                    <div className="h-px flex-1 bg-gradient-to-r from-amber-500 to-transparent" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                    {milestone.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {milestone.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Certifications Section
const Certifications = () => {
    const certs = [
        { title: 'UK Government Construction PM Certification', icon: <Award className="w-8 h-8" /> },
        { title: 'RICS Regulated Professional', icon: <Shield className="w-8 h-8" /> },
        { title: 'ISO 9001 Quality Management', icon: <CheckCircle className="w-8 h-8" /> },
        { title: 'EDGE Sustainability Expert', icon: <Globe className="w-8 h-8" /> },
        { title: 'BIM Level 2 Certified', icon: <Zap className="w-8 h-8" /> },
        { title: 'PRINCE2 Project Management', icon: <Briefcase className="w-8 h-8" /> }
    ];

    return (
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Certified{' '}
                        <span className="text-amber-600 dark:text-amber-400">Excellence</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Backed by international certifications and industry-leading qualifications.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {certs.map((cert, idx) => (
                        <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-lg transition-all group"
                        >
                            <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                                {cert.icon}
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white">
                                {cert.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Final CTA
const AboutCTA = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        Let's build something{' '}
                        <span className="text-amber-400">extraordinary</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join 80+ satisfied clients who trusted us with their most ambitious projects.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-6 text-lg shadow-2xl">
                            Start Your Project Today
                            <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

// Main About Component
export default function About() {
    return (
        <div className="bg-white dark:bg-slate-900">
            <AboutHero />
            <OurStory />
            <Timeline />
            <Certifications />
            <AboutCTA />
        </div>
    );
}