// components/Benefits/AnimatedBenefitCard.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedBenefitCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: string;
    delay?: number;
}

export default function AnimatedBenefitCard({
                                                icon: Icon,
                                                title,
                                                description,
                                                gradient,
                                                delay = 0
                                            }: AnimatedBenefitCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2.5deg", "-2.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2.5deg", "2.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ scale: 1.05 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-sm perspective-1000"
        >
            {/* Card with 3D effect */}
            <div className="relative rounded-2xl p-8 bg-gradient-to-br from-white/10 to-transparent
        backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden"
                 style={{ background: gradient }}>

                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/30 rounded-full"
                            initial={{
                                x: Math.random() * 400 - 200,
                                y: Math.random() * 400 - 200,
                                scale: 0
                            }}
                            animate={{
                                x: isHovered ? Math.random() * 400 - 200 : Math.random() * 400 - 200,
                                y: isHovered ? Math.random() * 400 - 200 : Math.random() * 400 - 200,
                                scale: isHovered ? 1 : 0.5,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.05,
                            }}
                        />
                    ))}
                </div>

                {/* Icon with floating animation */}
                <motion.div
                    animate={{
                        y: isHovered ? [-10, 10, -10] : 0,
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl
            flex items-center justify-center bg-white/20 backdrop-blur-md"
                >
                    <Icon className="w-12 h-12 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-center">
                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: delay + 0.2 }}
                        className="text-2xl font-bold text-white mb-4"
                    >
                        {title}
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: delay + 0.3 }}
                        className="text-white/90 leading-relaxed"
                    >
                        {description}
                    </motion.p>
                </div>

                {/* Hover glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                        boxShadow: isHovered
                            ? "0 0 60px rgba(255,255,255,0.2)"
                            : "0 0 0px rgba(255,255,255,0)"
                    }}
                />
            </div>
        </motion.div>
    );
}