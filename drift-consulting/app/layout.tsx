import type {Metadata} from "next";
import {Geist, Geist_Mono, Inter, Cormorant_Garamond} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/providers/ThemeProvider/ThemeProvider"
import {Toaster} from "sonner"
import ReactQueryProvider from "@/components/providers/ReactQuery/ReactQueryProvider";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-cormorant',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
    title: {
        default: 'Elite Construction Project Manager | UK Government-Level Expertise',
        template: '%s | Construction Project Management',
    },
    description: 'International Construction Project Manager with 15+ years experience delivering residential, hospitality, and institutional projects. UK government-certified expertise in project management, feasibility analysis, and quality assurance.',
    keywords: [
        'construction project manager',
        'civil engineer',
        'UK construction',
        'Nigeria construction',
        'residential development',
        'hotel construction',
        'institutional buildings',
        'government projects',
        'project management services',
        'construction consulting',
        'building project manager',
        'construction expert',
    ],
    authors: [{name: 'Drift Consulting'}],
    creator: 'Drift Consulting',
    openGraph: {
        type: 'website',
        locale: 'en_GB',
        url: process.env.NEXT_PUBLIC_SITE_URL,
        siteName: 'Construction Project Management',
        title: 'Elite Construction Project Manager | UK Government-Level Expertise',
        description: 'International Construction Project Manager with 15+ years experience in residential, hospitality, and institutional developments.',
        images: [
            {
                url: '/pic1.jpg',
                width: 1200,
                height: 630,
                alt: 'Construction Project Management Services',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Elite Construction Project Manager',
        description: '15+ years delivering excellence in construction project management',
        images: ['/pic2.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            {url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
            {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
        ],
        apple: [
            {url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'},
        ],
    },
    manifest: '/site.webmanifest',
};

// JSON-LD Structured Data
const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}#person`,
            name: 'Drift Consulting',
            jobTitle: 'Construction Project Manager',
            description: 'International Construction Project Manager with UK government-level expertise',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
            sameAs: [],
            knowsAbout: [
                'Construction Management',
                'Civil Engineering',
                'Project Planning',
                'Quality Assurance',
                'Risk Management',
                'Residential Construction',
                'Commercial Construction',
            ],
        },
        {
            '@type': 'ProfessionalService',
            '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}#service`,
            name: 'Construction Project Management Services',
            description: 'Professional construction project management services for residential, hospitality, and institutional developments',
            provider: {
                '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}#person`,
            },
            areaServed: [
                {
                    '@type': 'Country',
                    name: 'United Kingdom',
                },
                {
                    '@type': 'Country',
                    name: 'Nigeria',
                },
            ],
            serviceType: [
                'Project Management',
                'Construction Consulting',
                'Feasibility Analysis',
                'Quality Assurance',
                'Site Supervision',
            ],
        },
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />

            {/* Preconnect to external domains */}
            <link rel="preconnect" href="https://res.cloudinary.com"/>
            <link rel="dns-prefetch" href="https://res.cloudinary.com"/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${cormorant.variable} antialiased bg-slate-900`}
            suppressHydrationWarning
        >
        <ReactQueryProvider>
            <Toaster
                richColors
                position="top-right"
                expand={true}
            />

            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </ReactQueryProvider>
        </body>
        </html>
    );
}