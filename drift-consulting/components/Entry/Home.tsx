'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Building2, Award, Users, CheckCircle2, ArrowRight, TrendingUp,
    Shield, Target, Clock, Star, Quote, ChevronLeft, ChevronRight,
    Zap, FileCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import TextType from '@/components/TextType';

const Hero = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920"
                    alt="Construction Project"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-slate-900/90 via-slate-800/70 to-transparent" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-amber-400 font-semibold text-2xl sm:text-base lg:text-5xl uppercase tracking-wider mb-4"
                    >
                        <TextType
                            text={["Drift Consulting", "Delivering Your Reality"]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor={true}
                            cursorCharacter="|"
                        />

                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                    >
                        Your build in <span className="text-amber-400">safe hands</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg sm:text-xl text-gray-200 mb-10 leading-relaxed"
                    >
                        When you build with us, we&apos;ll ensure every aspect of your project is realistically aligned with your brief, your vision and your commercial goals. The result? Complete clarity, smart decision-making, and a build you&lsquo;ll profit from like never before.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Link href="/contact">
                            <Button
                                size="lg"
                                className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-6 text-lg shadow-2xl hover:shadow-amber-500/50 transition-all"
                            >
                                Let&apos;s Talk
                                <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const BenefitsSection = () => {
    const benefits = [
        {
            icon: <Shield className="w-10 h-10" />,
            title: "Stress free builds.",
            description: "Breathe easy with our experienced project managers overseeing every component of your build."
        },
        {
            icon: <Target className="w-10 h-10" />,
            title: "Gain budget clarity.",
            description: "Get the most from your budget without sacrificing quality with expert commercial guidance."
        },
        {
            icon: <CheckCircle2 className="w-10 h-10" />,
            title: "Foolproof your brief.",
            description: "We find potential problems and fix them before they happen, so you don't ever have to."
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {benefits.map((benefit, idx) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-6">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AboutSection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                            alt="Modern Construction"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Start your next project on <span className="text-amber-600">solid foundations.</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Anyone can tell you what you want to hear — we prefer honest collaboration. Even if that involves asking hard questions like: is your brief realistic?
                        </p>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            As high-end residential and commercial construction project leaders, we&apos;ve learned the hard way. That&apos;s why we&apos;re dedicated to helping our clients develop bulletproof briefs that are grounded in reality. Starting with your goals, we work hard and smart to complete your project in budget, on brief and on time — every time.
                        </p>
                        <Link href="/about">
                            <Button variant="outline" size="lg" className="border-2 border-slate-300 hover:border-amber-500">
                                About GandeWest
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            name: "Louise Berry",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
            rating: 5,
            text: "She was on top of costs, regulations and schedule for our home renovation project. Kept our builder on schedule and on budget. Without her we would have made some very stressful and expensive mistakes."
        },
        {
            name: "Sasha Mantel",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
            rating: 5,
            text: "In 30 mins she expertly summarised all the building, planning and landscaping options available to us. Invaluable insights taking away the usual stress associated with building works."
        },
        {
            name: "Sally Kee",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
            rating: 5,
            text: "No problem was ever too big or too small for her to deal with. She kept the complex refurbishment on track in terms of both time and budget and we are truly delighted with the end result."
        }
    ];

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">
                        Happy Clients
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                        What our clients say.
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-slate-50 rounded-2xl p-8 md:p-12"
                    >
                        <Quote className="w-12 h-12 text-amber-400 mb-6" />
                        <p className="text-xl text-slate-700 mb-8 leading-relaxed italic">
                            {testimonials[currentTestimonial].text}
                        </p>
                        <div className="flex items-center gap-4">
                            <Image
                                src={testimonials[currentTestimonial].image}
                                alt={testimonials[currentTestimonial].name}
                                width={60}
                                height={60}
                                className="rounded-full"
                            />
                            <div>
                                <h4 className="font-bold text-slate-900">
                                    {testimonials[currentTestimonial].name}
                                </h4>
                                <div className="flex gap-1 mt-1">
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={prevTestimonial}
                            className="w-12 h-12 rounded-full bg-slate-200 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="w-12 h-12 rounded-full bg-slate-200 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-colors"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex justify-center gap-2 mt-4">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentTestimonial(idx)}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    idx === currentTestimonial ? 'bg-amber-500 w-8' : 'bg-slate-300'
                                }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CTABanner = () => {
    return (
        <section className="py-16 bg-linear-to-r from-amber-500 to-amber-600">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Your next project starts here.
                </h2>
                <Link href="/contact">
                    <Button
                        size="lg"
                        className="bg-white text-amber-600 hover:bg-gray-100 font-bold px-10 py-6 text-lg shadow-xl"
                    >
                        Let&apos;s Talk
                        <ArrowRight className="ml-2" />
                    </Button>
                </Link>
            </div>
        </section>
    );
};

const ServicesSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">
                            Our Services
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Construction project management that <span className="text-amber-600">conducts the whole orchestra.</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Say hello to comprehensive management of every aspect of your construction project. If you have a challenging build with many moving parts to synchronise, let us spin the plates for you.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/services">
                                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white">
                                    Learn More
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="border-2">
                                    Get In Touch
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800"
                            alt="Project Management"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Building2 className="w-8 h-8" />,
                            title: "Residential Projects",
                            description: "Transform residential buildings into assets that work hard for your investors."
                        },
                        {
                            icon: <Award className="w-8 h-8" />,
                            title: "Hospitality Development",
                            description: "Effectively manage the complex challenges of successful hotel developments."
                        },
                        {
                            icon: <FileCheck className="w-8 h-8" />,
                            title: "Institutional Buildings",
                            description: "Smoothly navigate the planning and practicalities of large-scale projects."
                        }
                    ].map((service, idx) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center p-8 bg-slate-50 rounded-xl hover:shadow-lg transition-shadow"
                        >
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-4">
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 text-sm">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WhyChooseSection = () => {
    const reasons = [
        {
            title: "Breaking project deadlocks.",
            description: "We rescue problem builds. Whether due to a breakdown of communication or conflicting contractors — let a skilled communicator and commercial mind step in and take the reins."
        },
        {
            title: "Balancing artistry with practicality.",
            description: "With extensive experience across design, construction, quantity surveying, and project management, we can provide a holistic view that helps bring all elements of your project together."
        },
        {
            title: "Squeezing the most from your budget.",
            description: "We know how sensitive your budget is; every penny has to work hard for you. As longtime construction industry professionals, we're adept at securing the best prices for materials and contractors."
        }
    ];

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">
                        Why Partner With GandeWest?
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 max-w-4xl mx-auto">
                        We&apos;re methodical planners, expert stakeholder managers and reactive problem solvers.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {reasons.map((reason, idx) => (
                        <motion.div
                            key={reason.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-xl shadow-md"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                {reason.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {reason.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FinalCTA = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                    Ready to start your next project?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                    Make this build your simplest yet. Call us on{' '}
                    <a href="tel:+2348012345678" className="text-amber-400 font-bold hover:underline">
                        +234 801 234 5678
                    </a>
                </p>
                <Link href="/contact">
                    <Button
                        size="lg"
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-6 text-lg shadow-2xl"
                    >
                        Get In Touch
                        <ArrowRight className="ml-2" />
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default function Home() {
    return (
        <div className="bg-white">
            <Hero />
            <BenefitsSection />
            <AboutSection />
            <TestimonialsSection />
            <CTABanner />
            <ServicesSection />
            <WhyChooseSection />
            <FinalCTA />
        </div>
    );
}