'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, Hotel, School, Landmark, Trees, Warehouse, MapPin, Calendar,
    DollarSign, Users, TrendingUp, ArrowRight, Filter, X, Star, CheckCircle,
    Award, Zap, Target
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Portfolio Hero Section
const PortfolioHero = () => {
    return (
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-8"
                    >
                        <Award className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-semibold text-white uppercase tracking-wider">
                            80+ Projects Delivered
                        </span>
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                        Projects that{' '}
                        <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                            speak volumes
                        </span>
                    </h1>

                    <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
                        From residential masterpieces to government infrastructure—explore our portfolio
                        of excellence spanning 15+ years and multiple continents.
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                        {[
                            { number: '80+', label: 'Projects' },
                            { number: '15+', label: 'Years' },
                            { number: '6', label: 'Sectors' },
                            { number: '100%', label: 'Success' }
                        ].map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
                            >
                                <div className="text-3xl font-bold text-amber-400">{stat.number}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Portfolio Filter and Grid
const PortfolioGrid = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', 'Residential', 'Hospitality', 'Institutional', 'Commercial', 'Government', 'Recreation'];

    const projects = [
        {
            id: 1,
            title: 'Luxury Waterfront Residences',
            category: 'Residential',
            location: 'Lagos, Nigeria',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
            value: '₦2.8B',
            duration: '24 months',
            units: '120 units',
            status: 'Completed',
            year: '2023',
            featured: true
        },
        {
            id: 2,
            title: 'Five-Star Boutique Hotel',
            category: 'Hospitality',
            location: 'Abuja, Nigeria',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
            value: '₦1.5B',
            duration: '18 months',
            units: '85 rooms',
            status: 'Completed',
            year: '2023',
            featured: true
        },
        {
            id: 3,
            title: 'University Campus Expansion',
            category: 'Institutional',
            location: 'Lagos, Nigeria',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
            value: '₦4.2B',
            duration: '36 months',
            units: '8 buildings',
            status: 'Completed',
            year: '2023',
            featured: true
        },
        {
            id: 4,
            title: 'Government Office Complex',
            category: 'Government',
            location: 'Abuja, Nigeria',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
            value: '₦850M',
            duration: '20 months',
            units: '45,000 sqm',
            status: 'Completed',
            year: '2023',
            featured: false
        },
        {
            id: 5,
            title: 'Modern Office Tower',
            category: 'Commercial',
            location: 'London, UK',
            image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800',
            value: '£38M',
            duration: '30 months',
            units: '22 floors',
            status: 'Completed',
            year: '2022',
            featured: false
        },
        {
            id: 6,
            title: 'Community Sports Complex',
            category: 'Recreation',
            location: 'Lagos, Nigeria',
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
            value: '₦680M',
            duration: '16 months',
            units: '15,000 sqm',
            status: 'Completed',
            year: '2022',
            featured: false
        },
        {
            id: 7,
            title: 'Duplex Estate Development',
            category: 'Residential',
            location: 'Lekki, Nigeria',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
            value: '₦1.2B',
            duration: '20 months',
            units: '40 duplexes',
            status: 'Completed',
            year: '2023',
            featured: false
        },
        {
            id: 8,
            title: 'International School Campus',
            category: 'Institutional',
            location: 'Abuja, Nigeria',
            image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
            value: '₦950M',
            duration: '22 months',
            units: '12 buildings',
            status: 'Completed',
            year: '2022',
            featured: false
        },
        {
            id: 9,
            title: 'Mixed-Use Development',
            category: 'Commercial',
            location: 'Lagos, Nigeria',
            image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800',
            value: '₦3.5B',
            duration: '28 months',
            units: '200,000 sqm',
            status: 'Ongoing',
            year: '2024',
            featured: true
        }
    ];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                activeFilter === category
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.map((project, idx) => (
                            <ProjectCard key={project.id} project={project} delay={idx * 0.1} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* No Results */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            No projects found in this category.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

// Project Card Component
const ProjectCard = ({ project, delay }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-700"
        >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                {/* Featured Badge */}
                {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        Featured
                    </div>
                )}

                {/* Status Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 ${
                    project.status === 'Completed'
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                } text-white text-xs font-bold rounded-full flex items-center gap-1`}>
                    {project.status === 'Completed' ? (
                        <CheckCircle className="w-3 h-3" />
                    ) : (
                        <Zap className="w-3 h-3" />
                    )}
                    {project.status}
                </div>

                {/* Overlay Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-slate-900/90 flex items-center justify-center"
                >
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold">
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {project.title}
                    </h3>
                </div>

                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-4">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span className="text-sm">{project.location}</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-amber-500" />
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Value</div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">{project.value}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Duration</div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">{project.duration}</div>
                        </div>
                    </div>
                </div>

                {/* Category Tag */}
                <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-full">
                        {project.category}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{project.year}</span>
                </div>
            </div>
        </motion.div>
    );
};

// CTA Section
const PortfolioCTA = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Ready to add your project to our portfolio?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Let's discuss how we can deliver the same excellence for your next build.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 font-bold px-10 py-6 text-lg shadow-xl">
                                Start Your Project
                                <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                        <Link href="/services">
                            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-6 text-lg">
                                View Services
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Main Portfolio Component
export default function Portfolios() {
    return (
        <div className="bg-white dark:bg-slate-900">
            <PortfolioHero />
            <PortfolioGrid />
            <PortfolioCTA />
        </div>
    );
}