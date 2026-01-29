// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize global API rate limiter (aggressive - prevents DDoS)
// Only initialize if Redis credentials are available
let globalApiRateLimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    globalApiRateLimit = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute per IP
        analytics: true,
        prefix: "ratelimit:global",
    });
}

// Helper to get client IP
function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    if (forwarded) return forwarded.split(",")[0].trim();
    if (realIp) return realIp.trim();

    return "127.0.0.1";
}

// Public routes that don't require authentication
const publicRoutes = [
    '/',
    '/home',
    '/about',
    '/contact',
    '/services',
    '/portfolio',
    '/blogs',
    '/api/auth/[...nextauth]',
    '/api/public/',
];

// Auth routes (should redirect to dashboard if already logged in)
const authRoutes = [
    '/admin/auth/login',
    '/admin/auth/signup',
    '/admin/auth/reset-password',
    '/admin/auth/set-password',
    '/admin/auth/verify-email',
    '/admin/auth/error',
];

// Public admin routes (no auth required)
const publicAdminRoutes = [
    '/admin/auth/unauthorized',
];

// API routes that should skip global rate limiting (they have their own)
const apiRoutesWithOwnLimits = [
    '/api/v1/contact',
];

// Handle webhook routes that might need different rate limiting
const webhookRoutes = [
    '/api/webhooks/stripe',
    '/api/webhooks/github',
];

export default auth(async (req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;

    // Allow static files
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/favicon') ||
        pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)
    ) {
        return NextResponse.next();
    }

    // Apply global rate limiting to API routes (except those with specific limits)
    if (pathname.startsWith('/api')) {
        const hasOwnLimit = apiRoutesWithOwnLimits.some(route => pathname.startsWith(route));

        // Only apply global rate limit if route doesn't have its own
        if (!hasOwnLimit && globalApiRateLimit) {
            const ip = getClientIp(req);
            const { success, limit, remaining, reset } = await globalApiRateLimit.limit(ip);

            if (!success) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Too many API requests",
                        error: "RATE_LIMIT_EXCEEDED",
                        retryAfter: Math.ceil((reset - Date.now()) / 1000),
                    },
                    {
                        status: 429,
                        headers: {
                            "X-RateLimit-Limit": limit.toString(),
                            "X-RateLimit-Remaining": remaining.toString(),
                            "X-RateLimit-Reset": reset.toString(),
                            "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
                        },
                    }
                );
            }

            // Add rate limit headers to successful responses
            const response = NextResponse.next();
            response.headers.set("X-RateLimit-Limit", limit.toString());
            response.headers.set("X-RateLimit-Remaining", remaining.toString());
            response.headers.set('X-Frame-Options', 'DENY');
            response.headers.set('X-Content-Type-Options', 'nosniff');
            response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
            response.headers.set('Content-Security-Policy', "default-src 'self'");
            return response;
        }

        // Routes with own limits proceed without global rate limit
        return NextResponse.next();
    }

    // Check if route is public
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    // Check if route is auth page
    const isAuthRoute = authRoutes.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    // Check if route is public admin
    const isPublicAdminRoute = publicAdminRoutes.some(route =>
        pathname === route
    );

    // Allow public routes
    if (isPublicRoute || isPublicAdminRoute) {
        return NextResponse.next();
    }

    // If logged in and trying to access auth pages, redirect to dashboard
    if (isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL('/admin/protected/dashboard', req.url));
    }

    // If not logged in and trying to access auth pages, allow
    if (!isLoggedIn && isAuthRoute) {
        return NextResponse.next();
    }

    // Check if route is admin protected (anything under /admin/protected)
    const isProtectedRoute = pathname.startsWith('/admin/protected');

    // If trying to access protected route without auth, redirect to login
    if (!isLoggedIn && isProtectedRoute) {
        const loginUrl = new URL('/admin/auth/login', req.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If logged in and accessing protected route, check role
    if (isLoggedIn && isProtectedRoute) {
        const userRole = req.auth?.user?.role as string;
        const adminRoles = ['superAdmin', 'admin', 'support'];

        if (!adminRoles.includes(userRole)) {
            return NextResponse.redirect(new URL('/admin/auth/unauthorized', req.url));
        }
    }

    // If accessing /admin root, redirect based on auth
    if (pathname === '/admin') {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL('/admin/protected/dashboard', req.url));
        } else {
            return NextResponse.redirect(new URL('/admin/auth/login', req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, other icons
         * - images, public files
         */
        '/((?!_next/static|_next/image|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};