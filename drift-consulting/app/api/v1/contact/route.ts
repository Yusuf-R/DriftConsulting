import { NextRequest, NextResponse } from 'next/server';
import dbClient from '@/lib/mongoDB/index';
import Contact from '@/lib/models/Contact';
import { contactFormSchema } from '@/lib/validations';
import { sendContactNotification, sendClientConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate input
        const validationResult = contactFormSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Validation failed',
                    details: validationResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const data = validationResult.data;

        // Connect to database
        await dbClient.connect();

        // Get client information
        const ipAddress = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Create contact entry
        const contact = await Contact.create({
            name: data.name,
            email: data.email,
            projectType: data.projectType,
            location: data.location,
            scope: data.scope,
            phone: data.phone,
            budget: data.budget,
            timeline: data.timeline,
            status: 'new',
            source: 'website',
            ipAddress,
            userAgent,
        });

        // Send email notifications (non-blocking)
        Promise.all([
            sendContactNotification({
                name: data.name,
                email: data.email,
                projectType: data.projectType,
                location: data.location,
                scope: data.scope,
                phone: data.phone,
                budget: data.budget,
                timeline: data.timeline,
            }),
            sendClientConfirmation(data.email, data.name),
        ]).catch((error) => {
            console.error('Email notification error:', error);
            // Don't fail the request if email fails
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Your inquiry has been submitted successfully',
                contactId: contact._id,
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Contact form submission error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to submit inquiry',
                message: 'An unexpected error occurred. Please try again later.',
            },
            { status: 500 }
        );
    }
}

// GET endpoint for admin to retrieve contacts
export async function GET(request: NextRequest) {
    try {
        // TODO: Add authentication check here
        // For now, this is a simple implementation

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '50');
        const page = parseInt(searchParams.get('page') || '1');

        await dbClient.connect();

        const query: any = {};
        if (status && status !== 'all') {
            query.status = status;
        }

        const skip = (page - 1) * limit;

        const [contacts, total] = await Promise.all([
            Contact.find(query)
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip)
                .lean(),
            Contact.countDocuments(query),
        ]);

        return NextResponse.json({
            success: true,
            data: contacts,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });

    } catch (error) {
        console.error('Contacts fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}