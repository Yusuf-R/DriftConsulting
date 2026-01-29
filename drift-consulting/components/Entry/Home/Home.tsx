'use client';

import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {
    Building2, Award, Users, CheckCircle2, ArrowRight, TrendingUp, Shield, Target, Clock, Star, Quote,
    ChevronLeft, ChevronRight, Zap, FileCheck, Globe, BarChart, ShieldCheck, DollarSign,Lock, AlertCircle,
    Sparkles, GraduationCap, Trees, Warehouse, Gem, LineChart, Lightbulb, Gauge,
} from 'lucide-react';
import {Button} from '@/components/ui/button';
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
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/70 to-transparent"/>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="text-amber-400 font-semibold text-2xl sm:text-base lg:text-5xl uppercase tracking-wider mb-4"
                    >
                        <motion.h1
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.1}}
                            className="text-2xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight flex items-center gap-4 flex-wrap"
                        >
                            Drift <span className="text-amber-400 flex items-center gap-3">
                                Consulting
                                <motion.span
                                    animate={{
                                        y: [0, -12, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="inline-block"
                                >
                                    <Image
                                        src="/dark_mode.svg"
                                        alt="Drift Consulting Logo"
                                        width={100}
                                        height={100}
                                        className="hidden dark:block drop-shadow-lg"
                                    />
                                    <Image
                                        src="/dark_mode.svg"
                                        alt="Drift Consulting Logo"
                                        width={100}
                                        height={100}
                                        className="block dark:hidden drop-shadow-lg"
                                    />
                                </motion.span>
                            </span>
                        </motion.h1>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="text-amber-400 font-semibold text-2xl sm:text-base lg:text-3xl tracking-wider mb-4"
                    >
                        <TextType
                            text={["Delivering your reality.", "We take an outcome-led approach.", "Complete clarity.", "Smart decision-making.", "Effective risk management."]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor={true}
                            cursorCharacter="|"
                        />
                    </motion.div>

                    <motion.h1
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        className="text-2xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                        Your build in <span className="text-amber-400">safe hands</span>
                    </motion.h1>

                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        className="text-lg sm:text-xl text-gray-200 mb-10 leading-relaxed"
                    >
                        When you build with us, we&apos;ll ensure every aspect of your project is realistically aligned
                        with your brief, your vision and your commercial goals. The result? Complete clarity, smart
                        decision-making, and a build you&lsquo;ll profit from like never before.
                    </motion.p>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.3}}
                    >
                        <Link href="/contact">
                            <Button
                                size="lg"
                                className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-6 text-lg shadow-2xl hover:shadow-amber-500/50 transition-all"
                            >
                                Let&apos;s Talk
                                <ArrowRight className="ml-2"/>
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
        },
        {
            icon: <Clock className="w-10 h-10" />,
            title: "Predictable Timelines.",
            description: "15+ years of scheduling expertise means we deliver projects on time with military precision—no surprises."
        },
        {
            icon: <Award className="w-10 h-10" />,
            title: "Certified Excellence.",
            description: "Holder of UK Government Construction Project Management Certification and multiple international accreditations."
        },
        {
            icon: <Zap className="w-10 h-10" />,
            title: "Technology Integration.",
            description: "Leverage BIM, project management software, and digital workflows for seamless project coordination."
        },
        {
            icon: <Users className="w-10 h-10" />,
            title: "Stakeholder Orchestration.",
            description: "Expert management of contractors, architects, engineers, and regulatory bodies as a unified team."
        },
        {
            icon: <TrendingUp className="w-10 h-10" />,
            title: "Value Engineering.",
            description: "Not just cost-cutting—intelligent value optimization that enhances project outcomes while maintaining quality."
        },
        {
            icon: <BarChart className="w-10 h-10" />,
            title: "Real-time Transparency.",
            description: "Comprehensive progress dashboards and weekly reporting keep you informed without overwhelming you with details."
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* STUNNING INTRO */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-950/30 rounded-full mb-6"
                    >
                        <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                            Why Choose Drift
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
                    >
                        We don&apos;t just manage projects,
                        <br />
                        <span className="bg-linear-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                            we deliver certainty
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                        Every build comes with challenges. Our job is to anticipate them, solve them,
                        and ensure you never lose sleep over your project. Here&apos;s how we make it happen.
                    </motion.p>
                </motion.div>

                {/* ANIMATED BENEFITS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {benefits.map((benefit, idx) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: idx * 0.1,
                                duration: 0.5,
                                type: 'spring',
                                stiffness: 100
                            }}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                            className="group text-center p-6 rounded-2xl bg-linear-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300"
                        >
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                className="w-20 h-20 bg-linear-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-900/20 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-amber-500/20"
                            >
                                {benefit.icon}
                            </motion.div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
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

const AboutSection = () => {
    return (
        <section className="py-20 bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* CINEMATIC INTRO */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '4rem' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="h-1 bg-linear-to-r from-amber-600 to-orange-500 mx-auto mb-6"
                    />

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
                    >
                        Building isn&apos;t just about bricks and mortar—
                        <br />
                        <span className="text-amber-600 dark:text-amber-400">it&apos;s about trust</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                        In an industry full of promises, we&apos;ve built our reputation on brutal honesty and flawless execution.
                    </motion.p>
                </motion.div>

                {/* CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                            alt="Modern Construction"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-liner-to-t from-slate-900/60 to-transparent" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Start your next project on{' '}
                            <span className="text-amber-600 dark:text-amber-400">solid foundations.</span>
                        </h3>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                            Anyone can tell you what you want to hear — we prefer honest collaboration.
                            Even if that involves asking hard questions like: is your brief realistic?
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                            As high-end residential and commercial construction project leaders, we&apos;ve learned
                            the hard way. That&apos;s why we&apos;re dedicated to helping our clients develop bulletproof
                            briefs that are grounded in reality. Starting with your goals, we work hard and smart
                            to complete your project in budget, on brief and on time — every time.
                        </p>
                        <Link href="/about">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 group"
                            >
                                Discover Our Story
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: "Louise Berry",
            role: "Homeowner",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
            rating: 5,
            text: "She was on top of costs, regulations and schedule for our home renovation project. Kept our builder on schedule and on budget. Without her we would have made some very stressful and expensive mistakes."
        },
        {
            name: "Sasha Mantel",
            role: "Property Developer",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
            rating: 5,
            text: "In 30 mins she expertly summarised all the building, planning and landscaping options available to us. Invaluable insights taking away the usual stress associated with building works."
        },
        {
            name: "Sally Kee",
            role: "Commercial Client",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
            rating: 5,
            text: "No problem was ever too big or too small for her to deal with. She kept the complex refurbishment on track in terms of both time and budget and we are truly delighted with the end result."
        },
        {
            name: "Michael Chen",
            role: "Hotel Owner",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            rating: 5,
            text: "Our hotel renovation was completed 3 weeks ahead of schedule and 8% under budget. The attention to detail and proactive communication made all the difference. Absolute professionals."
        },
        {
            name: "Amara Okonkwo",
            role: "Real Estate Investor",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
            rating: 5,
            text: "Working across multiple residential projects simultaneously, she coordinated everything flawlessly. Her risk management saved us from what could have been costly regulatory issues."
        },
        {
            name: "David Thompson",
            role: "Institution Director",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
            rating: 5,
            text: "Managing our institutional expansion required surgical precision. She delivered on every milestone, keeping 15+ contractors aligned and our stakeholders informed throughout. Exceptional leadership."
        }
    ];

    const visibleTestimonials = 3;

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev + visibleTestimonials >= testimonials.length ? 0 : prev + visibleTestimonials
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev - visibleTestimonials < 0 ? Math.max(0, testimonials.length - visibleTestimonials) : prev - visibleTestimonials
        );
    };

    return (
        <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 dark:bg-amber-500 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 dark:bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* STUNNING HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-block mb-6"
                    >
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-8 h-8 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" />
                            ))}
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4"
                    >
                        <span className="bg-gradient-to-r from-slate-900 via-amber-600 to-slate-900 dark:from-white dark:via-amber-200 dark:to-white bg-clip-text text-transparent">
                            Loved by builders
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-xl sm:text-2xl text-slate-600 dark:text-gray-300 font-light"
                    >
                        Don't just take our word for it—hear from the clients who trusted us with their vision
                    </motion.p>
                </motion.div>

                {/* TESTIMONIALS CAROUSEL - 3 VISIBLE */}
                <div className="relative max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {testimonials.slice(currentIndex, currentIndex + visibleTestimonials).map((testimonial, idx) => (
                            <motion.div
                                key={`${testimonial.name}-${currentIndex}`}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                                transition={{
                                    delay: idx * 0.1,
                                    duration: 0.5
                                }}
                                className="bg-white/80 dark:bg-white/5 backdrop-blur-lg border border-slate-200 dark:border-white/10 rounded-2xl p-8 hover:bg-white dark:hover:bg-white/10 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 group"
                            >
                                <Quote className="w-10 h-10 text-amber-500 dark:text-amber-400 mb-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                                <p className="text-slate-700 dark:text-gray-200 text-lg mb-6 leading-relaxed italic">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            width={56}
                                            height={56}
                                            className="rounded-full ring-2 ring-amber-500/50 dark:ring-amber-500/50"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                                            <Star className="w-3 h-3 fill-white text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-amber-600 dark:text-amber-400 text-sm">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* NAVIGATION */}
                    <div className="flex justify-center items-center gap-6">
                        <button
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            className="w-14 h-14 rounded-full bg-white dark:bg-white/10 hover:bg-amber-500 dark:hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-lg border border-slate-200 dark:border-white/20 hover:border-amber-500 shadow-lg flex items-center justify-center transition-all group"
                            aria-label="Previous testimonials"
                        >
                            <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-white group-hover:text-white group-hover:scale-110 transition-all" />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: Math.ceil(testimonials.length / visibleTestimonials) }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx * visibleTestimonials)}
                                    className={`transition-all ${
                                        Math.floor(currentIndex / visibleTestimonials) === idx
                                            ? 'w-12 h-3 bg-amber-500'
                                            : 'w-3 h-3 bg-slate-300 dark:bg-white/30 hover:bg-amber-400 dark:hover:bg-white/50'
                                    } rounded-full`}
                                    aria-label={`Go to testimonial set ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            disabled={currentIndex + visibleTestimonials >= testimonials.length}
                            className="w-14 h-14 rounded-full bg-white dark:bg-white/10 hover:bg-amber-500 dark:hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-lg border border-slate-200 dark:border-white/20 hover:border-amber-500 shadow-lg flex items-center justify-center transition-all group"
                            aria-label="Next testimonials"
                        >
                            <ChevronRight className="w-6 h-6 text-slate-700 dark:text-white group-hover:text-white group-hover:scale-110 transition-all" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CTABanner = () => {
    return (
        <section className="py-16 bg-linear-to-r from-amber-500 to-amber-600
            dark:from-amber-600 dark:to-amber-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Your next project starts here.
                </h2>
                <Link href="/contact">
                    <Button
                        size="lg"
                        className="bg-white dark:bg-slate-100 text-amber-600 dark:text-amber-700
                            hover:bg-gray-100 dark:hover:bg-white font-bold px-10 py-6 text-lg
                            shadow-xl hover:shadow-2xl transition-shadow"
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
    const services = [
        {
            icon: <Building2 className="w-8 h-8" />,
            title: "Residential Projects",
            description: "Transform residential buildings into assets that work hard for your investors.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Hospitality Development",
            description: "Effectively manage the complex challenges of successful hotel developments.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: <FileCheck className="w-8 h-8" />,
            title: "Institutional Buildings",
            description: "Smoothly navigate the planning and practicalities of large-scale projects.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Educational Facilities",
            description: "Design and deliver future-ready learning environments from primary schools to universities.",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: <Trees className="w-8 h-8" />,
            title: "Parks & Recreation",
            description: "Create inspiring public spaces and recreational facilities that serve communities for generations.",
            color: "from-teal-500 to-green-500"
        },
        {
            icon: <Warehouse className="w-8 h-8" />,
            title: "Commercial & Industrial",
            description: "Execute complex logistics hubs, warehouses, and commercial centers with precision timing.",
            color: "from-indigo-500 to-blue-500"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden relative">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
                <div className="absolute top-0 left-0 w-full h-full"
                     style={{
                         backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
                         backgroundSize: '50px 50px'
                     }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* EXPLOSIVE INTRO */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 rounded-full mb-8 shadow-lg shadow-amber-500/30"
                    >
                        <Sparkles className="w-6 h-6 text-white" />
                        <span className="text-sm font-bold text-white uppercase tracking-wider">
                            Our Services
                        </span>
                        <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    >
                        <span className="text-slate-900 dark:text-white">We don't just build—</span>
                        <br />
                        <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 dark:from-amber-400 dark:via-orange-400 dark:to-amber-400 bg-clip-text text-transparent animate-gradient-x">
                            we orchestrate excellence
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                        Every great project needs a conductor. Someone to synchronize the moving parts,
                        harmonize the stakeholders, and deliver a masterpiece on time and on budget.
                    </motion.p>
                </motion.div>

                {/* IMAGE + TEXT SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            Construction project management that{' '}
                            <span className="text-amber-600 dark:text-amber-400">conducts the whole orchestra.</span>
                        </h3>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                            Say hello to comprehensive management of every aspect of your construction project.
                            If you have a challenging build with many moving parts to synchronise, let us spin
                            the plates for you.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/services">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 hover:from-slate-800 hover:to-slate-700 text-white shadow-xl hover:shadow-2xl group"
                                >
                                    Learn More
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 group"
                                >
                                    Get In Touch
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800"
                            alt="Project Management"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-transparent" />

                        {/* Floating Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-white/20"
                        >
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">80+</div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400">Projects</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">15+</div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400">Years</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">100%</div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400">Success</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* SERVICE CARDS - 6 ITEMS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: idx * 0.1,
                                duration: 0.5,
                                type: 'spring',
                                stiffness: 100
                            }}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300`} />

                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className={`relative w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg`}
                            >
                                {service.icon}
                            </motion.div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 text-center">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm text-center leading-relaxed">
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
            icon: <Zap className="w-8 h-8" />,
            title: "Breaking project deadlocks.",
            description: "We rescue problem builds. Whether due to a breakdown of communication or conflicting contractors — let a skilled communicator and commercial mind step in and take the reins.",
            gradient: "from-yellow-500 to-orange-500"
        },
        {
            icon: <Gem className="w-8 h-8" />,
            title: "Balancing artistry with practicality.",
            description: "With extensive experience across design, construction, quantity surveying, and project management, we can provide a holistic view that helps bring all elements of your project together.",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: <LineChart className="w-8 h-8" />,
            title: "Squeezing the most from your budget.",
            description: "We know how sensitive your budget is; every penny has to work hard for you. As longtime construction industry professionals, we're adept at securing the best prices for materials and contractors.",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Zero-tolerance risk management.",
            description: "We identify potential risks before they become problems. Our proactive approach means surprises are eliminated, delays are prevented, and your investment is protected at every stage.",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "World-class contractor network.",
            description: "Access our vetted network of premium contractors, suppliers, and specialists across multiple sectors—relationships built over 15+ years delivering excellence.",
            gradient: "from-indigo-500 to-purple-500"
        },
        {
            icon: <Gauge className="w-8 h-8" />,
            title: "Performance-driven delivery.",
            description: "We don't just meet deadlines—we beat them. Our track record shows an average of 12% faster delivery than industry standard, without compromising quality.",
            gradient: "from-red-500 to-orange-500"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white overflow-hidden relative">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0"
                     style={{
                         backgroundImage: 'linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)',
                         backgroundSize: '100px 100px',
                         animation: 'gridMove 20s linear infinite'
                     }}
                />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* EXPLOSIVE HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-5xl mx-auto mb-16"
                >
                    {/* Animated Badge */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-8"
                    >
                        <Globe className="w-6 h-6 text-amber-400" />
                        <span className="text-sm font-bold text-white uppercase tracking-wider">
                            Why Partner With Drift Consulting
                        </span>
                        <Globe className="w-6 h-6 text-amber-400" />
                    </motion.div>

                    {/* Massive Headline */}
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                    >
                        We're not just project managers—
                        <br />
                        <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                            we're your success insurance
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
                    >
                        Methodical planning. Expert stakeholder management. Reactive problem solving.
                        This is how we turn construction chaos into guaranteed delivery.
                    </motion.p>

                    {/* Decorative Line */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '12rem' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-8"
                    />
                </motion.div>

                {/* REASON CARDS - 6 ITEMS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {reasons.map((reason, idx) => (
                        <motion.div
                            key={reason.title}
                            initial={{ opacity: 0, y: 50, rotateX: -20 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: idx * 0.1,
                                duration: 0.6,
                                type: 'spring',
                                stiffness: 100
                            }}
                            whileHover={{
                                y: -15,
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-amber-500/50 transition-all duration-300 overflow-hidden"
                        >
                            {/* Gradient Glow on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                            {/* Icon */}
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                className={`relative w-16 h-16 bg-gradient-to-br ${reason.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-black/20`}
                            >
                                {reason.icon}
                            </motion.div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                                {reason.title}
                            </h3>
                            <p className="text-gray-300 group-hover:text-white leading-relaxed transition-colors">
                                {reason.description}
                            </p>

                            {/* Corner Accent */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <Link href="/about">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-10 py-6 text-lg shadow-2xl hover:shadow-amber-500/50 group"
                        >
                            <Lightbulb className="mr-2 w-5 h-5 group-hover:animate-pulse" />
                            Discover Our Full Story
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes gridMove {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(100px); }
                }
            `}</style>
        </section>
    );
};

const FinalCTA = () => {
    return (
        <section className="py-20 bg-linear-to-br from-slate-900 to-slate-800
            dark:from-slate-900 dark:to-slate-950 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                    Ready to start your next project?
                </h2>
                <p className="text-xl text-gray-300 dark:text-gray-400 mb-8">
                    Make this build your simplest yet. Call us on{' '}
                    <a href="tel:+2348012345678" className="text-amber-400 dark:text-amber-300 font-bold hover:underline">
                        +234 801 234 5678
                    </a>
                </p>
                <Link href="/contact">
                    <Button
                        size="lg"
                        className="bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-500
                            text-white font-bold px-10 py-6 text-lg shadow-2xl
                            hover:shadow-amber-500/50 dark:hover:shadow-amber-600/50 transition-all"
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
        <div className="bg-white dark:bg-slate-900">
            <Hero/>
            <BenefitsSection/>
            <AboutSection/>
            <TestimonialsSection/>
            <CTABanner/>
            <ServicesSection/>
            <WhyChooseSection/>
            <FinalCTA/>
        </div>
    );
}