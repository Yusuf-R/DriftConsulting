'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Building2, ClipboardCheck, TrendingUp, Shield, Users, Zap, Target, Award,
    CheckCircle, ArrowRight, Sparkles, FileText, Calculator, BarChart, Globe,
    Clock, DollarSign, Layers, Settings, Brain, Eye, Wrench, Package,
    LineChart, PieChart, Activity, Gauge
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Services Hero
const ServicesHero = () => {
    return (
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-10"
                     style={{
                         backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
                         backgroundSize: '50px 50px'
                     }}
                />
                <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-5xl mx-auto"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-8"
                    >
                        <Sparkles className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-semibold text-white uppercase tracking-wider">
                            Comprehensive Services
                        </span>
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                        End-to-end{' '}
                        <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                            construction mastery
                        </span>
                    </h1>

                    <p className="text-xl sm:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                        From initial feasibility to final handover—we orchestrate every phase of your
                        construction project with precision, transparency, and unwavering excellence.
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {[
                            { icon: <Target />, label: 'On-Time Delivery', value: '98%' },
                            { icon: <DollarSign />, label: 'Budget Accuracy', value: '±2%' },
                            { icon: <Shield />, label: 'Safety Record', value: '0 Incidents' },
                            { icon: <Award />, label: 'Client Satisfaction', value: '100%' }
                        ].map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all group"
                            >
                                <div className="text-amber-400 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-xs text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Core Services Section
const CoreServices = () => {
    const services = [
        {
            icon: <ClipboardCheck className="w-10 h-10" />,
            title: 'Client-Side Project Management',
            description: 'Complete oversight from your perspective—ensuring every decision protects your interests, timeline, and budget.',
            features: [
                'Daily site supervision and progress monitoring',
                'Contractor coordination and performance management',
                'Quality control and compliance verification',
                'Real-time budget tracking and cost control',
                'Risk identification and mitigation strategies'
            ],
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: <Calculator className="w-10 h-10" />,
            title: 'Feasibility & Pre-Construction',
            description: 'Turn ideas into actionable plans with comprehensive analysis, budgeting, and strategic planning.',
            features: [
                'Site analysis and due diligence',
                'Cost estimation and budget development',
                'Regulatory compliance and permitting',
                'Contractor procurement and selection',
                'Project scheduling and timeline planning'
            ],
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: <Building2 className="w-10 h-10" />,
            title: 'Construction Phase Support',
            description: 'Active management throughout the build—coordinating trades, solving problems, delivering results.',
            features: [
                'Multi-trade coordination and logistics',
                'Change order management and documentation',
                'Weekly progress reporting and stakeholder updates',
                'Quality inspections at critical milestones',
                'Dispute resolution and contractor mediation'
            ],
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: <FileText className="w-10 h-10" />,
            title: 'Post-Construction & Handover',
            description: 'Ensure flawless completion with thorough inspections, documentation, and warranty management.',
            features: [
                'Final inspections and punch list management',
                'As-built documentation and record drawings',
                'Warranty coordination and defect tracking',
                'Post-occupancy support and optimization',
                'Maintenance planning and lifecycle guidance'
            ],
            gradient: 'from-orange-500 to-red-500'
        },
        {
            icon: <TrendingUp className="w-10 h-10" />,
            title: 'Value Engineering',
            description: 'Maximize value without sacrificing quality through intelligent optimization and strategic sourcing.',
            features: [
                'Design optimization for cost efficiency',
                'Material selection and specification review',
                'Alternative construction method analysis',
                'Supplier negotiation and bulk procurement',
                'Lifecycle cost analysis and ROI modeling'
            ],
            gradient: 'from-indigo-500 to-purple-500'
        },
        {
            icon: <Shield className="w-10 h-10" />,
            title: 'Risk Management & Compliance',
            description: 'Proactive identification and mitigation of risks before they impact your schedule or budget.',
            features: [
                'Comprehensive risk assessment and planning',
                'Health & safety compliance management',
                'Insurance and bonding coordination',
                'Regulatory compliance verification',
                'Crisis management and contingency planning'
            ],
            gradient: 'from-red-500 to-pink-500'
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                        Our Core{' '}
                        <span className="text-amber-600 dark:text-amber-400">Services</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Comprehensive construction management covering every phase of your project lifecycle.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-transparent hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                            <div className="relative">
                                {/* Icon */}
                                <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    {service.icon}
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-3">
                                    {service.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700 dark:text-slate-300 text-sm">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Process Section
const ProcessSection = () => {
    const steps = [
        {
            number: '01',
            icon: <Eye className="w-8 h-8" />,
            title: 'Discovery & Analysis',
            description: 'Deep dive into your vision, constraints, and goals. We ask hard questions to build a bulletproof brief.'
        },
        {
            number: '02',
            icon: <Brain className="w-8 h-8" />,
            title: 'Strategic Planning',
            description: 'Comprehensive project roadmap with realistic timelines, budgets, and risk mitigation strategies.'
        },
        {
            number: '03',
            icon: <Wrench className="w-8 h-8" />,
            title: 'Execution & Oversight',
            description: 'Daily management, coordination, and problem-solving to keep your project on track and on budget.'
        },
        {
            number: '04',
            icon: <Gauge className="w-8 h-8" />,
            title: 'Quality Assurance',
            description: 'Rigorous inspections, compliance verification, and documentation at every critical milestone.'
        },
        {
            number: '05',
            icon: <Package className="w-8 h-8" />,
            title: 'Handover & Support',
            description: 'Flawless completion with comprehensive documentation, warranty management, and ongoing support.'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                        Our Proven{' '}
                        <span className="text-amber-400">Process</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        A methodical approach refined over 80+ successful projects.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group"
                        >
                            {/* Connector Line */}
                            {idx < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-amber-500 to-transparent z-0" />
                            )}

                            <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all h-full">
                                {/* Number Badge */}
                                <div className="text-6xl font-bold text-amber-500/20 mb-4">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                                    {step.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-white mb-3">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Why Choose Section
const WhyChooseServices = () => {
    const benefits = [
        {
            icon: <Clock className="w-8 h-8" />,
            title: '98% On-Time Delivery',
            description: 'Industry average is 65%. We deliver on schedule because we plan properly from day one.'
        },
        {
            icon: <DollarSign className="w-8 h-8" />,
            title: '±2% Budget Variance',
            description: 'While others routinely exceed budgets by 15-30%, our projects stay within 2% of projections.'
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Zero Safety Incidents',
            description: 'Across 500,000+ man-hours, we maintain a perfect safety record through rigorous protocols.'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: '100% Client Retention',
            description: 'Every client comes back. Because when you deliver excellence, trust becomes loyalty.'
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
                        Numbers Don't Lie
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        While others make promises, we deliver measurable results.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, idx) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all group"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform">
                                {benefit.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Final CTA
const ServicesCTA = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                        Ready to experience construction without the chaos?
                    </h2>
                    <p className="text-xl text-white/90 mb-10">
                        Let's discuss your project and show you exactly how we'll deliver certainty, quality, and peace of mind.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 font-bold px-10 py-6 text-lg shadow-2xl">
                                Schedule a Consultation
                                <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                        <Link href="/portfolio">
                            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-6 text-lg">
                                View Our Portfolio
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Main Services Component
export default function Services() {
    return (
        <div className="bg-white dark:bg-slate-900">
            <ServicesHero />
            <CoreServices />
            <ProcessSection />
            <WhyChooseServices />
            <ServicesCTA />
        </div>
    );
}