// lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";

// Contact form rate limiters (existing)
export const contactRateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    analytics: true,
    prefix: "ratelimit:contact",
});

export const ipRateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    analytics: true,
    prefix: "ratelimit:ip",
});

// Auth rate limiters (new)
export const signupRateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "24 h"), // 5 signups per IP per 24 hours
    analytics: true,
    prefix: "ratelimit:signup",
});

export const loginRateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "24 h"), // 5 failed login attempts per 24 hours
    analytics: true,
    prefix: "ratelimit:login:email",
});

export const loginIpRateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "1 h"), // 10 failed login attempts per IP per hour
    analytics: true,
    prefix: "ratelimit:login:ip",
});

// Helper function to get client IP (existing)
export function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }

    if (realIp) {
        return realIp.trim();
    }

    return "127.0.0.1";
}

// Helper to format time remaining
export function formatTimeRemaining(resetTimestamp: number): string {
    const now = Date.now();
    const diff = resetTimestamp - now;

    if (diff <= 0) return "now";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
}