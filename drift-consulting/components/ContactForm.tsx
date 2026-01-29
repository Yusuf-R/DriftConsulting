// components/ContactForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, Clock } from 'lucide-react';
import { contactFormSchema, ContactFormData } from '@/lib/validations';

export default function ContactForm() {
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rate-limited'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [retryAfter, setRetryAfter] = useState<number>(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    // Countdown timer for rate limit
    React.useEffect(() => {
        if (retryAfter > 0) {
            const timer = setInterval(() => {
                setRetryAfter(prev => {
                    if (prev <= 1) {
                        setSubmitStatus('idle');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [retryAfter]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (minutes > 0) {
            return `${minutes}m ${secs}s`;
        }
        return `${secs}s`;
    };

    const onSubmit = async (data: ContactFormData) => {
        setSubmitStatus('loading');
        setErrorMessage('');
        setRetryAfter(0);

        try {
            const response = await fetch('/api/v1/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.status === 429) {
                // Rate limit exceeded
                setSubmitStatus('rate-limited');
                setErrorMessage(result.message || 'Too many requests. Please try again later.');
                setRetryAfter(result.retryAfter || 60);
                return;
            }

            if (result.success) {
                setSubmitStatus('success');
                reset();

                // Reset success message after 10 seconds
                setTimeout(() => {
                    setSubmitStatus('idle');
                }, 10000);
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.message || 'Failed to submit inquiry. Please try again.');
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-green-500/10 border-2 border-green-500 rounded-xl p-12 text-center"
                    >
                        <CheckCircle2 className="mx-auto text-green-500 mb-6" size={64} />
                        <h3 className="text-3xl font-serif text-white mb-4">Thank You!</h3>
                        <p className="text-xl text-gray-300 mb-3">
                            Your project inquiry has been submitted successfully.
                        </p>
                        <p className="text-gray-400">
                            We&apos;ll review your requirements and get back to you within 24 hours.
                        </p>
                        <button
                            onClick={() => setSubmitStatus('idle')}
                            className="mt-8 text-green-400 hover:text-green-300 underline transition-colors"
                        >
                            Submit another inquiry
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-slate-800/50 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-amber-500/20"
                    >
                        {/* Rate Limit Warning */}
                        {submitStatus === 'rate-limited' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-orange-500/10 border border-orange-500 rounded-lg p-4 mb-6 flex items-start gap-3"
                            >
                                <Clock className="text-orange-500 shrink-0 mt-0.5" size={20} />
                                <div className="flex-1">
                                    <p className="text-orange-400 font-semibold">Rate Limit Exceeded</p>
                                    <p className="text-orange-300 text-sm mt-1">{errorMessage}</p>
                                    {retryAfter > 0 && (
                                        <p className="text-orange-200 text-sm mt-2 font-mono">
                                            Try again in: <span className="font-bold">{formatTime(retryAfter)}</span>
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Error Message */}
                        {submitStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6 flex items-start gap-3"
                            >
                                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                                <p className="text-red-400">{errorMessage}</p>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                                    Full Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                    disabled={submitStatus === 'loading' || submitStatus === 'rate-limited'}
                                    className={`w-full bg-slate-900/50 text-white px-4 py-3 rounded-lg border ${
                                        errors.name ? 'border-red-500' : 'border-slate-700'
                                    } focus:border-amber-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                                    Email Address <span className="text-red-400">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    disabled={submitStatus === 'loading' || submitStatus === 'rate-limited'}
                                    className={`w-full bg-slate-900/50 text-white px-4 py-3 rounded-lg border ${
                                        errors.email ? 'border-red-500' : 'border-slate-700'
                                    } focus:border-amber-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Project Type */}
                            <div>
                                <label htmlFor="projectType" className="block text-gray-300 font-medium mb-2">
                                    Project Type <span className="text-red-400">*</span>
                                </label>
                                <select
                                    id="projectType"
                                    {...register('projectType')}
                                    disabled={submitStatus === 'loading' || submitStatus === 'rate-limited'}
                                    className={`w-full bg-slate-900/50 text-white px-4 py-3 rounded-lg border ${
                                        errors.projectType ? 'border-red-500' : 'border-slate-700'
                                    } focus:border-amber-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <option value="">Select project type</option>
                                    <option value="residential">Residential</option>
                                    <option value="hospitality">Hospitality</option>
                                    <option value="institutional">Institutional</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="government">Government</option>
                                </select>
                                {errors.projectType && (
                                    <p className="text-red-400 text-sm mt-1">{errors.projectType.message}</p>
                                )}
                            </div>

                            {/* Location */}
                            <div>
                                <label htmlFor="location" className="block text-gray-300 font-medium mb-2">
                                    Project Location <span className="text-red-400">*</span>
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    {...register('location')}
                                    disabled={submitStatus === 'loading' || submitStatus === 'rate-limited'}
                                    className={`w-full bg-slate-900/50 text-white px-4 py-3 rounded-lg border ${
                                        errors.location ? 'border-red-500' : 'border-slate-700'
                                    } focus:border-amber-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                                    placeholder="Lagos, Nigeria"
                                />
                                {errors.location && (
                                    <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Phone (Optional) */}
                            <div>
                                <label htmlFor="phone" className="block text-gray-300 font-medium mb-2">
                                    Phone Number <span className="text-gray-500 text-sm">(Optional)</span>
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    {...register('phone')}
                                    disabled={submitStatus === 'loading' || submitStatus === 'rate-limited'}
                                    className={`w-full bg-slate-900/50 text-white px-4 py-3 rounded-lg border ${
                                        errors.phone ? 'border-red-500' : 'border-slate-700'
                                    } focus:border-amber-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                                    placeholder="+234 XXX XXX XXXX"
                                />
                                {errors.phone && (
                                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                                )}
                            </div>

                            {/* Budget (Optional) */}
                            <div>
                                <label htmlFor="budget" className="block text-gray-300 font-medium mb-2">
                                    Budget Range <span className="text-gray-500 text-sm">(Optional)</span>
                                </label>
                                <select
                                    id="budget"
                                    {...register('budget')}
                                    disabled={submitStatus === 'loading' || submitStatus === 'rate-limited'}
                                    className="w-full bg-slate-900/50 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-amber-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="">Select budget range</option>
                                    <option value="under-50m">Under ₦50M / £200K</option>
                                    <option value="50m-150m">₦50M - ₦150M / £200K - £600K</option>
                                    <option value="150m-500m">₦150M - ₦500M / £600K - £2M</option>
                                    <option value="500m-1b">₦500M - ₦1B / £2M - £4M</option>
                                    <option value="over-1b">Over ₦1B / £4M+</option>
                                </select>
                            </div>
                        </div>

                        {/* Timeline (Optional) */}
                        <div className="mb-6">
                            <label htmlFor="timeline" className="block text-gray-300 font-medium mb-2">
                                Expected Timeline <span className="text-gray-500 text-sm">(Optional)</span>
                            </label>
                            <select
                                id="timeline"
                                {...register('timeline')}
                                disabled={submitStatus === 'loading' || submitStatus === 'rate-limited'}
                                className="w-full bg-slate-900/50 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-amber-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="">Select timeline</option>
                                <option value="urgent">Urgent (Within 1 month)</option>
                                <option value="short">Short-term (1-3 months)</option>
                                <option value="medium">Medium-term (3-6 months)</option>
                                <option value="long">Long-term (6+ months)</option>
                                <option value="planning">Planning phase</option>
                            </select>
                        </div>

                        {/* Project Scope */}
                        <div className="mb-6">
                            <label htmlFor="scope" className="block text-gray-300 font-medium mb-2">
                                Project Scope & Requirements <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                id="scope"
                                {...register('scope')}
                                disabled={submitStatus === 'loading' || submitStatus === 'rate-limited'}
                                rows={6}
                                className={`w-full bg-slate-900/50 text-white px-4 py-3 rounded-lg border ${
                                    errors.scope ? 'border-red-500' : 'border-slate-700'
                                } focus:border-amber-500 focus:outline-none transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
                                placeholder="Please describe your project requirements, specific needs, timeline considerations, and any other relevant details..."
                            />
                            {errors.scope && (
                                <p className="text-red-400 text-sm mt-1">{errors.scope.message}</p>
                            )}
                            <p className="text-gray-500 text-sm mt-2">
                                Minimum 20 characters. The more details you provide, the better we can assist you.
                            </p>
                        </div>

                        {/* Privacy Notice */}
                        <div className="bg-slate-900/50 p-4 rounded-lg mb-6 border border-slate-700">
                            <p className="text-sm text-gray-400">
                                🔒 Your information is secure and will only be used to respond to your inquiry.
                                We respect your privacy and never share your data with third parties.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={submitStatus === 'loading' || submitStatus === 'rate-limited'}
                            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-slate-900 font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-amber-500/50 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            {submitStatus === 'loading' ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Submitting...
                                </>
                            ) : submitStatus === 'rate-limited' ? (
                                <>
                                    <Clock size={20} />
                                    Please wait {formatTime(retryAfter)}
                                </>
                            ) : (
                                <>
                                    Submit Project Inquiry
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}