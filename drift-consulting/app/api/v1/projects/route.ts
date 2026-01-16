import { NextRequest, NextResponse } from 'next/server';
import dbClient from '@/lib/mongoDB/index';
import Project from '@/lib/models/Project';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const status = searchParams.get('status');
        const featured = searchParams.get('featured');
        const limit = parseInt(searchParams.get('limit') || '50');
        const page = parseInt(searchParams.get('page') || '1');

        await dbClient.connect();

        // Build query
        const query: any = { published: true };

        if (category && category !== 'all') {
            query.category = category;
        }

        if (status && status !== 'all') {
            query.status = status;
        }

        if (featured === 'true') {
            query.featured = true;
        }

        const skip = (page - 1) * limit;

        // Fetch projects
        const [projects, total] = await Promise.all([
            Project.find(query)
                .sort({ order: 1, createdAt: -1 })
                .limit(limit)
                .skip(skip)
                .select('-__v')
                .lean(),
            Project.countDocuments(query),
        ]);

        return NextResponse.json({
            success: true,
            data: projects,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });

    } catch (error) {
        console.error('Projects fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

// POST endpoint for admin to create projects
export async function POST(request: NextRequest) {
    try {
        // TODO: Add authentication check here

        const body = await request.json();

        await dbClient.connect();

        const project = await Project.create(body);

        return NextResponse.json(
            {
                success: true,
                message: 'Project created successfully',
                data: project,
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Project creation error:', error);

        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, error: 'A project with this slug already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to create project' },
            { status: 500 }
        );
    }
}