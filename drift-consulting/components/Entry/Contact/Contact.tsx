'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle,
    Building2, Calendar, DollarSign, FileText, User, Sparkles,
    MessageSquare, ArrowRight, Globe, Linkedin, Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/ContactForm';

// Contact Hero
const ContactHero = () => {
    return (
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10">
                <div className="absolute top-20 right-20 w-96 h-96 bg-amber-400 dark:bg-amber-500 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-400 dark:bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-8"
                    >
                        <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                            Let's Build Together
                        </span>
                    </motion.div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                        Start your project{' '}
                        <span className="bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                            with confidence
                        </span>
                    </h1>

                    <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                        Tell us about your vision, and we'll show you exactly how we'll bring it to life—
                        on time, on budget, and stress-free.
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {[
                            { icon: <Clock />, label: '24hr Response' },
                            { icon: <FileText />, label: 'Free Consultation' },
                            { icon: <CheckCircle />, label: 'No Obligation' },
                            { icon: <Building2 />, label: 'Expert Guidance' }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700"
                            >
                                <div className="text-amber-600 dark:text-amber-400 mb-2 flex justify-center">
                                    {item.icon}
                                </div>
                                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {item.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Contact Methods
const ContactMethods = () => {
    const methods = [
        {
            icon: <Mail className="w-8 h-8" />,
            title: 'Email Us',
            detail: 'info@driftconsulting.com',
            description: 'Send us a detailed message and we\'ll respond within 24 hours.',
            action: 'mailto:info@driftconsulting.com',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: <Phone className="w-8 h-8" />,
            title: 'Call Us',
            detail: '+234 801 234 5678',
            description: 'Speak directly with our team Monday to Friday, 9am-6pm WAT.',
            action: 'tel:+2348012345678',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: <MapPin className="w-8 h-8" />,
            title: 'Visit Us',
            detail: 'Lagos & Abuja, Nigeria',
            description: 'Schedule an in-person consultation at our offices.',
            action: '/contact',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: 'WhatsApp',
            detail: '+234 801 234 5678',
            description: 'Quick questions? Message us on WhatsApp for instant support.',
            action: 'https://wa.me/2348012345678',
            gradient: 'from-orange-500 to-red-500'
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
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Multiple Ways to{' '}
                        <span className="text-amber-600 dark:text-amber-400">Connect</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Choose your preferred method—we're here and ready to help.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {methods.map((method, idx) => (
                        <motion.a
                            key={method.title}
                            href={method.action}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group block p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-transparent hover:shadow-2xl transition-all"
                        >
                            <div className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                                {method.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                {method.title}
                            </h3>
                            <div className="text-amber-600 dark:text-amber-400 font-semibold mb-3">
                                {method.detail}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {method.description}
                            </p>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Form Section
const FormSection = () => {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Tell us about{' '}
                            <span className="text-amber-600 dark:text-amber-400">your project</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                            Fill out the form and we'll get back to you within 24 hours with a detailed
                            assessment of your project, timeline estimates, and next steps.
                        </p>

                        {/* What to Expect */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                What happens next?
                            </h3>
                            {[
                                {
                                    step: '01',
                                    title: 'Initial Review',
                                    description: 'We analyze your project details and prepare preliminary questions.'
                                },
                                {
                                    step: '02',
                                    title: 'Discovery Call',
                                    description: 'A 30-minute consultation to understand your vision and requirements.'
                                },
                                {
                                    step: '03',
                                    title: 'Proposal',
                                    description: 'Detailed project plan with timeline, budget, and our approach.'
                                }
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                                        Your Information is Secure
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        We respect your privacy and will never share your details with third parties.
                                        All consultations are completely confidential.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Office Locations
const OfficeLocations = () => {
    const offices = [
        {
            city: 'Lagos',
            address: 'Victoria Island, Lagos',
            country: 'Nigeria',
            hours: 'Mon-Fri: 9:00 AM - 6:00 PM WAT',
            image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600'
        },
        {
            city: 'Abuja',
            address: 'Central Business District',
            country: 'Nigeria',
            hours: 'Mon-Fri: 9:00 AM - 6:00 PM WAT',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600'
        },
        {
            city: 'London',
            address: 'Westminster',
            country: 'United Kingdom',
            hours: 'Mon-Fri: 9:00 AM - 5:00 PM GMT',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600'
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
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Our{' '}
                        <span className="text-amber-600 dark:text-amber-400">Locations</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Operating across Nigeria and the United Kingdom.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {offices.map((office, idx) => (
                        <motion.div
                            key={office.city}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                        >
                            {/* Image Background */}
                            <div className="relative h-64">
                                <img
                                    src={office.image}
                                    alt={office.city}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-2xl font-bold mb-2">{office.city}</h3>
                                <div className="flex items-start gap-2 mb-3">
                                    <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm">{office.address}</p>
                                        <p className="text-sm text-gray-300">{office.country}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Clock className="w-4 h-4 text-amber-400" />
                                    <span>{office.hours}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// FAQ Section
const FAQSection = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);

    const faqs = [
        {
            question: 'How quickly can you start my project?',
            answer: 'After our initial consultation and agreement, we can typically mobilize within 2-4 weeks. For urgent projects, we can fast-track this timeline.'
        },
        {
            question: 'What types of projects do you handle?',
            answer: 'We manage residential, commercial, hospitality, institutional, and government projects. From single-family homes to multi-million dollar developments.'
        },
        {
            question: 'Do you work outside Lagos and Abuja?',
            answer: 'Yes! We manage projects throughout Nigeria and the UK. For other locations, we assess feasibility during our initial consultation.'
        },
        {
            question: 'What are your fees?',
            answer: 'Our fees vary based on project scope, complexity, and duration. We provide transparent, detailed proposals after understanding your specific needs.'
        },
        {
            question: 'Do you guarantee on-time completion?',
            answer: 'While we can\'t control acts of God or government policy changes, our 98% on-time delivery rate speaks to our commitment and capability.'
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
                        Frequently Asked{' '}
                        <span className="text-amber-600 dark:text-amber-400">Questions</span>
                    </h2>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="font-bold text-slate-900 dark:text-white pr-4">
                                    {faq.question}
                                </span>
                                <ArrowRight
                                    className={`w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 transition-transform ${
                                        openFAQ === idx ? 'rotate-90' : ''
                                    }`}
                                />
                            </button>
                            {openFAQ === idx && (
                                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                                    <p className="text-slate-600 dark:text-slate-300">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Main Contact Component
export default function Contact() {
    return (
        <div className="bg-white dark:bg-slate-900">
            <ContactHero />
            <ContactMethods />
            <FormSection />
            <OfficeLocations />
            <FAQSection />
        </div>
    );
}