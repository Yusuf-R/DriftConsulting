// components/Home/BenefitsSection.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Target, CheckCircle2, Globe, Clock,
    Award, TrendingUp, BarChart, ShieldCheck, Zap,
    Users, DollarSign, Lock, FileCheck, X
} from 'lucide-react';
import AnimatedBenefitCard from '@/components/Benefits/AnimatedBenefitCard';
import ParticleGrid from '@/components/Benefits/ParticleGrid';

const benefitData = [
    {
        icon: Shield,
        title: "Stress free builds.",
        description: "Breathe easy with our experienced project managers overseeing every component of your build.",
        gradient: "linear-gradient(145deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))",
        color: "#8B5CF6"
    },
    {
        icon: Target,
        title: "Gain budget clarity.",
        description: "Get the most from your budget without sacrificing quality with expert commercial guidance.",
        gradient: "linear-gradient(145deg, rgba(34, 197, 94, 0.15), rgba(21, 128, 61, 0.15))",
        color: "#22C55E"
    },
    {
        icon: CheckCircle2,
        title: "Foolproof your brief.",
        description: "We find potential problems and fix them before they happen, so you don't ever have to.",
        gradient: "linear-gradient(145deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.15))",
        color: "#F59E0B"
    },
    {
        icon: Clock,
        title: "Predictable Timelines.",
        description: "15+ years of scheduling expertise means we deliver projects on time with military precision.",
        gradient: "linear-gradient(145deg, rgba(236, 72, 153, 0.15), rgba(190, 24, 93, 0.15))",
        color: "#EC4899"
    },
    {
        icon: Award,
        title: "Certified Excellence.",
        description: "Holder of UK Government Construction Project Management Certification.",
        gradient: "linear-gradient(145deg, rgba(234, 179, 8, 0.15), rgba(202, 138, 4, 0.15))",
        color: "#EAB308"
    },
    {
        icon: TrendingUp,
        title: "Value Engineering.",
        description: "Intelligent value optimization that enhances project outcomes while maintaining quality.",
        gradient: "linear-gradient(145deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15))",
        color: "#10B981"
    },
    {
        icon: BarChart,
        title: "Real-time Transparency.",
        description: "Comprehensive progress dashboards keep you informed without overwhelming details.",
        gradient: "linear-gradient(145deg, rgba(99, 102, 241, 0.15), rgba(79, 70, 229, 0.15))",
        color: "#6366F1"
    }
];

const additionalBenefits = [
    {
        icon: ShieldCheck,
        title: "Risk Mitigation Strategy.",
        description: "Proactive identification and management of construction risks using proven UK government protocols.",
        gradient: "linear-gradient(145deg, rgba(6, 182, 212, 0.15), rgba(8, 145, 178, 0.15))",
        color: "#06B6D4"
    },
    {
        icon: Zap,
        title: "Technology Integration.",
        description: "Leverage BIM, project management software, and digital workflows for seamless coordination.",
        gradient: "linear-gradient(145deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.15))",
        color: "#F59E0B"
    },
    {
        icon: Users,
        title: "Stakeholder Orchestration.",
        description: "Expert management of contractors, architects, engineers, and regulatory bodies.",
        gradient: "linear-gradient(145deg, rgba(139, 92, 246, 0.15), rgba(124, 58, 237, 0.15))",
        color: "#8B5CF6"
    },
    {
        icon: DollarSign,
        title: "ROI Maximization.",
        description: "Every decision evaluated against return on investment, ensuring maximum value.",
        gradient: "linear-gradient(145deg, rgba(34, 197, 94, 0.15), rgba(21, 128, 61, 0.15))",
        color: "#22C55E"
    },
    {
        icon: Lock,
        title: "Contractual Safeguards.",
        description: "Iron-clad contract administration that protects your interests and ensures delivery.",
        gradient: "linear-gradient(145deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15))",
        color: "#3B82F6"
    },
    {
        icon: FileCheck,
        title: "Regulatory Navigation.",
        description: "Expert handling of UK building regulations, planning permissions, and compliance.",
        gradient: "linear-gradient(145deg, rgba(236, 72, 153, 0.15), rgba(190, 24, 93, 0.15))",
        color: "#EC4899"
    }
];

export default function BenefitsSection() {
    const [selectedBenefit, setSelectedBenefit] = useState<typeof benefitData[0] | null>(null);
    const [showAllBenefits, setShowAllBenefits] = useState(false);
    const [filter, setFilter] = useState<'all' | 'core' | 'advanced'>('all');

    const filteredBenefits = () => {
        if (filter === 'core') return benefitData;
        if (filter === 'advanced') return additionalBenefits;
        return [...benefitData, ...additionalBenefits];
    };

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background with particle grid */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <ParticleGrid particleCount={300} />

                {/* Animated gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
            px-6 py-3 rounded-full border border-white/20 mb-6">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-white">
              Project Management Excellence
            </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                        The <span className="bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent">
              Professional Advantage
            </span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Experience construction project management redefined with cutting-edge
                        technology and proven methodologies.
                    </p>

                    {/* Filter buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {['all', 'core', 'advanced'].map((filterType) => (
                            <button
                                key={filterType}
                                onClick={() => setFilter(filterType as any)}
                                className={`px-6 py-3 rounded-full font-medium transition-all ${
                                    filter === filterType
                                        ? 'bg-white text-slate-900 shadow-lg'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                            >
                                {filterType === 'all' && 'All Benefits'}
                                {filterType === 'core' && 'Core Principles'}
                                {filterType === 'advanced' && 'Advanced Strategies'}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredBenefits().map((benefit, idx) => (
                        <AnimatedBenefitCard
                            key={benefit.title}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                            gradient={benefit.gradient}
                            delay={idx * 0.1}
                        />
                    ))}
                </div>

                {/* Show More Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <button
                        onClick={() => setShowAllBenefits(!showAllBenefits)}
                        className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600
              rounded-full font-bold text-white hover:shadow-2xl hover:shadow-amber-500/30
              transition-all duration-300 overflow-hidden"
                    >
            <span className="relative z-10">
              {showAllBenefits ? 'Show Less Benefits' : 'Discover All 14 Benefits'}
            </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700
              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </motion.div>

                {/* Stats Counter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '15+', label: 'Years Experience' },
                            { value: '100+', label: 'Projects Delivered' },
                            { value: '£500M+', label: 'Value Managed' },
                            { value: '99%', label: 'Client Satisfaction' },
                        ].map((stat, idx) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Modal for selected benefit */}
            <AnimatePresence>
                {selectedBenefit && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedBenefit(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-2xl w-full rounded-2xl p-8 bg-gradient-to-br from-slate-800 to-slate-900"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedBenefit(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>

                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-blue-500
                  flex items-center justify-center">
                                    <selectedBenefit.icon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        {selectedBenefit.title}
                                    </h3>
                                    <p className="text-gray-300 text-lg">
                                        {selectedBenefit.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}